import { rest } from '../../test-utils/msw';
import { server } from '../../test-utils/server';
import { API_BASE, initTestClient } from '../../test-utils/cf-client';
import { cfResponse } from '../../test-utils/cf-response';
import * as api from '@/services/cloudflare';

const accountId = 'acc1';
const script = 'my-worker';

beforeAll(async () => {
  await initTestClient();
});

describe('updateWorkerContent', () => {
  it('writes the /content sub-resource so bindings and secrets are preserved', async () => {
    let path: string | null = null;
    let method: string | null = null;
    server.use(
      rest.put(`${API_BASE}/accounts/${accountId}/workers/scripts/${script}/content`, (req, res, ctx) => {
        path = req.url.pathname;
        method = req.method;
        return res(ctx.json(cfResponse({ id: script })));
      })
    );

    await api.updateWorkerContent(accountId, script, {
      fileUri: 'file:///tmp/worker.js',
      fileName: 'worker.js',
      moduleSyntax: true,
    });

    // The point of the fix: it targets .../scripts/{name}/content (a code-only
    // update), never .../scripts/{name} (a full upload that drops bindings).
    expect(method).toBe('PUT');
    expect(path).toBe(`/client/v4/accounts/${accountId}/workers/scripts/${script}/content`);
  });

  it('propagates a Cloudflare error', async () => {
    server.use(
      rest.put(`${API_BASE}/accounts/${accountId}/workers/scripts/${script}/content`, (_req, res, ctx) =>
        res(ctx.status(400), ctx.json({ success: false, errors: [{ message: 'bad script' }], messages: [], result: null }))
      )
    );

    await expect(
      api.updateWorkerContent(accountId, script, {
        fileUri: 'file:///tmp/worker.js',
        fileName: 'worker.js',
        moduleSyntax: true,
      })
    ).rejects.toBeTruthy();
  });
});

describe('parseWorkerModules', () => {
  const CRLF = '\r\n';

  it('treats a plain service-worker script as one module', () => {
    const raw = "addEventListener('fetch', e => e.respondWith(new Response('hi')))";
    const { modules, multipart } = api.parseWorkerModules(raw);
    expect(multipart).toBe(false);
    expect(modules).toHaveLength(1);
    expect(modules[0].content).toBe(raw);
  });

  it('unwraps a single-module ES-module bundle (the #12 lockout case)', () => {
    const code = 'export default { fetch() { return new Response("hi") } }';
    const raw = [
      '--worker-boundary',
      'Content-Disposition: form-data; name="worker.js"; filename="worker.js"',
      'Content-Type: application/javascript+module',
      '',
      code,
      '--worker-boundary--',
      '',
    ].join(CRLF);
    const { modules, multipart } = api.parseWorkerModules(raw);
    expect(multipart).toBe(true);
    expect(modules).toHaveLength(1); // not flagged multi-module -> editor stays open
    expect(modules[0].name).toBe('worker.js');
    expect(modules[0].content).toBe(code);
  });

  it('reports more than one module for a real multi-file Worker', () => {
    const raw = [
      '--b',
      'Content-Disposition: form-data; name="index.js"; filename="index.js"',
      'Content-Type: application/javascript+module',
      '',
      "import u from './util.js'; export default { fetch: u }",
      '--b',
      'Content-Disposition: form-data; name="util.js"; filename="util.js"',
      'Content-Type: application/javascript+module',
      '',
      'export default () => new Response("x")',
      '--b--',
      '',
    ].join(CRLF);
    const { modules, multipart } = api.parseWorkerModules(raw);
    expect(multipart).toBe(true);
    expect(modules).toHaveLength(2);
    expect(modules.map((m) => m.name)).toEqual(['index.js', 'util.js']);
  });
});

describe('patchWorkerSecretsBulk', () => {
  it('PATCHes the /secrets-bulk endpoint with a name->value map', async () => {
    let body: any = null;
    server.use(
      rest.patch(`${API_BASE}/accounts/${accountId}/workers/scripts/${script}/secrets-bulk`, async (req, res, ctx) => {
        body = await req.json();
        return res(ctx.json(cfResponse([{ name: 'A', type: 'secret_text' }, { name: 'B', type: 'secret_text' }])));
      })
    );
    const res = await api.patchWorkerSecretsBulk(accountId, script, { A: '1', B: '2' });
    expect(body).toEqual({ secrets: { A: '1', B: '2' } });
    expect(res.result).toHaveLength(2);
  });
});
