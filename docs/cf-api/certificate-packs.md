# Certificate Packs

6 endpoints.

## GET /zones/{zone_id}/ssl/certificate_packs

List Certificate Packs

operationId: `certificate-packs-list-certificate-packs` · query: `page`, `per_page`, `status`, `deploy`

## DELETE /zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}

Delete Advanced Certificate Manager Certificate Pack

operationId: `certificate-packs-delete-advanced-certificate-manager-certificate-pack`

## GET /zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}

Get Certificate Pack

operationId: `certificate-packs-get-certificate-pack`

## PATCH /zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}

Restart Validation or Update Advanced Certificate Manager Certificate Pack

operationId: `certificate-packs-restart-validation-for-advanced-certificate-manager-certificate-pack`

## POST /zones/{zone_id}/ssl/certificate_packs/order

Order Advanced Certificate Manager Certificate Pack

operationId: `certificate-packs-order-advanced-certificate-manager-certificate-pack`

## GET /zones/{zone_id}/ssl/certificate_packs/quota

Get Certificate Pack Quotas

operationId: `certificate-packs-get-certificate-pack-quotas`
