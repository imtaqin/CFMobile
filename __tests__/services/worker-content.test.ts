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
