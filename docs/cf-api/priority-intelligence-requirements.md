# Priority Intelligence Requirements

24 endpoints.

## GET /accounts/{account_id}/cloudforce-one/v2/priority-intelligence

List priority intelligence requirements for an account

operationId: `get_PirList` · query: `page`, `per_page`

## POST /accounts/{account_id}/cloudforce-one/v2/priority-intelligence

Create a priority intelligence requirement

operationId: `post_PirCreate`

**Request** (application/json)

- `dataset_scope`: any — `default`: every event dataset the account can read: Cloudforce One intelligence, datasets shared with the account, and the account's own da
- `digest_interval_hours`: integer enum: `6`, `12`, `24` default: `24` — Hours between digests: 6, 12, or 24. Used only when `notification_mode` is `digest`.
- `intent`: object
  - `clauses`: object[] **required**
    [array of]
    - `actors`: string[] **required**
    - `attacker_countries`: string[] **required**
    - `categories`: string[] **required**
    - `cves`: string[] **required**
    - `keywords`: string[] **required**
    - `target_countries`: string[] **required**
    - `target_industries`: string[] **required**
    - `techniques`: string[] **required**
  - `exclusions`: object default: `[object Object]`
    - `actors`: string[] **required**
    - `attacker_countries`: string[] **required**
    - `categories`: string[] **required**
    - `cves`: string[] **required**
    - `keywords`: string[] **required**
    - `target_countries`: string[] **required**
    - `target_industries`: string[] **required**
    - `techniques`: string[] **required**
  - `indicators`: string[] **required**
    [array]
  - `unsupported_terms`: string[] **required**
    [array]
- `labels`: string[] default: ``
  [array]
- `model`: string
- `notification_mode`: string enum: `none`, `immediate`, `digest` default: `none` — `none` or `digest`. Notifications are opt-in. `immediate` is reserved and currently rejected.
- `priority`: integer default: `0`
- `query`: object
  - `branches`: array[] **required** — Event List `searchBranches`: filters within a branch are ANDed, branches are ORed.
    [array of]
    [array of]
    - `field`: string **required** enum: `attacker`, `attackerCountry`, `category`, `createdAt`, `date`, `event`, `indicator`, `indicatorType`
    - `op`: string **required** enum: `equals`, `not`, `gt`, `gte`, `lt`, `lte`, `like`, `contains`
    - `value`: string **required**
  - `version`: integer — Ignored. Accepted so a PIR read from the API can be sent back unchanged.
- `query_source`: string enum: `generated`, `edited`
- `requirement`: string **required**
- `status`: string enum: `draft`, `active` default: `draft` — `draft`: not monitored. `active`: monitored, unless `pause_reason` is set. Setting `active` on a PIR with a `pause_reason` resumes it. Movin
- `title`: string
- `tlp`: string default: `amber`

## DELETE /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/{priority_id}

Delete a priority intelligence requirement

operationId: `delete_PirDelete`

## GET /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/{priority_id}

Get a priority intelligence requirement by ID

operationId: `get_PirGet`

## PUT /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/{priority_id}

Update a priority intelligence requirement

operationId: `put_PirUpdate`

**Request** (application/json)

- `confirm_query`: boolean — Write-only. `true` confirms the query still fits the requirement, clearing `query_stale` without changing the query or its version. Requires
- `dataset_scope`: any — `default`: every event dataset the account can read: Cloudforce One intelligence, datasets shared with the account, and the account's own da
- `digest_interval_hours`: integer enum: `6`, `12`, `24` — Hours between digests: 6, 12, or 24. Used only when `notification_mode` is `digest`.
- `intent`: object
  - `clauses`: object[] **required**
    [array of]
    - `actors`: string[] **required**
    - `attacker_countries`: string[] **required**
    - `categories`: string[] **required**
    - `cves`: string[] **required**
    - `keywords`: string[] **required**
    - `target_countries`: string[] **required**
    - `target_industries`: string[] **required**
    - `techniques`: string[] **required**
  - `exclusions`: object default: `[object Object]`
    - `actors`: string[] **required**
    - `attacker_countries`: string[] **required**
    - `categories`: string[] **required**
    - `cves`: string[] **required**
    - `keywords`: string[] **required**
    - `target_countries`: string[] **required**
    - `target_industries`: string[] **required**
    - `techniques`: string[] **required**
  - `indicators`: string[] **required**
    [array]
  - `unsupported_terms`: string[] **required**
    [array]
- `labels`: string[]
  [array]
- `model`: string
- `notification_mode`: string enum: `none`, `immediate`, `digest` — `none` or `digest`. Notifications are opt-in. `immediate` is reserved and currently rejected.
- `priority`: integer
- `query`: object
  - `branches`: array[] **required** — Event List `searchBranches`: filters within a branch are ANDed, branches are ORed.
    [array of]
    [array of]
    - `field`: string **required** enum: `attacker`, `attackerCountry`, `category`, `createdAt`, `date`, `event`, `indicator`, `indicatorType`
    - `op`: string **required** enum: `equals`, `not`, `gt`, `gte`, `lt`, `lte`, `like`, `contains`
    - `value`: string **required**
  - `version`: integer — Ignored. Accepted so a PIR read from the API can be sent back unchanged.
- `query_source`: string enum: `generated`, `edited`
- `requirement`: string
- `status`: string enum: `draft`, `active` — `draft`: not monitored. `active`: monitored, unless `pause_reason` is set. Setting `active` on a PIR with a `pause_reason` resumes it. Movin
- `title`: string
- `tlp`: string

## GET /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/{priority_id}/matches

List a priority intelligence requirement's matched events

operationId: `get_PirMatchesList` · query: `cursor`, `per_page`, `triage_state`

## PATCH /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/{priority_id}/matches

Triage a priority intelligence requirement's matched events

operationId: `patch_PirMatchesTriage`

**Request** (application/json)

- `matches`: object[] **required** — Up to 100 matches to set the triage state on.
  [array of]
  - `dataset_id`: string **required** — The match's `datasetId`.
  - `event_id`: string **required** — The match's event `uuid`.
- `triage_state`: string **required** enum: `new`, `relevant`, `not_relevant`

## GET /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/{priority_id}/matches/aggregate

Count a priority intelligence requirement's matched events

operationId: `get_PirMatchAggregates` · query: `aggregate_by`, `limit`, `since`, `triage_state`, `include_backfill`

**Response** 200 → `result`

- `fields`: object **required** — One entry per requested field. For `tags`, a match counts once for each of its tags, so tag counts can add up to more than `matches.counted`
  - `attacker`: object
    - `buckets`: object[] **required** — Top values, most matches first; ties in ascending value order.
    - `distinct_values`: integer **required** — Distinct values among counted matches.
    - `without_value`: integer **required** — Counted matches with no value for this field.
  - `attacker_country`: object
    - `buckets`: object[] **required** — Top values, most matches first; ties in ascending value order.
    - `distinct_values`: integer **required** — Distinct values among counted matches.
    - `without_value`: integer **required** — Counted matches with no value for this field.
  - `indicator`: object
    - `buckets`: object[] **required** — Top values, most matches first; ties in ascending value order.
    - `distinct_values`: integer **required** — Distinct values among counted matches.
    - `without_value`: integer **required** — Counted matches with no value for this field.
  - `indicator_type`: object
    - `buckets`: object[] **required** — Top values, most matches first; ties in ascending value order.
    - `distinct_values`: integer **required** — Distinct values among counted matches.
    - `without_value`: integer **required** — Counted matches with no value for this field.
  - `tags`: object
    - `buckets`: object[] **required** — Top values, most matches first; ties in ascending value order.
    - `distinct_values`: integer **required** — Distinct values among counted matches.
    - `without_value`: integer **required** — Counted matches with no value for this field.
  - `target_industry`: object
    - `buckets`: object[] **required** — Top values, most matches first; ties in ascending value order.
    - `distinct_values`: integer **required** — Distinct values among counted matches.
    - `without_value`: integer **required** — Counted matches with no value for this field.
- `matches`: object **required**
  - `counted`: integer **required** — Matches whose fields are counted below.
  - `missing`: integer **required** — Matches whose event was already gone when its fields were copied; never counted.
  - `pending`: integer **required** — Matches whose fields are still being copied; not counted yet.
  - `total`: integer **required** — Matches in readable datasets that pass the filters, like the feed's total_count.

## GET /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/{priority_id}/matches/series

Count a priority intelligence requirement's matched events per day

operationId: `get_PirMatchSeries` · query: `since`, `until`, `triage_state`, `include_backfill`

**Response** 200 → `result`

- `days`: object[] **required** — Every UTC day overlapping the range, oldest first, including days with no matches.
  [array of]
  - `count`: integer **required** — Matches whose event was added to its dataset that day.
  - `date`: string **required** — UTC day, YYYY-MM-DD.
- `interval`: string **required** enum: `day`
- `since`: string **required** — Start of the range, inclusive.
- `total`: integer **required** — Matches in the range; the sum of `days[].count`.
- `until`: string **required** — End of the range, exclusive.
- `without_created_at`: integer **required** — Matches that pass the other filters but have no record of when their event was added, so they are on no day. Not limited to the range.

## GET /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/constants

Get PIR constants (methods, dimensions, and TLP values)

operationId: `get_PirConstants`

## POST /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/filters/generate

Generate event filters from a PIR

operationId: `post_PirFilterGenerate`

**Request** (application/json)

- `requirement`: string **required** — Natural-language Priority Intelligence Requirement.

**Response** 200 → `result`

- `branches`: array[] **required** — Event List `searchBranches`: filters within a branch are ANDed, branches are ORed. Empty when coverage is `none`.
  [array of]
  [array of]
  - `field`: string **required** enum: `attacker`, `attackerCountry`, `category`, `createdAt`, `date`, `event`, `indicator`, `indicatorType`
  - `op`: string **required** enum: `equals`, `not`, `gt`, `gte`, `lt`, `lte`, `like`, `contains`
  - `value`: string **required**
- `coverage`: string **required** enum: `full`, `partial`, `none` — `full`: every term resolved. `partial`: some terms are unresolved. `none`: no filter could be generated.
- `intent`: object **required** — Structured intent extracted from the requirement, before catalog resolution.
  - `clauses`: object[] **required**
    [array of]
    - `actors`: string[] **required**
    - `attacker_countries`: string[] **required**
    - `categories`: string[] **required**
    - `cves`: string[] **required**
    - `keywords`: string[] **required**
    - `target_countries`: string[] **required**
    - `target_industries`: string[] **required**
    - `techniques`: string[] **required**
  - `exclusions`: object default: `[object Object]`
    - `actors`: string[] **required**
    - `attacker_countries`: string[] **required**
    - `categories`: string[] **required**
    - `cves`: string[] **required**
    - `keywords`: string[] **required**
    - `target_countries`: string[] **required**
    - `target_industries`: string[] **required**
    - `techniques`: string[] **required**
  - `indicators`: string[] **required**
    [array]
  - `unsupported_terms`: string[] **required**
    [array]
- `model`: string **required** — Workers AI model used for intent extraction.
- `unresolved_terms`: object[] **required** — Requirement terms that could not be expressed as event filters.
  [array of]
  - `reason`: string **required** enum: `unknown_country`, `unknown_industry`, `unknown_category`, `no_matching_category`, `invalid_keyword`, `branch_limit`, `filter_limit`, `indicators_not_supported`
  - `term`: string **required**

## GET /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/interests

List account interests for PIR Option 2

operationId: `get_PirInterestList` · query: `page`, `per_page`, `enabled`

## POST /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/interests

Create an account interest for PIR Option 2

operationId: `post_PirInterestCreate`

**Request** (application/json)

- `dimension`: string **required** enum: `actor`, `targetIndustry`, `category`, `country`, `attackerCountry`, `targetCountry`, `mitreAttack`, `killChain`
- `enabled`: boolean default: `true`
- `value`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/interests/{interest_id}

Delete an account interest for PIR Option 2

operationId: `delete_PirInterestDelete`

## PATCH /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/interests/{interest_id}

Update an account interest for PIR Option 2

operationId: `patch_PirInterestUpdate`

**Request** (application/json)

- `enabled`: boolean
- `value`: string

## POST /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/interests/backtests

Backtest account-interest change detection

operationId: `post_PirInterestBacktestCreate`

**Request** (application/json)

- `as_of`: string
- `backtest_days`: integer default: `30`
- `candidate_limit`: integer
- `dataset_ids`: string[]
  [array]
- `emerging_min_current_count`: integer
- `established_min_absolute_delta`: integer
- `established_min_prior_count`: integer
- `established_min_relative_delta`: number
- `window_days`: integer default: `7`

## GET /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/interests/backtests/{backtest_id}

Get a persisted account-interest backtest

operationId: `get_PirInterestBacktestGet`

## POST /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/interests/evaluations

Evaluate recent event-dated changes for account interests

operationId: `post_PirInterestEvaluationCreate`

**Request** (application/json)

- `as_of`: string
- `candidate_limit`: integer
- `dataset_ids`: string[]
  [array]
- `emerging_min_current_count`: integer
- `established_min_absolute_delta`: integer
- `established_min_prior_count`: integer
- `established_min_relative_delta`: number
- `window_days`: integer default: `7`

## GET /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/interests/evaluations/{evaluation_id}

Get a persisted account-interest evaluation

operationId: `get_PirInterestEvaluationGet`

## GET /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/matches/aggregate

Count matched events across the account's priority intelligence requirements

operationId: `get_PirAllMatchAggregates` · query: `aggregate_by`, `limit`, `since`, `triage_state`, `include_backfill`

**Response** 200 → `result`

- `combined`: object **required**
  - `fields`: object **required**
    - `attacker`: object
    - `attacker_country`: object
    - `indicator`: object
    - `indicator_type`: object
    - `tags`: object
    - `target_industry`: object
  - `partial`: boolean **required** — True when a priority could not be counted, so the distinct values leave out its matches.
- `priorities`: object[] **required** — Each active priority's own counts, newest priority first. Counts are never summed.
  [array of]
  - `error`: string enum: `unavailable` — Set when this priority's matches could not be counted; it is left out of combined.
  - `fields`: object
    - `attacker`: object
    - `attacker_country`: object
    - `indicator`: object
    - `indicator_type`: object
    - `tags`: object
    - `target_industry`: object
  - `id`: string **required**
  - `matches`: object
    - `counted`: integer **required** — Matches whose fields are counted below.
    - `missing`: integer **required** — Matches whose event was already gone when its fields were copied; never counted.
    - `pending`: integer **required** — Matches whose fields are still being copied; not counted yet.
    - `total`: integer **required** — Matches in readable datasets that pass the filters, like the feed's total_count.
  - `pause_reason`: string **required**
  - `title`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/profile

Delete the organization profile

operationId: `delete_PirProfileDelete`

## GET /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/profile

Get the organization profile

operationId: `get_PirProfileGet`

## PUT /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/profile

Create or replace the organization profile

operationId: `put_PirProfilePut`

**Request** (application/json)

- `profile`: string **required** — Who the organization is: its name, brands, domains, sector, regions, key systems and suppliers. Shared by all of the account's PIRs to judge

## POST /accounts/{account_id}/cloudforce-one/v2/priority-intelligence/quota

Get PIR quota for an account

operationId: `post_PirQuota`
