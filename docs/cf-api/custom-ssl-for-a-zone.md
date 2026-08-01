# Custom SSL for a Zone

6 endpoints.

## GET /zones/{zone_id}/custom_certificates

List SSL Configurations

operationId: `custom-ssl-for-a-zone-list-ssl-configurations` · query: `page`, `per_page`, `match`, `status`

## POST /zones/{zone_id}/custom_certificates

Create SSL Configuration

operationId: `custom-ssl-for-a-zone-create-ssl-configuration`

## DELETE /zones/{zone_id}/custom_certificates/{custom_certificate_id}

Delete SSL Configuration

operationId: `custom-ssl-for-a-zone-delete-ssl-configuration`

## GET /zones/{zone_id}/custom_certificates/{custom_certificate_id}

SSL Configuration Details

operationId: `custom-ssl-for-a-zone-ssl-configuration-details`

## PATCH /zones/{zone_id}/custom_certificates/{custom_certificate_id}

Edit SSL Configuration

operationId: `custom-ssl-for-a-zone-edit-ssl-configuration`

## PUT /zones/{zone_id}/custom_certificates/prioritize

Re-prioritize SSL Certificates

operationId: `custom-ssl-for-a-zone-re-prioritize-ssl-certificates`
