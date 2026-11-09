# IP Address Management Address Maps

15 endpoints.

## GET /accounts/{account_id}/addressing/address_maps

List Address Maps

operationId: `ip-address-management-address-maps-list-address-maps`

**Response** 200 → `result`

[array of]
- `can_delete`: boolean — If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.
- `can_modify_ips`: boolean — If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.
- `created_at`: string
- `default_sni`: string — If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudfla
- `description`: string — An optional description field which may be used to describe the types of IPs or zones on the map.
- `enabled`: boolean default: `false` — Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.
- `id`: string — Identifier of an Address Map.
- `modified_at`: string

## POST /accounts/{account_id}/addressing/address_maps

Create Address Map

operationId: `ip-address-management-address-maps-create-address-map`

**Request** (application/json)

- `description`: string — An optional description field which may be used to describe the types of IPs or zones on the map.
- `enabled`: boolean default: `false` — Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.
- `ips`: string[]
  [array]
- `memberships`: object[] — Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.
  [array of]
  - `identifier`: string — The identifier for the membership (eg. a zone or account tag).
  - `kind`: string enum: `zone`, `account` — The type of the membership.

**Response** 201 → `result`

- `can_delete`: boolean — If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.
- `can_modify_ips`: boolean — If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.
- `created_at`: string
- `default_sni`: string — If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudfla
- `description`: string — An optional description field which may be used to describe the types of IPs or zones on the map.
- `enabled`: boolean default: `false` — Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.
- `id`: string — Identifier of an Address Map.
- `modified_at`: string
- `ips`: object[] — The set of IPs on the Address Map.
  [array of]
  - `created_at`: string
  - `ip`: string — An IPv4 or IPv6 address.
- `memberships`: object[] — Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.
  [array of]
  - `can_delete`: boolean — Controls whether the membership can be deleted via the API or not.
  - `created_at`: string
  - `identifier`: string — The identifier for the membership (eg. a zone or account tag).
  - `kind`: string enum: `zone`, `account` — The type of the membership.

## DELETE /accounts/{account_id}/addressing/address_maps/{address_map_id}

Delete Address Map

operationId: `ip-address-management-address-maps-delete-address-map`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result_info`: object
  - `count`: number — Total number of results for the requested service.
  - `page`: number — Current page within paginated list of results.
  - `per_page`: number — Number of results per page of results.
  - `total_count`: number — Total results available without any search parameters.
  - `total_pages`: number — The number of total pages in the entire result set.

## GET /accounts/{account_id}/addressing/address_maps/{address_map_id}

Address Map Details

operationId: `ip-address-management-address-maps-address-map-details`

**Response** 200 → `result`

- `can_delete`: boolean — If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.
- `can_modify_ips`: boolean — If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.
- `created_at`: string
- `default_sni`: string — If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudfla
- `description`: string — An optional description field which may be used to describe the types of IPs or zones on the map.
- `enabled`: boolean default: `false` — Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.
- `id`: string — Identifier of an Address Map.
- `modified_at`: string
- `ips`: object[] — The set of IPs on the Address Map.
  [array of]
  - `created_at`: string
  - `ip`: string — An IPv4 or IPv6 address.
- `memberships`: object[] — Zones and Accounts which will be assigned IPs on this Address Map. A zone membership will take priority over an account membership.
  [array of]
  - `can_delete`: boolean — Controls whether the membership can be deleted via the API or not.
  - `created_at`: string
  - `identifier`: string — The identifier for the membership (eg. a zone or account tag).
  - `kind`: string enum: `zone`, `account` — The type of the membership.

## PATCH /accounts/{account_id}/addressing/address_maps/{address_map_id}

Update Address Map

operationId: `ip-address-management-address-maps-update-address-map`

**Request** (application/json)

- `default_sni`: string — If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudfla
- `description`: string — An optional description field which may be used to describe the types of IPs or zones on the map.
- `enabled`: boolean default: `false` — Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.

**Response** 200 → `result`

- `can_delete`: boolean — If set to false, then the Address Map cannot be deleted via API. This is true for Cloudflare-managed maps.
- `can_modify_ips`: boolean — If set to false, then the IPs on the Address Map cannot be modified via the API. This is true for Cloudflare-managed maps.
- `created_at`: string
- `default_sni`: string — If you have legacy TLS clients which do not send the TLS server name indicator, then you can specify one default SNI on the map. If Cloudfla
- `description`: string — An optional description field which may be used to describe the types of IPs or zones on the map.
- `enabled`: boolean default: `false` — Whether the Address Map is enabled or not. Cloudflare's DNS will not respond with IP addresses on an Address Map until the map is enabled.
- `id`: string — Identifier of an Address Map.
- `modified_at`: string

## DELETE /accounts/{account_id}/addressing/address_maps/{address_map_id}/accounts/{member_account_id}

Remove an account membership from an Address Map

operationId: `ip-address-management-address-maps-remove-an-account-membership-from-an-address-map`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result_info`: object
  - `count`: number — Total number of results for the requested service.
  - `page`: number — Current page within paginated list of results.
  - `per_page`: number — Number of results per page of results.
  - `total_count`: number — Total results available without any search parameters.
  - `total_pages`: number — The number of total pages in the entire result set.

## PUT /accounts/{account_id}/addressing/address_maps/{address_map_id}/accounts/{member_account_id}

Add an account membership to an Address Map

operationId: `ip-address-management-address-maps-add-an-account-membership-to-an-address-map`

**Response** 201 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result_info`: object
  - `count`: number — Total number of results for the requested service.
  - `page`: number — Current page within paginated list of results.
  - `per_page`: number — Number of results per page of results.
  - `total_count`: number — Total results available without any search parameters.
  - `total_pages`: number — The number of total pages in the entire result set.

## DELETE /accounts/{account_id}/addressing/address_maps/{address_map_id}/ips

Remove Multiple IPs from an Address Map

operationId: `ip-address-management-address-maps-remove-multiple-ips-from-an-address-map`

**Request** (application/json)

- `ips`: string[] **required**
  [array]

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result_info`: object
  - `count`: number — Total number of results for the requested service.
  - `page`: number — Current page within paginated list of results.
  - `per_page`: number — Number of results per page of results.
  - `total_count`: number — Total results available without any search parameters.
  - `total_pages`: number — The number of total pages in the entire result set.

## POST /accounts/{account_id}/addressing/address_maps/{address_map_id}/ips

Add Multiple IPs to an Address Map

operationId: `ip-address-management-address-maps-add-multiple-ips-to-an-address-map`

**Request** (application/json)

- `ips`: string[] **required**
  [array]

**Response** 201 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result_info`: object
  - `count`: number — Total number of results for the requested service.
  - `page`: number — Current page within paginated list of results.
  - `per_page`: number — Number of results per page of results.
  - `total_count`: number — Total results available without any search parameters.
  - `total_pages`: number — The number of total pages in the entire result set.

## DELETE /accounts/{account_id}/addressing/address_maps/{address_map_id}/ips/{ip_address}

Remove an IP from an Address Map

operationId: `ip-address-management-address-maps-remove-an-ip-from-an-address-map`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result_info`: object
  - `count`: number — Total number of results for the requested service.
  - `page`: number — Current page within paginated list of results.
  - `per_page`: number — Number of results per page of results.
  - `total_count`: number — Total results available without any search parameters.
  - `total_pages`: number — The number of total pages in the entire result set.

## PUT /accounts/{account_id}/addressing/address_maps/{address_map_id}/ips/{ip_address}

Add an IP to an Address Map

operationId: `ip-address-management-address-maps-add-an-ip-to-an-address-map`

**Response** 201 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result_info`: object
  - `count`: number — Total number of results for the requested service.
  - `page`: number — Current page within paginated list of results.
  - `per_page`: number — Number of results per page of results.
  - `total_count`: number — Total results available without any search parameters.
  - `total_pages`: number — The number of total pages in the entire result set.

## DELETE /accounts/{account_id}/addressing/address_maps/{address_map_id}/zones

Remove Multiple Zones from an Address Map

operationId: `ip-address-management-address-maps-remove-multiple-zones-from-an-address-map`

**Request** (application/json)

- `zones`: string[] **required**
  [array]

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result_info`: object
  - `count`: number — Total number of results for the requested service.
  - `page`: number — Current page within paginated list of results.
  - `per_page`: number — Number of results per page of results.
  - `total_count`: number — Total results available without any search parameters.
  - `total_pages`: number — The number of total pages in the entire result set.

## POST /accounts/{account_id}/addressing/address_maps/{address_map_id}/zones

Add Multiple Zones to an Address Map

operationId: `ip-address-management-address-maps-add-multiple-zones-to-an-address-map`

**Request** (application/json)

- `zones`: string[] **required**
  [array]

**Response** 201 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result_info`: object
  - `count`: number — Total number of results for the requested service.
  - `page`: number — Current page within paginated list of results.
  - `per_page`: number — Number of results per page of results.
  - `total_count`: number — Total results available without any search parameters.
  - `total_pages`: number — The number of total pages in the entire result set.

## DELETE /accounts/{account_id}/addressing/address_maps/{address_map_id}/zones/{member_zone_id}

Remove a zone membership from an Address Map

operationId: `ip-address-management-address-maps-remove-a-zone-membership-from-an-address-map`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result_info`: object
  - `count`: number — Total number of results for the requested service.
  - `page`: number — Current page within paginated list of results.
  - `per_page`: number — Number of results per page of results.
  - `total_count`: number — Total results available without any search parameters.
  - `total_pages`: number — The number of total pages in the entire result set.

## PUT /accounts/{account_id}/addressing/address_maps/{address_map_id}/zones/{member_zone_id}

Add a zone membership to an Address Map

operationId: `ip-address-management-address-maps-add-a-zone-membership-to-an-address-map`

**Response** 201 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result_info`: object
  - `count`: number — Total number of results for the requested service.
  - `page`: number — Current page within paginated list of results.
  - `per_page`: number — Number of results per page of results.
  - `total_count`: number — Total results available without any search parameters.
  - `total_pages`: number — The number of total pages in the entire result set.
