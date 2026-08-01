# Zone Snippets

8 endpoints.

## GET /zones/{zone_id}/snippets

List zone snippets

operationId: `listZoneSnippets` · query: `page`, `per_page`

## DELETE /zones/{zone_id}/snippets/{snippet_name}

Delete a zone snippet

operationId: `deleteZoneSnippet`

## GET /zones/{zone_id}/snippets/{snippet_name}

Get a zone snippet

operationId: `getZoneSnippet`

## PUT /zones/{zone_id}/snippets/{snippet_name}

Update a zone snippet

operationId: `updateZoneSnippet`

## GET /zones/{zone_id}/snippets/{snippet_name}/content

Get a zone snippet content

operationId: `getZoneSnippetContent`

## DELETE /zones/{zone_id}/snippets/snippet_rules

Delete zone snippet rules

operationId: `deleteZoneSnippetRules`

## GET /zones/{zone_id}/snippets/snippet_rules

List zone snippet rules

operationId: `listZoneSnippetRules`

## PUT /zones/{zone_id}/snippets/snippet_rules

Update zone snippet rules

operationId: `updateZoneSnippetRules`
