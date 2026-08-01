# Custom Hostname for a Zone

8 endpoints.

## GET /zones/{zone_id}/custom_hostnames

List Custom Hostnames

operationId: `custom-hostname-for-a-zone-list-custom-hostnames` · query: `hostname`, `hostname.exact`, `hostname.startsWith`, `hostname.contain`, `id`, `page`, `per_page`, `order`, `direction`, `ssl_status`, `hostname_status`, `certificate_authority`, `wildcard`, `custom_origin_server`, `ssl`

## POST /zones/{zone_id}/custom_hostnames

Create Custom Hostname

operationId: `custom-hostname-for-a-zone-create-custom-hostname`

## DELETE /zones/{zone_id}/custom_hostnames/{custom_hostname_id}

Delete Custom Hostname (and any issued SSL certificates)

operationId: `custom-hostname-for-a-zone-delete-custom-hostname-(-and-any-issued-ssl-certificates)`

## GET /zones/{zone_id}/custom_hostnames/{custom_hostname_id}

Custom Hostname Details

operationId: `custom-hostname-for-a-zone-custom-hostname-details`

## PATCH /zones/{zone_id}/custom_hostnames/{custom_hostname_id}

Edit Custom Hostname

operationId: `custom-hostname-for-a-zone-edit-custom-hostname`

## DELETE /zones/{zone_id}/custom_hostnames/{custom_hostname_id}/certificate_pack/{certificate_pack_id}/certificates/{certificate_id}

Delete Single Certificate And Key For Custom Hostname

operationId: `custom-hostname-for-a-zone-delete_single_certificate_and_key_in_a_custom_hostname`

## PUT /zones/{zone_id}/custom_hostnames/{custom_hostname_id}/certificate_pack/{certificate_pack_id}/certificates/{certificate_id}

Replace Custom Certificate and Custom Key In Custom Hostname

operationId: `custom-hostname-for-a-zone-edit-custom-certificate-custom-hostname`

## GET /zones/{zone_id}/custom_hostnames/quota

Get Custom Hostname Quota

operationId: `custom-hostname-for-a-zone-get-custom-hostname-quota`
