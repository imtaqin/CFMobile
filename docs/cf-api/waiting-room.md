# Waiting Room

24 endpoints.

## GET /accounts/{account_id}/waiting_rooms

List waiting rooms for account

operationId: `waiting-room-list-waiting-rooms-account` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `additional_routes`: object[] — Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be appl
  [array of]
  - `host`: string — The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostna
  - `path`: string default: `/` — Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two wai
- `cookie_attributes`: object — Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue po
  - `samesite`: string enum: `auto`, `lax`, `none`, `strict` default: `auto` — Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use H
  - `secure`: string enum: `auto`, `always`, `never` default: `auto` — Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie
- `cookie_suffix`: string default: `` — Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the coo
- `created_on`: string
- `custom_page_html`: string default: `` — Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page
- `default_template_language`: string enum: `en-US`, `es-ES`, `de-DE`, `fr-FR`, `it-IT`, `ja-JP`, `ko-KR`, `pt-BR` default: `en-US` — The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.
- `description`: string default: `` — A note that you can use to add more details about the waiting room.
- `disable_session_renewal`: boolean default: `false` — Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will h
- `enabled_origin_commands`: string[] default: `` — A list of enabled origin commands.
  [array]
- `host`: string — The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and
- `id`: string
- `json_response_enabled`: boolean default: `false` — Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json
- `modified_on`: string
- `name`: string — A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.
- `new_users_per_minute`: integer — Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are l
- `next_event_prequeue_start_time`: string — An ISO 8601 timestamp that marks when the next event will begin queueing.
- `next_event_start_time`: string — An ISO 8601 timestamp that marks when the next event will start.
- `path`: string default: `/` — Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two wai
- `queue_all`: boolean default: `false` — If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once
- `queueing_method`: string enum: `fifo`, `random`, `passthrough`, `reject` default: `fifo` — Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Wa
- `queueing_status_code`: integer enum: `200`, `202`, `429` default: `200` — HTTP status code returned to a user while in the queue.
- `session_duration`: integer default: `5` — Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that
- `suspended`: boolean default: `false` — Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.
- `total_active_users`: integer — Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting 
- `turnstile_action`: string enum: `log`, `infinite_queue` default: `log` — Which action to take when a bot is detected using Turnstile. `log` will
- `turnstile_mode`: string enum: `off`, `invisible`, `visible_non_interactive`, `visible_managed` default: `invisible` — Which Turnstile widget type to use for detecting bot traffic. See

## GET /zones/{zone_id}/waiting_rooms

List waiting rooms for zone

operationId: `waiting-room-list-waiting-rooms` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `additional_routes`: object[] — Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be appl
  [array of]
  - `host`: string — The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostna
  - `path`: string default: `/` — Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two wai
- `cookie_attributes`: object — Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue po
  - `samesite`: string enum: `auto`, `lax`, `none`, `strict` default: `auto` — Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use H
  - `secure`: string enum: `auto`, `always`, `never` default: `auto` — Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie
- `cookie_suffix`: string default: `` — Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the coo
- `created_on`: string
- `custom_page_html`: string default: `` — Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page
- `default_template_language`: string enum: `en-US`, `es-ES`, `de-DE`, `fr-FR`, `it-IT`, `ja-JP`, `ko-KR`, `pt-BR` default: `en-US` — The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.
- `description`: string default: `` — A note that you can use to add more details about the waiting room.
- `disable_session_renewal`: boolean default: `false` — Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will h
- `enabled_origin_commands`: string[] default: `` — A list of enabled origin commands.
  [array]
- `host`: string — The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and
- `id`: string
- `json_response_enabled`: boolean default: `false` — Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json
- `modified_on`: string
- `name`: string — A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.
- `new_users_per_minute`: integer — Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are l
- `next_event_prequeue_start_time`: string — An ISO 8601 timestamp that marks when the next event will begin queueing.
- `next_event_start_time`: string — An ISO 8601 timestamp that marks when the next event will start.
- `path`: string default: `/` — Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two wai
- `queue_all`: boolean default: `false` — If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once
- `queueing_method`: string enum: `fifo`, `random`, `passthrough`, `reject` default: `fifo` — Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Wa
- `queueing_status_code`: integer enum: `200`, `202`, `429` default: `200` — HTTP status code returned to a user while in the queue.
- `session_duration`: integer default: `5` — Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that
- `suspended`: boolean default: `false` — Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.
- `total_active_users`: integer — Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting 
- `turnstile_action`: string enum: `log`, `infinite_queue` default: `log` — Which action to take when a bot is detected using Turnstile. `log` will
- `turnstile_mode`: string enum: `off`, `invisible`, `visible_non_interactive`, `visible_managed` default: `invisible` — Which Turnstile widget type to use for detecting bot traffic. See

## POST /zones/{zone_id}/waiting_rooms

Create waiting room

operationId: `waiting-room-create-waiting-room`

**Request** (application/json)

- `additional_routes`: object[] — Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be appl
  [array of]
  - `host`: string — The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostna
  - `path`: string default: `/` — Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two wai
- `cookie_attributes`: object — Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue po
  - `samesite`: string enum: `auto`, `lax`, `none`, `strict` default: `auto` — Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use H
  - `secure`: string enum: `auto`, `always`, `never` default: `auto` — Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie
- `cookie_suffix`: string default: `` — Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the coo
- `custom_page_html`: string default: `` — Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page
- `default_template_language`: string enum: `en-US`, `es-ES`, `de-DE`, `fr-FR`, `it-IT`, `ja-JP`, `ko-KR`, `pt-BR` default: `en-US` — The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.
- `description`: string default: `` — A note that you can use to add more details about the waiting room.
- `disable_session_renewal`: boolean default: `false` — Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will h
- `enabled_origin_commands`: string[] default: `` — A list of enabled origin commands.
  [array]
- `host`: string **required** — The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and
- `json_response_enabled`: boolean default: `false` — Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json
- `name`: string **required** — A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.
- `new_users_per_minute`: integer **required** — Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are l
- `path`: string default: `/` — Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two wai
- `queue_all`: boolean default: `false` — If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once
- `queueing_method`: string enum: `fifo`, `random`, `passthrough`, `reject` default: `fifo` — Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Wa
- `queueing_status_code`: integer enum: `200`, `202`, `429` default: `200` — HTTP status code returned to a user while in the queue.
- `session_duration`: integer default: `5` — Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that
- `suspended`: boolean default: `false` — Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.
- `total_active_users`: integer **required** — Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting 
- `turnstile_action`: string enum: `log`, `infinite_queue` default: `log` — Which action to take when a bot is detected using Turnstile. `log` will
- `turnstile_mode`: string enum: `off`, `invisible`, `visible_non_interactive`, `visible_managed` default: `invisible` — Which Turnstile widget type to use for detecting bot traffic. See

**Response** 200 → `result`

object

## DELETE /zones/{zone_id}/waiting_rooms/{waiting_room_id}

Delete waiting room

operationId: `waiting-room-delete-waiting-room`

**Response** 200 → `result`

object

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}

Waiting room details

operationId: `waiting-room-waiting-room-details`

**Response** 200 → `result`

object

## PATCH /zones/{zone_id}/waiting_rooms/{waiting_room_id}

Patch waiting room

operationId: `waiting-room-patch-waiting-room`

**Request** (application/json)

- `additional_routes`: object[] — Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be appl
  [array of]
  - `host`: string — The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostna
  - `path`: string default: `/` — Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two wai
- `cookie_attributes`: object — Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue po
  - `samesite`: string enum: `auto`, `lax`, `none`, `strict` default: `auto` — Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use H
  - `secure`: string enum: `auto`, `always`, `never` default: `auto` — Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie
- `cookie_suffix`: string default: `` — Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the coo
- `custom_page_html`: string default: `` — Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page
- `default_template_language`: string enum: `en-US`, `es-ES`, `de-DE`, `fr-FR`, `it-IT`, `ja-JP`, `ko-KR`, `pt-BR` default: `en-US` — The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.
- `description`: string default: `` — A note that you can use to add more details about the waiting room.
- `disable_session_renewal`: boolean default: `false` — Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will h
- `enabled_origin_commands`: string[] default: `` — A list of enabled origin commands.
  [array]
- `host`: string **required** — The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and
- `json_response_enabled`: boolean default: `false` — Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json
- `name`: string **required** — A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.
- `new_users_per_minute`: integer **required** — Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are l
- `path`: string default: `/` — Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two wai
- `queue_all`: boolean default: `false` — If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once
- `queueing_method`: string enum: `fifo`, `random`, `passthrough`, `reject` default: `fifo` — Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Wa
- `queueing_status_code`: integer enum: `200`, `202`, `429` default: `200` — HTTP status code returned to a user while in the queue.
- `session_duration`: integer default: `5` — Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that
- `suspended`: boolean default: `false` — Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.
- `total_active_users`: integer **required** — Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting 
- `turnstile_action`: string enum: `log`, `infinite_queue` default: `log` — Which action to take when a bot is detected using Turnstile. `log` will
- `turnstile_mode`: string enum: `off`, `invisible`, `visible_non_interactive`, `visible_managed` default: `invisible` — Which Turnstile widget type to use for detecting bot traffic. See

**Response** 200 → `result`

object

## PUT /zones/{zone_id}/waiting_rooms/{waiting_room_id}

Update waiting room

operationId: `waiting-room-update-waiting-room`

**Request** (application/json)

- `additional_routes`: object[] — Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be appl
  [array of]
  - `host`: string — The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostna
  - `path`: string default: `/` — Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two wai
- `cookie_attributes`: object — Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue po
  - `samesite`: string enum: `auto`, `lax`, `none`, `strict` default: `auto` — Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use H
  - `secure`: string enum: `auto`, `always`, `never` default: `auto` — Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie
- `cookie_suffix`: string default: `` — Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the coo
- `custom_page_html`: string default: `` — Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page
- `default_template_language`: string enum: `en-US`, `es-ES`, `de-DE`, `fr-FR`, `it-IT`, `ja-JP`, `ko-KR`, `pt-BR` default: `en-US` — The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.
- `description`: string default: `` — A note that you can use to add more details about the waiting room.
- `disable_session_renewal`: boolean default: `false` — Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will h
- `enabled_origin_commands`: string[] default: `` — A list of enabled origin commands.
  [array]
- `host`: string **required** — The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and
- `json_response_enabled`: boolean default: `false` — Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json
- `name`: string **required** — A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.
- `new_users_per_minute`: integer **required** — Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are l
- `path`: string default: `/` — Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two wai
- `queue_all`: boolean default: `false` — If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once
- `queueing_method`: string enum: `fifo`, `random`, `passthrough`, `reject` default: `fifo` — Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Wa
- `queueing_status_code`: integer enum: `200`, `202`, `429` default: `200` — HTTP status code returned to a user while in the queue.
- `session_duration`: integer default: `5` — Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that
- `suspended`: boolean default: `false` — Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.
- `total_active_users`: integer **required** — Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting 
- `turnstile_action`: string enum: `log`, `infinite_queue` default: `log` — Which action to take when a bot is detected using Turnstile. `log` will
- `turnstile_mode`: string enum: `off`, `invisible`, `visible_non_interactive`, `visible_managed` default: `invisible` — Which Turnstile widget type to use for detecting bot traffic. See

**Response** 200 → `result`

object

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events

List events

operationId: `waiting-room-list-events` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `created_on`: string
- `custom_page_html`: string — If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.
- `description`: string default: `` — A note that you can use to add more details about the event.
- `disable_session_renewal`: boolean — If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it
- `event_end_time`: string — An ISO 8601 timestamp that marks the end of the event.
- `event_start_time`: string — An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The st
- `id`: string
- `modified_on`: string
- `name`: string — A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.
- `new_users_per_minute`: integer — If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. T
- `prequeue_start_time`: string — An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes bef
- `queueing_method`: string — If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.
- `session_duration`: integer — If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.
- `shuffle_at_event_start`: boolean default: `false` — If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This
- `suspended`: boolean default: `false` — Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.
- `total_active_users`: integer — If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. Thi
- `turnstile_action`: string enum: `log`, `infinite_queue` — If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.
- `turnstile_mode`: string enum: `off`, `invisible`, `visible_non_interactive`, `visible_managed` — If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

## POST /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events

Create event

operationId: `waiting-room-create-event`

**Request** (application/json)

- `custom_page_html`: string — If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.
- `description`: string default: `` — A note that you can use to add more details about the event.
- `disable_session_renewal`: boolean — If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it
- `event_end_time`: string **required** — An ISO 8601 timestamp that marks the end of the event.
- `event_start_time`: string **required** — An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The st
- `name`: string **required** — A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.
- `new_users_per_minute`: integer — If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. T
- `prequeue_start_time`: string — An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes bef
- `queueing_method`: string — If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.
- `session_duration`: integer — If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.
- `shuffle_at_event_start`: boolean default: `false` — If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This
- `suspended`: boolean default: `false` — Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.
- `total_active_users`: integer — If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. Thi
- `turnstile_action`: string enum: `log`, `infinite_queue` — If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.
- `turnstile_mode`: string enum: `off`, `invisible`, `visible_non_interactive`, `visible_managed` — If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

**Response** 200 → `result`

object

## DELETE /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}

Delete event

operationId: `waiting-room-delete-event`

**Response** 200 → `result`

object

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}

Event details

operationId: `waiting-room-event-details`

**Response** 200 → `result`

object

## PATCH /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}

Patch event

operationId: `waiting-room-patch-event`

**Request** (application/json)

- `custom_page_html`: string — If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.
- `description`: string default: `` — A note that you can use to add more details about the event.
- `disable_session_renewal`: boolean — If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it
- `event_end_time`: string **required** — An ISO 8601 timestamp that marks the end of the event.
- `event_start_time`: string **required** — An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The st
- `name`: string **required** — A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.
- `new_users_per_minute`: integer — If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. T
- `prequeue_start_time`: string — An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes bef
- `queueing_method`: string — If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.
- `session_duration`: integer — If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.
- `shuffle_at_event_start`: boolean default: `false` — If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This
- `suspended`: boolean default: `false` — Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.
- `total_active_users`: integer — If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. Thi
- `turnstile_action`: string enum: `log`, `infinite_queue` — If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.
- `turnstile_mode`: string enum: `off`, `invisible`, `visible_non_interactive`, `visible_managed` — If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

**Response** 200 → `result`

object

## PUT /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}

Update event

operationId: `waiting-room-update-event`

**Request** (application/json)

- `custom_page_html`: string — If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.
- `description`: string default: `` — A note that you can use to add more details about the event.
- `disable_session_renewal`: boolean — If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it
- `event_end_time`: string **required** — An ISO 8601 timestamp that marks the end of the event.
- `event_start_time`: string **required** — An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The st
- `name`: string **required** — A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.
- `new_users_per_minute`: integer — If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. T
- `prequeue_start_time`: string — An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes bef
- `queueing_method`: string — If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.
- `session_duration`: integer — If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.
- `shuffle_at_event_start`: boolean default: `false` — If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This
- `suspended`: boolean default: `false` — Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.
- `total_active_users`: integer — If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. Thi
- `turnstile_action`: string enum: `log`, `infinite_queue` — If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.
- `turnstile_mode`: string enum: `off`, `invisible`, `visible_non_interactive`, `visible_managed` — If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

**Response** 200 → `result`

object

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}/details

Preview active event details

operationId: `waiting-room-preview-active-event-details`

**Response** 200 → `result`

object

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules

List Waiting Room Rules

operationId: `waiting-room-list-waiting-room-rules`

**Response** 200 → `result`

[array of]
- `action`: string enum: `bypass_waiting_room` — The action to take when the expression matches.
- `description`: string default: `` — The description of the rule.
- `enabled`: boolean default: `true` — When set to true, the rule is enabled.
- `expression`: string — Criteria defining when there is a match for the current rule.
- `id`: string — The ID of the rule.
- `last_updated`: string
- `version`: string — The version of the rule.

## POST /zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules

Create Waiting Room Rule

operationId: `waiting-room-create-waiting-room-rule`

**Request** (application/json)

- `action`: string **required** enum: `bypass_waiting_room` — The action to take when the expression matches.
- `description`: string default: `` — The description of the rule.
- `enabled`: boolean default: `true` — When set to true, the rule is enabled.
- `expression`: string **required** — Criteria defining when there is a match for the current rule.

**Response** 200 → `result`

[array of]
- `action`: string enum: `bypass_waiting_room` — The action to take when the expression matches.
- `description`: string default: `` — The description of the rule.
- `enabled`: boolean default: `true` — When set to true, the rule is enabled.
- `expression`: string — Criteria defining when there is a match for the current rule.
- `id`: string — The ID of the rule.
- `last_updated`: string
- `version`: string — The version of the rule.

## PUT /zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules

Replace Waiting Room Rules

operationId: `waiting-room-replace-waiting-room-rules`

**Request** (application/json)

[array of]
- `action`: string **required** enum: `bypass_waiting_room` — The action to take when the expression matches.
- `description`: string default: `` — The description of the rule.
- `enabled`: boolean default: `true` — When set to true, the rule is enabled.
- `expression`: string **required** — Criteria defining when there is a match for the current rule.

**Response** 200 → `result`

[array of]
- `action`: string enum: `bypass_waiting_room` — The action to take when the expression matches.
- `description`: string default: `` — The description of the rule.
- `enabled`: boolean default: `true` — When set to true, the rule is enabled.
- `expression`: string — Criteria defining when there is a match for the current rule.
- `id`: string — The ID of the rule.
- `last_updated`: string
- `version`: string — The version of the rule.

## DELETE /zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules/{rule_id}

Delete Waiting Room Rule

operationId: `waiting-room-delete-waiting-room-rule`

**Response** 200 → `result`

[array of]
- `action`: string enum: `bypass_waiting_room` — The action to take when the expression matches.
- `description`: string default: `` — The description of the rule.
- `enabled`: boolean default: `true` — When set to true, the rule is enabled.
- `expression`: string — Criteria defining when there is a match for the current rule.
- `id`: string — The ID of the rule.
- `last_updated`: string
- `version`: string — The version of the rule.

## PATCH /zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules/{rule_id}

Patch Waiting Room Rule

operationId: `waiting-room-patch-waiting-room-rule`

**Request** (application/json)

- `action`: string **required** enum: `bypass_waiting_room` — The action to take when the expression matches.
- `description`: string default: `` — The description of the rule.
- `enabled`: boolean default: `true` — When set to true, the rule is enabled.
- `expression`: string **required** — Criteria defining when there is a match for the current rule.
- `position`: object — Reorder the position of a rule

**Response** 200 → `result`

[array of]
- `action`: string enum: `bypass_waiting_room` — The action to take when the expression matches.
- `description`: string default: `` — The description of the rule.
- `enabled`: boolean default: `true` — When set to true, the rule is enabled.
- `expression`: string — Criteria defining when there is a match for the current rule.
- `id`: string — The ID of the rule.
- `last_updated`: string
- `version`: string — The version of the rule.

## GET /zones/{zone_id}/waiting_rooms/{waiting_room_id}/status

Get waiting room status

operationId: `waiting-room-get-waiting-room-status`

**Response** 200 → `result`

object

## POST /zones/{zone_id}/waiting_rooms/preview

Create a custom waiting room page preview

operationId: `waiting-room-create-a-custom-waiting-room-page-preview`

**Request** (application/json)

- `custom_html`: string **required** default: `` — Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page

**Response** 200 → `result`

object

## GET /zones/{zone_id}/waiting_rooms/settings

Get zone-level Waiting Room settings

operationId: `waiting-room-get-zone-settings`

**Response** 200 → `result`

object

## PATCH /zones/{zone_id}/waiting_rooms/settings

Patch zone-level Waiting Room settings

operationId: `waiting-room-patch-zone-settings`

**Request** (application/json)

- `search_engine_crawler_bypass`: boolean default: `false` — Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.

**Response** 200 → `result`

object

## PUT /zones/{zone_id}/waiting_rooms/settings

Update zone-level Waiting Room settings

operationId: `waiting-room-update-zone-settings`

**Request** (application/json)

- `search_engine_crawler_bypass`: boolean default: `false` — Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.

**Response** 200 → `result`

object
