import { rest } from '../../test-utils/msw';
import { server } from '../../test-utils/server';
import { API_BASE, initTestClient } from '../../test-utils/cf-client';
import { cfResponse } from '../../test-utils/cf-response';
import * as api from '@/services/cloudflare';

const accountId = 'acc1';

beforeAll(async () => {
  await initTestClient();
});

describe('Zero Trust devices', () => {
  it('getZeroTrustDevices lists physical devices (current API, not the deprecated /devices)', async () => {
    let path: string | null = null;
    const dev = { id: 'd1', name: 'Laptop', device_type: 'windows', active_registrations: 2, last_seen_at: '2026-11-09T00:00:00Z', created_at: 'c', updated_at: 'u' };
    server.use(
      rest.get(`${API_BASE}/accounts/${accountId}/devices/physical-devices`, (req, res, ctx) => {
        path = req.url.pathname;
        return res(ctx.json(cfResponse([dev])));
      })
    );
    const res = await api.getZeroTrustDevices(accountId);
    expect(path).toBe(`/client/v4/accounts/${accountId}/devices/physical-devices`);
    expect(res.result?.[0].name).toBe('Laptop');
  });

  it('revokeZeroTrustDevice POSTs the revoke endpoint', async () => {
    let hit = false;
    server.use(
      rest.post(`${API_BASE}/accounts/${accountId}/devices/physical-devices/d1/revoke`, (_req, res, ctx) => {
        hit = true;
        return res(ctx.json(cfResponse({})));
      })
    );
    await api.revokeZeroTrustDevice(accountId, 'd1');
    expect(hit).toBe(true);
  });

  it('deleteZeroTrustDevice DELETEs the device', async () => {
    let hit = false;
    server.use(
      rest.delete(`${API_BASE}/accounts/${accountId}/devices/physical-devices/d1`, (_req, res, ctx) => {
        hit = true;
        return res(ctx.json(cfResponse({})));
      })
    );
    await api.deleteZeroTrustDevice(accountId, 'd1');
    expect(hit).toBe(true);
  });
});
