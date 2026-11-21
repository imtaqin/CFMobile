import { rest } from '../../test-utils/msw';
import { server } from '../../test-utils/server';
import { API_BASE, initTestClient } from '../../test-utils/cf-client';
import { cfResponse } from '../../test-utils/cf-response';
import * as api from '@/services/cloudflare';

const zoneId = 'zone456';

beforeAll(async () => {
  await initTestClient();
});

describe('Zone Access Applications', () => {
  const baseApp = {
    id: 'app1',
    name: 'Internal Wiki',
    domain: 'wiki.example.com',
    type: 'self_hosted',
    session_duration: '24h',
    app_launcher_visible: true,
    allow_iframe: false,
    skip_interstitial: false,
  };

  it('getZoneAccessApplications lists apps for the zone', async () => {
    server.use(
      rest.get(`${API_BASE}/zones/${zoneId}/access/apps`, (_req, res, ctx) => res(ctx.json(cfResponse([baseApp]))))
    );

    const res = await api.getZoneAccessApplications(zoneId);
    expect(res.result).toEqual([baseApp]);
  });

  it('getZoneAccessApplication fetches a single app by id', async () => {
    server.use(
      rest.get(`${API_BASE}/zones/${zoneId}/access/apps/app1`, (_req, res, ctx) => res(ctx.json(cfResponse(baseApp))))
    );

    const res = await api.getZoneAccessApplication(zoneId, 'app1');
    expect(res.result).toEqual(baseApp);
  });

  it('createZoneAccessApplication posts the app input', async () => {
    const input = {
      name: 'Internal Wiki',
      domain: 'wiki.example.com',
      type: 'self_hosted',
    };
    server.use(
      rest.post(`${API_BASE}/zones/${zoneId}/access/apps`, async (req, res, ctx) => {
        expect(await req.json()).toEqual(input);
        return res(ctx.status(201), ctx.json(cfResponse(baseApp)));
      })
    );

    const res = await api.createZoneAccessApplication(zoneId, input);
    expect(res.result.id).toBe('app1');
  });

  it('updateZoneAccessApplication puts the managed fields', async () => {
    const input = {
      name: 'Wiki',
      domain: 'wiki.example.com',
      session_duration: '8h',
      app_launcher_visible: false,
    };
    server.use(
      rest.put(`${API_BASE}/zones/${zoneId}/access/apps/app1`, async (req, res, ctx) => {
        expect(await req.json()).toEqual(input);
        return res(ctx.json(cfResponse({ ...baseApp, ...input })));
      })
    );

    const res = await api.updateZoneAccessApplication(zoneId, 'app1', input);
    expect(res.result.session_duration).toBe('8h');
  });

  it('deleteZoneAccessApplication deletes by id', async () => {
    server.use(
      rest.delete(`${API_BASE}/zones/${zoneId}/access/apps/app1`, (_req, res, ctx) => res(ctx.json(cfResponse({ id: 'app1' }))))
    );

    const res = await api.deleteZoneAccessApplication(zoneId, 'app1');
    expect(res.result).toEqual({ id: 'app1' });
  });

  it('revokeZoneAccessApplicationTokens posts to the revoke_tokens endpoint', async () => {
    let hit = false;
    server.use(
      rest.post(`${API_BASE}/zones/${zoneId}/access/apps/app1/revoke_tokens`, (_req, res, ctx) => {
        hit = true;
        return res(ctx.status(202), ctx.json(cfResponse({})));
      })
    );

    await api.revokeZoneAccessApplicationTokens(zoneId, 'app1');
    expect(hit).toBe(true);
  });

  it('updateZoneAccessApplicationSettings patches the settings toggles', async () => {
    const input = { allow_iframe: true, skip_interstitial: true };
    server.use(
      rest.patch(`${API_BASE}/zones/${zoneId}/access/apps/app1/settings`, async (req, res, ctx) => {
        expect(await req.json()).toEqual(input);
        return res(ctx.status(202), ctx.json(cfResponse(input)));
      })
    );

    const res = await api.updateZoneAccessApplicationSettings(zoneId, 'app1', input);
    expect(res.result).toEqual(input);
  });

  it('propagates a Cloudflare error response', async () => {
    server.use(
      rest.get(`${API_BASE}/zones/${zoneId}/access/apps`, (_req, res, ctx) =>
        res(
          ctx.status(403),
          ctx.json({ success: false, errors: [{ code: 10000, message: 'Authentication error' }], messages: [], result: null })
        )
      )
    );

    await expect(api.getZoneAccessApplications(zoneId)).rejects.toBeTruthy();
  });
});
