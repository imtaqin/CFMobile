# Stream Videos

10 endpoints.

## GET /accounts/{account_id}/stream

List videos

operationId: `stream-videos-list-videos` · query: `status`, `creator`, `type`, `asc`, `video_name`, `search`, `start`, `end`, `include_counts`, `id`, `name`, `live_input_id`, `before`, `after`, `limit`

**Response** 200 → `result`

[array of]
- `allowedOrigins`: string[] — Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays a
  [array]
- `clippedFrom`: string — The unique identifier of the source video this video was clipped from.
- `created`: string — The date and time the media item was created.
- `creator`: string — A user-defined identifier for the media creator.
- `duration`: number — The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and bef
- `input`: object
  - `height`: integer — The video height in pixels. A value of `-1` means the height is unknown. The value becomes available after the upload and before the video i
  - `width`: integer — The video width in pixels. A value of `-1` means the width is unknown. The value becomes available after the upload and before the video is 
- `liveInput`: string — The live input ID used to upload a video with Stream Live.
- `maxDurationSeconds`: integer — The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exce
- `maxSizeBytes`: integer — The maximum size in bytes for the video upload.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing videos.
- `modified`: string — The date and time the media item was last modified.
- `playback`: object
  - `dash`: string — DASH Media Presentation Description for the video.
  - `hls`: string — The HLS manifest for the video.
- `preview`: string — The video's preview page URI. This field is omitted until encoding is complete.
- `publicDetails`: object — Public details for the video including title, share link, channel link, and logo.
  - `channel_link`: string
  - `logo`: string
  - `media_id`: integer
  - `share_link`: string
  - `title`: string
- `readyToStream`: boolean — Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.
- `readyToStreamAt`: string — Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still 
- `requireSignedURLs`: boolean default: `false` — Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view
- `scheduledDeletion`: string — Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remo
- `size`: number — The size of the media item in bytes.
- `status`: object — Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If th
  - `errorReasonCode`: string — Specifies why the video failed to encode. This field is empty if the video is not in an `error` state. Preferred for programmatic use.
  - `errorReasonText`: string — Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an `err
  - `pctComplete`: string — Indicates the progress as a percentage between 0 and 100.
  - `state`: string enum: `pendingupload`, `downloading`, `queued`, `inprogress`, `ready`, `error`, `live-inprogress` — Specifies the processing status for all quality levels for a video.
- `thumbnail`: string — The media item's thumbnail URI. This field is omitted until encoding is complete.
- `thumbnailTimestampPct`: number default: `0` — The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a p
- `uid`: string — A Cloudflare-generated unique identifier for a media item.
- `uploadExpiry`: string — The date and time when the video upload URL is no longer valid for direct user uploads.
- `uploaded`: string — The date and time the media item was uploaded.
- `watermark`: object
  - `created`: string — The date and a time a watermark profile was created.
  - `downloadedFrom`: string — The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null.
  - `height`: integer — The height of the image in pixels.
  - `name`: string default: `` — A short description of the watermark profile.
  - `opacity`: number default: `1` — The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note th
  - `padding`: number default: `0.05` — The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicat
  - `position`: string default: `upperRight` — The location of the image. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`. Note that `center` ignor
  - `scale`: number default: `0.15` — The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. 
  - `size`: number — The size of the image in bytes.
  - `uid`: string — The unique identifier for a watermark profile.
  - `width`: integer — The width of the image in pixels.

## POST /accounts/{account_id}/stream

Initiate video uploads using TUS

operationId: `stream-videos-initiate-video-uploads-using-tus` · query: `direct_user`

## DELETE /accounts/{account_id}/stream/{identifier}

Delete video

operationId: `stream-videos-delete-video`

## GET /accounts/{account_id}/stream/{identifier}

Retrieve video details

operationId: `stream-videos-retrieve-video-details`

**Response** 200 → `result`

- `allowedOrigins`: string[] — Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays a
  [array]
- `clippedFrom`: string — The unique identifier of the source video this video was clipped from.
- `created`: string — The date and time the media item was created.
- `creator`: string — A user-defined identifier for the media creator.
- `duration`: number — The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and bef
- `input`: object
  - `height`: integer — The video height in pixels. A value of `-1` means the height is unknown. The value becomes available after the upload and before the video i
  - `width`: integer — The video width in pixels. A value of `-1` means the width is unknown. The value becomes available after the upload and before the video is 
- `liveInput`: string — The live input ID used to upload a video with Stream Live.
- `maxDurationSeconds`: integer — The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exce
- `maxSizeBytes`: integer — The maximum size in bytes for the video upload.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing videos.
- `modified`: string — The date and time the media item was last modified.
- `playback`: object
  - `dash`: string — DASH Media Presentation Description for the video.
  - `hls`: string — The HLS manifest for the video.
- `preview`: string — The video's preview page URI. This field is omitted until encoding is complete.
- `publicDetails`: object — Public details for the video including title, share link, channel link, and logo.
  - `channel_link`: string
  - `logo`: string
  - `media_id`: integer
  - `share_link`: string
  - `title`: string
- `readyToStream`: boolean — Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.
- `readyToStreamAt`: string — Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still 
- `requireSignedURLs`: boolean default: `false` — Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view
- `scheduledDeletion`: string — Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remo
- `size`: number — The size of the media item in bytes.
- `status`: object — Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If th
  - `errorReasonCode`: string — Specifies why the video failed to encode. This field is empty if the video is not in an `error` state. Preferred for programmatic use.
  - `errorReasonText`: string — Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an `err
  - `pctComplete`: string — Indicates the progress as a percentage between 0 and 100.
  - `state`: string enum: `pendingupload`, `downloading`, `queued`, `inprogress`, `ready`, `error`, `live-inprogress` — Specifies the processing status for all quality levels for a video.
- `thumbnail`: string — The media item's thumbnail URI. This field is omitted until encoding is complete.
- `thumbnailTimestampPct`: number default: `0` — The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a p
- `uid`: string — A Cloudflare-generated unique identifier for a media item.
- `uploadExpiry`: string — The date and time when the video upload URL is no longer valid for direct user uploads.
- `uploaded`: string — The date and time the media item was uploaded.
- `watermark`: object
  - `created`: string — The date and a time a watermark profile was created.
  - `downloadedFrom`: string — The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null.
  - `height`: integer — The height of the image in pixels.
  - `name`: string default: `` — A short description of the watermark profile.
  - `opacity`: number default: `1` — The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note th
  - `padding`: number default: `0.05` — The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicat
  - `position`: string default: `upperRight` — The location of the image. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`. Note that `center` ignor
  - `scale`: number default: `0.15` — The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. 
  - `size`: number — The size of the image in bytes.
  - `uid`: string — The unique identifier for a watermark profile.
  - `width`: integer — The width of the image in pixels.

## POST /accounts/{account_id}/stream/{identifier}

Edit video details

operationId: `stream-videos-update-video-details`

**Request** (application/json)

- `allowedOrigins`: string[] — Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays a
  [array]
- `creator`: string — A user-defined identifier for the media creator.
- `maxDurationSeconds`: integer — The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exce
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing videos.
- `publicDetails`: object — Public details for the video including title, share link, channel link, and logo.
  - `channel_link`: string
  - `logo`: string
  - `share_link`: string
  - `title`: string
- `requireSignedURLs`: boolean default: `false` — Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view
- `scheduledDeletion`: string — Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remo
- `thumbnailTimestampPct`: number default: `0` — The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a p
- `uid`: string — The unique identifier for the video. Can be used to verify the video being updated.
- `uploadExpiry`: string — The date and time when the video upload URL is no longer valid for direct user uploads.

**Response** 200 → `result`

- `allowedOrigins`: string[] — Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays a
  [array]
- `clippedFrom`: string — The unique identifier of the source video this video was clipped from.
- `created`: string — The date and time the media item was created.
- `creator`: string — A user-defined identifier for the media creator.
- `duration`: number — The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and bef
- `input`: object
  - `height`: integer — The video height in pixels. A value of `-1` means the height is unknown. The value becomes available after the upload and before the video i
  - `width`: integer — The video width in pixels. A value of `-1` means the width is unknown. The value becomes available after the upload and before the video is 
- `liveInput`: string — The live input ID used to upload a video with Stream Live.
- `maxDurationSeconds`: integer — The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exce
- `maxSizeBytes`: integer — The maximum size in bytes for the video upload.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing videos.
- `modified`: string — The date and time the media item was last modified.
- `playback`: object
  - `dash`: string — DASH Media Presentation Description for the video.
  - `hls`: string — The HLS manifest for the video.
- `preview`: string — The video's preview page URI. This field is omitted until encoding is complete.
- `publicDetails`: object — Public details for the video including title, share link, channel link, and logo.
  - `channel_link`: string
  - `logo`: string
  - `media_id`: integer
  - `share_link`: string
  - `title`: string
- `readyToStream`: boolean — Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.
- `readyToStreamAt`: string — Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still 
- `requireSignedURLs`: boolean default: `false` — Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view
- `scheduledDeletion`: string — Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remo
- `size`: number — The size of the media item in bytes.
- `status`: object — Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If th
  - `errorReasonCode`: string — Specifies why the video failed to encode. This field is empty if the video is not in an `error` state. Preferred for programmatic use.
  - `errorReasonText`: string — Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an `err
  - `pctComplete`: string — Indicates the progress as a percentage between 0 and 100.
  - `state`: string enum: `pendingupload`, `downloading`, `queued`, `inprogress`, `ready`, `error`, `live-inprogress` — Specifies the processing status for all quality levels for a video.
- `thumbnail`: string — The media item's thumbnail URI. This field is omitted until encoding is complete.
- `thumbnailTimestampPct`: number default: `0` — The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a p
- `uid`: string — A Cloudflare-generated unique identifier for a media item.
- `uploadExpiry`: string — The date and time when the video upload URL is no longer valid for direct user uploads.
- `uploaded`: string — The date and time the media item was uploaded.
- `watermark`: object
  - `created`: string — The date and a time a watermark profile was created.
  - `downloadedFrom`: string — The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null.
  - `height`: integer — The height of the image in pixels.
  - `name`: string default: `` — A short description of the watermark profile.
  - `opacity`: number default: `1` — The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note th
  - `padding`: number default: `0.05` — The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicat
  - `position`: string default: `upperRight` — The location of the image. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`. Note that `center` ignor
  - `scale`: number default: `0.15` — The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. 
  - `size`: number — The size of the image in bytes.
  - `uid`: string — The unique identifier for a watermark profile.
  - `width`: integer — The width of the image in pixels.

## GET /accounts/{account_id}/stream/{identifier}/embed

Deprecated: Retrieve legacy embed code HTML

operationId: `stream-videos-retreieve-embed-code-html`

**Response** 200 → `result`

string

## POST /accounts/{account_id}/stream/{identifier}/token

Create signed URL tokens for videos

operationId: `stream-videos-create-signed-url-tokens-for-videos`

**Request** (application/json)

- `accessRules`: object[] — The optional list of access rule constraints on the token. Access can be blocked or allowed based on an IP, IP range, or by country. Access 
  [array of]
  - `action`: string enum: `allow`, `block` — The action to take when a request matches a rule. If the action is `block`, the signed token blocks views for viewers matching the rule.
  - `country`: string[] — An array of 2-letter country codes in ISO 3166-1 Alpha-2 format used to match requests.
    [array]
  - `ip`: string[] — An array of IPv4 or IPV6 addresses or CIDRs used to match requests.
    [array]
  - `type`: string enum: `any`, `ip.src`, `ip.geoip.country` — Lists available rule types to match for requests. An `any` type matches all requests and can be used as a wildcard to apply default actions 
- `downloadable`: boolean default: `false` — The optional boolean value that enables using signed tokens to access MP4 download links for a video.
- `exp`: integer — The optional unix epoch timestamp that specficies the time after a token is not accepted. The maximum time specification is 24 hours from is
- `flags`: object — Optional flags for the signed token.
  - `original`: boolean default: `false` — Whether to return the original video without transformations.
- `id`: string — The optional ID of a Stream signing key. If present, the `pem` field is also required.
- `nbf`: integer — The optional unix epoch timestamp that specifies the time before a the token is not accepted. If this field is not set, the default is one h
- `pem`: string — The optional base64 encoded private key in PEM format associated with a Stream signing key. If present, the `id` field is also required.

**Response** 200 → `result`

- `token`: string — The signed token used with the signed URLs feature.

## POST /accounts/{account_id}/stream/copy

Upload videos from a URL

operationId: `stream-videos-upload-videos-from-a-url`

**Request** (application/json)

(one of 2 variants; showing the first)
object

**Response** 200 → `result`

- `allowedOrigins`: string[] — Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays a
  [array]
- `clippedFrom`: string — The unique identifier of the source video this video was clipped from.
- `created`: string — The date and time the media item was created.
- `creator`: string — A user-defined identifier for the media creator.
- `duration`: number — The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and bef
- `input`: object
  - `height`: integer — The video height in pixels. A value of `-1` means the height is unknown. The value becomes available after the upload and before the video i
  - `width`: integer — The video width in pixels. A value of `-1` means the width is unknown. The value becomes available after the upload and before the video is 
- `liveInput`: string — The live input ID used to upload a video with Stream Live.
- `maxDurationSeconds`: integer — The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exce
- `maxSizeBytes`: integer — The maximum size in bytes for the video upload.
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing videos.
- `modified`: string — The date and time the media item was last modified.
- `playback`: object
  - `dash`: string — DASH Media Presentation Description for the video.
  - `hls`: string — The HLS manifest for the video.
- `preview`: string — The video's preview page URI. This field is omitted until encoding is complete.
- `publicDetails`: object — Public details for the video including title, share link, channel link, and logo.
  - `channel_link`: string
  - `logo`: string
  - `media_id`: integer
  - `share_link`: string
  - `title`: string
- `readyToStream`: boolean — Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.
- `readyToStreamAt`: string — Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still 
- `requireSignedURLs`: boolean default: `false` — Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view
- `scheduledDeletion`: string — Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remo
- `size`: number — The size of the media item in bytes.
- `status`: object — Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If th
  - `errorReasonCode`: string — Specifies why the video failed to encode. This field is empty if the video is not in an `error` state. Preferred for programmatic use.
  - `errorReasonText`: string — Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an `err
  - `pctComplete`: string — Indicates the progress as a percentage between 0 and 100.
  - `state`: string enum: `pendingupload`, `downloading`, `queued`, `inprogress`, `ready`, `error`, `live-inprogress` — Specifies the processing status for all quality levels for a video.
- `thumbnail`: string — The media item's thumbnail URI. This field is omitted until encoding is complete.
- `thumbnailTimestampPct`: number default: `0` — The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a p
- `uid`: string — A Cloudflare-generated unique identifier for a media item.
- `uploadExpiry`: string — The date and time when the video upload URL is no longer valid for direct user uploads.
- `uploaded`: string — The date and time the media item was uploaded.
- `watermark`: object
  - `created`: string — The date and a time a watermark profile was created.
  - `downloadedFrom`: string — The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null.
  - `height`: integer — The height of the image in pixels.
  - `name`: string default: `` — A short description of the watermark profile.
  - `opacity`: number default: `1` — The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note th
  - `padding`: number default: `0.05` — The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicat
  - `position`: string default: `upperRight` — The location of the image. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`. Note that `center` ignor
  - `scale`: number default: `0.15` — The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. 
  - `size`: number — The size of the image in bytes.
  - `uid`: string — The unique identifier for a watermark profile.
  - `width`: integer — The width of the image in pixels.

## POST /accounts/{account_id}/stream/direct_upload

Upload videos via direct upload URLs

operationId: `stream-videos-upload-videos-via-direct-upload-ur-ls`

**Request** (application/json)

- `allowedOrigins`: string[] — Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays a
  [array]
- `creator`: string — A user-defined identifier for the media creator.
- `expiry`: string default: `Now + 30 minutes` — The date and time after upload when videos will not be accepted.
- `maxDurationSeconds`: integer **required** — The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exce
- `meta`: object — A user modifiable key-value store used to reference other systems of record for managing videos.
- `requireSignedURLs`: boolean default: `false` — Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view
- `scheduledDeletion`: string — Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remo
- `thumbnailTimestampPct`: number default: `0` — The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a p
- `watermark`: object
  - `uid`: string — The unique identifier for the watermark profile.

**Response** 200 → `result`

- `scheduledDeletion`: string — Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remo
- `uid`: string — A Cloudflare-generated unique identifier for a media item.
- `uploadURL`: string — The URL an unauthenticated upload can use for a single `HTTP POST multipart/form-data` request.
- `watermark`: object
  - `created`: string — The date and a time a watermark profile was created.
  - `downloadedFrom`: string — The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null.
  - `height`: integer — The height of the image in pixels.
  - `name`: string default: `` — A short description of the watermark profile.
  - `opacity`: number default: `1` — The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note th
  - `padding`: number default: `0.05` — The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicat
  - `position`: string default: `upperRight` — The location of the image. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`. Note that `center` ignor
  - `scale`: number default: `0.15` — The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. 
  - `size`: number — The size of the image in bytes.
  - `uid`: string — The unique identifier for a watermark profile.
  - `width`: integer — The width of the image in pixels.

## GET /accounts/{account_id}/stream/storage-usage

Storage use

operationId: `stream-videos-storage-usage` · query: `creator`

**Response** 200 → `result`

- `creator`: string — A user-defined identifier for the media creator.
- `totalStorageMinutes`: number — The total minutes of video content stored in the account. May contain decimal values.
- `totalStorageMinutesLimit`: integer — The storage capacity alloted for the account.
- `videoCount`: integer — The total count of videos associated with the account.
