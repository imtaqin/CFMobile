# CWS Filter Schema

1 endpoints.

## GET /cws/filter-schema

Get filter fields

operationId: `cws-get-filter-schema`

**Response** 200 → `result`

- `policy_fields`: object[] **required** — Fields available in policy filter expressions, in display order
  [array of]
  - `deprecated`: boolean **required** — True when the field is retained for compatibility but should be hidden in new UI
  - `false_label`: string — Label for the false state of a bool field
  - `field_type`: string **required** — Semantic value type of the field (e.g. text, ip_address, host, uri_path, http_method, protocol, int, bool)
  - `map`: boolean **required** — True for a string-keyed (map) field, indexed with wf_string["key"]
  - `operators`: string[] **required** — Advisory operator labels for filter builders; some labels are not expression tokens
    [array]
  - `splat`: boolean **required** — True for a multi-valued (array) field, membership-tested with any(wf_string[*] == ...)
  - `true_label`: string — Label for the true state of a bool field
  - `ui_string`: string **required** — Short human-readable name suitable for a form label
  - `values`: string[] — Advisory value suggestions for an enum field (a hint for populating a builder UI, not a server-enforced set)
    [array]
  - `wf_string`: string **required** — Identifier used in filter expressions, e.g. "http.request.host"
- `workload_fields`: object[] **required** — Fields available in workload filter expressions, in display order
  [array of]
  - `deprecated`: boolean **required** — True when the field is retained for compatibility but should be hidden in new UI
  - `false_label`: string — Label for the false state of a bool field
  - `field_type`: string **required** — Semantic value type of the field (e.g. text, ip_address, host, uri_path, http_method, protocol, int, bool)
  - `map`: boolean **required** — True for a string-keyed (map) field, indexed with wf_string["key"]
  - `operators`: string[] **required** — Advisory operator labels for filter builders; some labels are not expression tokens
    [array]
  - `splat`: boolean **required** — True for a multi-valued (array) field, membership-tested with any(wf_string[*] == ...)
  - `true_label`: string — Label for the true state of a bool field
  - `ui_string`: string **required** — Short human-readable name suitable for a form label
  - `values`: string[] — Advisory value suggestions for an enum field (a hint for populating a builder UI, not a server-enforced set)
    [array]
  - `wf_string`: string **required** — Identifier used in filter expressions, e.g. "http.request.host"
