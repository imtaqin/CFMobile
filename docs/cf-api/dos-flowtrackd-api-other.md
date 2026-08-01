# dos-flowtrackd-api_other

45 endpoints.

## DELETE /accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules

Delete all DNS Protection rules.

operationId: `deleteDnsProtectionRulesForAccount`

## GET /accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules

List all DNS Protection rules.

operationId: `listDnsProtectionRulesForAccount` · query: `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules

Create DNS Protection rule.

operationId: `createDnsProtectionRule`

## DELETE /accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules/{rule_id}

Delete DNS Protection rule.

operationId: `deleteDnsProtectionRule`

## GET /accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules/{rule_id}

Get DNS Protection rule.

operationId: `getDnsProtectionRule`

## PATCH /accounts/{account_id}/magic/advanced_dns_protection/configs/dns_protection/rules/{rule_id}

Update DNS Protection rule.

operationId: `updateDnsProtectionRule`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist

Delete all allowlist prefixes.

operationId: `deleteAllowlistPrefixesForAccount`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist

List all allowlist prefixes.

operationId: `listAllowlistPrefixesForAccount` · query: `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist

Create allowlist prefix.

operationId: `createAllowlistedPrefix`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist/{prefix_id}

Delete allowlist prefix.

operationId: `deleteAllowlistPrefix`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist/{prefix_id}

Get allowlist prefix.

operationId: `getAllowlistPrefix`

## PATCH /accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist/{prefix_id}

Update allowlist prefix.

operationId: `updateAllowlistPrefix`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes

Delete all prefixes.

operationId: `deletePrefixesForAccount`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes

List all prefixes.

operationId: `listPrefixesForAccount` · query: `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes

Create prefix.

operationId: `createPrefix`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/{prefix_id}

Delete prefix.

operationId: `deletePrefix`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/{prefix_id}

Get prefix.

operationId: `getPrefix`

## PATCH /accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/{prefix_id}

Update prefix.

operationId: `updatePrefix`

## POST /accounts/{account_id}/magic/advanced_tcp_protection/configs/prefixes/bulk

Create multiple prefixes.

operationId: `bulkCreatePrefixes`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters

Delete all SYN Protection filters.

operationId: `deleteSynProtectionFiltersForAccount`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters

List all SYN Protection filters.

operationId: `listSynProtectionFiltersForAccount` · query: `mode`, `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters

Create a SYN Protection filter.

operationId: `createSynProtectionFilter`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}

Delete SYN Protection filter.

operationId: `deleteSynProtectionFilter`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}

Get SYN Protection filter.

operationId: `getSynProtectionFilter`

## PATCH /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/filters/{filter_id}

Update SYN Protection filter.

operationId: `updateSynProtectionFilter`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules

Delete all SYN Protection rules.

operationId: `deleteSynProtectionRulesForAccount`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules

List all SYN Protection rules.

operationId: `listSynProtectionRulesForAccount` · query: `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules

Create SYN Protection rule.

operationId: `createSynProtectionRule`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}

Delete SYN Protection rule.

operationId: `deleteSynProtectionRule`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}

Get SYN Protection rule.

operationId: `getSynProtectionRule`

## PATCH /accounts/{account_id}/magic/advanced_tcp_protection/configs/syn_protection/rules/{rule_id}

Update SYN Protection rule.

operationId: `updateSynProtectionRule`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters

Delete all TCP Flow Protection filters.

operationId: `deleteTcpFlowProtectionFiltersForAccount`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters

List all TCP Flow Protection filters.

operationId: `listTcpFlowProtectionFiltersForAccount` · query: `mode`, `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters

Create a TCP Flow Protection filter.

operationId: `createTcpFlowProtectionFilter`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filter_id}

Delete TCP Flow Protection filter.

operationId: `deleteTcpFlowProtectionFilter`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filter_id}

Get TCP Flow Protection filter.

operationId: `getTcpFlowProtectionFilter`

## PATCH /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/filters/{filter_id}

Update TCP Flow Protection filter.

operationId: `updateTcpFlowProtectionFilter`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules

Delete all TCP Flow Protection rules.

operationId: `deleteTcpFlowProtectionRulesForAccount`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules

List all TCP Flow Protection rules.

operationId: `listTcpFlowProtectionRulesForAccount` · query: `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules

Create TCP Flow Protection rule.

operationId: `createTcpFlowProtectionRule`

## DELETE /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{rule_id}

Delete TCP Flow Protection rule.

operationId: `deleteTcpFlowProtectionRule`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{rule_id}

Get TCP Flow Protection rule.

operationId: `getTcpFlowProtectionRule`

## PATCH /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_flow_protection/rules/{rule_id}

Update TCP Flow Protection rule.

operationId: `updateTcpFlowProtectionRule`

## GET /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_protection_status

Get protection status.

operationId: `getProtectionStatus`

## PATCH /accounts/{account_id}/magic/advanced_tcp_protection/configs/tcp_protection_status

Update protection status.

operationId: `updateProtectionStatus`
