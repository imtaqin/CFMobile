# Feature roadmap — Cloudflare API coverage

Working tracker. Update the status of a batch as work lands so a fresh session
can pick up mid-stream without re-deriving anything.

Endpoint counts come from `docs/cf-api/` (generated from Cloudflare's OpenAPI
schema — `npm run cf:schema && npm run cf:docs`). Coverage was measured by
comparing those paths against the request templates in
`services/cloudflare.ts`.

Status: `todo` · `wip` · `done`

Goal: cover every Cloudflare product a zone/account owner would want to manage
from a phone. Radar, Magic Transit/WAN, DEX, brand-protection and the internal
`*_other` groups are explicitly out of scope — they are either read-only
research data or enterprise network products with no mobile use case.

---

## Tier 1 — make what we already show writable

These screens exist but are read-only or shallow. Highest value per unit of
work because the navigation is already there.

| # | Batch | Status | Scope |
|---|-------|--------|-------|
| 1 | Email Routing | done | disable routing, DNS-record check, rule editor, drop/worker actions, multi-destination forward, catch-all editor, delete destination |
| 2 | WAF / Zone Rulesets write | done | create/edit/delete custom rules in `http_request_firewall_custom`, IP Access rule create/delete, legacy firewall rule toggle/delete |
| 3 | Worker scripts | wip | view script content, secrets, cron triggers, deployments/versions, settings & bindings, routes CRUD. Tail already works |
| 4 | Zone Settings depth | todo | 4/14 today. Add Brotli, HTTP/2 + HTTP/3, 0-RTT, WebSockets, IPv6, HSTS, Early Hints, Rocket Loader, min cache TTL, Browser Integrity Check |
| 5 | DNS depth | todo | 8/14. Batch record ops, DNS settings, secondary DNS, record scan |
| 6 | R2 depth | todo | 5/29. CORS, lifecycle rules, custom domains, public access toggle, bucket locks |
| 7 | Pages depth | todo | 5/8 plus Pages Deployment (9). Deployment list, logs, retry, rollback, custom domains |
| 8 | Audit Logs depth | todo | 1/7. Filtering by actor, action and resource; account vs user scope |
| 9 | Zone lifecycle | todo | 4/8. Pause/activate zone, change plan, hold, re-check nameservers |

## Tier 2 — products with zero coverage that fit the app

| # | Batch | Status | Endpoints | Scope |
|---|-------|--------|-----------|-------|
| 10 | Health Checks | todo | 15 | Full CRUD. Pairs with the existing premium Monitoring feature |
| 11 | Lists | todo | 11 | IP / hostname / ASN lists, used by WAF rules |
| 12 | Rules (transform, redirect, cache) | todo | 15 + 16 | Transform rules, bulk redirects, cache rules via Account and Zone Rulesets |
| 13 | Zone Cache Settings | todo | 9 | Tiered cache, cache reserve, variants, regional tiered cache |
| 14 | Cloudflare Tunnel | todo | 20 + 9 | Tunnel list, status, connections, routing, config |
| 15 | Registrar | todo | 12 | Domain list, registration status, auto-renew, transfer lock |
| 16 | Load Balancers | todo | 10 + 10 + 9 + 9 | Pools, monitors, origin health at zone and account level |
| 17 | Waiting Room | todo | 24 | Rooms, rules, events, live status |
| 18 | Web Analytics | todo | 15 | RUM site tags, page-view and Core Web Vitals summaries |
| 19 | Observatory | todo | 10 | Lighthouse-style speed tests and trends per page |
| 20 | Notification policies + webhooks | todo | 8 + 8 | Native Cloudflare alerting, complements our own monitoring |
| 21 | Custom Hostnames (SaaS) | todo | 8 | Hostname list, certificate status, validation |
| 22 | Page Shield | todo | 13 | Scripts, connections, policies |
| 23 | Zone Snippets | todo | 8 | List, view, deploy snippets and rules |
| 24 | Zaraz | todo | 10 | Config, tools, history, publish |
| 25 | Turnstile | todo | ~7 | Widget CRUD and rotation |
| 26 | Origin CA / Custom Certificates | todo | ~20 | Origin CA certs, custom certs, client certs, mTLS |
| 27 | API Tokens | todo | 8 + 8 | User and account tokens: list, roll, revoke, verify |
| 28 | Account members & roles | todo | 5 | 2/5 today. Invite, change role, remove |
| 29 | Logpush | todo | 12 + 12 | Job list, status, last error, enable/disable |
| 30 | Log Explorer | todo | 10 | Dataset queries |

## Tier 3 — developer-platform products

| # | Batch | Status | Endpoints | Scope |
|---|-------|--------|-----------|-------|
| 31 | Queues | todo | 25 | Queue list, consumers, messages, backlog |
| 32 | Durable Objects | todo | ~7 | Namespaces and object listing |
| 33 | Hyperdrive | todo | ~6 | Config list and connection details |
| 34 | Vectorize | todo | 14 | Index list, stats, metadata |
| 35 | Workers AI | todo | 8 | Model list, run, usage |
| 36 | AI Gateway | todo | 13 + 10 | Gateways, logs, dynamic routes |
| 37 | AI Search (AutoRAG) | todo | 17 + 10 + 9 | Instances, jobs, items |
| 38 | Workflows | todo | 24 | Workflow list, instances, status |
| 39 | Secrets Store | todo | 12 | Stores and secret metadata |
| 40 | Workers for Platforms | todo | 26 | Dispatch namespaces and scripts |
| 41 | Pipelines | todo | 19 | Pipeline list and status |

## Tier 4 — media and edge extras

| # | Batch | Status | Endpoints | Scope |
|---|-------|--------|-----------|-------|
| 42 | Stream | todo | 10 + 12 + 12 | Videos, live inputs, live streams |
| 43 | Images | todo | 10 + 15 | Image list, upload, variants, sourcing kit |
| 44 | Web3 Hostnames | todo | 12 | IPFS/Ethereum gateway hostnames |
| 45 | Spectrum | todo | ~7 | Application list and analytics |
| 46 | DNS Firewall | todo | 7 | Cluster list and analytics |
| 47 | Address Maps / BYOIP | todo | 11 + 8 | Prefixes and address maps |
| 48 | Resource Tagging | todo | 10 | Tags across resources |

## Tier 5 — Zero Trust (large; likely its own section in the app)

| # | Batch | Status | Endpoints | Scope |
|---|-------|--------|-----------|-------|
| 49 | Access applications | todo | 9 + 9 | Account and zone level apps |
| 50 | Access identity providers | todo | 8 | IdP list and config |
| 51 | Access service tokens / mTLS | todo | 7 + 8 | Token and certificate management |
| 52 | Gateway rules & lists | todo | 9 + 8 | Policy list and toggles |
| 53 | Zero Trust accounts / users / devices | todo | 13 + 10 + 26 | Org config, user list, enrolled devices |
| 54 | Infrastructure Access targets | todo | 8 | Target list |

## Explicitly out of scope

Radar (HTTP, DNS, BGP, AS112, attack layers, email) — public research data, not
account management. Magic Transit / WAN / IPsec / PCAP / Network Monitoring,
DEX, Brand Protection, Security Center RFI, DLP, Email Security, Cloud
Integrations, Resource Sharing, Organizations/Tenants, and the internal
`dos-flowtrackd-api_other` / `brapi` / `tseng-*` groups.

---

## Batch 1 — Email Routing (done)

- [x] `disableEmailRouting`, `getEmailRoutingDns` in `services/cloudflare.ts`
- [x] Typed `EmailMatcher` / `EmailAction` / `EmailActionType`
- [x] Rewrote `app/zone/[id]/email.tsx`: rule editor (create + edit), action
      picker (forward / worker / drop), multi-destination forward, catch-all
      editor, delete destination address, DNS-record card, disable routing
- [x] Icons: `chevron-up`, `copy`, `power`
- [x] Translations for the new `email.*` keys across 12 locales
- [x] Typecheck + commit

## Batch 2 — WAF / Zone Rulesets write (done)

- [x] API: `createRulesetRule`, `updateRulesetRule`, `deleteRulesetRule`,
      `getZoneRuleset`, `createWAFEntrypoint`, plus `createIPAccessRule`,
      `updateIPAccessRule`, `deleteIPAccessRule`
- [x] Typed `Ruleset`, `RulesetRule`, `RulesetAction`, `IPAccessRule`, `IPAccessMode`
- [x] Rewrote `app/zone/[id]/firewall.tsx` into three managed sections: WAF
      custom rules (create/edit/toggle/delete with expression templates), IP
      access rules (create/delete), legacy firewall rules (toggle/delete)
- [x] Translations for the new `firewall.*` keys across 12 locales
- [x] Typecheck + commit

---

## Outstanding non-feature items

- Play Integrity API to stop AI-quota bypass — the install id is currently
  client-generated and unsigned, and reinstalling resets the counter
- Rotate the OpenRouter key and the Cloudflare Global API Key
- Activate `cfmobile_ai_monthly` subscription + `monthly` base plan in Play
- Complete the Play Data safety form
