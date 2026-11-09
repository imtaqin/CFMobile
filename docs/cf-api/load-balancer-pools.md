# Load Balancer Pools

10 endpoints.

## GET /user/load_balancers/pools

List Pools

operationId: `load-balancer-pools-list-pools` · query: `monitor`

**Response** 200 → `result`

[array of]
- `check_regions`: string[] — A list of regions from which to run health checks. Null means every Cloudflare data center.
  [array]
- `created_on`: string
- `description`: string default: `` — A human-readable description of the pool.
- `disabled_at`: string — This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at.
- `enabled`: boolean default: `true` — Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling
- `health_sources`: string[] — A list of health sources, ordered from highest to lowest priority, used to evaluate individual origin health and overall pool health. The lo
  [array]
- `id`: string
- `latitude`: number — The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set.
- `load_shedding`: object — Configures load shedding policies and percentages for the pool.
  - `default_percent`: number default: `0` — The percent of traffic to shed from the pool, according to the default policy. Applies to new sessions and traffic without session affinity.
  - `default_policy`: string enum: `random`, `hash` default: `random` — The default policy to use when load shedding. A random policy randomly sheds a given percent of requests. A hash policy computes a hash over
  - `session_percent`: number default: `0` — The percent of existing sessions to shed from the pool, according to the session policy.
  - `session_policy`: string enum: `hash` default: `hash` — Only the hash policy is supported for existing sessions (to avoid exponential decay).
- `longitude`: number — The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set.
- `minimum_origins`: integer default: `1` — The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number,
- `modified_on`: string
- `monitor`: string — The ID of the Monitor to use for checking the health of origins within this pool.
- `monitor_group`: string — The ID of the Monitor Group to use for checking the health of origins within this pool.
- `name`: string — A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.
- `networks`: string[] — List of networks where Load Balancer or Pool is enabled.
  [array]
- `notification_email`: string default: `` — This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundament
- `notification_filter`: object — Filter pool and origin health notifications by resource type or health status. Use null to reset.
  - `origin`: object — Filter options for a particular resource type (pool or origin). Use null to reset.
    - `disable`: boolean default: `false` — If set true, disable notifications for this type of resource (pool or origin).
    - `healthy`: boolean — If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).
  - `pool`: object — Filter options for a particular resource type (pool or origin). Use null to reset.
    - `disable`: boolean default: `false` — If set true, disable notifications for this type of resource (pool or origin).
    - `healthy`: boolean — If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).
- `origin_steering`: object — Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity.
  - `policy`: string enum: `random`, `hash`, `least_outstanding_requests`, `least_connections` default: `random` — The type of origin steering policy to use.
- `origins`: object[] — The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itse
  [array of]
  - `address`: string — The IP address (IPv4 or IPv6) of the origin, or its publicly addressable hostname. Hostnames entered here should resolve directly to the ori
  - `disabled_at`: string — This field shows up only if the origin is disabled. This field is set with the time the origin was disabled.
  - `enabled`: boolean default: `true` — Whether to enable (the default) this origin within the pool. Disabled origins will not receive traffic and are excluded from health checks. 
  - `flatten_cname`: boolean default: `true` — Whether to flatten CNAME records for this origin, resolving them to A/AAAA records before returning to the client. When true (the default), 
  - `header`: object — The request header is used to pass additional information with an HTTP request. Currently supported header is 'Host'.
    - `Host`: string[] — The 'Host' header allows to override the hostname set in the HTTP request. Current support is 1 'Host' header override per origin.
  - `name`: string — A human-identifiable name for the origin.
  - `port`: integer default: `0` — The port for upstream connections. A value of 0 means the default port for the protocol will be used.
  - `virtual_network_id`: string — The virtual network subnet ID the origin belongs in. Virtual network must also belong to the account.
  - `weight`: number default: `1` — The weight of this origin relative to other origins in the pool. Based on the configured weight the total traffic is distributed among origi

## PATCH /user/load_balancers/pools

Patch Pools

operationId: `load-balancer-pools-patch-pools`

**Request** (application/json)

- `notification_email`: string enum: `` — The email address to send health status notifications to. This field is now deprecated in favor of Cloudflare Notifications for Load Balanci

**Response** 200 → `result`

[array of]
- `check_regions`: string[] — A list of regions from which to run health checks. Null means every Cloudflare data center.
  [array]
- `created_on`: string
- `description`: string default: `` — A human-readable description of the pool.
- `disabled_at`: string — This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at.
- `enabled`: boolean default: `true` — Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling
- `health_sources`: string[] — A list of health sources, ordered from highest to lowest priority, used to evaluate individual origin health and overall pool health. The lo
  [array]
- `id`: string
- `latitude`: number — The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set.
- `load_shedding`: object — Configures load shedding policies and percentages for the pool.
  - `default_percent`: number default: `0` — The percent of traffic to shed from the pool, according to the default policy. Applies to new sessions and traffic without session affinity.
  - `default_policy`: string enum: `random`, `hash` default: `random` — The default policy to use when load shedding. A random policy randomly sheds a given percent of requests. A hash policy computes a hash over
  - `session_percent`: number default: `0` — The percent of existing sessions to shed from the pool, according to the session policy.
  - `session_policy`: string enum: `hash` default: `hash` — Only the hash policy is supported for existing sessions (to avoid exponential decay).
- `longitude`: number — The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set.
- `minimum_origins`: integer default: `1` — The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number,
- `modified_on`: string
- `monitor`: string — The ID of the Monitor to use for checking the health of origins within this pool.
- `monitor_group`: string — The ID of the Monitor Group to use for checking the health of origins within this pool.
- `name`: string — A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.
- `networks`: string[] — List of networks where Load Balancer or Pool is enabled.
  [array]
- `notification_email`: string default: `` — This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundament
- `notification_filter`: object — Filter pool and origin health notifications by resource type or health status. Use null to reset.
  - `origin`: object — Filter options for a particular resource type (pool or origin). Use null to reset.
    - `disable`: boolean default: `false` — If set true, disable notifications for this type of resource (pool or origin).
    - `healthy`: boolean — If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).
  - `pool`: object — Filter options for a particular resource type (pool or origin). Use null to reset.
    - `disable`: boolean default: `false` — If set true, disable notifications for this type of resource (pool or origin).
    - `healthy`: boolean — If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).
- `origin_steering`: object — Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity.
  - `policy`: string enum: `random`, `hash`, `least_outstanding_requests`, `least_connections` default: `random` — The type of origin steering policy to use.
- `origins`: object[] — The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itse
  [array of]
  - `address`: string — The IP address (IPv4 or IPv6) of the origin, or its publicly addressable hostname. Hostnames entered here should resolve directly to the ori
  - `disabled_at`: string — This field shows up only if the origin is disabled. This field is set with the time the origin was disabled.
  - `enabled`: boolean default: `true` — Whether to enable (the default) this origin within the pool. Disabled origins will not receive traffic and are excluded from health checks. 
  - `flatten_cname`: boolean default: `true` — Whether to flatten CNAME records for this origin, resolving them to A/AAAA records before returning to the client. When true (the default), 
  - `header`: object — The request header is used to pass additional information with an HTTP request. Currently supported header is 'Host'.
    - `Host`: string[] — The 'Host' header allows to override the hostname set in the HTTP request. Current support is 1 'Host' header override per origin.
  - `name`: string — A human-identifiable name for the origin.
  - `port`: integer default: `0` — The port for upstream connections. A value of 0 means the default port for the protocol will be used.
  - `virtual_network_id`: string — The virtual network subnet ID the origin belongs in. Virtual network must also belong to the account.
  - `weight`: number default: `1` — The weight of this origin relative to other origins in the pool. Based on the configured weight the total traffic is distributed among origi

## POST /user/load_balancers/pools

Create Pool

operationId: `load-balancer-pools-create-pool`

**Request** (application/json)

- `check_regions`: string[] — A list of regions from which to run health checks. Null means every Cloudflare data center.
  [array]
- `description`: string default: `` — A human-readable description of the pool.
- `enabled`: boolean default: `true` — Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling
- `health_sources`: string[] — A list of health sources, ordered from highest to lowest priority, used to evaluate individual origin health and overall pool health. The lo
  [array]
- `latitude`: number — The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set.
- `load_shedding`: object — Configures load shedding policies and percentages for the pool.
  - `default_percent`: number default: `0` — The percent of traffic to shed from the pool, according to the default policy. Applies to new sessions and traffic without session affinity.
  - `default_policy`: string enum: `random`, `hash` default: `random` — The default policy to use when load shedding. A random policy randomly sheds a given percent of requests. A hash policy computes a hash over
  - `session_percent`: number default: `0` — The percent of existing sessions to shed from the pool, according to the session policy.
  - `session_policy`: string enum: `hash` default: `hash` — Only the hash policy is supported for existing sessions (to avoid exponential decay).
- `longitude`: number — The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set.
- `minimum_origins`: integer default: `1` — The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number,
- `monitor`: string — The ID of the Monitor to use for checking the health of origins within this pool.
- `monitor_group`: string — The ID of the Monitor Group to use for checking the health of origins within this pool.
- `name`: string **required** — A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.
- `networks`: string[] — List of networks where Load Balancer or Pool is enabled.
  [array]
- `notification_email`: string default: `` — This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundament
- `notification_filter`: object — Filter pool and origin health notifications by resource type or health status. Use null to reset.
  - `origin`: object — Filter options for a particular resource type (pool or origin). Use null to reset.
    - `disable`: boolean default: `false` — If set true, disable notifications for this type of resource (pool or origin).
    - `healthy`: boolean — If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).
  - `pool`: object — Filter options for a particular resource type (pool or origin). Use null to reset.
    - `disable`: boolean default: `false` — If set true, disable notifications for this type of resource (pool or origin).
    - `healthy`: boolean — If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).
- `origin_steering`: object — Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity.
  - `policy`: string enum: `random`, `hash`, `least_outstanding_requests`, `least_connections` default: `random` — The type of origin steering policy to use.
- `origins`: object[] **required** — The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itse
  [array of]
  - `address`: string — The IP address (IPv4 or IPv6) of the origin, or its publicly addressable hostname. Hostnames entered here should resolve directly to the ori
  - `disabled_at`: string — This field shows up only if the origin is disabled. This field is set with the time the origin was disabled.
  - `enabled`: boolean default: `true` — Whether to enable (the default) this origin within the pool. Disabled origins will not receive traffic and are excluded from health checks. 
  - `flatten_cname`: boolean default: `true` — Whether to flatten CNAME records for this origin, resolving them to A/AAAA records before returning to the client. When true (the default), 
  - `header`: object — The request header is used to pass additional information with an HTTP request. Currently supported header is 'Host'.
    - `Host`: string[] — The 'Host' header allows to override the hostname set in the HTTP request. Current support is 1 'Host' header override per origin.
  - `name`: string — A human-identifiable name for the origin.
  - `port`: integer default: `0` — The port for upstream connections. A value of 0 means the default port for the protocol will be used.
  - `virtual_network_id`: string — The virtual network subnet ID the origin belongs in. Virtual network must also belong to the account.
  - `weight`: number default: `1` — The weight of this origin relative to other origins in the pool. Based on the configured weight the total traffic is distributed among origi

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## DELETE /user/load_balancers/pools/{pool_id}

Delete Pool

operationId: `load-balancer-pools-delete-pool`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /user/load_balancers/pools/{pool_id}

Pool Details

operationId: `load-balancer-pools-pool-details`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## PATCH /user/load_balancers/pools/{pool_id}

Patch Pool

operationId: `load-balancer-pools-patch-pool`

**Request** (application/json)

- `check_regions`: string[] — A list of regions from which to run health checks. Null means every Cloudflare data center.
  [array]
- `description`: string default: `` — A human-readable description of the pool.
- `disabled_at`: string — This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at.
- `enabled`: boolean default: `true` — Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling
- `health_sources`: string[] — A list of health sources, ordered from highest to lowest priority, used to evaluate individual origin health and overall pool health. The lo
  [array]
- `latitude`: number — The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set.
- `load_shedding`: object — Configures load shedding policies and percentages for the pool.
  - `default_percent`: number default: `0` — The percent of traffic to shed from the pool, according to the default policy. Applies to new sessions and traffic without session affinity.
  - `default_policy`: string enum: `random`, `hash` default: `random` — The default policy to use when load shedding. A random policy randomly sheds a given percent of requests. A hash policy computes a hash over
  - `session_percent`: number default: `0` — The percent of existing sessions to shed from the pool, according to the session policy.
  - `session_policy`: string enum: `hash` default: `hash` — Only the hash policy is supported for existing sessions (to avoid exponential decay).
- `longitude`: number — The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set.
- `minimum_origins`: integer default: `1` — The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number,
- `monitor`: string — The ID of the Monitor to use for checking the health of origins within this pool.
- `monitor_group`: string — The ID of the Monitor Group to use for checking the health of origins within this pool.
- `name`: string — A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.
- `networks`: string[] — List of networks where Load Balancer or Pool is enabled.
  [array]
- `notification_email`: string default: `` — This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundament
- `notification_filter`: object — Filter pool and origin health notifications by resource type or health status. Use null to reset.
  - `origin`: object — Filter options for a particular resource type (pool or origin). Use null to reset.
    - `disable`: boolean default: `false` — If set true, disable notifications for this type of resource (pool or origin).
    - `healthy`: boolean — If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).
  - `pool`: object — Filter options for a particular resource type (pool or origin). Use null to reset.
    - `disable`: boolean default: `false` — If set true, disable notifications for this type of resource (pool or origin).
    - `healthy`: boolean — If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).
- `origin_steering`: object — Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity.
  - `policy`: string enum: `random`, `hash`, `least_outstanding_requests`, `least_connections` default: `random` — The type of origin steering policy to use.
- `origins`: object[] — The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itse
  [array of]
  - `address`: string — The IP address (IPv4 or IPv6) of the origin, or its publicly addressable hostname. Hostnames entered here should resolve directly to the ori
  - `disabled_at`: string — This field shows up only if the origin is disabled. This field is set with the time the origin was disabled.
  - `enabled`: boolean default: `true` — Whether to enable (the default) this origin within the pool. Disabled origins will not receive traffic and are excluded from health checks. 
  - `flatten_cname`: boolean default: `true` — Whether to flatten CNAME records for this origin, resolving them to A/AAAA records before returning to the client. When true (the default), 
  - `header`: object — The request header is used to pass additional information with an HTTP request. Currently supported header is 'Host'.
    - `Host`: string[] — The 'Host' header allows to override the hostname set in the HTTP request. Current support is 1 'Host' header override per origin.
  - `name`: string — A human-identifiable name for the origin.
  - `port`: integer default: `0` — The port for upstream connections. A value of 0 means the default port for the protocol will be used.
  - `virtual_network_id`: string — The virtual network subnet ID the origin belongs in. Virtual network must also belong to the account.
  - `weight`: number default: `1` — The weight of this origin relative to other origins in the pool. Based on the configured weight the total traffic is distributed among origi

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## PUT /user/load_balancers/pools/{pool_id}

Update Pool

operationId: `load-balancer-pools-update-pool`

**Request** (application/json)

- `check_regions`: string[] — A list of regions from which to run health checks. Null means every Cloudflare data center.
  [array]
- `description`: string default: `` — A human-readable description of the pool.
- `disabled_at`: string — This field shows up only if the pool is disabled. This field is set with the time the pool was disabled at.
- `enabled`: boolean default: `true` — Whether to enable (the default) or disable this pool. Disabled pools will not receive traffic and are excluded from health checks. Disabling
- `health_sources`: string[] — A list of health sources, ordered from highest to lowest priority, used to evaluate individual origin health and overall pool health. The lo
  [array]
- `latitude`: number — The latitude of the data center containing the origins used in this pool in decimal degrees. If this is set, longitude must also be set.
- `load_shedding`: object — Configures load shedding policies and percentages for the pool.
  - `default_percent`: number default: `0` — The percent of traffic to shed from the pool, according to the default policy. Applies to new sessions and traffic without session affinity.
  - `default_policy`: string enum: `random`, `hash` default: `random` — The default policy to use when load shedding. A random policy randomly sheds a given percent of requests. A hash policy computes a hash over
  - `session_percent`: number default: `0` — The percent of existing sessions to shed from the pool, according to the session policy.
  - `session_policy`: string enum: `hash` default: `hash` — Only the hash policy is supported for existing sessions (to avoid exponential decay).
- `longitude`: number — The longitude of the data center containing the origins used in this pool in decimal degrees. If this is set, latitude must also be set.
- `minimum_origins`: integer default: `1` — The minimum number of origins that must be healthy for this pool to serve traffic. If the number of healthy origins falls below this number,
- `monitor`: string — The ID of the Monitor to use for checking the health of origins within this pool.
- `monitor_group`: string — The ID of the Monitor Group to use for checking the health of origins within this pool.
- `name`: string **required** — A short name (tag) for the pool. Only alphanumeric characters, hyphens, and underscores are allowed.
- `networks`: string[] — List of networks where Load Balancer or Pool is enabled.
  [array]
- `notification_email`: string default: `` — This field is now deprecated. It has been moved to Cloudflare's Centralized Notification service https://developers.cloudflare.com/fundament
- `notification_filter`: object — Filter pool and origin health notifications by resource type or health status. Use null to reset.
  - `origin`: object — Filter options for a particular resource type (pool or origin). Use null to reset.
    - `disable`: boolean default: `false` — If set true, disable notifications for this type of resource (pool or origin).
    - `healthy`: boolean — If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).
  - `pool`: object — Filter options for a particular resource type (pool or origin). Use null to reset.
    - `disable`: boolean default: `false` — If set true, disable notifications for this type of resource (pool or origin).
    - `healthy`: boolean — If present, send notifications only for this health status (e.g. false for only DOWN events). Use null to reset (all events).
- `origin_steering`: object — Configures origin steering for the pool. Controls how origins are selected for new sessions and traffic without session affinity.
  - `policy`: string enum: `random`, `hash`, `least_outstanding_requests`, `least_connections` default: `random` — The type of origin steering policy to use.
- `origins`: object[] **required** — The list of origins within this pool. Traffic directed at this pool is balanced across all currently healthy origins, provided the pool itse
  [array of]
  - `address`: string — The IP address (IPv4 or IPv6) of the origin, or its publicly addressable hostname. Hostnames entered here should resolve directly to the ori
  - `disabled_at`: string — This field shows up only if the origin is disabled. This field is set with the time the origin was disabled.
  - `enabled`: boolean default: `true` — Whether to enable (the default) this origin within the pool. Disabled origins will not receive traffic and are excluded from health checks. 
  - `flatten_cname`: boolean default: `true` — Whether to flatten CNAME records for this origin, resolving them to A/AAAA records before returning to the client. When true (the default), 
  - `header`: object — The request header is used to pass additional information with an HTTP request. Currently supported header is 'Host'.
    - `Host`: string[] — The 'Host' header allows to override the hostname set in the HTTP request. Current support is 1 'Host' header override per origin.
  - `name`: string — A human-identifiable name for the origin.
  - `port`: integer default: `0` — The port for upstream connections. A value of 0 means the default port for the protocol will be used.
  - `virtual_network_id`: string — The virtual network subnet ID the origin belongs in. Virtual network must also belong to the account.
  - `weight`: number default: `1` — The weight of this origin relative to other origins in the pool. Based on the configured weight the total traffic is distributed among origi

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /user/load_balancers/pools/{pool_id}/health

Pool Health Details

operationId: `load-balancer-pools-pool-health-details`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## POST /user/load_balancers/pools/{pool_id}/preview

Preview Pool

operationId: `load-balancer-pools-preview-pool`

**Request** (application/json)

- `allow_insecure`: boolean default: `false` — Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.
- `consecutive_down`: integer — To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.
- `consecutive_up`: integer — To be marked healthy the monitored origin must pass this healthcheck N consecutive times.
- `description`: string default: `` — Object description.
- `expected_body`: string default: `` — A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This pa
- `expected_codes`: string default: `` — The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors.
- `follow_redirects`: boolean default: `false` — Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors.
- `header`: object — The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be ov
- `interval`: integer default: `60` — The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from 
- `method`: string — The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health
- `path`: string — The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors.
- `port`: integer — The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the por
- `probe_zone`: string default: `` — Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors.
- `retries`: integer default: `2` — The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.
- `timeout`: integer default: `5` — The timeout (in seconds) before marking the health check as failed.
- `type`: string enum: `http`, `https`, `tcp`, `udp_icmp`, `icmp_ping`, `smtp` default: `http` — The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'.

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /user/load_balancers/pools/{pool_id}/references

List Pool References

operationId: `load-balancer-pools-list-pool-references`

**Response** 200 → `result`

[array of]
- `reference_type`: string enum: `*`, `referral`, `referrer`
- `resource_id`: string
- `resource_name`: string
- `resource_type`: string
