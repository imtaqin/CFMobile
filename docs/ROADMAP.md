# Feature roadmap — Cloudflare API coverage

Working tracker. Update the status column as work lands so a fresh session can
pick up mid-batch without re-deriving anything.

Coverage numbers come from `docs/cf-api/` (generated from Cloudflare's OpenAPI
schema — `npm run cf:schema && npm run cf:docs`). The audit that produced this
list compared those paths against the template strings in
`services/cloudflare.ts`.

Status: `todo` · `wip` · `done`

## Batches

| # | Batch | Status | Scope |
|---|-------|--------|-------|
| 1 | Email Routing | done | disable routing, DNS-record check, edit rule, drop/worker actions, multi-destination forward, catch-all editor, delete destination |
| 2 | WAF / Rulesets write | wip | create/edit/delete custom rules (`http_request_firewall_custom`), IP Access rule create/delete. Today both are read-only |
| 3 | Worker scripts | todo | view script content, secrets, cron triggers, deployments/versions, routes CRUD. Tail already works |
| 4 | Health Checks | todo | full CRUD — pairs with the existing premium Monitoring feature |
| 5 | Lists + rule phases | todo | IP/hostname Lists, plus transform, redirect and cache rulesets |
| 6 | Tunnel + Registrar | todo | Cloudflare Tunnel list/config, domain registration and renewal status |

## Batch 1 — Email Routing (done)

- [x] `disableEmailRouting`, `getEmailRoutingDns` in `services/cloudflare.ts`
- [x] Typed `EmailMatcher` / `EmailAction` / `EmailActionType`
- [x] Rewrote `app/zone/[id]/email.tsx`: rule editor (create + edit), action
      picker (forward / worker / drop), multi-destination forward, catch-all
      editor, delete destination address, DNS-record card, disable routing
- [x] Icons: `chevron-up`, `copy`, `power`
- [x] Translations for the new `email.*` keys across 12 locales
- [x] Typecheck + commit

## Known gaps not yet scheduled

Products with zero coverage that could matter later, from the same audit:
Waiting Room, Queues, Load Balancers, Web Analytics, Logpush, Page Shield,
Turnstile, Zero Trust Access, AI Gateway, Vectorize, Hyperdrive, Durable
Objects, Snippets, Stream, Images, Secrets Store, Custom Hostnames.

Partially covered products worth deepening: Zone Settings (4/14 — brotli,
HTTP/3, 0-RTT, WebSockets, HSTS, IPv6), R2 Bucket (5/29 — CORS, lifecycle,
custom domains, public access), DNS Records (8/14 — batch ops, DNS settings),
Pages (5/8 — deployments, rollback, custom domains), Audit Logs (1/7).

## Outstanding non-feature items

- Play Integrity API to stop AI-quota bypass (install id is client-generated
  and unsigned today; reinstalling resets the counter)
- Rotate the OpenRouter key and the Cloudflare Global API Key
- Activate `cfmobile_ai_monthly` subscription + `monthly` base plan in Play
- Complete the Play Data safety form
