# Health Checks

15 endpoints.

## GET /zones/{zone_id}/healthchecks

List Health Checks

operationId: `health-checks-list-health-checks` · query: `page`, `per_page`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /zones/{zone_id}/healthchecks

Create Health Check

operationId: `health-checks-create-health-check`

**Request** (application/json)

- `address`: string **required** — The hostname or IP address of the origin server to run health checks on.
- `check_regions`: string[] — A list of regions from which to run health checks. Null means Cloudflare will pick a default region.
  [array]
- `consecutive_fails`: integer default: `1` — The number of consecutive fails required from a health check before changing the health to unhealthy.
- `consecutive_successes`: integer default: `1` — The number of consecutive successes required from a health check before changing the health to healthy.
- `description`: string — A human-readable description of the health check.
- `http_config`: object — Parameters specific to an HTTP or HTTPS health check.
  - `allow_insecure`: boolean default: `false` — Do not validate the certificate when the health check uses HTTPS.
  - `expected_body`: string default: `` — A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.
  - `expected_codes`: string[] default: `200` — The expected HTTP response codes (e.g. "200") or code ranges (e.g. "2xx" for all codes starting with 2) of the health check.
    [array]
  - `follow_redirects`: boolean default: `false` — Follow redirects if the origin returns a 3xx status code.
  - `header`: object — The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be ov
  - `method`: string enum: `GET`, `HEAD` default: `GET` — The HTTP method to use for the health check.
  - `path`: string default: `/` — The endpoint path to health check against.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.
- `interval`: integer default: `60` — The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase loa
- `name`: string **required** — A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.
- `retries`: integer default: `2` — The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.
- `suspended`: boolean default: `false` — If suspended, no health checks are sent to the origin.
- `tcp_config`: object — Parameters specific to TCP health check.
  - `method`: string enum: `connection_established` default: `connection_established` — The TCP connection method to use for the health check.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80.
- `timeout`: integer default: `5` — The timeout (in seconds) before marking the health check as failed.
- `type`: string default: `HTTP` — The protocol to use for the health check. Currently supported protocols are 'HTTP', 'HTTPS' and 'TCP'.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /zones/{zone_id}/healthchecks/{healthcheck_id}

Delete Health Check

operationId: `health-checks-delete-health-check`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/healthchecks/{healthcheck_id}

Health Check Details

operationId: `health-checks-health-check-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /zones/{zone_id}/healthchecks/{healthcheck_id}

Patch Health Check

operationId: `health-checks-patch-health-check`

**Request** (application/json)

- `address`: string **required** — The hostname or IP address of the origin server to run health checks on.
- `check_regions`: string[] — A list of regions from which to run health checks. Null means Cloudflare will pick a default region.
  [array]
- `consecutive_fails`: integer default: `1` — The number of consecutive fails required from a health check before changing the health to unhealthy.
- `consecutive_successes`: integer default: `1` — The number of consecutive successes required from a health check before changing the health to healthy.
- `description`: string — A human-readable description of the health check.
- `http_config`: object — Parameters specific to an HTTP or HTTPS health check.
  - `allow_insecure`: boolean default: `false` — Do not validate the certificate when the health check uses HTTPS.
  - `expected_body`: string default: `` — A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.
  - `expected_codes`: string[] default: `200` — The expected HTTP response codes (e.g. "200") or code ranges (e.g. "2xx" for all codes starting with 2) of the health check.
    [array]
  - `follow_redirects`: boolean default: `false` — Follow redirects if the origin returns a 3xx status code.
  - `header`: object — The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be ov
  - `method`: string enum: `GET`, `HEAD` default: `GET` — The HTTP method to use for the health check.
  - `path`: string default: `/` — The endpoint path to health check against.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.
- `interval`: integer default: `60` — The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase loa
- `name`: string **required** — A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.
- `retries`: integer default: `2` — The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.
- `suspended`: boolean default: `false` — If suspended, no health checks are sent to the origin.
- `tcp_config`: object — Parameters specific to TCP health check.
  - `method`: string enum: `connection_established` default: `connection_established` — The TCP connection method to use for the health check.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80.
- `timeout`: integer default: `5` — The timeout (in seconds) before marking the health check as failed.
- `type`: string default: `HTTP` — The protocol to use for the health check. Currently supported protocols are 'HTTP', 'HTTPS' and 'TCP'.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /zones/{zone_id}/healthchecks/{healthcheck_id}

Update Health Check

operationId: `health-checks-update-health-check`

**Request** (application/json)

- `address`: string **required** — The hostname or IP address of the origin server to run health checks on.
- `check_regions`: string[] — A list of regions from which to run health checks. Null means Cloudflare will pick a default region.
  [array]
- `consecutive_fails`: integer default: `1` — The number of consecutive fails required from a health check before changing the health to unhealthy.
- `consecutive_successes`: integer default: `1` — The number of consecutive successes required from a health check before changing the health to healthy.
- `description`: string — A human-readable description of the health check.
- `http_config`: object — Parameters specific to an HTTP or HTTPS health check.
  - `allow_insecure`: boolean default: `false` — Do not validate the certificate when the health check uses HTTPS.
  - `expected_body`: string default: `` — A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.
  - `expected_codes`: string[] default: `200` — The expected HTTP response codes (e.g. "200") or code ranges (e.g. "2xx" for all codes starting with 2) of the health check.
    [array]
  - `follow_redirects`: boolean default: `false` — Follow redirects if the origin returns a 3xx status code.
  - `header`: object — The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be ov
  - `method`: string enum: `GET`, `HEAD` default: `GET` — The HTTP method to use for the health check.
  - `path`: string default: `/` — The endpoint path to health check against.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.
- `interval`: integer default: `60` — The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase loa
- `name`: string **required** — A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.
- `retries`: integer default: `2` — The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.
- `suspended`: boolean default: `false` — If suspended, no health checks are sent to the origin.
- `tcp_config`: object — Parameters specific to TCP health check.
  - `method`: string enum: `connection_established` default: `connection_established` — The TCP connection method to use for the health check.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80.
- `timeout`: integer default: `5` — The timeout (in seconds) before marking the health check as failed.
- `type`: string default: `HTTP` — The protocol to use for the health check. Currently supported protocols are 'HTTP', 'HTTPS' and 'TCP'.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /zones/{zone_id}/healthchecks/preview

Create Preview Health Check

operationId: `health-checks-create-preview-health-check`

**Request** (application/json)

- `address`: string **required** — The hostname or IP address of the origin server to run health checks on.
- `check_regions`: string[] — A list of regions from which to run health checks. Null means Cloudflare will pick a default region.
  [array]
- `consecutive_fails`: integer default: `1` — The number of consecutive fails required from a health check before changing the health to unhealthy.
- `consecutive_successes`: integer default: `1` — The number of consecutive successes required from a health check before changing the health to healthy.
- `description`: string — A human-readable description of the health check.
- `http_config`: object — Parameters specific to an HTTP or HTTPS health check.
  - `allow_insecure`: boolean default: `false` — Do not validate the certificate when the health check uses HTTPS.
  - `expected_body`: string default: `` — A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.
  - `expected_codes`: string[] default: `200` — The expected HTTP response codes (e.g. "200") or code ranges (e.g. "2xx" for all codes starting with 2) of the health check.
    [array]
  - `follow_redirects`: boolean default: `false` — Follow redirects if the origin returns a 3xx status code.
  - `header`: object — The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be ov
  - `method`: string enum: `GET`, `HEAD` default: `GET` — The HTTP method to use for the health check.
  - `path`: string default: `/` — The endpoint path to health check against.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.
- `interval`: integer default: `60` — The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase loa
- `name`: string **required** — A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.
- `retries`: integer default: `2` — The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.
- `suspended`: boolean default: `false` — If suspended, no health checks are sent to the origin.
- `tcp_config`: object — Parameters specific to TCP health check.
  - `method`: string enum: `connection_established` default: `connection_established` — The TCP connection method to use for the health check.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80.
- `timeout`: integer default: `5` — The timeout (in seconds) before marking the health check as failed.
- `type`: string default: `HTTP` — The protocol to use for the health check. Currently supported protocols are 'HTTP', 'HTTPS' and 'TCP'.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /zones/{zone_id}/healthchecks/preview/{healthcheck_id}

Delete Preview Health Check

operationId: `health-checks-delete-preview-health-check`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/healthchecks/preview/{healthcheck_id}

Health Check Preview Details

operationId: `health-checks-health-check-preview-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/smart_shield/healthchecks

List Health Checks

operationId: `smart-shield-list-health-checks` · query: `page`, `per_page`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## POST /zones/{zone_id}/smart_shield/healthchecks

Create Health Check

operationId: `smart-shield-create-health-check`

**Request** (application/json)

- `address`: string **required** — The hostname or IP address of the origin server to run health checks on.
- `check_regions`: string[] — A list of regions from which to run health checks. Null means Cloudflare will pick a default region.
  [array]
- `consecutive_fails`: integer default: `1` — The number of consecutive fails required from a health check before changing the health to unhealthy.
- `consecutive_successes`: integer default: `1` — The number of consecutive successes required from a health check before changing the health to healthy.
- `description`: string — A human-readable description of the health check.
- `http_config`: object — Parameters specific to an HTTP or HTTPS health check.
  - `allow_insecure`: boolean default: `false` — Do not validate the certificate when the health check uses HTTPS.
  - `expected_body`: string — A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.
  - `expected_codes`: string[] default: `200` — The expected HTTP response codes (e.g. "200") or code ranges (e.g. "2xx" for all codes starting with 2) of the health check.
    [array]
  - `follow_redirects`: boolean default: `false` — Follow redirects if the origin returns a 3xx status code.
  - `header`: object — The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be ov
  - `method`: string enum: `GET`, `HEAD` default: `GET` — The HTTP method to use for the health check.
  - `path`: string default: `/` — The endpoint path to health check against.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.
- `interval`: integer default: `60` — The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase loa
- `name`: string **required** — A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.
- `retries`: integer default: `2` — The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.
- `suspended`: boolean default: `false` — If suspended, no health checks are sent to the origin.
- `tcp_config`: object — Parameters specific to TCP health check.
  - `method`: string enum: `connection_established` default: `connection_established` — The TCP connection method to use for the health check.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80.
- `timeout`: integer default: `5` — The timeout (in seconds) before marking the health check as failed.
- `type`: string default: `HTTP` — The protocol to use for the health check. Currently supported protocols are 'HTTP', 'HTTPS' and 'TCP'.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## DELETE /zones/{zone_id}/smart_shield/healthchecks/{healthcheck_id}

Delete Health Check

operationId: `smart-shield-delete-health-check`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## GET /zones/{zone_id}/smart_shield/healthchecks/{healthcheck_id}

Health Check Details

operationId: `smart-shield-health-check-details`

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PATCH /zones/{zone_id}/smart_shield/healthchecks/{healthcheck_id}

Patch Health Check

operationId: `smart-shield-patch-health-check`

**Request** (application/json)

- `address`: string **required** — The hostname or IP address of the origin server to run health checks on.
- `check_regions`: string[] — A list of regions from which to run health checks. Null means Cloudflare will pick a default region.
  [array]
- `consecutive_fails`: integer default: `1` — The number of consecutive fails required from a health check before changing the health to unhealthy.
- `consecutive_successes`: integer default: `1` — The number of consecutive successes required from a health check before changing the health to healthy.
- `description`: string — A human-readable description of the health check.
- `http_config`: object — Parameters specific to an HTTP or HTTPS health check.
  - `allow_insecure`: boolean default: `false` — Do not validate the certificate when the health check uses HTTPS.
  - `expected_body`: string — A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.
  - `expected_codes`: string[] default: `200` — The expected HTTP response codes (e.g. "200") or code ranges (e.g. "2xx" for all codes starting with 2) of the health check.
    [array]
  - `follow_redirects`: boolean default: `false` — Follow redirects if the origin returns a 3xx status code.
  - `header`: object — The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be ov
  - `method`: string enum: `GET`, `HEAD` default: `GET` — The HTTP method to use for the health check.
  - `path`: string default: `/` — The endpoint path to health check against.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.
- `interval`: integer default: `60` — The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase loa
- `name`: string **required** — A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.
- `retries`: integer default: `2` — The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.
- `suspended`: boolean default: `false` — If suspended, no health checks are sent to the origin.
- `tcp_config`: object — Parameters specific to TCP health check.
  - `method`: string enum: `connection_established` default: `connection_established` — The TCP connection method to use for the health check.
  - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80.
- `timeout`: integer default: `5` — The timeout (in seconds) before marking the health check as failed.
- `type`: string default: `HTTP` — The protocol to use for the health check. Currently supported protocols are 'HTTP', 'HTTPS' and 'TCP'.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object

## PUT /zones/{zone_id}/smart_shield/healthchecks/{healthcheck_id}

Update Health Check

operationId: `smart-shield-update-health-check`

**Request** (application/json)

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `message`: string **required**
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `message`: string **required**
- `result`: any **required**
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
- `result`: object
  - `address`: string — The hostname or IP address of the origin server to run health checks on.
  - `check_regions`: string[] — A list of regions from which to run health checks. Null means Cloudflare will pick a default region.
    [array]
  - `consecutive_fails`: integer default: `1` — The number of consecutive fails required from a health check before changing the health to unhealthy.
  - `consecutive_successes`: integer default: `1` — The number of consecutive successes required from a health check before changing the health to healthy.
  - `created_on`: string
  - `description`: string — A human-readable description of the health check.
  - `failure_reason`: string — The current failure reason if status is unhealthy.
  - `http_config`: object — Parameters specific to an HTTP or HTTPS health check.
    - `allow_insecure`: boolean default: `false` — Do not validate the certificate when the health check uses HTTPS.
    - `expected_body`: string — A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.
    - `expected_codes`: string[] default: `200` — The expected HTTP response codes (e.g. "200") or code ranges (e.g. "2xx" for all codes starting with 2) of the health check.
    - `follow_redirects`: boolean default: `false` — Follow redirects if the origin returns a 3xx status code.
    - `header`: object — The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be ov
    - `method`: string enum: `GET`, `HEAD` default: `GET` — The HTTP method to use for the health check.
    - `path`: string default: `/` — The endpoint path to health check against.
    - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.
  - `id`: string — Identifier.
  - `interval`: integer default: `60` — The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase loa
  - `modified_on`: string
  - `name`: string — A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.
  - `retries`: integer default: `2` — The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.
  - `status`: string enum: `unknown`, `healthy`, `unhealthy`, `suspended` — The current status of the origin server according to the health check.
  - `suspended`: boolean default: `false` — If suspended, no health checks are sent to the origin.
  - `tcp_config`: object — Parameters specific to TCP health check.
    - `method`: string enum: `connection_established` default: `connection_established` — The TCP connection method to use for the health check.
    - `port`: integer default: `80` — Port number to connect to for the health check. Defaults to 80.
  - `timeout`: integer default: `5` — The timeout (in seconds) before marking the health check as failed.
  - `type`: string default: `HTTP` — The protocol to use for the health check. Currently supported protocols are 'HTTP', 'HTTPS' and 'TCP'.

**Response** 200 → `result`

(one of 3 variants; showing the first)
object
