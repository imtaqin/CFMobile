import { rest } from '../../test-utils/msw';
import { server } from '../../test-utils/server';
import { API_BASE, initTestClient } from '../../test-utils/cf-client';
import { cfResponse, cfError } from '../../test-utils/cf-response';
import * as api from '@/services/cloudflare';

const zoneId = 'zone456';

beforeAll(async () => {
  await initTestClient();
});

describe('Firewall', () => {
  it('getIPAccessRules lists rules with paging params', async () => {
    const rules = [
      { id: 'ar1', mode: 'block', configuration: { target: 'ip', value: '5.6.7.8' }, created_on: '2024-01-01' },
    ];
    server.use(
      rest.get(`${API_BASE}/zones/${zoneId}/firewall/access_rules/rules`, (req, res, ctx) => {
        expect(req.url.searchParams.get('page')).toBe('1');
        expect(req.url.searchParams.get('per_page')).toBe('50');
        return res(ctx.json(cfResponse(rules)));
      })
    );

    const res = await api.getIPAccessRules(zoneId);
    expect(res.result).toEqual(rules);
  });

  it('createIPAccessRule POSTs the new rule', async () => {
    const rule = { mode: 'challenge' as const, configuration: { target: 'ip', value: '9.9.9.9' }, notes: 'suspicious' };
    const created = { id: 'ar2', ...rule };
    server.use(
      rest.post(`${API_BASE}/zones/${zoneId}/firewall/access_rules/rules`, async (req, res, ctx) => {
        const body = await req.json();
        expect(body).toEqual(rule);
        return res(ctx.json(cfResponse(created)));
      })
    );

    const res = await api.createIPAccessRule(zoneId, rule);
    expect(res.result).toEqual(created);
  });

  it('updateIPAccessRule PATCHes mode/notes', async () => {
    server.use(
      rest.patch(`${API_BASE}/zones/${zoneId}/firewall/access_rules/rules/ar1`, async (req, res, ctx) => {
        const body = await req.json();
        expect(body).toEqual({ notes: 'updated note' });
        return res(ctx.json(cfResponse({ id: 'ar1', mode: 'block', configuration: { target: 'ip', value: '5.6.7.8' }, notes: 'updated note' })));
      })
    );

    const res = await api.updateIPAccessRule(zoneId, 'ar1', { notes: 'updated note' });
    expect(res.result.notes).toBe('updated note');
  });

  it('deleteIPAccessRule DELETEs the rule', async () => {
    server.use(
      rest.delete(`${API_BASE}/zones/${zoneId}/firewall/access_rules/rules/ar1`, (_req, res, ctx) =>
        res(ctx.json(cfResponse({ id: 'ar1' })))
      )
    );

    const res = await api.deleteIPAccessRule(zoneId, 'ar1');
    expect(res.result).toEqual({ id: 'ar1' });
  });

  it('propagates a Cloudflare error response', async () => {
    server.use(
      rest.get(`${API_BASE}/zones/${zoneId}/firewall/access_rules/rules`, (_req, res, ctx) =>
        res(ctx.status(403), ctx.json(cfError('Authentication error', 10000)))
      )
    );

    await expect(api.getIPAccessRules(zoneId)).rejects.toBeTruthy();
  });
});
