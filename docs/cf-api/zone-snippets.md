# Zone Snippets

8 endpoints.

## GET /zones/{zone_id}/snippets

List zone snippets

operationId: `listZoneSnippets` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_on`: string **required** — Indicates when the snippet was created.
- `modified_on`: string — Indicates when the snippet was last modified.
- `snippet_name`: string **required** — Identify the snippet.

## DELETE /zones/{zone_id}/snippets/{snippet_name}

Delete a zone snippet

operationId: `deleteZoneSnippet`

**Response** 200 → `result`

object

## GET /zones/{zone_id}/snippets/{snippet_name}

Get a zone snippet

operationId: `getZoneSnippet`

**Response** 200 → `result`

- `created_on`: string **required** — Indicates when the snippet was created.
- `modified_on`: string — Indicates when the snippet was last modified.
- `snippet_name`: string **required** — Identify the snippet.

## PUT /zones/{zone_id}/snippets/{snippet_name}

Update a zone snippet

operationId: `updateZoneSnippet`

**Request** (multipart/form-data)

- `metadata`: object **required** — Provide metadata about the snippet.
  - `main_module`: string **required** — Specify the name of the file that contains the main module of the snippet.

**Response** 200 → `result`

- `created_on`: string **required** — Indicates when the snippet was created.
- `modified_on`: string — Indicates when the snippet was last modified.
- `snippet_name`: string **required** — Identify the snippet.

## GET /zones/{zone_id}/snippets/{snippet_name}/content

Get a zone snippet content

operationId: `getZoneSnippetContent`

**Response** 200 → `result`

object

## DELETE /zones/{zone_id}/snippets/snippet_rules

Delete zone snippet rules

operationId: `deleteZoneSnippetRules`

**Response** 200 → `result`

[array of]
- `description`: string default: `` — Provide an informative description of the rule.
- `enabled`: boolean default: `false` — Indicate whether to execute the rule.
- `expression`: string **required** — Define the expression that determines which traffic matches the rule.
- `id`: string **required** — Specify the unique ID of the rule.
- `last_updated`: string **required** — Specify the timestamp of when the rule was last modified.
- `snippet_name`: string **required** — Identify the snippet.

## GET /zones/{zone_id}/snippets/snippet_rules

List zone snippet rules

operationId: `listZoneSnippetRules`

**Response** 200 → `result`

[array of]
- `description`: string default: `` — Provide an informative description of the rule.
- `enabled`: boolean default: `false` — Indicate whether to execute the rule.
- `expression`: string **required** — Define the expression that determines which traffic matches the rule.
- `id`: string **required** — Specify the unique ID of the rule.
- `last_updated`: string **required** — Specify the timestamp of when the rule was last modified.
- `snippet_name`: string **required** — Identify the snippet.

## PUT /zones/{zone_id}/snippets/snippet_rules

Update zone snippet rules

operationId: `updateZoneSnippetRules`

**Request** (application/json)

- `rules`: object[] **required** — Lists snippet rules.
  [array of]
  - `description`: string default: `` — Provide an informative description of the rule.
  - `enabled`: boolean default: `false` — Indicate whether to execute the rule.
  - `expression`: string **required** — Define the expression that determines which traffic matches the rule.
  - `id`: string **required** — Specify the unique ID of the rule.
  - `last_updated`: string **required** — Specify the timestamp of when the rule was last modified.
  - `snippet_name`: string **required** — Identify the snippet.

**Response** 200 → `result`

[array of]
- `description`: string default: `` — Provide an informative description of the rule.
- `enabled`: boolean default: `false` — Indicate whether to execute the rule.
- `expression`: string **required** — Define the expression that determines which traffic matches the rule.
- `id`: string **required** — Specify the unique ID of the rule.
- `last_updated`: string **required** — Specify the timestamp of when the rule was last modified.
- `snippet_name`: string **required** — Identify the snippet.
