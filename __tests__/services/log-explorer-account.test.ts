import { rest } from '../../test-utils/msw';
import { server } from '../../test-utils/server';
import { API_BASE, initTestClient } from '../../test-utils/cf-client';
import { cfResponse } from '../../test-utils/cf-response';
import * as api from '@/services/cloudflare';

const accountId = 'acct123';

beforeAll(async () => {
  await initTestClient();
});

describe('Account Log Explorer', () => {
  const dataset = {
    dataset_id: 'ds1',
    dataset: 'http_requests',
    object_id: accountId,
    object_type: 'account' as const,
    enabled: true,
    deletion_protection: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  it('getAccountLogExplorerDatasets lists datasets for the account', async () => {
    server.use(
      rest.get(`${API_BASE}/accounts/${accountId}/logs/explorer/datasets`, (_req, res, ctx) =>
        res(ctx.json(cfResponse([dataset])))
      )
    );

    const res = await api.getAccountLogExplorerDatasets(accountId);
    expect(res.result).toEqual([dataset]);
  });

  it('getAvailableAccountLogExplorerDatasets lists available dataset types', async () => {
    const available = [
      {
        dataset: 'http_requests',
        object_type: 'account' as const,
        timestamp_field: 'EdgeStartTimestamp',
        schema: { type: 'object', properties: {}, required: [] },
      },
    ];
    server.use(
      rest.get(`${API_BASE}/accounts/${accountId}/logs/explorer/datasets/available`, (_req, res, ctx) =>
        res(ctx.json(cfResponse(available)))
      )
    );

    const res = await api.getAvailableAccountLogExplorerDatasets(accountId);
    expect(res.result).toEqual(available);
  });

  it('createAccountLogExplorerDataset posts the dataset name', async () => {
    server.use(
      rest.post(`${API_BASE}/accounts/${accountId}/logs/explorer/datasets`, async (req, res, ctx) => {
        expect(await req.json()).toEqual({ dataset: 'http_requests' });
        return res(ctx.json(cfResponse(dataset)));
      })
    );

    const res = await api.createAccountLogExplorerDataset(accountId, 'http_requests');
    expect(res.result).toEqual(dataset);
  });

  it('updateAccountLogExplorerDataset puts the enabled flag', async () => {
    server.use(
      rest.put(`${API_BASE}/accounts/${accountId}/logs/explorer/datasets/ds1`, async (req, res, ctx) => {
        expect(await req.json()).toEqual({ enabled: false });
        return res(ctx.json(cfResponse({ ...dataset, enabled: false })));
      })
    );

    const res = await api.updateAccountLogExplorerDataset(accountId, 'ds1', false);
    expect(res.result.enabled).toBe(false);
  });

  it('runAccountLogExplorerQuery passes the SQL as a query param', async () => {
    const rows = [{ ClientIP: '1.2.3.4', EdgeResponseStatus: 200 }];
    server.use(
      rest.get(`${API_BASE}/accounts/${accountId}/logs/explorer/query/sql`, (req, res, ctx) => {
        expect(req.url.searchParams.get('query')).toBe('SELECT * FROM http_requests LIMIT 1');
        return res(ctx.json(cfResponse(rows)));
      })
    );

    const res = await api.runAccountLogExplorerQuery(accountId, 'SELECT * FROM http_requests LIMIT 1');
    expect(res.result).toEqual(rows);
  });

  it('propagates a Cloudflare error response', async () => {
    server.use(
      rest.get(`${API_BASE}/accounts/${accountId}/logs/explorer/datasets`, (_req, res, ctx) =>
        res(
          ctx.status(403),
          ctx.json({ success: false, errors: [{ code: 10000, message: 'Authentication error' }], messages: [], result: null })
        )
      )
    );

    await expect(api.getAccountLogExplorerDatasets(accountId)).rejects.toBeTruthy();
  });
});
