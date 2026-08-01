# DNS Firewall

7 endpoints.

## GET /accounts/{account_id}/dns_firewall

List DNS Firewall Clusters

operationId: `dns-firewall-list-dns-firewall-clusters` · query: `page`, `per_page`

## POST /accounts/{account_id}/dns_firewall

Create DNS Firewall Cluster

operationId: `dns-firewall-create-dns-firewall-cluster`

## DELETE /accounts/{account_id}/dns_firewall/{dns_firewall_id}

Delete DNS Firewall Cluster

operationId: `dns-firewall-delete-dns-firewall-cluster`

## GET /accounts/{account_id}/dns_firewall/{dns_firewall_id}

DNS Firewall Cluster Details

operationId: `dns-firewall-dns-firewall-cluster-details`

## PATCH /accounts/{account_id}/dns_firewall/{dns_firewall_id}

Update DNS Firewall Cluster

operationId: `dns-firewall-update-dns-firewall-cluster`

## GET /accounts/{account_id}/dns_firewall/{dns_firewall_id}/reverse_dns

Show DNS Firewall Cluster Reverse DNS

operationId: `dns-firewall-show-dns-firewall-cluster-reverse-dns`

## PATCH /accounts/{account_id}/dns_firewall/{dns_firewall_id}/reverse_dns

Update DNS Firewall Cluster Reverse DNS

operationId: `dns-firewall-update-dns-firewall-cluster-reverse-dns`
