# ppu_usage_reports

1 endpoints.

## POST /accounts/{account_id}/pay-per-use/usage-reports

Submit a participant usage report

operationId: `pay-per-use.submitUsageReport`

**Request** (application/jsonl)

string

**Response** 200 → `result`

- `entry_count`: integer **required**
- `sha256`: string **required** — SHA-256 checksum of the exact submitted request body
- `submission_id`: integer **required** — Monotonically increasing submission ID scoped to the participant account
