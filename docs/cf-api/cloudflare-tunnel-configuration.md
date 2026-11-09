# Cloudflare Tunnel Configuration

4 endpoints.

## GET /accounts/{account_id}/cfd_tunnel/{tunnel_id}/configurations

Get Tunnel configuration

operationId: `cloudflare-tunnel-configuration-get-configuration`

**Response** 200 → `result`

- `account_id`: string — Identifier.
- `config`: object — The tunnel configuration and ingress rules.
  - `ingress`: object[] — List of public hostname definitions. At least one ingress rule needs to be defined for the tunnel.
    [array of]
    - `hostname`: string **required** — Public hostname for this service.
    - `originRequest`: object — Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.
    - `path`: string — Requests with this path route to this public hostname.
    - `service`: string **required** — Protocol and address of destination server. Supported protocols: http://, https://, unix://, tcp://, ssh://, rdp://, unix+tls://, smb://. Al
  - `originRequest`: object — Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.
    - `access`: object — For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.
    - `caPool`: string — Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed
    - `connectTimeout`: integer — Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by t
    - `disableChunkedEncoding`: boolean — Disables chunked transfer encoding. Useful if you are running a WSGI server.
    - `http2Origin`: boolean — Attempt to connect to origin using HTTP2. Origin must be configured as https.
    - `httpHostHeader`: string — Sets the HTTP Host header on requests sent to the local service.
    - `keepAliveConnections`: integer — Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connectio
    - `keepAliveTimeout`: integer — Timeout after which an idle keepalive connection can be discarded.
    - `matchSNItoHost`: boolean — Auto configure the Hostname on the origin server certificate.
    - `noHappyEyeballs`: boolean — Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.
    - `noTLSVerify`: boolean — Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.
    - `originServerName`: string — Hostname that cloudflared should expect from your origin server certificate.
    - `proxyType`: string — cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of pr
    - `tcpKeepAlive`: integer — The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.
    - `tlsTimeout`: integer — Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.
  - `warp-routing`: object — Enable private network access from WARP users to private network routes. This is enabled if the tunnel has an assigned route.
    - `enabled`: boolean
- `created_at`: string
- `source`: string enum: `local`, `cloudflare` — Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `clo
- `tunnel_id`: string — UUID of the tunnel.
- `version`: integer — The version of the Tunnel Configuration.

## PUT /accounts/{account_id}/cfd_tunnel/{tunnel_id}/configurations

Update Tunnel configuration

operationId: `cloudflare-tunnel-configuration-put-configuration`

**Request** (application/json)

- `config`: any

**Response** 200 → `result`

- `account_id`: string — Identifier.
- `config`: object — The tunnel configuration and ingress rules.
  - `ingress`: object[] — List of public hostname definitions. At least one ingress rule needs to be defined for the tunnel.
    [array of]
    - `hostname`: string **required** — Public hostname for this service.
    - `originRequest`: object — Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.
    - `path`: string — Requests with this path route to this public hostname.
    - `service`: string **required** — Protocol and address of destination server. Supported protocols: http://, https://, unix://, tcp://, ssh://, rdp://, unix+tls://, smb://. Al
  - `originRequest`: object — Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.
    - `access`: object — For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.
    - `caPool`: string — Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed
    - `connectTimeout`: integer — Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by t
    - `disableChunkedEncoding`: boolean — Disables chunked transfer encoding. Useful if you are running a WSGI server.
    - `http2Origin`: boolean — Attempt to connect to origin using HTTP2. Origin must be configured as https.
    - `httpHostHeader`: string — Sets the HTTP Host header on requests sent to the local service.
    - `keepAliveConnections`: integer — Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connectio
    - `keepAliveTimeout`: integer — Timeout after which an idle keepalive connection can be discarded.
    - `matchSNItoHost`: boolean — Auto configure the Hostname on the origin server certificate.
    - `noHappyEyeballs`: boolean — Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.
    - `noTLSVerify`: boolean — Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.
    - `originServerName`: string — Hostname that cloudflared should expect from your origin server certificate.
    - `proxyType`: string — cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of pr
    - `tcpKeepAlive`: integer — The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.
    - `tlsTimeout`: integer — Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.
  - `warp-routing`: object — Enable private network access from WARP users to private network routes. This is enabled if the tunnel has an assigned route.
    - `enabled`: boolean
- `created_at`: string
- `source`: string enum: `local`, `cloudflare` — Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `clo
- `tunnel_id`: string — UUID of the tunnel.
- `version`: integer — The version of the Tunnel Configuration.

## GET /accounts/{account_id}/warp_connector/{tunnel_id}/configurations

Get Mesh node HA configuration

operationId: `cloudflare-tunnel-configuration-get-warp-connector-configuration`

**Response** 200 → `result`

- `config`: object — Provider-specific configuration. Present for `aws` and `local` modes.
- `configuration_version`: integer **required** — Monotonically increasing configuration version, incremented on each PUT.
- `created_at`: string **required** — Timestamp of when the resource was created.
- `ha_mode`: string **required** enum: `none`, `disabled`, `aws`, `local` — High-availability mode for the Mesh node. `none` means HA is enabled but no provider is configured yet (newly created nodes default to this)
- `tunnel_id`: string **required** — UUID of the tunnel.
- `updated_at`: string — Timestamp of the last update. Null if never updated.

## PUT /accounts/{account_id}/warp_connector/{tunnel_id}/configurations

Update Mesh node HA configuration

operationId: `cloudflare-tunnel-configuration-update-warp-connector-configuration`

**Request** (application/json)

- `config`: object — Provider-specific configuration. Required shape depends on ha_mode. For `aws`, must contain `fnr_id`. For `local`, must contain `vips`. For 
- `ha_mode`: string **required** enum: `none`, `disabled`, `aws`, `local` — High-availability mode for the Mesh node. `none` means HA is enabled but no provider is configured yet (newly created nodes default to this)

**Response** 200 → `result`

- `config`: object — Provider-specific configuration. Present for `aws` and `local` modes.
- `configuration_version`: integer **required** — Monotonically increasing configuration version, incremented on each PUT.
- `created_at`: string **required** — Timestamp of when the resource was created.
- `ha_mode`: string **required** enum: `none`, `disabled`, `aws`, `local` — High-availability mode for the Mesh node. `none` means HA is enabled but no provider is configured yet (newly created nodes default to this)
- `tunnel_id`: string **required** — UUID of the tunnel.
- `updated_at`: string — Timestamp of the last update. Null if never updated.
