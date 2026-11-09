# Stream Live Inputs

12 endpoints.

## GET /accounts/{account_id}/stream/live_inputs

List live inputs

operationId: `stream-live-inputs-list-live-inputs` · query: `include_counts`

**Response** 200 → `result`

- `liveInputs`: object[]
  [array of]
  - `created`: string — The date and time the live input was created.
  - `deleteRecordingAfterDays`: number — Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the
  - `enabled`: boolean default: `true` — Indicates whether the live input is enabled and can accept streams.
  - `meta`: object — A user modifiable key-value store used to reference other systems of record for managing live inputs.
  - `modified`: string — The date and time the live input was last modified.
  - `uid`: string — A unique identifier for a live input.
- `range`: integer — The total number of remaining live inputs based on cursor position.
- `total`: integer — The total number of live inputs that match the provided filters.

## POST /accounts/{account_id}/stream/live_inputs

Create a live input

operationId: `stream-live-inputs-create-a-live-input`

**Request** (application/json)

- `defaultCreator`: string — Sets the creator ID asssociated with this live input.
- `deleteRecordingAfterDays`: number — Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the
- `enabled`: boolean default: `true` — Indicates whether the live input is enabled and can accept streams.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing live inputs.
- `preferLowLatency`: boolean default: `false` — When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduce
- `recording`: object — Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live 
  - `allowedOrigins`: string[] — Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdo
    [array]
  - `hideLiveViewerCount`: boolean default: `false` — Disables reporting the number of live viewers when this property is set to `true`.
  - `mode`: string enum: `off`, `automatic` default: `off` — Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a
  - `requireSignedURLs`: boolean default: `false` — Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of 
  - `timeoutSeconds`: integer default: `0` — Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand.

**Response** 200 → `result`

- `created`: string — The date and time the live input was created.
- `deleteRecordingAfterDays`: number — Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the
- `enabled`: boolean default: `true` — Indicates whether the live input is enabled and can accept streams.
- `keysRotatedAt`: string — The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing live inputs.
- `modified`: string — The date and time the live input was last modified.
- `playback`: object — Details for playing a live input's broadcast using the HLS or DASH manifests. URLs reference the live input ID.
  - `dash`: string **required** — The DASH manifest URL used to play live video, referencing the live input ID.
  - `hls`: string **required** — The HLS manifest URL used to play live video, referencing the live input ID.
- `preferLowLatency`: boolean default: `false` — When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduce
- `recording`: object — Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live 
  - `allowedOrigins`: string[] — Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdo
    [array]
  - `hideLiveViewerCount`: boolean default: `false` — Disables reporting the number of live viewers when this property is set to `true`.
  - `mode`: string enum: `off`, `automatic` default: `off` — Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a
  - `requireSignedURLs`: boolean default: `false` — Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of 
  - `timeoutSeconds`: integer default: `0` — Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand.
- `rtmps`: object — Details for streaming to an live input using RTMPS.
  - `streamKey`: string — The secret key to use when streaming via RTMPS to a live input.
  - `url`: string — The RTMPS URL you provide to the broadcaster, which they stream live video to.
- `rtmpsPlayback`: object — Details for playback from an live input using RTMPS.
  - `streamKey`: string — The secret key to use for playback via RTMPS.
  - `url`: string — The URL used to play live video over RTMPS.
- `srt`: object — Details for streaming to a live input using SRT.
  - `passphrase`: string — The secret key to use when streaming via SRT to a live input.
  - `streamId`: string — The identifier of the live input to use when streaming via SRT.
  - `url`: string — The SRT URL you provide to the broadcaster, which they stream live video to.
- `srtPlayback`: object — Details for playback from an live input using SRT.
  - `passphrase`: string — The secret key to use for playback via SRT.
  - `streamId`: string — The identifier of the live input to use for playback via SRT.
  - `url`: string — The URL used to play live video over SRT.
- `status`: string enum: `null`, `connected`, `reconnected`, `reconnecting`, `client_disconnect`, `ttl_exceeded`, `failed_to_connect`, `failed_to_reconnect` — The connection status of a live input.
- `uid`: string — A unique identifier for a live input.
- `webRTC`: object — Details for streaming to a live input using WebRTC.
  - `url`: string — The WebRTC URL you provide to the broadcaster, which they stream live video to.
- `webRTCPlayback`: object — Details for playback from a live input using WebRTC.
  - `url`: string — The URL used to play live video over WebRTC.

## DELETE /accounts/{account_id}/stream/live_inputs/{live_input_identifier}

Delete a live input

operationId: `stream-live-inputs-delete-a-live-input`

## GET /accounts/{account_id}/stream/live_inputs/{live_input_identifier}

Retrieve a live input

operationId: `stream-live-inputs-retrieve-a-live-input`

**Response** 200 → `result`

- `created`: string — The date and time the live input was created.
- `deleteRecordingAfterDays`: number — Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the
- `enabled`: boolean default: `true` — Indicates whether the live input is enabled and can accept streams.
- `keysRotatedAt`: string — The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing live inputs.
- `modified`: string — The date and time the live input was last modified.
- `playback`: object — Details for playing a live input's broadcast using the HLS or DASH manifests. URLs reference the live input ID.
  - `dash`: string **required** — The DASH manifest URL used to play live video, referencing the live input ID.
  - `hls`: string **required** — The HLS manifest URL used to play live video, referencing the live input ID.
- `preferLowLatency`: boolean default: `false` — When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduce
- `recording`: object — Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live 
  - `allowedOrigins`: string[] — Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdo
    [array]
  - `hideLiveViewerCount`: boolean default: `false` — Disables reporting the number of live viewers when this property is set to `true`.
  - `mode`: string enum: `off`, `automatic` default: `off` — Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a
  - `requireSignedURLs`: boolean default: `false` — Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of 
  - `timeoutSeconds`: integer default: `0` — Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand.
- `rtmps`: object — Details for streaming to an live input using RTMPS.
  - `streamKey`: string — The secret key to use when streaming via RTMPS to a live input.
  - `url`: string — The RTMPS URL you provide to the broadcaster, which they stream live video to.
- `rtmpsPlayback`: object — Details for playback from an live input using RTMPS.
  - `streamKey`: string — The secret key to use for playback via RTMPS.
  - `url`: string — The URL used to play live video over RTMPS.
- `srt`: object — Details for streaming to a live input using SRT.
  - `passphrase`: string — The secret key to use when streaming via SRT to a live input.
  - `streamId`: string — The identifier of the live input to use when streaming via SRT.
  - `url`: string — The SRT URL you provide to the broadcaster, which they stream live video to.
- `srtPlayback`: object — Details for playback from an live input using SRT.
  - `passphrase`: string — The secret key to use for playback via SRT.
  - `streamId`: string — The identifier of the live input to use for playback via SRT.
  - `url`: string — The URL used to play live video over SRT.
- `status`: string enum: `null`, `connected`, `reconnected`, `reconnecting`, `client_disconnect`, `ttl_exceeded`, `failed_to_connect`, `failed_to_reconnect` — The connection status of a live input.
- `uid`: string — A unique identifier for a live input.
- `webRTC`: object — Details for streaming to a live input using WebRTC.
  - `url`: string — The WebRTC URL you provide to the broadcaster, which they stream live video to.
- `webRTCPlayback`: object — Details for playback from a live input using WebRTC.
  - `url`: string — The URL used to play live video over WebRTC.

## PUT /accounts/{account_id}/stream/live_inputs/{live_input_identifier}

Update a live input

operationId: `stream-live-inputs-update-a-live-input`

**Request** (application/json)

- `defaultCreator`: string — Sets the creator ID asssociated with this live input.
- `deleteRecordingAfterDays`: number — Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the
- `enabled`: boolean default: `true` — Indicates whether the live input is enabled and can accept streams.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing live inputs.
- `preferLowLatency`: boolean default: `false` — When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduce
- `recording`: object — Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live 
  - `allowedOrigins`: string[] — Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdo
    [array]
  - `hideLiveViewerCount`: boolean default: `false` — Disables reporting the number of live viewers when this property is set to `true`.
  - `mode`: string enum: `off`, `automatic` default: `off` — Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a
  - `requireSignedURLs`: boolean default: `false` — Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of 
  - `timeoutSeconds`: integer default: `0` — Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand.

**Response** 200 → `result`

- `created`: string — The date and time the live input was created.
- `deleteRecordingAfterDays`: number — Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the
- `enabled`: boolean default: `true` — Indicates whether the live input is enabled and can accept streams.
- `keysRotatedAt`: string — The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing live inputs.
- `modified`: string — The date and time the live input was last modified.
- `playback`: object — Details for playing a live input's broadcast using the HLS or DASH manifests. URLs reference the live input ID.
  - `dash`: string **required** — The DASH manifest URL used to play live video, referencing the live input ID.
  - `hls`: string **required** — The HLS manifest URL used to play live video, referencing the live input ID.
- `preferLowLatency`: boolean default: `false` — When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduce
- `recording`: object — Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live 
  - `allowedOrigins`: string[] — Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdo
    [array]
  - `hideLiveViewerCount`: boolean default: `false` — Disables reporting the number of live viewers when this property is set to `true`.
  - `mode`: string enum: `off`, `automatic` default: `off` — Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a
  - `requireSignedURLs`: boolean default: `false` — Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of 
  - `timeoutSeconds`: integer default: `0` — Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand.
- `rtmps`: object — Details for streaming to an live input using RTMPS.
  - `streamKey`: string — The secret key to use when streaming via RTMPS to a live input.
  - `url`: string — The RTMPS URL you provide to the broadcaster, which they stream live video to.
- `rtmpsPlayback`: object — Details for playback from an live input using RTMPS.
  - `streamKey`: string — The secret key to use for playback via RTMPS.
  - `url`: string — The URL used to play live video over RTMPS.
- `srt`: object — Details for streaming to a live input using SRT.
  - `passphrase`: string — The secret key to use when streaming via SRT to a live input.
  - `streamId`: string — The identifier of the live input to use when streaming via SRT.
  - `url`: string — The SRT URL you provide to the broadcaster, which they stream live video to.
- `srtPlayback`: object — Details for playback from an live input using SRT.
  - `passphrase`: string — The secret key to use for playback via SRT.
  - `streamId`: string — The identifier of the live input to use for playback via SRT.
  - `url`: string — The URL used to play live video over SRT.
- `status`: string enum: `null`, `connected`, `reconnected`, `reconnecting`, `client_disconnect`, `ttl_exceeded`, `failed_to_connect`, `failed_to_reconnect` — The connection status of a live input.
- `uid`: string — A unique identifier for a live input.
- `webRTC`: object — Details for streaming to a live input using WebRTC.
  - `url`: string — The WebRTC URL you provide to the broadcaster, which they stream live video to.
- `webRTCPlayback`: object — Details for playback from a live input using WebRTC.
  - `url`: string — The URL used to play live video over WebRTC.

## POST /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/disable

Disable a live input

operationId: `stream-live-inputs-disable-a-live-input`

**Response** 200 → `result`

- `created`: string — The date and time the live input was created.
- `deleteRecordingAfterDays`: number — Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the
- `enabled`: boolean default: `true` — Indicates whether the live input is enabled and can accept streams.
- `keysRotatedAt`: string — The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing live inputs.
- `modified`: string — The date and time the live input was last modified.
- `playback`: object — Details for playing a live input's broadcast using the HLS or DASH manifests. URLs reference the live input ID.
  - `dash`: string **required** — The DASH manifest URL used to play live video, referencing the live input ID.
  - `hls`: string **required** — The HLS manifest URL used to play live video, referencing the live input ID.
- `preferLowLatency`: boolean default: `false` — When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduce
- `recording`: object — Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live 
  - `allowedOrigins`: string[] — Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdo
    [array]
  - `hideLiveViewerCount`: boolean default: `false` — Disables reporting the number of live viewers when this property is set to `true`.
  - `mode`: string enum: `off`, `automatic` default: `off` — Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a
  - `requireSignedURLs`: boolean default: `false` — Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of 
  - `timeoutSeconds`: integer default: `0` — Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand.
- `rtmps`: object — Details for streaming to an live input using RTMPS.
  - `streamKey`: string — The secret key to use when streaming via RTMPS to a live input.
  - `url`: string — The RTMPS URL you provide to the broadcaster, which they stream live video to.
- `rtmpsPlayback`: object — Details for playback from an live input using RTMPS.
  - `streamKey`: string — The secret key to use for playback via RTMPS.
  - `url`: string — The URL used to play live video over RTMPS.
- `srt`: object — Details for streaming to a live input using SRT.
  - `passphrase`: string — The secret key to use when streaming via SRT to a live input.
  - `streamId`: string — The identifier of the live input to use when streaming via SRT.
  - `url`: string — The SRT URL you provide to the broadcaster, which they stream live video to.
- `srtPlayback`: object — Details for playback from an live input using SRT.
  - `passphrase`: string — The secret key to use for playback via SRT.
  - `streamId`: string — The identifier of the live input to use for playback via SRT.
  - `url`: string — The URL used to play live video over SRT.
- `status`: string enum: `null`, `connected`, `reconnected`, `reconnecting`, `client_disconnect`, `ttl_exceeded`, `failed_to_connect`, `failed_to_reconnect` — The connection status of a live input.
- `uid`: string — A unique identifier for a live input.
- `webRTC`: object — Details for streaming to a live input using WebRTC.
  - `url`: string — The WebRTC URL you provide to the broadcaster, which they stream live video to.
- `webRTCPlayback`: object — Details for playback from a live input using WebRTC.
  - `url`: string — The URL used to play live video over WebRTC.

## POST /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/enable

Enable a live input

operationId: `stream-live-inputs-enable-a-live-input`

**Response** 200 → `result`

- `created`: string — The date and time the live input was created.
- `deleteRecordingAfterDays`: number — Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the
- `enabled`: boolean default: `true` — Indicates whether the live input is enabled and can accept streams.
- `keysRotatedAt`: string — The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing live inputs.
- `modified`: string — The date and time the live input was last modified.
- `playback`: object — Details for playing a live input's broadcast using the HLS or DASH manifests. URLs reference the live input ID.
  - `dash`: string **required** — The DASH manifest URL used to play live video, referencing the live input ID.
  - `hls`: string **required** — The HLS manifest URL used to play live video, referencing the live input ID.
- `preferLowLatency`: boolean default: `false` — When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduce
- `recording`: object — Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live 
  - `allowedOrigins`: string[] — Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdo
    [array]
  - `hideLiveViewerCount`: boolean default: `false` — Disables reporting the number of live viewers when this property is set to `true`.
  - `mode`: string enum: `off`, `automatic` default: `off` — Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a
  - `requireSignedURLs`: boolean default: `false` — Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of 
  - `timeoutSeconds`: integer default: `0` — Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand.
- `rtmps`: object — Details for streaming to an live input using RTMPS.
  - `streamKey`: string — The secret key to use when streaming via RTMPS to a live input.
  - `url`: string — The RTMPS URL you provide to the broadcaster, which they stream live video to.
- `rtmpsPlayback`: object — Details for playback from an live input using RTMPS.
  - `streamKey`: string — The secret key to use for playback via RTMPS.
  - `url`: string — The URL used to play live video over RTMPS.
- `srt`: object — Details for streaming to a live input using SRT.
  - `passphrase`: string — The secret key to use when streaming via SRT to a live input.
  - `streamId`: string — The identifier of the live input to use when streaming via SRT.
  - `url`: string — The SRT URL you provide to the broadcaster, which they stream live video to.
- `srtPlayback`: object — Details for playback from an live input using SRT.
  - `passphrase`: string — The secret key to use for playback via SRT.
  - `streamId`: string — The identifier of the live input to use for playback via SRT.
  - `url`: string — The URL used to play live video over SRT.
- `status`: string enum: `null`, `connected`, `reconnected`, `reconnecting`, `client_disconnect`, `ttl_exceeded`, `failed_to_connect`, `failed_to_reconnect` — The connection status of a live input.
- `uid`: string — A unique identifier for a live input.
- `webRTC`: object — Details for streaming to a live input using WebRTC.
  - `url`: string — The WebRTC URL you provide to the broadcaster, which they stream live video to.
- `webRTCPlayback`: object — Details for playback from a live input using WebRTC.
  - `url`: string — The URL used to play live video over WebRTC.

## GET /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs

List all outputs associated with a specified live input

operationId: `stream-live-inputs-list-all-outputs-associated-with-a-specified-live-input`

**Response** 200 → `result`

[array of]
- `enabled`: boolean default: `true` — When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to
- `streamKey`: string — The streamKey used to authenticate against an output's target.
- `uid`: string — A unique identifier for the output.
- `url`: string — The URL an output uses to restream.

## POST /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs

Create a new output, connected to a live input

operationId: `stream-live-inputs-create-a-new-output,-connected-to-a-live-input`

**Request** (application/json)

- `enabled`: boolean default: `true` — When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to
- `streamKey`: string **required** — The streamKey used to authenticate against an output's target.
- `url`: string **required** — The URL an output uses to restream.

**Response** 200 → `result`

- `enabled`: boolean default: `true` — When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to
- `streamKey`: string — The streamKey used to authenticate against an output's target.
- `uid`: string — A unique identifier for the output.
- `url`: string — The URL an output uses to restream.

## DELETE /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs/{output_identifier}

Delete an output

operationId: `stream-live-inputs-delete-an-output`

## PUT /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs/{output_identifier}

Update an output

operationId: `stream-live-inputs-update-an-output`

**Request** (application/json)

- `enabled`: boolean **required** default: `true` — When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to

**Response** 200 → `result`

- `enabled`: boolean default: `true` — When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to
- `streamKey`: string — The streamKey used to authenticate against an output's target.
- `uid`: string — A unique identifier for the output.
- `url`: string — The URL an output uses to restream.

## POST /accounts/{account_id}/stream/live_inputs/{live_input_identifier}/rotate_keys

Rotate keys for a live input

operationId: `stream-live-inputs-rotate-keys-for-a-live-input`

**Response** 200 → `result`

- `created`: string — The date and time the live input was created.
- `deleteRecordingAfterDays`: number — Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the
- `enabled`: boolean default: `true` — Indicates whether the live input is enabled and can accept streams.
- `keysRotatedAt`: string — The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing live inputs.
- `modified`: string — The date and time the live input was last modified.
- `playback`: object — Details for playing a live input's broadcast using the HLS or DASH manifests. URLs reference the live input ID.
  - `dash`: string **required** — The DASH manifest URL used to play live video, referencing the live input ID.
  - `hls`: string **required** — The HLS manifest URL used to play live video, referencing the live input ID.
- `preferLowLatency`: boolean default: `false` — When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduce
- `recording`: object — Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live 
  - `allowedOrigins`: string[] — Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdo
    [array]
  - `hideLiveViewerCount`: boolean default: `false` — Disables reporting the number of live viewers when this property is set to `true`.
  - `mode`: string enum: `off`, `automatic` default: `off` — Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a
  - `requireSignedURLs`: boolean default: `false` — Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of 
  - `timeoutSeconds`: integer default: `0` — Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand.
- `rtmps`: object — Details for streaming to an live input using RTMPS.
  - `streamKey`: string — The secret key to use when streaming via RTMPS to a live input.
  - `url`: string — The RTMPS URL you provide to the broadcaster, which they stream live video to.
- `rtmpsPlayback`: object — Details for playback from an live input using RTMPS.
  - `streamKey`: string — The secret key to use for playback via RTMPS.
  - `url`: string — The URL used to play live video over RTMPS.
- `srt`: object — Details for streaming to a live input using SRT.
  - `passphrase`: string — The secret key to use when streaming via SRT to a live input.
  - `streamId`: string — The identifier of the live input to use when streaming via SRT.
  - `url`: string — The SRT URL you provide to the broadcaster, which they stream live video to.
- `srtPlayback`: object — Details for playback from an live input using SRT.
  - `passphrase`: string — The secret key to use for playback via SRT.
  - `streamId`: string — The identifier of the live input to use for playback via SRT.
  - `url`: string — The URL used to play live video over SRT.
- `status`: string enum: `null`, `connected`, `reconnected`, `reconnecting`, `client_disconnect`, `ttl_exceeded`, `failed_to_connect`, `failed_to_reconnect` — The connection status of a live input.
- `uid`: string — A unique identifier for a live input.
- `webRTC`: object — Details for streaming to a live input using WebRTC.
  - `url`: string — The WebRTC URL you provide to the broadcaster, which they stream live video to.
- `webRTCPlayback`: object — Details for playback from a live input using WebRTC.
  - `url`: string — The URL used to play live video over WebRTC.
