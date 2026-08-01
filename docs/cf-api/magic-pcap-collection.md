# Magic PCAP collection

9 endpoints.

## GET /accounts/{account_id}/pcaps

List packet capture requests

operationId: `magic-pcap-collection-list-packet-capture-requests`

## POST /accounts/{account_id}/pcaps

Create PCAP request

operationId: `magic-pcap-collection-create-pcap-request`

## GET /accounts/{account_id}/pcaps/{pcap_id}

Get PCAP request

operationId: `magic-pcap-collection-get-pcap-request`

## GET /accounts/{account_id}/pcaps/{pcap_id}/download

Download Simple PCAP

operationId: `magic-pcap-collection-download-simple-pcap`

## PUT /accounts/{account_id}/pcaps/{pcap_id}/stop

Stop full PCAP

operationId: `magic-pcap-collection-stop-full-pcap`

## GET /accounts/{account_id}/pcaps/ownership

List PCAPs Bucket Ownership

operationId: `magic-pcap-collection-list-pca-ps-bucket-ownership`

## POST /accounts/{account_id}/pcaps/ownership

Add buckets for full packet captures

operationId: `magic-pcap-collection-add-buckets-for-full-packet-captures`

## DELETE /accounts/{account_id}/pcaps/ownership/{ownership_id}

Delete buckets for full packet captures

operationId: `magic-pcap-collection-delete-buckets-for-full-packet-captures`

## POST /accounts/{account_id}/pcaps/ownership/validate

Validate buckets for full packet captures

operationId: `magic-pcap-collection-validate-buckets-for-full-packet-captures`
