# Security Center Insights

23 endpoints.

## GET /accounts/{account_id}/intel/attack-surface-report/issue-types

Retrieves Security Center Issues Types

operationId: `get-security-center-issue-types`

**Response** 200 → `result`

[array of]
string

## GET /accounts/{account_id}/intel/attack-surface-report/issues

Retrieves Security Center Issues

operationId: `get-security-center-issues` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`, `page`, `per_page`

**Response** 200 → `result`

- `count`: integer — Indicates the total number of results.
- `issues`: object[]
  [array of]
  - `dismissed`: boolean
  - `has_extended_context`: boolean — Indicates whether the insight has a large payload that requires fetching via the context endpoint.
  - `id`: string
  - `issue_class`: string
  - `issue_type`: string enum: `compliance_violation`, `email_security`, `exposed_infrastructure`, `insecure_configuration`, `weak_authentication`, `configuration_suggestion`
  - `payload`: object
    - `detection_method`: string — Describes the method used to detect insight.
    - `zone_tag`: string
  - `resolve_link`: string
  - `resolve_text`: string
  - `severity`: string enum: `Low`, `Moderate`, `Critical`
  - `since`: string
  - `source`: string enum: `cloudflare`, `riskrecon` — Who generated the insight. `cloudflare` for Cloudflare-generated insights, otherwise the partner.
  - `status`: string enum: `active`, `resolved` — The current status of the insight.
  - `subject`: string
  - `timestamp`: string
  - `user_classification`: string enum: `false_positive`, `accept_risk`, `other`, `null` — User-defined classification for the insight. Can be 'false_positive', 'accept_risk', 'other', or null.
- `page`: integer — Specifies the current page within paginated list of results.
- `per_page`: integer — Sets the number of results per page of results.

## PUT /accounts/{account_id}/intel/attack-surface-report/issues/{issue_id}/dismiss

Archives Security Center Insight

operationId: `archive-security-center-insight-deprecated`

**Request** (application/json)

- `dismiss`: boolean default: `true`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## GET /accounts/{account_id}/intel/attack-surface-report/issues/class

Retrieves Security Center Issue Counts by Class

operationId: `get-security-center-issue-counts-by-class` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

**Response** 200 → `result`

[array of]
- `count`: integer
- `value`: string

## GET /accounts/{account_id}/intel/attack-surface-report/issues/severity

Retrieves Security Center Issue Counts by Severity

operationId: `get-security-center-issue-counts-by-severity` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

**Response** 200 → `result`

[array of]
- `count`: integer
- `value`: string

## GET /accounts/{account_id}/intel/attack-surface-report/issues/type

Retrieves Security Center Issue Counts by Type

operationId: `get-security-center-issue-counts-by-type` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

**Response** 200 → `result`

[array of]
- `count`: integer
- `value`: string

## GET /accounts/{account_id}/security-center/insights

Retrieves Security Center Insights

operationId: `get-security-center-insights` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`, `page`, `per_page`

**Response** 200 → `result`

- `count`: integer — Indicates the total number of results.
- `issues`: object[]
  [array of]
  - `dismissed`: boolean
  - `has_extended_context`: boolean — Indicates whether the insight has a large payload that requires fetching via the context endpoint.
  - `id`: string
  - `issue_class`: string
  - `issue_type`: string enum: `compliance_violation`, `email_security`, `exposed_infrastructure`, `insecure_configuration`, `weak_authentication`, `configuration_suggestion`
  - `payload`: object
    - `detection_method`: string — Describes the method used to detect insight.
    - `zone_tag`: string
  - `resolve_link`: string
  - `resolve_text`: string
  - `severity`: string enum: `Low`, `Moderate`, `Critical`
  - `since`: string
  - `source`: string enum: `cloudflare`, `riskrecon` — Who generated the insight. `cloudflare` for Cloudflare-generated insights, otherwise the partner.
  - `status`: string enum: `active`, `resolved` — The current status of the insight.
  - `subject`: string
  - `timestamp`: string
  - `user_classification`: string enum: `false_positive`, `accept_risk`, `other`, `null` — User-defined classification for the insight. Can be 'false_positive', 'accept_risk', 'other', or null.
- `page`: integer — Specifies the current page within paginated list of results.
- `per_page`: integer — Sets the number of results per page of results.

## PATCH /accounts/{account_id}/security-center/insights/{issue_id}/classification

Updates Security Center Insight Classification

operationId: `update-security-center-insight-classification`

**Request** (application/json)

- `classification`: string enum: `false_positive`, `accept_risk`, `other`, `null` — User-defined classification for the insight. Can be 'false_positive', 'accept_risk', 'other', or null.
- `rationale`: string — Rationale for the classification change. Required when classification is 'accept_risk' or 'other'.

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## GET /accounts/{account_id}/security-center/insights/{issue_id}/context

Retrieves Security Center Insight Context

operationId: `get-security-center-insight-context`

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/security-center/insights/{issue_id}/dismiss

Archives Security Center Insight

operationId: `archive-security-center-insight`

**Request** (application/json)

- `dismiss`: boolean default: `true`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## GET /accounts/{account_id}/security-center/insights/class

Retrieves Security Center Insight Counts by Class

operationId: `get-security-center-insight-counts-by-class` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

**Response** 200 → `result`

[array of]
- `count`: integer
- `value`: string

## GET /accounts/{account_id}/security-center/insights/partner-count

Retrieves a Partner Security Center Insight Count

operationId: `get-security-center-partner-insight-count` · query: `source`

**Response** 200 → `result`

- `count`: integer **required**

## GET /accounts/{account_id}/security-center/insights/severity

Retrieves Security Center Insight Counts by Severity

operationId: `get-security-center-insight-counts-by-severity` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

**Response** 200 → `result`

[array of]
- `count`: integer
- `value`: string

## GET /accounts/{account_id}/security-center/insights/type

Retrieves Security Center Insight Counts by Type

operationId: `get-security-center-insight-counts-by-type` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

**Response** 200 → `result`

[array of]
- `count`: integer
- `value`: string

## GET /accounts/{account_id}/security-center/state

Retrieves Account State

operationId: `get-security-center-account-state`

**Response** 200 → `result`

- `recent_dormant_reactivation`: boolean **required** — Whether the account was recently reactivated from a dormant state (used to show the reactivation banner).
- `scans_enabled`: boolean **required** — Whether on-demand and scheduled scans are enabled for the account.

## PUT /accounts/{account_id}/security-center/state

Updates Account State

operationId: `update-security-center-account-state`

**Request** (application/json)

- `scans_enabled`: boolean **required** — Enable or disable scans for the account.

**Response** 200 → `result`

- `recent_dormant_reactivation`: boolean **required** — Whether the account was recently reactivated from a dormant state (used to show the reactivation banner).
- `scans_enabled`: boolean **required** — Whether on-demand and scheduled scans are enabled for the account.

## GET /zones/{zone_id}/security-center/insights

Retrieves Zone Security Center Insights

operationId: `get-zone-security-center-insights` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`, `page`, `per_page`

**Response** 200 → `result`

- `count`: integer — Indicates the total number of results.
- `issues`: object[]
  [array of]
  - `dismissed`: boolean
  - `has_extended_context`: boolean — Indicates whether the insight has a large payload that requires fetching via the context endpoint.
  - `id`: string
  - `issue_class`: string
  - `issue_type`: string enum: `compliance_violation`, `email_security`, `exposed_infrastructure`, `insecure_configuration`, `weak_authentication`, `configuration_suggestion`
  - `payload`: object
    - `detection_method`: string — Describes the method used to detect insight.
    - `zone_tag`: string
  - `resolve_link`: string
  - `resolve_text`: string
  - `severity`: string enum: `Low`, `Moderate`, `Critical`
  - `since`: string
  - `source`: string enum: `cloudflare`, `riskrecon` — Who generated the insight. `cloudflare` for Cloudflare-generated insights, otherwise the partner.
  - `status`: string enum: `active`, `resolved` — The current status of the insight.
  - `subject`: string
  - `timestamp`: string
  - `user_classification`: string enum: `false_positive`, `accept_risk`, `other`, `null` — User-defined classification for the insight. Can be 'false_positive', 'accept_risk', 'other', or null.
- `page`: integer — Specifies the current page within paginated list of results.
- `per_page`: integer — Sets the number of results per page of results.

## PATCH /zones/{zone_id}/security-center/insights/{issue_id}/classification

Updates Zone Security Center Insight Classification

operationId: `update-zone-security-center-insight-classification`

**Request** (application/json)

- `classification`: string enum: `false_positive`, `accept_risk`, `other`, `null` — User-defined classification for the insight. Can be 'false_positive', 'accept_risk', 'other', or null.
- `rationale`: string — Rationale for the classification change. Required when classification is 'accept_risk' or 'other'.

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## PUT /zones/{zone_id}/security-center/insights/{issue_id}/dismiss

Archives Zone Security Center Insight

operationId: `archive-zone-security-center-insight`

**Request** (application/json)

- `dismiss`: boolean default: `true`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## GET /zones/{zone_id}/security-center/insights/class

Retrieves Zone Security Center Insight Counts by Class

operationId: `get-zone-security-center-insight-counts-by-class` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

**Response** 200 → `result`

[array of]
- `count`: integer
- `value`: string

## GET /zones/{zone_id}/security-center/insights/partner-count

Retrieves a Partner Zone Security Center Insight Count

operationId: `get-zone-security-center-partner-insight-count` · query: `source`

**Response** 200 → `result`

- `count`: integer **required**

## GET /zones/{zone_id}/security-center/insights/severity

Retrieves Zone Security Center Insight Counts by Severity

operationId: `get-zone-security-center-insight-counts-by-severity` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

**Response** 200 → `result`

[array of]
- `count`: integer
- `value`: string

## GET /zones/{zone_id}/security-center/insights/type

Retrieves Zone Security Center Insight Counts by Type

operationId: `get-zone-security-center-insight-counts-by-type` · query: `dismissed`, `issue_class`, `issue_type`, `product`, `source`, `severity`, `subject`, `issue_class~neq`, `issue_type~neq`, `product~neq`, `severity~neq`, `subject~neq`

**Response** 200 → `result`

[array of]
- `count`: integer
- `value`: string
