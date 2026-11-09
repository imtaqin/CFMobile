# Spectrum Applications

6 endpoints.

## GET /zones/{zone_id}/spectrum/apps

List Spectrum applications

operationId: `spectrum-applications-list-spectrum-applications` · query: `page`, `per_page`, `direction`, `order`

**Response** 200 → `result`

(one of 2 variants; showing the first)
[array of]
- `created_on`: string **required** — When the Application was created.
- `id`: string **required** — App identifier.
- `modified_on`: string **required** — When the Application was last modified.
- `argo_smart_routing`: boolean default: `false` — Enables Argo Smart Routing for this application.
- `dns`: object **required** — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the application.
  - `type`: string enum: `CNAME`, `ADDRESS` — The type of DNS record associated with the application.
- `edge_ips`: any default: `[object Object]` — The anycast edge IP configuration for the hostname of this application.
- `ip_firewall`: boolean default: `false` — Enables IP Access Rules for this application.
- `origin_direct`: string[] — List of origin IP addresses. Array may contain multiple IP addresses for load balancing.
  [array]
- `origin_dns`: object — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the origin.
  - `ttl`: integer — The TTL of our resolution of your DNS record in seconds.
  - `type`: string enum: ``, `A`, `AAAA`, `SRV` — The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.
- `origin_port`: any — The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for e
- `origin_worker_id`: string — Optional Worker script tag (worker ID) to use as the application's origin. Only supported for TCP applications with traffic_type "worker"; m
- `origin_worker_name`: string — Name of the Worker origin. Omitted when the Worker is not found or its name cannot be resolved.
- `origin_worker_status`: string enum: `available`, `not_found`, `unknown` — Lookup status of the Worker origin. Unknown indicates that its name could not be resolved. Only returned for Worker origins.
- `protocol`: string **required** — The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/100
- `proxy_protocol`: string enum: `off`, `v1`, `v2`, `simple` default: `off` — Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-prot
- `tls`: string enum: `off`, `flexible`, `full`, `strict` default: `off` — The type of TLS termination associated with the application.
- `traffic_type`: string **required** enum: `direct`, `http`, `https`, `worker` default: `direct` — Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the 
- `virtual_network_id`: string — Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

## POST /zones/{zone_id}/spectrum/apps

Create Spectrum application using a name for the origin

operationId: `spectrum-applications-create-spectrum-application-using-a-name-for-the-origin`

**Request** (application/json)

(one of 2 variants; showing the first)
- `created_on`: string **required** — When the Application was created.
- `id`: string **required** — App identifier.
- `modified_on`: string **required** — When the Application was last modified.
- `argo_smart_routing`: boolean default: `false` — Enables Argo Smart Routing for this application.
- `dns`: object **required** — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the application.
  - `type`: string enum: `CNAME`, `ADDRESS` — The type of DNS record associated with the application.
- `edge_ips`: any default: `[object Object]` — The anycast edge IP configuration for the hostname of this application.
- `ip_firewall`: boolean default: `false` — Enables IP Access Rules for this application.
- `origin_direct`: string[] — List of origin IP addresses. Array may contain multiple IP addresses for load balancing.
  [array]
- `origin_dns`: object — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the origin.
  - `ttl`: integer — The TTL of our resolution of your DNS record in seconds.
  - `type`: string enum: ``, `A`, `AAAA`, `SRV` — The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.
- `origin_port`: any — The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for e
- `origin_worker_id`: string — Optional Worker script tag (worker ID) to use as the application's origin. Only supported for TCP applications with traffic_type "worker"; m
- `origin_worker_name`: string — Name of the Worker origin. Omitted when the Worker is not found or its name cannot be resolved.
- `origin_worker_status`: string enum: `available`, `not_found`, `unknown` — Lookup status of the Worker origin. Unknown indicates that its name could not be resolved. Only returned for Worker origins.
- `protocol`: string **required** — The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/100
- `proxy_protocol`: string enum: `off`, `v1`, `v2`, `simple` default: `off` — Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-prot
- `tls`: string enum: `off`, `flexible`, `full`, `strict` default: `off` — The type of TLS termination associated with the application.
- `traffic_type`: string **required** enum: `direct`, `http`, `https`, `worker` default: `direct` — Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the 
- `virtual_network_id`: string — Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_on`: string **required** — When the Application was created.
- `id`: string **required** — App identifier.
- `modified_on`: string **required** — When the Application was last modified.
- `argo_smart_routing`: boolean default: `false` — Enables Argo Smart Routing for this application.
- `dns`: object **required** — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the application.
  - `type`: string enum: `CNAME`, `ADDRESS` — The type of DNS record associated with the application.
- `edge_ips`: any default: `[object Object]` — The anycast edge IP configuration for the hostname of this application.
- `ip_firewall`: boolean default: `false` — Enables IP Access Rules for this application.
- `origin_direct`: string[] — List of origin IP addresses. Array may contain multiple IP addresses for load balancing.
  [array]
- `origin_dns`: object — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the origin.
  - `ttl`: integer — The TTL of our resolution of your DNS record in seconds.
  - `type`: string enum: ``, `A`, `AAAA`, `SRV` — The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.
- `origin_port`: any — The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for e
- `origin_worker_id`: string — Optional Worker script tag (worker ID) to use as the application's origin. Only supported for TCP applications with traffic_type "worker"; m
- `origin_worker_name`: string — Name of the Worker origin. Omitted when the Worker is not found or its name cannot be resolved.
- `origin_worker_status`: string enum: `available`, `not_found`, `unknown` — Lookup status of the Worker origin. Unknown indicates that its name could not be resolved. Only returned for Worker origins.
- `protocol`: string **required** — The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/100
- `proxy_protocol`: string enum: `off`, `v1`, `v2`, `simple` default: `off` — Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-prot
- `tls`: string enum: `off`, `flexible`, `full`, `strict` default: `off` — The type of TLS termination associated with the application.
- `traffic_type`: string **required** enum: `direct`, `http`, `https`, `worker` default: `direct` — Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the 
- `virtual_network_id`: string — Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

## DELETE /zones/{zone_id}/spectrum/apps/{app_id}

Delete Spectrum application

operationId: `spectrum-applications-delete-spectrum-application`

**Response** 200 → `result`

- `id`: string **required** — Identifier.

## GET /zones/{zone_id}/spectrum/apps/{app_id}

Get Spectrum application configuration

operationId: `spectrum-applications-get-spectrum-application-configuration`

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_on`: string **required** — When the Application was created.
- `id`: string **required** — App identifier.
- `modified_on`: string **required** — When the Application was last modified.
- `argo_smart_routing`: boolean default: `false` — Enables Argo Smart Routing for this application.
- `dns`: object **required** — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the application.
  - `type`: string enum: `CNAME`, `ADDRESS` — The type of DNS record associated with the application.
- `edge_ips`: any default: `[object Object]` — The anycast edge IP configuration for the hostname of this application.
- `ip_firewall`: boolean default: `false` — Enables IP Access Rules for this application.
- `origin_direct`: string[] — List of origin IP addresses. Array may contain multiple IP addresses for load balancing.
  [array]
- `origin_dns`: object — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the origin.
  - `ttl`: integer — The TTL of our resolution of your DNS record in seconds.
  - `type`: string enum: ``, `A`, `AAAA`, `SRV` — The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.
- `origin_port`: any — The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for e
- `origin_worker_id`: string — Optional Worker script tag (worker ID) to use as the application's origin. Only supported for TCP applications with traffic_type "worker"; m
- `origin_worker_name`: string — Name of the Worker origin. Omitted when the Worker is not found or its name cannot be resolved.
- `origin_worker_status`: string enum: `available`, `not_found`, `unknown` — Lookup status of the Worker origin. Unknown indicates that its name could not be resolved. Only returned for Worker origins.
- `protocol`: string **required** — The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/100
- `proxy_protocol`: string enum: `off`, `v1`, `v2`, `simple` default: `off` — Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-prot
- `tls`: string enum: `off`, `flexible`, `full`, `strict` default: `off` — The type of TLS termination associated with the application.
- `traffic_type`: string **required** enum: `direct`, `http`, `https`, `worker` default: `direct` — Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the 
- `virtual_network_id`: string — Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

## PUT /zones/{zone_id}/spectrum/apps/{app_id}

Update Spectrum application configuration using a name for the origin

operationId: `spectrum-applications-update-spectrum-application-configuration-using-a-name-for-the-origin`

**Request** (application/json)

(one of 2 variants; showing the first)
- `created_on`: string **required** — When the Application was created.
- `id`: string **required** — App identifier.
- `modified_on`: string **required** — When the Application was last modified.
- `argo_smart_routing`: boolean default: `false` — Enables Argo Smart Routing for this application.
- `dns`: object **required** — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the application.
  - `type`: string enum: `CNAME`, `ADDRESS` — The type of DNS record associated with the application.
- `edge_ips`: any default: `[object Object]` — The anycast edge IP configuration for the hostname of this application.
- `ip_firewall`: boolean default: `false` — Enables IP Access Rules for this application.
- `origin_direct`: string[] — List of origin IP addresses. Array may contain multiple IP addresses for load balancing.
  [array]
- `origin_dns`: object — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the origin.
  - `ttl`: integer — The TTL of our resolution of your DNS record in seconds.
  - `type`: string enum: ``, `A`, `AAAA`, `SRV` — The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.
- `origin_port`: any — The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for e
- `origin_worker_id`: string — Optional Worker script tag (worker ID) to use as the application's origin. Only supported for TCP applications with traffic_type "worker"; m
- `origin_worker_name`: string — Name of the Worker origin. Omitted when the Worker is not found or its name cannot be resolved.
- `origin_worker_status`: string enum: `available`, `not_found`, `unknown` — Lookup status of the Worker origin. Unknown indicates that its name could not be resolved. Only returned for Worker origins.
- `protocol`: string **required** — The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/100
- `proxy_protocol`: string enum: `off`, `v1`, `v2`, `simple` default: `off` — Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-prot
- `tls`: string enum: `off`, `flexible`, `full`, `strict` default: `off` — The type of TLS termination associated with the application.
- `traffic_type`: string **required** enum: `direct`, `http`, `https`, `worker` default: `direct` — Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the 
- `virtual_network_id`: string — Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

**Response** 200 → `result`

(one of 2 variants; showing the first)
- `created_on`: string **required** — When the Application was created.
- `id`: string **required** — App identifier.
- `modified_on`: string **required** — When the Application was last modified.
- `argo_smart_routing`: boolean default: `false` — Enables Argo Smart Routing for this application.
- `dns`: object **required** — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the application.
  - `type`: string enum: `CNAME`, `ADDRESS` — The type of DNS record associated with the application.
- `edge_ips`: any default: `[object Object]` — The anycast edge IP configuration for the hostname of this application.
- `ip_firewall`: boolean default: `false` — Enables IP Access Rules for this application.
- `origin_direct`: string[] — List of origin IP addresses. Array may contain multiple IP addresses for load balancing.
  [array]
- `origin_dns`: object — The name and type of DNS record for the Spectrum application.
  - `name`: string — The name of the DNS record associated with the origin.
  - `ttl`: integer — The TTL of our resolution of your DNS record in seconds.
  - `type`: string enum: ``, `A`, `AAAA`, `SRV` — The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.
- `origin_port`: any — The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for e
- `origin_worker_id`: string — Optional Worker script tag (worker ID) to use as the application's origin. Only supported for TCP applications with traffic_type "worker"; m
- `origin_worker_name`: string — Name of the Worker origin. Omitted when the Worker is not found or its name cannot be resolved.
- `origin_worker_status`: string enum: `available`, `not_found`, `unknown` — Lookup status of the Worker origin. Unknown indicates that its name could not be resolved. Only returned for Worker origins.
- `protocol`: string **required** — The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/100
- `proxy_protocol`: string enum: `off`, `v1`, `v2`, `simple` default: `off` — Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-prot
- `tls`: string enum: `off`, `flexible`, `full`, `strict` default: `off` — The type of TLS termination associated with the application.
- `traffic_type`: string **required** enum: `direct`, `http`, `https`, `worker` default: `direct` — Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the 
- `virtual_network_id`: string — Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

## GET /zones/{zone_id}/spectrum/protocols

List Spectrum application protocols

operationId: `spectrum-applications-list-spectrum-application-protocols`

**Response** 200 → `result`

[array of]
- `description`: string **required** — The full name of the application protocol.
- `name`: string **required** — The short name of the application protocol.
- `ports`: integer[] **required** — The available listening ports for the given protocol.
  [array]
- `transport`: string **required** — The transport layer protocol used by the application protocol
