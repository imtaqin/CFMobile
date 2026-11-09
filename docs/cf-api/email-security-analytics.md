# Email Security Analytics

1 endpoints.

## GET /accounts/{account_id}/email-security/analytics/monthly_report

Get monthly report

operationId: `email_security_get_monthly_report`

**Response** 200 → `result`

- `by_month`: object — A map of month (YYYY-MM) to the disposition counts recorded for that month.
