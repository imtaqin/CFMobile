import { rest } from '../../test-utils/msw';
import { server } from '../../test-utils/server';
import { API_BASE, initTestClient } from '../../test-utils/cf-client';
import { cfResponse } from '../../test-utils/cf-response';
import * as api from '@/services/cloudflare';

const accountId = 'acc1';

beforeAll(async () => { await initTestClient(); });

describe('aiGatewayWebSearch', () => {
  it('POSTs the query with the gateway id in options', async () => {
    let body: any = null;
    server.use(
      rest.post(`${API_BASE}/accounts/${accountId}/ai/websearch`, async (req, res, ctx) => {
        body = await req.json();
        return res(ctx.json(cfResponse({
          items: [{ title: 'Cloudflare', url: 'https://cloudflare.com', description: 'CDN' }],
          metadata: { latencyMs: 12, query: 'cloudflare', requestId: 'r1' },
        })));
      })
    );
    const res = await api.aiGatewayWebSearch(accountId, 'gw1', 'cloudflare', { limit: 10 });
    expect(body).toEqual({ query: 'cloudflare', options: { gateway: { id: 'gw1' } }, limit: 10 });
    expect(res.result?.items[0].url).toBe('https://cloudflare.com');
  });
});
