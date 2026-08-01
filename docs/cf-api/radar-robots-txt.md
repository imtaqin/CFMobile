# Radar Robots.txt

2 endpoints.

## GET /radar/robots_txt/top/domain_categories

Get top domain categories by robots.txt files parsed

operationId: `radar-get-robots-txt-top-domain-categories-by-files-parsed` · query: `limit`, `name`, `userAgentCategory`, `date`, `format`

## GET /radar/robots_txt/top/user_agents/directive

Get top user agents on robots.txt files

operationId: `radar-get-robots-txt-top-user-agents-by-directive` · query: `limit`, `name`, `userAgentCategory`, `date`, `domainCategory`, `directive`, `format`
