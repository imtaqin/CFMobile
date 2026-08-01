# DNS Records for a Zone

14 endpoints.

## GET /zones/{zone_id}/dns_records

List DNS Records

operationId: `dns-records-for-a-zone-list-dns-records` · query: `name`, `name.exact`, `name.contains`, `name.startswith`, `name.endswith`, `type`, `content`, `content.exact`, `content.contains`, `content.startswith`, `content.endswith`, `proxied`, `match`, `comment`, `comment.present`, `comment.absent`, `comment.exact`, `comment.contains`, `comment.startswith`, `comment.endswith`, `tag`, `tag.present`, `tag.absent`, `tag.exact`, `tag.contains`, `tag.startswith`, `tag.endswith`, `search`, `tag_match`, `page`, `per_page`, `order`, `direction`, `shadowed_by_name`, `shadowing_name`

## POST /zones/{zone_id}/dns_records

Create DNS Record

operationId: `dns-records-for-a-zone-create-dns-record`

## DELETE /zones/{zone_id}/dns_records/{dns_record_id}

Delete DNS Record

operationId: `dns-records-for-a-zone-delete-dns-record`

## GET /zones/{zone_id}/dns_records/{dns_record_id}

DNS Record Details

operationId: `dns-records-for-a-zone-dns-record-details`

## PATCH /zones/{zone_id}/dns_records/{dns_record_id}

Update DNS Record

operationId: `dns-records-for-a-zone-patch-dns-record`

## PUT /zones/{zone_id}/dns_records/{dns_record_id}

Overwrite DNS Record

operationId: `dns-records-for-a-zone-update-dns-record`

## POST /zones/{zone_id}/dns_records/batch

Batch DNS Records

operationId: `dns-records-for-a-zone-batch-dns-records`

## GET /zones/{zone_id}/dns_records/export

Export DNS Records

operationId: `dns-records-for-a-zone-export-dns-records`

## POST /zones/{zone_id}/dns_records/import

Import DNS Records

operationId: `dns-records-for-a-zone-import-dns-records`

## POST /zones/{zone_id}/dns_records/scan

Scan DNS Records

operationId: `dns-records-for-a-zone-scan-dns-records`

## GET /zones/{zone_id}/dns_records/scan/review

List Scanned DNS Records

operationId: `dns-records-for-a-zone-review-dns-scan`

## POST /zones/{zone_id}/dns_records/scan/review

Review Scanned DNS Records

operationId: `dns-records-for-a-zone-apply-dns-scan-results`

## POST /zones/{zone_id}/dns_records/scan/trigger

Trigger DNS Record Scan

operationId: `dns-records-for-a-zone-trigger-dns-scan`

## GET /zones/{zone_id}/dns_records/usage

Get DNS Record Usage

operationId: `dns-records-for-a-zone-get-usage`
