# Issues

15 endpoints.

## GET /accounts/{account_id}/workers/observability/issues

List detected issues

operationId: `issues.list` · query: `page`, `perPage`, `order`, `orderBy`, `search`, `service`, `type`, `status`

**Response** 200 → `result`

[array of]
- `activity`: object[] **required**
  [array of]
  - `automationId`: string
  - `automationName`: string
  - `automationRevision`: number
  - `created`: number **required**
  - `id`: string **required**
  - `inactivitySeconds`: number **required**
  - `initiatedBy`: string **required** enum: `automatic`, `manual`
  - `issueCount`: number **required**
  - `issueId`: string **required**
  - `lastError`: string **required**
  - `policyId`: string **required**
  - `scope`: string enum: `account`, `service`
  - `status`: string **required** enum: `pending`, `succeeded`, `failed`
  - `terminalAt`: number **required**
  - `threshold`: number **required**
  - `triggerType`: string enum: `occurrence_threshold`, `recurrence_after_inactivity`
  - `type`: string **required** enum: `notification`
- `count`: number **required**
- `created`: number **required**
- `fingerprint`: string
- `firstObserved`: number **required**
- `id`: string **required**
- `lastObserved`: number **required**
- `members`: object[]
  [array of]
  - `fingerprint`: string **required**
  - `issueId`: string **required**
  - `title`: string **required**
- `service`: string **required**
- `status`: string **required** enum: `active`, `resolved`, `ignored`
- `statusUpdated`: number **required**
- `title`: string **required**
- `type`: string
- `updated`: number **required**

## GET /accounts/{account_id}/workers/observability/issues/{issueId}

Get an issue

operationId: `issues.get`

**Response** 200 → `result`

- `issue`: object **required**
  - `activity`: object[] **required**
    [array of]
    - `automationId`: string
    - `automationName`: string
    - `automationRevision`: number
    - `created`: number **required**
    - `id`: string **required**
    - `inactivitySeconds`: number **required**
    - `initiatedBy`: string **required** enum: `automatic`, `manual`
    - `issueCount`: number **required**
    - `issueId`: string **required**
    - `lastError`: string **required**
    - `policyId`: string **required**
    - `scope`: string enum: `account`, `service`
    - `status`: string **required** enum: `pending`, `succeeded`, `failed`
    - `terminalAt`: number **required**
    - `threshold`: number **required**
    - `triggerType`: string enum: `occurrence_threshold`, `recurrence_after_inactivity`
    - `type`: string **required** enum: `notification`
  - `count`: number **required**
  - `created`: number **required**
  - `fingerprint`: string
  - `firstObserved`: number **required**
  - `id`: string **required**
  - `lastObserved`: number **required**
  - `members`: object[]
    [array of]
    - `fingerprint`: string **required**
    - `issueId`: string **required**
    - `title`: string **required**
  - `service`: string **required**
  - `status`: string **required** enum: `active`, `resolved`, `ignored`
  - `statusUpdated`: number **required**
  - `title`: string **required**
  - `type`: string
  - `updated`: number **required**

## PATCH /accounts/{account_id}/workers/observability/issues/{issueId}

Modify an issue

operationId: `issues.patch`

**Request** (application/json)

- `status`: string enum: `active`, `resolved`, `ignored`
- `title`: string

**Response** 200 → `result`

- `count`: number **required**
- `created`: number **required**
- `fingerprint`: string
- `firstObserved`: number **required**
- `id`: string **required**
- `lastObserved`: number **required**
- `members`: object[]
  [array of]
  - `fingerprint`: string **required**
  - `issueId`: string **required**
  - `title`: string **required**
- `service`: string **required**
- `status`: string **required** enum: `active`, `resolved`, `ignored`
- `statusUpdated`: number **required**
- `title`: string **required**
- `type`: string
- `updated`: number **required**

## POST /accounts/{account_id}/workers/observability/issues/{issueId}/notification-runs

Notify about an issue

operationId: `issues.notificationRuns.create`

**Request** (application/json)

- `policyId`: string

**Response** 200 → `result`

- `run`: object **required**
  - `automationId`: string
  - `automationName`: string
  - `automationRevision`: number
  - `created`: number **required**
  - `id`: string **required**
  - `inactivitySeconds`: number **required**
  - `initiatedBy`: string **required** enum: `automatic`, `manual`
  - `issueCount`: number **required**
  - `issueId`: string **required**
  - `lastError`: string **required**
  - `policyId`: string **required**
  - `scope`: string enum: `account`, `service`
  - `status`: string **required** enum: `pending`, `succeeded`, `failed`
  - `terminalAt`: number **required**
  - `threshold`: number **required**
  - `triggerType`: string enum: `occurrence_threshold`, `recurrence_after_inactivity`

## GET /accounts/{account_id}/workers/observability/issues/{issueId}/occurrences

List issue occurrences

operationId: `issues.occurrences.list` · query: `cursor`, `per_page`

**Response** 200 → `result`

[array of]
- `context`: object
  - `account`: string
  - `session`: string
  - `user`: string
- `error`: object **required**
  - `handled`: boolean **required**
  - `mechanism`: string **required** enum: `structured-log`, `error-log`, `stack-log`, `http-status`, `exception`, `outcome`
  - `message`: string **required**
  - `name`: string **required**
  - `signature`: string **required**
  - `stack`: string
- `id`: string **required** — Unique occurrence ID.
- `invocation`: object **required**
  - `batchSize`: number
  - `cron`: string
  - `id`: string **required** — Worker invocation request ID.
  - `jsrpcMethod`: string
  - `mailFrom`: string
  - `method`: string
  - `path`: string
  - `queue`: string
  - `rawSize`: number
  - `rayId`: string
  - `rcptTo`: string
  - `scheduledTime`: number
  - `spanId`: string
  - `statusCode`: integer
  - `traceId`: string **required**
  - `type`: string **required**
  - `url`: string — Redacted request URL without query parameters.
  - `websocketCloseCode`: number
  - `websocketEvent`: string
- `request`: object
  - `headers`: object **required**
- `timestamp`: number **required** — Occurrence timestamp as Unix epoch milliseconds.
- `trail`: object[] **required**
  [array of]
  - `level`: string **required**
  - `message`: string **required**
  - `timestamp`: number **required**
  - `type`: string **required** enum: `log`
- `worker`: object **required**
  - `dispatchNamespace`: string
  - `entrypoint`: string
  - `executionModel`: string **required**
  - `scriptName`: string **required**
  - `scriptTags`: string[] **required**
    [array]
  - `scriptVersion`: object
    - `id`: string **required**
    - `tag`: string

## GET /accounts/{account_id}/workers/observability/issues/automations

List issue automations

operationId: `issues.automations.list` · query: `service`

**Response** 200 → `result`

- `automations`: object[] **required**
  [array of]
  - `ansPolicyId`: string **required**
  - `created`: number **required**
  - `createdByUserId`: string **required**
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `inactivitySeconds`: number **required**
  - `name`: string **required**
  - `revision`: number **required**
  - `scope`: string **required** enum: `account`, `service`
  - `service`: string **required**
  - `serviceType`: string **required**
  - `threshold`: number **required**
  - `triggerType`: string **required** enum: `occurrence_threshold`, `recurrence_after_inactivity`
  - `updated`: number **required**
  - `updatedByUserId`: string **required**

## POST /accounts/{account_id}/workers/observability/issues/automations

Create an issue automation

operationId: `issues.automations.create`

**Request** (application/json)

- `afterInactivitySeconds`: integer
- `afterOccurrences`: integer
- `enabled`: boolean
- `name`: string
- `policyId`: string **required**
- `service`: string

**Response** 200 → `result`

- `automation`: object **required**
  - `ansPolicyId`: string **required**
  - `created`: number **required**
  - `createdByUserId`: string **required**
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `inactivitySeconds`: number **required**
  - `name`: string **required**
  - `revision`: number **required**
  - `scope`: string **required** enum: `account`, `service`
  - `service`: string **required**
  - `serviceType`: string **required**
  - `threshold`: number **required**
  - `triggerType`: string **required** enum: `occurrence_threshold`, `recurrence_after_inactivity`
  - `updated`: number **required**
  - `updatedByUserId`: string **required**

## DELETE /accounts/{account_id}/workers/observability/issues/automations/{automationId}

Delete an issue automation

operationId: `issues.automations.delete`

**Response** 200 → `result`

- `automation`: object **required**
  - `ansPolicyId`: string **required**
  - `created`: number **required**
  - `createdByUserId`: string **required**
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `inactivitySeconds`: number **required**
  - `name`: string **required**
  - `revision`: number **required**
  - `scope`: string **required** enum: `account`, `service`
  - `service`: string **required**
  - `serviceType`: string **required**
  - `threshold`: number **required**
  - `triggerType`: string **required** enum: `occurrence_threshold`, `recurrence_after_inactivity`
  - `updated`: number **required**
  - `updatedByUserId`: string **required**

## GET /accounts/{account_id}/workers/observability/issues/automations/{automationId}

Get an issue automation

operationId: `issues.automations.get`

**Response** 200 → `result`

- `automation`: object **required**
  - `ansPolicyId`: string **required**
  - `created`: number **required**
  - `createdByUserId`: string **required**
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `inactivitySeconds`: number **required**
  - `name`: string **required**
  - `revision`: number **required**
  - `scope`: string **required** enum: `account`, `service`
  - `service`: string **required**
  - `serviceType`: string **required**
  - `threshold`: number **required**
  - `triggerType`: string **required** enum: `occurrence_threshold`, `recurrence_after_inactivity`
  - `updated`: number **required**
  - `updatedByUserId`: string **required**

## PUT /accounts/{account_id}/workers/observability/issues/automations/{automationId}

Update an issue automation

operationId: `issues.automations.update`

**Request** (application/json)

- `afterInactivitySeconds`: integer
- `afterOccurrences`: integer
- `enabled`: boolean
- `name`: string
- `policyId`: string **required**
- `service`: string

**Response** 200 → `result`

- `automation`: object **required**
  - `ansPolicyId`: string **required**
  - `created`: number **required**
  - `createdByUserId`: string **required**
  - `enabled`: boolean **required**
  - `id`: string **required**
  - `inactivitySeconds`: number **required**
  - `name`: string **required**
  - `revision`: number **required**
  - `scope`: string **required** enum: `account`, `service`
  - `service`: string **required**
  - `serviceType`: string **required**
  - `threshold`: number **required**
  - `triggerType`: string **required** enum: `occurrence_threshold`, `recurrence_after_inactivity`
  - `updated`: number **required**
  - `updatedByUserId`: string **required**

## POST /accounts/{account_id}/workers/observability/issues/groups

Create an issue group

operationId: `issues.groups.create`

**Request** (application/json)

- `issueIds`: string[] **required**
  [array]
- `title`: string **required**

**Response** 200 → `result`

- `count`: number **required**
- `created`: number **required**
- `fingerprint`: string
- `firstObserved`: number **required**
- `id`: string **required**
- `lastObserved`: number **required**
- `members`: object[]
  [array of]
  - `fingerprint`: string **required**
  - `issueId`: string **required**
  - `title`: string **required**
- `service`: string **required**
- `status`: string **required** enum: `active`, `resolved`, `ignored`
- `statusUpdated`: number **required**
- `title`: string **required**
- `type`: string
- `updated`: number **required**

## DELETE /accounts/{account_id}/workers/observability/issues/groups/{groupId}

Dissolve an issue group

operationId: `issues.groups.delete`

**Response** 200 → `result`

- `deleted`: boolean **required** enum: `true`

## POST /accounts/{account_id}/workers/observability/issues/groups/{groupId}/members

Add issue group members

operationId: `issues.groups.members.add`

**Request** (application/json)

- `issueIds`: string[] **required**
  [array]

**Response** 200 → `result`

- `count`: number **required**
- `created`: number **required**
- `fingerprint`: string
- `firstObserved`: number **required**
- `id`: string **required**
- `lastObserved`: number **required**
- `members`: object[]
  [array of]
  - `fingerprint`: string **required**
  - `issueId`: string **required**
  - `title`: string **required**
- `service`: string **required**
- `status`: string **required** enum: `active`, `resolved`, `ignored`
- `statusUpdated`: number **required**
- `title`: string **required**
- `type`: string
- `updated`: number **required**

## DELETE /accounts/{account_id}/workers/observability/issues/groups/{groupId}/members/{issueId}

Remove an issue group member

operationId: `issues.groups.members.remove`

**Response** 200 → `result`

- `count`: number **required**
- `created`: number **required**
- `fingerprint`: string
- `firstObserved`: number **required**
- `id`: string **required**
- `lastObserved`: number **required**
- `members`: object[]
  [array of]
  - `fingerprint`: string **required**
  - `issueId`: string **required**
  - `title`: string **required**
- `service`: string **required**
- `status`: string **required** enum: `active`, `resolved`, `ignored`
- `statusUpdated`: number **required**
- `title`: string **required**
- `type`: string
- `updated`: number **required**

## GET /accounts/{account_id}/workers/observability/issues/summary

Summarize detected issues

operationId: `issues.summary` · query: `service`

**Response** 200 → `result`

- `activeIssues`: number **required**
- `activeOccurrences`: number **required**
- `lastIssue`: number **required**
- `resolvedIssues`: number **required**
