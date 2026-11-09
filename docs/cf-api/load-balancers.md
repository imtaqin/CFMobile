# Load Balancers

6 endpoints.

## GET /zones/{zone_id}/load_balancers

List Load Balancers

operationId: `load-balancers-list-load-balancers`

**Response** 200 → `result`

[array of]
- `adaptive_routing`: object — Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval be
  - `failover_across_pools`: boolean default: `false` — Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, accor
- `country_pools`: object — A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defi
- `created_on`: string
- `default_pools`: string[] — A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a
  [array]
- `description`: string — Object description.
- `enabled`: boolean default: `true` — Whether to enable (the default) this load balancer.
- `fallback_pool`: string — The pool ID to use when all other pools are detected as unhealthy.
- `id`: string
- `location_strategy`: object — Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.
  - `mode`: string enum: `pop`, `resolver_ip` default: `pop` — Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.
  - `prefer_ecs`: string enum: `always`, `never`, `proximity`, `geo` default: `proximity` — Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.
- `modified_on`: string
- `name`: string — The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balance
- `networks`: string[] — List of networks where Load Balancer or Pool is enabled.
  [array]
- `pool_sets`: object[] — An optional list of pool sets, evaluated in array order with first match wins. Pool sets are independent from the standard steering fields (
  [array of]
  - `disabled`: boolean default: `false` — Disable this specific pool set. It will no longer be evaluated.
  - `fixed_response`: object — A collection of fields used to directly respond to the client instead of routing to a pool. When supplied on a rule, that rule stops further
    - `content_type`: string — The http 'Content-Type' header to include in the response.
    - `location`: string — The http 'Location' header to include in the response.
    - `message_body`: string — Text to include as the http body.
    - `status_code`: integer — The http status code to respond with.
  - `match`: object — Determines which requests a pool set applies to. Set `topology` to match by location or `default: true` to match all requests; the two are m
    - `default`: boolean default: `false` — When true, matches every request. Cannot be combined with `topology`.
    - `topology`: object — Matches requests by location. Set any combination of `pops`, `countries`, and `regions` (at least one is required); a request matches when i
  - `name`: string — A human-readable name for this pool set.
  - `overrides`: object — The behavior a pool set applies when its `match` succeeds. A strict subset of a rule's `overrides`: a pool set replaces the topology wholesa
    - `fallback_pool`: string — The pool ID to use when all other pools are detected as unhealthy.
    - `pool_default_weight`: number — The default weight for pools not listed in `pool_weights`. The declarative alternative to `random_steering.default_weight`; mutually exclusi
    - `pool_weights`: object — A mapping of pool IDs to custom weights, relative to the other pools. The declarative alternative to `random_steering.pool_weights`; mutuall
    - `pools`: string[] — A flat, ordered list of pool IDs to route the matched audience to. Replaces the resolved topology with exactly these pools. Mutually exclusi
    - `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
- `pop_pools`: object — Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter)
- `proxied`: boolean default: `false` — Whether the hostname should be gray clouded (false) or orange clouded (true).
- `random_steering`: object — Configures pool weights.
  - `default_weight`: number default: `1` — The default weight for pools in the load balancer that are not specified in the pool_weights map.
  - `pool_weights`: object — A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.
- `region_pools`: object — A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly define
- `rules`: object[] — BETA Field Not General Access: A list of rules for this load balancer to execute.
  [array of]
  - `condition`: string — The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An 
  - `disabled`: boolean default: `false` — Disable this specific rule. It will no longer be evaluated by this load balancer.
  - `fixed_response`: object — A collection of fields used to directly respond to the client instead of routing to a pool. When supplied on a rule, that rule stops further
    - `content_type`: string — The http 'Content-Type' header to include in the response.
    - `location`: string — The http 'Location' header to include in the response.
    - `message_body`: string — Text to include as the http body.
    - `status_code`: integer — The http status code to respond with.
  - `name`: string — Name of this rule. Only used for human readability.
  - `overrides`: object — A collection of overrides to apply when this rule's condition (or a pool set's `match`) is true. All fields are optional.
    - `adaptive_routing`: object — Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval be
    - `country_pools`: object — A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defi
    - `default_pools`: string[] — A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a
    - `fallback_pool`: string — The pool ID to use when all other pools are detected as unhealthy.
    - `location_strategy`: object — Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.
    - `pool_default_weight`: number — The default weight for pools not listed in `pool_weights`. The declarative alternative to `random_steering.default_weight`; mutually exclusi
    - `pool_weights`: object — A mapping of pool IDs to custom weights, relative to the other pools. The declarative alternative to `random_steering.pool_weights`; mutuall
    - `pools`: string[] — A flat, ordered list of pool IDs to route the matched audience to. Replaces the resolved topology with exactly these pools. Mutually exclusi
    - `pop_pools`: object — Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter)
    - `random_steering`: object — Configures pool weights for a rule override. An omitted default_weight inherits the load balancer's default weight.
    - `region_pools`: object — A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly define
    - `session_affinity`: string enum: `none`, `cookie`, `ip_cookie`, `header` default: `none` — Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On 
    - `session_affinity_attributes`: object — Configures attributes for session affinity.
    - `session_affinity_ttl`: number — Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get s
    - `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
    - `ttl`: number — Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load ba
  - `priority`: integer — The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential.
  - `terminates`: boolean — If this rule's condition is true, this causes rule evaluation to stop after processing this rule.
- `session_affinity`: string enum: `none`, `cookie`, `ip_cookie`, `header` default: `none` — Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On 
- `session_affinity_attributes`: object — Configures attributes for session affinity.
  - `drain_duration`: number — Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.
  - `headers`: string[] default: `` — Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name mu
    [array]
  - `require_all_headers`: boolean default: `false` — When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The 
  - `samesite`: string enum: `Auto`, `Lax`, `None`, `Strict` default: `Auto` — Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTT
  - `secure`: string enum: `Auto`, `Always`, `Never` default: `Auto` — Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie head
  - `zero_downtime_failover`: string enum: `none`, `temporary`, `sticky` default: `none` — Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible
- `session_affinity_ttl`: number — Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get s
- `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
- `ttl`: number — Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load ba
- `zone_name`: string

## POST /zones/{zone_id}/load_balancers

Create Load Balancer

operationId: `load-balancers-create-load-balancer`

**Request** (application/json)

- `adaptive_routing`: object — Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval be
  - `failover_across_pools`: boolean default: `false` — Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, accor
- `country_pools`: object — A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defi
- `default_pools`: string[] **required** — A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a
  [array]
- `description`: string — Object description.
- `enabled`: boolean default: `true` — Whether to enable (the default) this load balancer.
- `fallback_pool`: string **required** — The pool ID to use when all other pools are detected as unhealthy.
- `location_strategy`: object — Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.
  - `mode`: string enum: `pop`, `resolver_ip` default: `pop` — Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.
  - `prefer_ecs`: string enum: `always`, `never`, `proximity`, `geo` default: `proximity` — Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.
- `name`: string **required** — The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balance
- `networks`: string[] — List of networks where Load Balancer or Pool is enabled.
  [array]
- `pool_sets`: object[] — An optional list of pool sets, evaluated in array order with first match wins. Pool sets are independent from the standard steering fields (
  [array of]
  - `disabled`: boolean default: `false` — Disable this specific pool set. It will no longer be evaluated.
  - `fixed_response`: object — A collection of fields used to directly respond to the client instead of routing to a pool. When supplied on a rule, that rule stops further
    - `content_type`: string — The http 'Content-Type' header to include in the response.
    - `location`: string — The http 'Location' header to include in the response.
    - `message_body`: string — Text to include as the http body.
    - `status_code`: integer — The http status code to respond with.
  - `match`: object — Determines which requests a pool set applies to. Set `topology` to match by location or `default: true` to match all requests; the two are m
    - `default`: boolean default: `false` — When true, matches every request. Cannot be combined with `topology`.
    - `topology`: object — Matches requests by location. Set any combination of `pops`, `countries`, and `regions` (at least one is required); a request matches when i
  - `name`: string — A human-readable name for this pool set.
  - `overrides`: object — The behavior a pool set applies when its `match` succeeds. A strict subset of a rule's `overrides`: a pool set replaces the topology wholesa
    - `fallback_pool`: string — The pool ID to use when all other pools are detected as unhealthy.
    - `pool_default_weight`: number — The default weight for pools not listed in `pool_weights`. The declarative alternative to `random_steering.default_weight`; mutually exclusi
    - `pool_weights`: object — A mapping of pool IDs to custom weights, relative to the other pools. The declarative alternative to `random_steering.pool_weights`; mutuall
    - `pools`: string[] — A flat, ordered list of pool IDs to route the matched audience to. Replaces the resolved topology with exactly these pools. Mutually exclusi
    - `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
- `pop_pools`: object — Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter)
- `proxied`: boolean default: `false` — Whether the hostname should be gray clouded (false) or orange clouded (true).
- `random_steering`: object — Configures pool weights.
  - `default_weight`: number default: `1` — The default weight for pools in the load balancer that are not specified in the pool_weights map.
  - `pool_weights`: object — A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.
- `region_pools`: object — A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly define
- `rules`: object[] — BETA Field Not General Access: A list of rules for this load balancer to execute.
  [array of]
  - `condition`: string — The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An 
  - `disabled`: boolean default: `false` — Disable this specific rule. It will no longer be evaluated by this load balancer.
  - `fixed_response`: object — A collection of fields used to directly respond to the client instead of routing to a pool. When supplied on a rule, that rule stops further
    - `content_type`: string — The http 'Content-Type' header to include in the response.
    - `location`: string — The http 'Location' header to include in the response.
    - `message_body`: string — Text to include as the http body.
    - `status_code`: integer — The http status code to respond with.
  - `name`: string — Name of this rule. Only used for human readability.
  - `overrides`: object — A collection of overrides to apply when this rule's condition (or a pool set's `match`) is true. All fields are optional.
    - `adaptive_routing`: object — Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval be
    - `country_pools`: object — A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defi
    - `default_pools`: string[] — A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a
    - `fallback_pool`: string — The pool ID to use when all other pools are detected as unhealthy.
    - `location_strategy`: object — Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.
    - `pool_default_weight`: number — The default weight for pools not listed in `pool_weights`. The declarative alternative to `random_steering.default_weight`; mutually exclusi
    - `pool_weights`: object — A mapping of pool IDs to custom weights, relative to the other pools. The declarative alternative to `random_steering.pool_weights`; mutuall
    - `pools`: string[] — A flat, ordered list of pool IDs to route the matched audience to. Replaces the resolved topology with exactly these pools. Mutually exclusi
    - `pop_pools`: object — Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter)
    - `random_steering`: object — Configures pool weights for a rule override. An omitted default_weight inherits the load balancer's default weight.
    - `region_pools`: object — A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly define
    - `session_affinity`: string enum: `none`, `cookie`, `ip_cookie`, `header` default: `none` — Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On 
    - `session_affinity_attributes`: object — Configures attributes for session affinity.
    - `session_affinity_ttl`: number — Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get s
    - `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
    - `ttl`: number — Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load ba
  - `priority`: integer — The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential.
  - `terminates`: boolean — If this rule's condition is true, this causes rule evaluation to stop after processing this rule.
- `session_affinity`: string enum: `none`, `cookie`, `ip_cookie`, `header` default: `none` — Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On 
- `session_affinity_attributes`: object — Configures attributes for session affinity.
  - `drain_duration`: number — Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.
  - `headers`: string[] default: `` — Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name mu
    [array]
  - `require_all_headers`: boolean default: `false` — When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The 
  - `samesite`: string enum: `Auto`, `Lax`, `None`, `Strict` default: `Auto` — Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTT
  - `secure`: string enum: `Auto`, `Always`, `Never` default: `Auto` — Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie head
  - `zero_downtime_failover`: string enum: `none`, `temporary`, `sticky` default: `none` — Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible
- `session_affinity_ttl`: number — Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get s
- `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
- `ttl`: number — Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load ba

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## DELETE /zones/{zone_id}/load_balancers/{load_balancer_id}

Delete Load Balancer

operationId: `load-balancers-delete-load-balancer`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## GET /zones/{zone_id}/load_balancers/{load_balancer_id}

Load Balancer Details

operationId: `load-balancers-load-balancer-details`

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## PATCH /zones/{zone_id}/load_balancers/{load_balancer_id}

Patch Load Balancer

operationId: `load-balancers-patch-load-balancer`

**Request** (application/json)

- `adaptive_routing`: object — Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval be
  - `failover_across_pools`: boolean default: `false` — Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, accor
- `country_pools`: object — A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defi
- `default_pools`: string[] — A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a
  [array]
- `description`: string — Object description.
- `enabled`: boolean default: `true` — Whether to enable (the default) this load balancer.
- `fallback_pool`: string — The pool ID to use when all other pools are detected as unhealthy.
- `location_strategy`: object — Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.
  - `mode`: string enum: `pop`, `resolver_ip` default: `pop` — Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.
  - `prefer_ecs`: string enum: `always`, `never`, `proximity`, `geo` default: `proximity` — Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.
- `name`: string — The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balance
- `networks`: string[] — List of networks where Load Balancer or Pool is enabled.
  [array]
- `pool_sets`: object[] — An optional list of pool sets, evaluated in array order with first match wins. Pool sets are independent from the standard steering fields (
  [array of]
  - `disabled`: boolean default: `false` — Disable this specific pool set. It will no longer be evaluated.
  - `fixed_response`: object — A collection of fields used to directly respond to the client instead of routing to a pool. When supplied on a rule, that rule stops further
    - `content_type`: string — The http 'Content-Type' header to include in the response.
    - `location`: string — The http 'Location' header to include in the response.
    - `message_body`: string — Text to include as the http body.
    - `status_code`: integer — The http status code to respond with.
  - `match`: object — Determines which requests a pool set applies to. Set `topology` to match by location or `default: true` to match all requests; the two are m
    - `default`: boolean default: `false` — When true, matches every request. Cannot be combined with `topology`.
    - `topology`: object — Matches requests by location. Set any combination of `pops`, `countries`, and `regions` (at least one is required); a request matches when i
  - `name`: string — A human-readable name for this pool set.
  - `overrides`: object — The behavior a pool set applies when its `match` succeeds. A strict subset of a rule's `overrides`: a pool set replaces the topology wholesa
    - `fallback_pool`: string — The pool ID to use when all other pools are detected as unhealthy.
    - `pool_default_weight`: number — The default weight for pools not listed in `pool_weights`. The declarative alternative to `random_steering.default_weight`; mutually exclusi
    - `pool_weights`: object — A mapping of pool IDs to custom weights, relative to the other pools. The declarative alternative to `random_steering.pool_weights`; mutuall
    - `pools`: string[] — A flat, ordered list of pool IDs to route the matched audience to. Replaces the resolved topology with exactly these pools. Mutually exclusi
    - `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
- `pop_pools`: object — Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter)
- `proxied`: boolean default: `false` — Whether the hostname should be gray clouded (false) or orange clouded (true).
- `random_steering`: object — Configures pool weights.
  - `default_weight`: number default: `1` — The default weight for pools in the load balancer that are not specified in the pool_weights map.
  - `pool_weights`: object — A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.
- `region_pools`: object — A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly define
- `rules`: object[] — BETA Field Not General Access: A list of rules for this load balancer to execute.
  [array of]
  - `condition`: string — The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An 
  - `disabled`: boolean default: `false` — Disable this specific rule. It will no longer be evaluated by this load balancer.
  - `fixed_response`: object — A collection of fields used to directly respond to the client instead of routing to a pool. When supplied on a rule, that rule stops further
    - `content_type`: string — The http 'Content-Type' header to include in the response.
    - `location`: string — The http 'Location' header to include in the response.
    - `message_body`: string — Text to include as the http body.
    - `status_code`: integer — The http status code to respond with.
  - `name`: string — Name of this rule. Only used for human readability.
  - `overrides`: object — A collection of overrides to apply when this rule's condition (or a pool set's `match`) is true. All fields are optional.
    - `adaptive_routing`: object — Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval be
    - `country_pools`: object — A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defi
    - `default_pools`: string[] — A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a
    - `fallback_pool`: string — The pool ID to use when all other pools are detected as unhealthy.
    - `location_strategy`: object — Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.
    - `pool_default_weight`: number — The default weight for pools not listed in `pool_weights`. The declarative alternative to `random_steering.default_weight`; mutually exclusi
    - `pool_weights`: object — A mapping of pool IDs to custom weights, relative to the other pools. The declarative alternative to `random_steering.pool_weights`; mutuall
    - `pools`: string[] — A flat, ordered list of pool IDs to route the matched audience to. Replaces the resolved topology with exactly these pools. Mutually exclusi
    - `pop_pools`: object — Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter)
    - `random_steering`: object — Configures pool weights for a rule override. An omitted default_weight inherits the load balancer's default weight.
    - `region_pools`: object — A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly define
    - `session_affinity`: string enum: `none`, `cookie`, `ip_cookie`, `header` default: `none` — Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On 
    - `session_affinity_attributes`: object — Configures attributes for session affinity.
    - `session_affinity_ttl`: number — Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get s
    - `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
    - `ttl`: number — Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load ba
  - `priority`: integer — The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential.
  - `terminates`: boolean — If this rule's condition is true, this causes rule evaluation to stop after processing this rule.
- `session_affinity`: string enum: `none`, `cookie`, `ip_cookie`, `header` default: `none` — Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On 
- `session_affinity_attributes`: object — Configures attributes for session affinity.
  - `drain_duration`: number — Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.
  - `headers`: string[] default: `` — Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name mu
    [array]
  - `require_all_headers`: boolean default: `false` — When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The 
  - `samesite`: string enum: `Auto`, `Lax`, `None`, `Strict` default: `Auto` — Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTT
  - `secure`: string enum: `Auto`, `Always`, `Never` default: `Auto` — Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie head
  - `zero_downtime_failover`: string enum: `none`, `temporary`, `sticky` default: `none` — Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible
- `session_affinity_ttl`: number — Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get s
- `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
- `ttl`: number — Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load ba

**Response** 200 → `result`

(one of 2 variants; showing the first)
object

## PUT /zones/{zone_id}/load_balancers/{load_balancer_id}

Update Load Balancer

operationId: `load-balancers-update-load-balancer`

**Request** (application/json)

- `adaptive_routing`: object — Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval be
  - `failover_across_pools`: boolean default: `false` — Extends zero-downtime failover of requests to healthy origins from alternate pools, when no healthy alternate exists in the same pool, accor
- `country_pools`: object — A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defi
- `default_pools`: string[] **required** — A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a
  [array]
- `description`: string — Object description.
- `enabled`: boolean default: `true` — Whether to enable (the default) this load balancer.
- `fallback_pool`: string **required** — The pool ID to use when all other pools are detected as unhealthy.
- `location_strategy`: object — Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.
  - `mode`: string enum: `pop`, `resolver_ip` default: `pop` — Determines the authoritative location when ECS is not preferred, does not exist in the request, or its GeoIP lookup is unsuccessful.
  - `prefer_ecs`: string enum: `always`, `never`, `proximity`, `geo` default: `proximity` — Whether the EDNS Client Subnet (ECS) GeoIP should be preferred as the authoritative location.
- `name`: string **required** — The DNS hostname to associate with your Load Balancer. If this hostname already exists as a DNS record in Cloudflare's DNS, the Load Balance
- `networks`: string[] — List of networks where Load Balancer or Pool is enabled.
  [array]
- `pool_sets`: object[] — An optional list of pool sets, evaluated in array order with first match wins. Pool sets are independent from the standard steering fields (
  [array of]
  - `disabled`: boolean default: `false` — Disable this specific pool set. It will no longer be evaluated.
  - `fixed_response`: object — A collection of fields used to directly respond to the client instead of routing to a pool. When supplied on a rule, that rule stops further
    - `content_type`: string — The http 'Content-Type' header to include in the response.
    - `location`: string — The http 'Location' header to include in the response.
    - `message_body`: string — Text to include as the http body.
    - `status_code`: integer — The http status code to respond with.
  - `match`: object — Determines which requests a pool set applies to. Set `topology` to match by location or `default: true` to match all requests; the two are m
    - `default`: boolean default: `false` — When true, matches every request. Cannot be combined with `topology`.
    - `topology`: object — Matches requests by location. Set any combination of `pops`, `countries`, and `regions` (at least one is required); a request matches when i
  - `name`: string — A human-readable name for this pool set.
  - `overrides`: object — The behavior a pool set applies when its `match` succeeds. A strict subset of a rule's `overrides`: a pool set replaces the topology wholesa
    - `fallback_pool`: string — The pool ID to use when all other pools are detected as unhealthy.
    - `pool_default_weight`: number — The default weight for pools not listed in `pool_weights`. The declarative alternative to `random_steering.default_weight`; mutually exclusi
    - `pool_weights`: object — A mapping of pool IDs to custom weights, relative to the other pools. The declarative alternative to `random_steering.pool_weights`; mutuall
    - `pools`: string[] — A flat, ordered list of pool IDs to route the matched audience to. Replaces the resolved topology with exactly these pools. Mutually exclusi
    - `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
- `pop_pools`: object — Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter)
- `proxied`: boolean default: `false` — Whether the hostname should be gray clouded (false) or orange clouded (true).
- `random_steering`: object — Configures pool weights.
  - `default_weight`: number default: `1` — The default weight for pools in the load balancer that are not specified in the pool_weights map.
  - `pool_weights`: object — A mapping of pool IDs to custom weights. The weight is relative to other pools in the load balancer.
- `region_pools`: object — A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly define
- `rules`: object[] — BETA Field Not General Access: A list of rules for this load balancer to execute.
  [array of]
  - `condition`: string — The condition expressions to evaluate. If the condition evaluates to true, the overrides or fixed_response in this rule will be applied. An 
  - `disabled`: boolean default: `false` — Disable this specific rule. It will no longer be evaluated by this load balancer.
  - `fixed_response`: object — A collection of fields used to directly respond to the client instead of routing to a pool. When supplied on a rule, that rule stops further
    - `content_type`: string — The http 'Content-Type' header to include in the response.
    - `location`: string — The http 'Location' header to include in the response.
    - `message_body`: string — Text to include as the http body.
    - `status_code`: integer — The http status code to respond with.
  - `name`: string — Name of this rule. Only used for human readability.
  - `overrides`: object — A collection of overrides to apply when this rule's condition (or a pool set's `match`) is true. All fields are optional.
    - `adaptive_routing`: object — Controls features that modify the routing of requests to pools and origins in response to dynamic conditions, such as during the interval be
    - `country_pools`: object — A mapping of country codes to a list of pool IDs (ordered by their failover priority) for the given country. Any country not explicitly defi
    - `default_pools`: string[] — A list of pool IDs ordered by their failover priority. Pools defined here are used by default, or when region_pools are not configured for a
    - `fallback_pool`: string — The pool ID to use when all other pools are detected as unhealthy.
    - `location_strategy`: object — Controls location-based steering for non-proxied requests. See `steering_policy` to learn how steering is affected.
    - `pool_default_weight`: number — The default weight for pools not listed in `pool_weights`. The declarative alternative to `random_steering.default_weight`; mutually exclusi
    - `pool_weights`: object — A mapping of pool IDs to custom weights, relative to the other pools. The declarative alternative to `random_steering.pool_weights`; mutuall
    - `pools`: string[] — A flat, ordered list of pool IDs to route the matched audience to. Replaces the resolved topology with exactly these pools. Mutually exclusi
    - `pop_pools`: object — Enterprise only: A mapping of Cloudflare PoP identifiers to a list of pool IDs (ordered by their failover priority) for the PoP (datacenter)
    - `random_steering`: object — Configures pool weights for a rule override. An omitted default_weight inherits the load balancer's default weight.
    - `region_pools`: object — A mapping of region codes to a list of pool IDs (ordered by their failover priority) for the given region. Any regions not explicitly define
    - `session_affinity`: string enum: `none`, `cookie`, `ip_cookie`, `header` default: `none` — Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On 
    - `session_affinity_attributes`: object — Configures attributes for session affinity.
    - `session_affinity_ttl`: number — Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get s
    - `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
    - `ttl`: number — Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load ba
  - `priority`: integer — The order in which rules should be executed in relation to each other. Lower values are executed first. Values do not need to be sequential.
  - `terminates`: boolean — If this rule's condition is true, this causes rule evaluation to stop after processing this rule.
- `session_affinity`: string enum: `none`, `cookie`, `ip_cookie`, `header` default: `none` — Specifies the type of session affinity the load balancer should use unless specified as `"none"`. The supported types are: - `"cookie"`: On 
- `session_affinity_attributes`: object — Configures attributes for session affinity.
  - `drain_duration`: number — Configures the drain duration in seconds. This field is only used when session affinity is enabled on the load balancer.
  - `headers`: string[] default: `` — Configures the names of HTTP headers to base session affinity on when header `session_affinity` is enabled. At least one HTTP header name mu
    [array]
  - `require_all_headers`: boolean default: `false` — When header `session_affinity` is enabled, this option can be used to specify how HTTP headers on load balancing requests will be used. The 
  - `samesite`: string enum: `Auto`, `Lax`, `None`, `Strict` default: `Auto` — Configures the SameSite attribute on session affinity cookie. Value "Auto" will be translated to "Lax" or "None" depending if Always Use HTT
  - `secure`: string enum: `Auto`, `Always`, `Never` default: `Auto` — Configures the Secure attribute on session affinity cookie. Value "Always" indicates the Secure attribute will be set in the Set-Cookie head
  - `zero_downtime_failover`: string enum: `none`, `temporary`, `sticky` default: `none` — Configures the zero-downtime failover between origins within a pool when session affinity is enabled. This feature is currently incompatible
- `session_affinity_ttl`: number — Time, in seconds, until a client's session expires after being created. Once the expiry time has been reached, subsequent requests may get s
- `steering_policy`: string enum: `off`, `geo`, `random`, `dynamic_latency`, `proximity`, `least_outstanding_requests`, `least_connections`, `` default: `` — Steering Policy for this load balancer.
- `ttl`: number — Time to live (TTL) of the DNS entry for the IP address returned by this load balancer. This only applies to gray-clouded (unproxied) load ba

**Response** 200 → `result`

(one of 2 variants; showing the first)
object
