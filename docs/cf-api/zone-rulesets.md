# Zone Rulesets

16 endpoints.

## GET /zones/{zone_id}/rulesets

List zone rulesets

operationId: `listZoneRulesets` · query: `cursor`, `per_page`

## POST /zones/{zone_id}/rulesets

Create a zone ruleset

operationId: `createZoneRuleset`

## DELETE /zones/{zone_id}/rulesets/{ruleset_id}

Delete a zone ruleset

operationId: `deleteZoneRuleset`

## GET /zones/{zone_id}/rulesets/{ruleset_id}

Get a zone ruleset

operationId: `getZoneRuleset`

## PUT /zones/{zone_id}/rulesets/{ruleset_id}

Update a zone ruleset

operationId: `updateZoneRuleset`

## POST /zones/{zone_id}/rulesets/{ruleset_id}/rules

Create a zone ruleset rule

operationId: `createZoneRulesetRule`

## DELETE /zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id}

Delete a zone ruleset rule

operationId: `deleteZoneRulesetRule`

## PATCH /zones/{zone_id}/rulesets/{ruleset_id}/rules/{rule_id}

Update a zone ruleset rule

operationId: `updateZoneRulesetRule`

## GET /zones/{zone_id}/rulesets/{ruleset_id}/versions

List a zone ruleset's versions

operationId: `listZoneRulesetVersions`

## DELETE /zones/{zone_id}/rulesets/{ruleset_id}/versions/{ruleset_version}

Delete a zone ruleset version

operationId: `deleteZoneRulesetVersion`

## GET /zones/{zone_id}/rulesets/{ruleset_id}/versions/{ruleset_version}

Get a zone ruleset version

operationId: `getZoneRulesetVersion`

## GET /zones/{zone_id}/rulesets/{ruleset_id}/versions/{ruleset_version}/by_tag/{rule_tag}

List a zone ruleset version's rules by tag

operationId: `listZoneRulesetVersionRulesByTag`

## GET /zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint

Get a zone entry point ruleset

operationId: `getZoneEntrypointRuleset`

## PUT /zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint

Update a zone entry point ruleset

operationId: `updateZoneEntrypointRuleset`

## GET /zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions

List a zone entry point ruleset's versions

operationId: `listZoneEntrypointRulesetVersions`

## GET /zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}

Get a zone entry point ruleset version

operationId: `getZoneEntrypointRulesetVersion`
