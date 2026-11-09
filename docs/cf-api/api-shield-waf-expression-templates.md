# API Shield WAF Expression Templates

1 endpoints.

## POST /zones/{zone_id}/api_gateway/expression-template/fallthrough

Generate a fallthrough WAF expression template

operationId: `api-shield-expression-templates-fallthrough`

**Request** (application/json)

- `hosts`: string[] **required** — List of hosts to be targeted in the expression
  [array]

**Response** 200 → `result`

- `expression`: string **required** — WAF Expression for fallthrough
- `title`: string **required** — Title for the expression
