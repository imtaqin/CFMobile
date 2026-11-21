import { rest } from '../../test-utils/msw';
import { server } from '../../test-utils/server';
import { API_BASE, initTestClient } from '../../test-utils/cf-client';
import { cfResponse } from '../../test-utils/cf-response';
import * as api from '@/services/cloudflare';

const accountId = 'acct123';

beforeAll(async () => {
  await initTestClient();
});

describe('Account Logpush', () => {
  it('getAccountLogpushJobs lists jobs for the account', async () => {
    const jobs = [
      {
        id: 1,
        name: 'audit logs to s3',
        dataset: 'audit_logs',
        destination_conf: 's3://my-bucket/logs',
        enabled: true,
      },
    ];
    server.use(
      rest.get(`${API_BASE}/accounts/${accountId}/logpush/jobs`, (_req, res, ctx) =>
        res(ctx.json(cfResponse(jobs)))
      )
    );

    const res = await api.getAccountLogpushJobs(accountId);
    expect(res.result).toEqual(jobs);
  });

  it('getAccountLogpushJob fetches a single job by id', async () => {
    const job = {
      id: 7,
      name: 'firewall events',
      dataset: 'firewall_events',
      destination_conf: 'gs://bucket/fw',
      enabled: false,
      error_message: 'no write permission',
    };
    server.use(
      rest.get(`${API_BASE}/accounts/${accountId}/logpush/jobs/7`, (_req, res, ctx) =>
        res(ctx.json(cfResponse(job)))
      )
    );

    const res = await api.getAccountLogpushJob(accountId, 7);
    expect(res.result).toEqual(job);
  });

  it('updateAccountLogpushJob PUTs the enabled flag', async () => {
    server.use(
      rest.put(`${API_BASE}/accounts/${accountId}/logpush/jobs/7`, async (req, res, ctx) => {
        const body = await req.json();
        expect(body).toEqual({ enabled: false });
        return res(ctx.json(cfResponse({ id: 7, destination_conf: 'gs://bucket/fw', enabled: false })));
      })
    );

    const res = await api.updateAccountLogpushJob(accountId, 7, { enabled: false });
    expect(res.result.enabled).toBe(false);
  });

  it('deleteAccountLogpushJob DELETEs the job', async () => {
    server.use(
      rest.delete(`${API_BASE}/accounts/${accountId}/logpush/jobs/7`, (_req, res, ctx) =>
        res(ctx.json(cfResponse({ id: 7 })))
      )
    );

    const res = await api.deleteAccountLogpushJob(accountId, 7);
    expect(res.result).toEqual({ id: 7 });
  });
});
