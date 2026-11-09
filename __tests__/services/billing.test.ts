import { rest } from '../../test-utils/msw';
import { server } from '../../test-utils/server';
import { API_BASE, initTestClient } from '../../test-utils/cf-client';
import { cfResponse } from '../../test-utils/cf-response';
import * as api from '@/services/cloudflare';

const accountId = 'acc1';

beforeAll(async () => {
  await initTestClient();
});

describe('Billing', () => {
  it('getBillableUsage lists usage rows', async () => {
    const row = {
      ServiceName: 'Workers', ChargeDescription: 'Requests', ConsumedQuantity: 1000,
      ConsumedUnit: 'Requests', EffectiveCost: 0.3, BilledCost: 0.3, ListCost: 0.3,
      BillingCurrency: 'USD', ChargePeriodStart: '2026-11-01', ChargePeriodEnd: '2026-11-30',
    };
    server.use(
      rest.get(`${API_BASE}/accounts/${accountId}/billable-usage`, (_req, res, ctx) =>
        res(ctx.json(cfResponse([row])))
      )
    );
    const res = await api.getBillableUsage(accountId);
    expect(res.result?.[0].ServiceName).toBe('Workers');
    expect(res.result?.[0].EffectiveCost).toBe(0.3);
  });

  it('getBillableUsage passes from/to when a range is given', async () => {
    let qs: URLSearchParams | null = null;
    server.use(
      rest.get(`${API_BASE}/accounts/${accountId}/billable-usage`, (req, res, ctx) => {
        qs = req.url.searchParams;
        return res(ctx.json(cfResponse([])));
      })
    );
    await api.getBillableUsage(accountId, { from: '2026-11-01', to: '2026-11-30' });
    expect(qs!.get('from')).toBe('2026-11-01');
    expect(qs!.get('to')).toBe('2026-11-30');
  });

  it('getBillableUsageInfo returns coverage + subscriptions', async () => {
    server.use(
      rest.get(`${API_BASE}/accounts/${accountId}/billable-usage/info`, (_req, res, ctx) =>
        res(ctx.json(cfResponse({ covered: true, subscriptions: [{ id: 'sub1', billing_cycle_anchor_timestamp: 't', start_timestamp: 't' }] })))
      )
    );
    const res = await api.getBillableUsageInfo(accountId);
    expect(res.result?.covered).toBe(true);
    expect(res.result?.subscriptions).toHaveLength(1);
  });
});
