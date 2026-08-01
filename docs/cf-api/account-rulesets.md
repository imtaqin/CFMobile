# Account Rulesets

16 endpoints.

## GET /accounts/{account_id}/rulesets

List account rulesets

operationId: `listAccountRulesets` · query: `cursor`, `per_page`

## POST /accounts/{account_id}/rulesets

Create an account ruleset

operationId: `createAccountRuleset`

## DELETE /accounts/{account_id}/rulesets/{ruleset_id}

Delete an account ruleset

operationId: `deleteAccountRuleset`

## GET /accounts/{account_id}/rulesets/{ruleset_id}

Get an account ruleset

operationId: `getAccountRuleset`

## PUT /accounts/{account_id}/rulesets/{ruleset_id}

Update an account ruleset

operationId: `updateAccountRuleset`

## POST /accounts/{account_id}/rulesets/{ruleset_id}/rules

Create an account ruleset rule

operationId: `createAccountRulesetRule`

## DELETE /accounts/{account_id}/rulesets/{ruleset_id}/rules/{rule_id}

Delete an account ruleset rule

operationId: `deleteAccountRulesetRule`

## PATCH /accounts/{account_id}/rulesets/{ruleset_id}/rules/{rule_id}

Update an account ruleset rule

operationId: `updateAccountRulesetRule`

## GET /accounts/{account_id}/rulesets/{ruleset_id}/versions

List an account ruleset's versions

operationId: `listAccountRulesetVersions`

## DELETE /accounts/{account_id}/rulesets/{ruleset_id}/versions/{ruleset_version}

Delete an account ruleset version

operationId: `deleteAccountRulesetVersion`

## GET /accounts/{account_id}/rulesets/{ruleset_id}/versions/{ruleset_version}

Get an account ruleset version

operationId: `getAccountRulesetVersion`

## GET /accounts/{account_id}/rulesets/{ruleset_id}/versions/{ruleset_version}/by_tag/{rule_tag}

List an account ruleset version's rules by tag

operationId: `listAccountRulesetVersionRulesByTag`

## GET /accounts/{account_id}/rulesets/phases/{ruleset_phase}/entrypoint

Get an account entry point ruleset

operationId: `getAccountEntrypointRuleset`

## PUT /accounts/{account_id}/rulesets/phases/{ruleset_phase}/entrypoint

Update an account entry point ruleset

operationId: `updateAccountEntrypointRuleset`

## GET /accounts/{account_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions

List an account entry point ruleset's versions

operationId: `listAccountEntrypointRulesetVersions`

## GET /accounts/{account_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}

Get an account entry point ruleset version

operationId: `getAccountEntrypointRulesetVersion`
