# reports_other

6 endpoints.

## GET /accounts/{account_id}/reporting/industry

Get an account industry

operationId: `reporting-industry-get`

**Response** 200 → `result`

- `industry`: any **required** — Industry string value
- `unlock_time`: string **required** — Time when the industry can be updated again

## PATCH /accounts/{account_id}/reporting/industry

Update an account industry

operationId: `reporting-industry-update`

**Request** (application/json)

- `industry`: any **required** — The industry of the account

**Response** 200 → `result`

- `industry`: any **required** — Industry string value
- `unlock_time`: string **required** — Time when the industry can be updated again
- `valid_from`: string **required** — Start date for this industry association
- `version`: integer **required** — Version number for this association

## GET /accounts/{account_id}/reporting/policies

List reporting policies

operationId: `reporting-policies-list`

**Response** 200 → `result`

[array of]
- `enabled`: boolean **required** — Whether the policy is currently active and will generate reports according to schedule
- `policy_description`: string default: `` — Optional detailed description of what the policy does and when it runs
- `policy_id`: string **required** — Unique identifier for the policy (UUID format)
- `policy_name`: string **required** — Human-readable name for the policy (required, non-empty)
- `policy_schedule`: string **required** — Cron expression for scheduling (format: minute hour day month weekday). Example: '0 9 * * 1' runs every Monday at 9:00 AM
- `valid_from`: string **required** — Start date when this policy version becomes effective
- `valid_to`: string — End date when this policy version expires (omitted for active policies)
- `version`: integer **required** — Version number of the policy (incremented when policy is modified, starts at 1)

## GET /accounts/{account_id}/reporting/policies/{policy_id}

Get a reporting policy

operationId: `reporting-policies-get`

**Response** 200 → `result`

- `enabled`: boolean **required** — Whether the policy is currently active and will generate reports according to schedule
- `policy_description`: string default: `` — Optional detailed description of what the policy does and when it runs
- `policy_id`: string **required** — Unique identifier for the policy (UUID format)
- `policy_name`: string **required** — Human-readable name for the policy (required, non-empty)
- `policy_schedule`: string **required** — Cron expression for scheduling (format: minute hour day month weekday). Example: '0 9 * * 1' runs every Monday at 9:00 AM
- `valid_from`: string **required** — Start date when this policy version becomes effective
- `valid_to`: string — End date when this policy version expires (omitted for active policies)
- `version`: integer **required** — Version number of the policy (incremented when policy is modified, starts at 1)

## GET /accounts/{account_id}/reporting/reports

List generated reports

operationId: `reporting-reports-list`

**Response** 200 → `result`

[array of]
- `generated_on`: string — When this report was actually completed (only present when report is finished)
- `generation_id`: string **required** — Unique identifier for this generation attempt (for retry/deduplication)
- `policy_id`: string **required** — Reference to the policy that generated this report
- `policy_version`: integer **required** — Version of the policy that was used to generate this report (positive integer starting at 1)
- `reason`: any — Optional reason enum providing additional context about the report status (e.g., cancellation reason, error details)
- `report_id`: string **required** — Unique identifier for this specific report instance
- `report_settings`: any — Configuration settings used to generate this report, including report type and parameters (may be missing for older reports)
- `report_status`: any **required** — The generation status of the report.
- `scheduled_for`: string **required** — When this report should actually run (execution timestamp)
- `scheduled_on`: string **required** — When this report was scheduled (creation timestamp)

## GET /accounts/{account_id}/reporting/reports/{report_id}

Get a generated report

operationId: `reporting-reports-get`

**Response** 200 → `result`

- `generated_on`: string — When this report was actually completed (only present when report is finished)
- `generation_id`: string **required** — Unique identifier for this generation attempt (for retry/deduplication)
- `policy_id`: string **required** — Reference to the policy that generated this report
- `policy_version`: integer **required** — Version of the policy that was used to generate this report (positive integer starting at 1)
- `reason`: any — Optional reason enum providing additional context about the report status (e.g., cancellation reason, error details)
- `report`: any **required** — The actual report data and findings
- `report_id`: string **required** — Unique identifier for this specific report instance
- `report_settings`: any — Configuration settings used to generate this report, including report type and parameters (may be missing for older reports)
- `report_status`: any **required** — The generation status of the report.
- `scheduled_for`: string **required** — When this report should actually run (execution timestamp)
- `scheduled_on`: string **required** — When this report was scheduled (creation timestamp)
