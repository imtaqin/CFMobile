# Email Routing suppressions

8 endpoints.

## GET /accounts/{account_id}/email/routing/suppression

List account email suppressions

operationId: `get_publicListSuppressionRouting` · query: `page`, `per_page`, `order`, `direction`

## POST /accounts/{account_id}/email/routing/suppression

Create account email suppression

operationId: `post_publicNewSuppressionRouting`

## DELETE /accounts/{account_id}/email/routing/suppression/{suppression_id}

Delete account email suppression

operationId: `delete_publicDeleteSuppressionRouting`

## GET /accounts/{account_id}/email/routing/suppression/{suppression_id}

Get account email suppression

operationId: `get_publicGetSuppressionRouting`

## GET /zones/{zone_id}/email/routing/suppression

List zone email suppressions

operationId: `get_publicListSuppressionZoneRouting` · query: `page`, `per_page`, `order`, `direction`

## POST /zones/{zone_id}/email/routing/suppression

Create zone email suppression

operationId: `post_publicNewSuppressionZoneRouting`

## DELETE /zones/{zone_id}/email/routing/suppression/{suppression_id}

Delete zone email suppression

operationId: `delete_publicDeleteSuppressionZoneRouting`

## GET /zones/{zone_id}/email/routing/suppression/{suppression_id}

Get zone email suppression

operationId: `get_publicGetSuppressionZoneRouting`
