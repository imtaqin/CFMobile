# Email Security

21 endpoints.

## GET /accounts/{account_id}/email-security/investigate

Search email messages

operationId: `email_security_investigate` · query: `start`, `end`, `query`, `detections_only`, `final_disposition`, `metric`, `message_action`, `recipient`, `sender`, `smtp_helo_ip`, `alert_id`, `domain`, `message_id`, `subject`, `delivery_status`, `cursor`, `per_page`, `page`

**Response** 200 → `result`

[array of]
- `action_log`: object[] **required** — Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.
  [array of]
  - `completed_at`: string **required** — Timestamp when action completed.
  - `completed_timestamp`: string — Deprecated, use `completed_at` instead. End of life: November 1, 2026.
  - `operation`: string **required** enum: `MOVE`, `RELEASE`, `RECLASSIFY`, `SUBMISSION`, `QUARANTINE_RELEASE`, `PREVIEW` — Type of action performed.
  - `properties`: object — Additional properties for the action.
    - `folder`: string — Target folder for move operations.
    - `requested_by`: string — User who requested the action.
  - `status`: string — Status of the action.
- `alert_id`: string
- `client_recipients`: string[] **required**
  [array]
- `delivery_mode`: string
- `delivery_status`: string[]
  [array]
- `detection_reasons`: string[] **required**
  [array]
- `edf_hash`: string
- `envelope_from`: string
- `envelope_to`: string[]
  [array]
- `final_disposition`: string
- `findings`: object[] — Deprecated, use the `findings` field from `GET /investigate/{investigate_id}/detections` instead. End of life: November 1, 2026. Detection f
  [array of]
  - `attachment`: string
  - `detail`: string
  - `detection`: string
  - `field`: string
  - `name`: string
  - `portion`: string
  - `reason`: string
  - `score`: number
  - `value`: string
- `from`: string
- `from_name`: string
- `htmltext_structure_hash`: string
- `id`: any **required**
- `is_phish_submission`: boolean **required**
- `is_quarantined`: boolean **required**
- `message_id`: string
- `post_delivery_operations`: string[] — Post-delivery operations performed on this message.
  [array]
- `postfix_id`: string **required** — The identifier of the message.
- `postfix_id_outbound`: string
- `properties`: object **required** — Message processing properties.
  - `allowlisted_pattern`: string — Pattern that allowlisted this message.
  - `allowlisted_pattern_type`: string enum: `quarantine_release`, `acceptable_sender`, `allowed_sender`, `allowed_recipient`, `domain_similarity`, `domain_recency`, `managed_acceptable_sender`, `outbound_ndr` — Type of allowlist pattern.
  - `blocklisted_message`: boolean — Whether message was blocklisted.
  - `blocklisted_pattern`: string — Pattern that blocklisted this message.
  - `whitelisted_pattern_type`: string enum: `quarantine_release`, `acceptable_sender`, `allowed_sender`, `allowed_recipient`, `domain_similarity`, `domain_recency`, `managed_acceptable_sender`, `outbound_ndr` — Legacy field for allowlist pattern type.
- `replyto`: string
- `scanned_at`: string — When the message was scanned (UTC).
- `sent_at`: string — When the message was sent (UTC).
- `sent_date`: string
- `smtp_helo_server_ip`: string
- `smtp_previous_hop_ip`: string
- `subject`: string
- `threat_categories`: string[]
  [array]
- `to`: string[]
  [array]
- `to_name`: string[]
  [array]
- `ts`: string **required** — Deprecated, use `scanned_at` instead. End of life: November 1, 2026.
- `validation`: any
- `x_originating_ip`: string

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}

Get message details

operationId: `email_security_get_message` · query: `submission`

**Response** 200 → `result`

- `action_log`: object[] **required** — Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.
  [array of]
  - `completed_at`: string **required** — Timestamp when action completed.
  - `completed_timestamp`: string — Deprecated, use `completed_at` instead. End of life: November 1, 2026.
  - `operation`: string **required** enum: `MOVE`, `RELEASE`, `RECLASSIFY`, `SUBMISSION`, `QUARANTINE_RELEASE`, `PREVIEW` — Type of action performed.
  - `properties`: object — Additional properties for the action.
    - `folder`: string — Target folder for move operations.
    - `requested_by`: string — User who requested the action.
  - `status`: string — Status of the action.
- `alert_id`: string
- `client_recipients`: string[] **required**
  [array]
- `delivery_mode`: string
- `delivery_status`: string[]
  [array]
- `detection_reasons`: string[] **required**
  [array]
- `edf_hash`: string
- `envelope_from`: string
- `envelope_to`: string[]
  [array]
- `final_disposition`: string
- `findings`: object[] — Deprecated, use the `findings` field from `GET /investigate/{investigate_id}/detections` instead. End of life: November 1, 2026. Detection f
  [array of]
  - `attachment`: string
  - `detail`: string
  - `detection`: string
  - `field`: string
  - `name`: string
  - `portion`: string
  - `reason`: string
  - `score`: number
  - `value`: string
- `from`: string
- `from_name`: string
- `htmltext_structure_hash`: string
- `id`: any **required**
- `is_phish_submission`: boolean **required**
- `is_quarantined`: boolean **required**
- `message_id`: string
- `post_delivery_operations`: string[] — Post-delivery operations performed on this message.
  [array]
- `postfix_id`: string **required** — The identifier of the message.
- `postfix_id_outbound`: string
- `properties`: object **required** — Message processing properties.
  - `allowlisted_pattern`: string — Pattern that allowlisted this message.
  - `allowlisted_pattern_type`: string enum: `quarantine_release`, `acceptable_sender`, `allowed_sender`, `allowed_recipient`, `domain_similarity`, `domain_recency`, `managed_acceptable_sender`, `outbound_ndr` — Type of allowlist pattern.
  - `blocklisted_message`: boolean — Whether message was blocklisted.
  - `blocklisted_pattern`: string — Pattern that blocklisted this message.
  - `whitelisted_pattern_type`: string enum: `quarantine_release`, `acceptable_sender`, `allowed_sender`, `allowed_recipient`, `domain_similarity`, `domain_recency`, `managed_acceptable_sender`, `outbound_ndr` — Legacy field for allowlist pattern type.
- `replyto`: string
- `scanned_at`: string — When the message was scanned (UTC).
- `sent_at`: string — When the message was sent (UTC).
- `sent_date`: string
- `smtp_helo_server_ip`: string
- `smtp_previous_hop_ip`: string
- `subject`: string
- `threat_categories`: string[]
  [array]
- `to`: string[]
  [array]
- `to_name`: string[]
  [array]
- `ts`: string **required** — Deprecated, use `scanned_at` instead. End of life: November 1, 2026.
- `validation`: any
- `x_originating_ip`: string

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}/action_log

List post-delivery actions for a message

operationId: `email_security_get_message_action_log` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `completed_at`: string — Timestamp when the action completed.
- `operation`: string **required** enum: `PREVIEW`, `QUARANTINE_RELEASE`, `SUBMISSION`, `MOVE`
- `properties`: object
- `started_at`: string — Timestamp when the action was initiated.
- `status`: string
- `success`: boolean

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}/detections

Get message detection details

operationId: `email_security_get_message_detections`

**Response** 200 → `result`

- `action`: string **required**
- `attachments`: object[] **required**
  [array of]
  - `content_type`: string — MIME type of the attachment.
  - `detection`: string — Detection result for this attachment.
  - `encrypted`: boolean — Whether the attachment is encrypted.
  - `filename`: string — Name of the attached file.
  - `md5`: string — MD5 hash of the attachment.
  - `name`: string — Attachment name (alternative to filename).
  - `sha1`: string — SHA1 hash of the attachment.
  - `sha256`: string — SHA256 hash of the attachment.
  - `size`: integer **required** — Size of the attachment in bytes.
- `final_disposition`: string
- `findings`: object[] **required**
  [array of]
  - `attachment`: string
  - `detail`: string
  - `detection`: string — Detection result associated with this finding.
  - `field`: string
  - `name`: string
  - `portion`: string
  - `reason`: string
  - `score`: number
  - `value`: string
- `headers`: object[] **required**
  [array of]
  - `name`: string **required**
  - `value`: string **required**
- `links`: object[] **required**
  [array of]
  - `href`: string **required**
  - `text`: string
- `sender_info`: object **required**
  - `as_name`: string — The name of the autonomous system.
  - `as_number`: integer — The number of the autonomous system.
  - `geo`: string
  - `ip`: string
  - `pld`: string
- `threat_categories`: object[] **required**
  [array of]
  - `description`: string
  - `id`: integer
  - `name`: string
- `validation`: object **required**
  - `comment`: string
  - `dkim`: string
  - `dmarc`: string
  - `spf`: string

## POST /accounts/{account_id}/email-security/investigate/{investigate_id}/move

Move a message

operationId: `email_security_post_message_move`

**Request** (application/json)

- `destination`: string **required** enum: `Inbox`, `JunkEmail`, `DeletedItems`, `RecoverableItemsDeletions`, `RecoverableItemsPurges` — The mailbox folder to move messages to.
- `expected_disposition`: string — Nonfunctional field. End of life: December 1, 2026.

**Response** 200 → `result`

[array of]
- `completed_at`: string — When the move operation completed (UTC).
- `completed_timestamp`: string — Deprecated, use `completed_at` instead. End of life: November 1, 2026.
- `destination`: string — Destination folder for the message.
- `item_count`: integer — Number of items moved. End of life: November 1, 2026.
- `message_id`: string — Message identifier.
- `operation`: string — Type of operation performed.
- `recipient`: string — Recipient email address.
- `status`: string — Operation status.
- `success`: boolean **required** — Whether the operation succeeded.

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}/preview

Get preview for a detection

operationId: `email_security_get_message_preview`

**Response** 200 → `result`

- `screenshot`: string **required** — A base64 encoded PNG image of the email.

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}/raw

Get raw email content

operationId: `email_security_get_message_raw`

**Response** 200 → `result`

- `raw`: string **required** — A UTF-8 encoded eml file of the email.

## POST /accounts/{account_id}/email-security/investigate/{investigate_id}/reclassify

Change email classification

operationId: `email_security_post_reclassify`

**Request** (application/json)

- `eml_content`: string — Base64 encoded content of the EML file.
- `escalated_submission_id`: string — Submission ID of the original user submission, when reclassifying an escalated user report.
- `expected_disposition`: string **required** enum: `NONE`, `BULK`, `MALICIOUS`, `SPAM`, `SPOOF`, `SUSPICIOUS` — The disposition the message should have.

**Response** 202 → `result`

object

## GET /accounts/{account_id}/email-security/investigate/{investigate_id}/trace

Get email trace

operationId: `email_security_get_message_trace`

**Response** 200 → `result`

- `inbound`: object **required**
  - `lines`: object[]
    [array of]
    - `lineno`: integer — Line number in the trace log.
    - `logged_at`: string
    - `message`: string
    - `ts`: string — Deprecated, use `logged_at` instead. End of life: November 1, 2026.
  - `pending`: boolean
- `outbound`: object **required**
  - `lines`: object[]
    [array of]
    - `lineno`: integer — Line number in the trace log.
    - `logged_at`: string
    - `message`: string
    - `ts`: string — Deprecated, use `logged_at` instead. End of life: November 1, 2026.
  - `pending`: boolean

## GET /accounts/{account_id}/email-security/investigate/bulk

List bulk action jobs

operationId: `email_security_get_bulk_jobs` · query: `page`, `per_page`, `action_type`, `status`

**Response** 200 → `result`

[array of]
- `action_params`: any **required**
- `action_type`: string **required** enum: `MOVE`, `RELEASE`
- `comment`: string
- `completed_at`: string
- `created_at`: string **required**
- `job_id`: string **required**
- `messages_cancelled`: integer **required** — Messages that were cancelled: rows cancelled via the API before being claimed, and rows whose in-flight attempt ended when the job reached a
- `messages_failed`: integer **required**
- `messages_pending`: integer **required**
- `messages_skipped`: integer **required** — Messages that discovery skipped (for example, phish submissions, which the job cannot action).
- `messages_successful`: integer **required**
- `search_params`: object **required**
  - `action_log`: boolean default: `false` — Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.
  - `alert_id`: string — Alert ID of the detection to filter by.
  - `delivery_status`: string — Delivery status to filter by.
  - `detections_only`: boolean default: `true` — Whether to include only detections in search results.
  - `domain`: string — Match messages that mention this domain — sender domain, recipient domain, or a domain in a link.
  - `end`: string — End of search date range.
  - `exact_subject`: string — Match messages whose subject line equals this value exactly.
  - `final_disposition`: string — Dispositions to filter by.
  - `message_action`: string enum: `PREVIEW`, `QUARANTINE_RELEASED`, `MOVED` — Message actions to filter by.
  - `message_id`: string — Message-ID header value to filter by.
  - `metric`: string — Metric name to filter the search by.
  - `query`: string — Space-delimited search term. Case-insensitive.
  - `recipient`: string — Match messages whose recipient is this email address or domain.
  - `sender`: string — Match messages whose sender is this email address or domain.
  - `smtp_helo_ip`: string — Matches messages whose SMTP HELO server IP address equals this value.
  - `start`: string — Beginning of search date range.
  - `subject`: string — Match messages whose subject contains these keywords, in any order.
  - `submissions`: boolean default: `false` — Whether to search reclassification submissions instead of original messages.
- `started_at`: string
- `status`: string **required** enum: `PENDING`, `DISCOVERING`, `PROCESSING`, `COMPLETED`, `FAILED`, `CANCELLED` — Status of a bulk action job.
- `status_message`: string
- `total_messages_discovered`: integer **required**

## POST /accounts/{account_id}/email-security/investigate/bulk

Create a bulk action job

operationId: `email_security_create_bulk_job`

**Request** (application/json)

- `action`: string **required** enum: `MOVE`, `RELEASE` — The action the job performs on every message matching the search parameters.
- `comment`: string — Optional note describing the job.
- `destination`: any — Required when action is 'MOVE'.
- `expected_disposition`: string — Nonfunctional field. End of life: December 1, 2026.
- `search_params`: object **required**
  - `action_log`: boolean default: `false` — Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.
  - `alert_id`: string — Alert ID of the detection to filter by.
  - `delivery_status`: string — Delivery status to filter by.
  - `detections_only`: boolean default: `true` — Whether to include only detections in search results.
  - `domain`: string — Match messages that mention this domain — sender domain, recipient domain, or a domain in a link.
  - `end`: string — End of search date range.
  - `exact_subject`: string — Match messages whose subject line equals this value exactly.
  - `final_disposition`: string — Dispositions to filter by.
  - `message_action`: string enum: `PREVIEW`, `QUARANTINE_RELEASED`, `MOVED` — Message actions to filter by.
  - `message_id`: string — Message-ID header value to filter by.
  - `metric`: string — Metric name to filter the search by.
  - `query`: string — Space-delimited search term. Case-insensitive.
  - `recipient`: string — Match messages whose recipient is this email address or domain.
  - `sender`: string — Match messages whose sender is this email address or domain.
  - `smtp_helo_ip`: string — Matches messages whose SMTP HELO server IP address equals this value.
  - `start`: string — Beginning of search date range.
  - `subject`: string — Match messages whose subject contains these keywords, in any order.
  - `submissions`: boolean default: `false` — Whether to search reclassification submissions instead of original messages.

**Response** 201 → `result`

- `action_params`: any **required**
- `action_type`: string **required** enum: `MOVE`, `RELEASE`
- `comment`: string
- `completed_at`: string
- `created_at`: string **required**
- `job_id`: string **required**
- `messages_cancelled`: integer **required** — Messages that were cancelled: rows cancelled via the API before being claimed, and rows whose in-flight attempt ended when the job reached a
- `messages_failed`: integer **required**
- `messages_pending`: integer **required**
- `messages_skipped`: integer **required** — Messages that discovery skipped (for example, phish submissions, which the job cannot action).
- `messages_successful`: integer **required**
- `search_params`: object **required**
  - `action_log`: boolean default: `false` — Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.
  - `alert_id`: string — Alert ID of the detection to filter by.
  - `delivery_status`: string — Delivery status to filter by.
  - `detections_only`: boolean default: `true` — Whether to include only detections in search results.
  - `domain`: string — Match messages that mention this domain — sender domain, recipient domain, or a domain in a link.
  - `end`: string — End of search date range.
  - `exact_subject`: string — Match messages whose subject line equals this value exactly.
  - `final_disposition`: string — Dispositions to filter by.
  - `message_action`: string enum: `PREVIEW`, `QUARANTINE_RELEASED`, `MOVED` — Message actions to filter by.
  - `message_id`: string — Message-ID header value to filter by.
  - `metric`: string — Metric name to filter the search by.
  - `query`: string — Space-delimited search term. Case-insensitive.
  - `recipient`: string — Match messages whose recipient is this email address or domain.
  - `sender`: string — Match messages whose sender is this email address or domain.
  - `smtp_helo_ip`: string — Matches messages whose SMTP HELO server IP address equals this value.
  - `start`: string — Beginning of search date range.
  - `subject`: string — Match messages whose subject contains these keywords, in any order.
  - `submissions`: boolean default: `false` — Whether to search reclassification submissions instead of original messages.
- `started_at`: string
- `status`: string **required** enum: `PENDING`, `DISCOVERING`, `PROCESSING`, `COMPLETED`, `FAILED`, `CANCELLED` — Status of a bulk action job.
- `status_message`: string
- `total_messages_discovered`: integer **required**

## DELETE /accounts/{account_id}/email-security/investigate/bulk/{job_id}

Delete a bulk action job

operationId: `email_security_delete_bulk_job`

**Response** 200 → `result`

- `id`: string **required**

## GET /accounts/{account_id}/email-security/investigate/bulk/{job_id}

Get bulk action job details

operationId: `email_security_get_bulk_job`

**Response** 200 → `result`

- `action_params`: any **required**
- `action_type`: string **required** enum: `MOVE`, `RELEASE`
- `comment`: string
- `completed_at`: string
- `created_at`: string **required**
- `job_id`: string **required**
- `messages_cancelled`: integer **required** — Messages that were cancelled: rows cancelled via the API before being claimed, and rows whose in-flight attempt ended when the job reached a
- `messages_failed`: integer **required**
- `messages_pending`: integer **required**
- `messages_skipped`: integer **required** — Messages that discovery skipped (for example, phish submissions, which the job cannot action).
- `messages_successful`: integer **required**
- `search_params`: object **required**
  - `action_log`: boolean default: `false` — Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.
  - `alert_id`: string — Alert ID of the detection to filter by.
  - `delivery_status`: string — Delivery status to filter by.
  - `detections_only`: boolean default: `true` — Whether to include only detections in search results.
  - `domain`: string — Match messages that mention this domain — sender domain, recipient domain, or a domain in a link.
  - `end`: string — End of search date range.
  - `exact_subject`: string — Match messages whose subject line equals this value exactly.
  - `final_disposition`: string — Dispositions to filter by.
  - `message_action`: string enum: `PREVIEW`, `QUARANTINE_RELEASED`, `MOVED` — Message actions to filter by.
  - `message_id`: string — Message-ID header value to filter by.
  - `metric`: string — Metric name to filter the search by.
  - `query`: string — Space-delimited search term. Case-insensitive.
  - `recipient`: string — Match messages whose recipient is this email address or domain.
  - `sender`: string — Match messages whose sender is this email address or domain.
  - `smtp_helo_ip`: string — Matches messages whose SMTP HELO server IP address equals this value.
  - `start`: string — Beginning of search date range.
  - `subject`: string — Match messages whose subject contains these keywords, in any order.
  - `submissions`: boolean default: `false` — Whether to search reclassification submissions instead of original messages.
- `started_at`: string
- `status`: string **required** enum: `PENDING`, `DISCOVERING`, `PROCESSING`, `COMPLETED`, `FAILED`, `CANCELLED` — Status of a bulk action job.
- `status_message`: string
- `total_messages_discovered`: integer **required**

## POST /accounts/{account_id}/email-security/investigate/bulk/{job_id}/cancel

Cancel a bulk action job

operationId: `email_security_cancel_bulk_job`

**Response** 200 → `result`

- `action_params`: any **required**
- `action_type`: string **required** enum: `MOVE`, `RELEASE`
- `comment`: string
- `completed_at`: string
- `created_at`: string **required**
- `job_id`: string **required**
- `messages_cancelled`: integer **required** — Messages that were cancelled: rows cancelled via the API before being claimed, and rows whose in-flight attempt ended when the job reached a
- `messages_failed`: integer **required**
- `messages_pending`: integer **required**
- `messages_skipped`: integer **required** — Messages that discovery skipped (for example, phish submissions, which the job cannot action).
- `messages_successful`: integer **required**
- `search_params`: object **required**
  - `action_log`: boolean default: `false` — Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.
  - `alert_id`: string — Alert ID of the detection to filter by.
  - `delivery_status`: string — Delivery status to filter by.
  - `detections_only`: boolean default: `true` — Whether to include only detections in search results.
  - `domain`: string — Match messages that mention this domain — sender domain, recipient domain, or a domain in a link.
  - `end`: string — End of search date range.
  - `exact_subject`: string — Match messages whose subject line equals this value exactly.
  - `final_disposition`: string — Dispositions to filter by.
  - `message_action`: string enum: `PREVIEW`, `QUARANTINE_RELEASED`, `MOVED` — Message actions to filter by.
  - `message_id`: string — Message-ID header value to filter by.
  - `metric`: string — Metric name to filter the search by.
  - `query`: string — Space-delimited search term. Case-insensitive.
  - `recipient`: string — Match messages whose recipient is this email address or domain.
  - `sender`: string — Match messages whose sender is this email address or domain.
  - `smtp_helo_ip`: string — Matches messages whose SMTP HELO server IP address equals this value.
  - `start`: string — Beginning of search date range.
  - `subject`: string — Match messages whose subject contains these keywords, in any order.
  - `submissions`: boolean default: `false` — Whether to search reclassification submissions instead of original messages.
- `started_at`: string
- `status`: string **required** enum: `PENDING`, `DISCOVERING`, `PROCESSING`, `COMPLETED`, `FAILED`, `CANCELLED` — Status of a bulk action job.
- `status_message`: string
- `total_messages_discovered`: integer **required**

## GET /accounts/{account_id}/email-security/investigate/bulk/{job_id}/messages

List messages for a bulk action job

operationId: `email_security_get_bulk_job_messages` · query: `page`, `per_page`, `status`

**Response** 200 → `result`

[array of]
- `action_params`: any **required**
- `action_type`: string **required** enum: `MOVE`, `RELEASE`
- `alert_id`: string
- `created_at`: string **required**
- `email_message_id`: string
- `message`: object
  - `action_log`: object[] **required** — Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.
    [array of]
    - `completed_at`: string **required** — Timestamp when action completed.
    - `completed_timestamp`: string — Deprecated, use `completed_at` instead. End of life: November 1, 2026.
    - `operation`: string **required** enum: `MOVE`, `RELEASE`, `RECLASSIFY`, `SUBMISSION`, `QUARANTINE_RELEASE`, `PREVIEW` — Type of action performed.
    - `properties`: object — Additional properties for the action.
    - `status`: string — Status of the action.
  - `alert_id`: string
  - `client_recipients`: string[] **required**
    [array]
  - `delivery_mode`: string
  - `delivery_status`: string[]
    [array]
  - `detection_reasons`: string[] **required**
    [array]
  - `edf_hash`: string
  - `envelope_from`: string
  - `envelope_to`: string[]
    [array]
  - `final_disposition`: string
  - `findings`: object[] — Deprecated, use the `findings` field from `GET /investigate/{investigate_id}/detections` instead. End of life: November 1, 2026. Detection f
    [array of]
    - `attachment`: string
    - `detail`: string
    - `detection`: string
    - `field`: string
    - `name`: string
    - `portion`: string
    - `reason`: string
    - `score`: number
    - `value`: string
  - `from`: string
  - `from_name`: string
  - `htmltext_structure_hash`: string
  - `id`: any **required**
  - `is_phish_submission`: boolean **required**
  - `is_quarantined`: boolean **required**
  - `message_id`: string
  - `post_delivery_operations`: string[] — Post-delivery operations performed on this message.
    [array]
  - `postfix_id`: string **required** — The identifier of the message.
  - `postfix_id_outbound`: string
  - `properties`: object **required** — Message processing properties.
    - `allowlisted_pattern`: string — Pattern that allowlisted this message.
    - `allowlisted_pattern_type`: string enum: `quarantine_release`, `acceptable_sender`, `allowed_sender`, `allowed_recipient`, `domain_similarity`, `domain_recency`, `managed_acceptable_sender`, `outbound_ndr` — Type of allowlist pattern.
    - `blocklisted_message`: boolean — Whether message was blocklisted.
    - `blocklisted_pattern`: string — Pattern that blocklisted this message.
    - `whitelisted_pattern_type`: string enum: `quarantine_release`, `acceptable_sender`, `allowed_sender`, `allowed_recipient`, `domain_similarity`, `domain_recency`, `managed_acceptable_sender`, `outbound_ndr` — Legacy field for allowlist pattern type.
  - `replyto`: string
  - `scanned_at`: string — When the message was scanned (UTC).
  - `sent_at`: string — When the message was sent (UTC).
  - `sent_date`: string
  - `smtp_helo_server_ip`: string
  - `smtp_previous_hop_ip`: string
  - `subject`: string
  - `threat_categories`: string[]
    [array]
  - `to`: string[]
    [array]
  - `to_name`: string[]
    [array]
  - `ts`: string **required** — Deprecated, use `scanned_at` instead. End of life: November 1, 2026.
  - `validation`: any
  - `x_originating_ip`: string
- `message_id`: string **required**
- `postfix_id`: string **required**
- `processed_at`: string
- `retry_after`: string — When to retry the action if it failed.
- `retry_count`: integer **required**
- `status`: string **required** enum: `PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`, `CANCELLED`, `SKIPPED` — Status of a message within a bulk action job.
- `status_message`: string

## POST /accounts/{account_id}/email-security/investigate/move

Move messages

operationId: `email_security_post_bulk_move`

**Request** (application/json)

- `destination`: string **required** enum: `Inbox`, `JunkEmail`, `DeletedItems`, `RecoverableItemsDeletions`, `RecoverableItemsPurges` — The mailbox folder to move messages to.
- `expected_disposition`: string — Nonfunctional field. End of life: December 1, 2026.
- `ids`: string[] **required** — List of message IDs to move.
  [array]
- `postfix_ids`: string[] — Deprecated, use `ids` instead. End of life: November 1, 2026.
  [array]

**Response** 200 → `result`

[array of]
- `completed_at`: string — When the move operation completed (UTC).
- `completed_timestamp`: string — Deprecated, use `completed_at` instead. End of life: November 1, 2026.
- `destination`: string — Destination folder for the message.
- `item_count`: integer — Number of items moved. End of life: November 1, 2026.
- `message_id`: string — Message identifier.
- `operation`: string — Type of operation performed.
- `recipient`: string — Recipient email address.
- `status`: string — Operation status.
- `success`: boolean **required** — Whether the operation succeeded.

## POST /accounts/{account_id}/email-security/investigate/preview

Generate preview for a non-detection message

operationId: `email_security_post_preview`

**Request** (application/json)

- `id`: string **required** — Unique identifier for a message retrieved from investigation.

**Response** 200 → `result`

- `screenshot`: string **required** — A base64 encoded PNG image of the email.

## POST /accounts/{account_id}/email-security/investigate/release

Release messages from quarantine

operationId: `email_security_post_release`

**Request** (application/json)

- `ids`: string[] **required** — Investigate IDs of the messages to release.
  [array]

**Response** 200 → `result`

[array of]
- `delivered`: string[]
  [array]
- `failed`: string[]
  [array]
- `id`: any **required**
- `postfix_id`: any — Deprecated, use `id` instead. End of life: November 1, 2026.
- `undelivered`: string[]
  [array]

## GET /accounts/{account_id}/email-security/phishguard/reports

List PhishGuard reports

operationId: `email_security_get_phishguard_reports` · query: `start`, `end`, `from_date`, `to_date`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `content`: string **required**
- `created_at`: string
- `disposition`: string **required** enum: `MALICIOUS`, `MALICIOUS-BEC`, `SUSPICIOUS`, `SPOOF`, `SPAM`, `BULK`, `ENCRYPTED`, `EXTERNAL` — The verdict Email Security assigns to a message.
- `fields`: object **required**
  - `from`: string
  - `occurred_at`: string
  - `postfix_id`: string
  - `to`: string[] **required**
    [array]
  - `ts`: string — Deprecated, use `occurred_at` instead.
- `id`: integer **required**
- `priority`: string **required**
- `tags`: object[]
  [array of]
  - `category`: string **required**
  - `value`: string **required**
- `title`: string **required**
- `ts`: string — Deprecated, use `created_at` instead.
- `updated_at`: string

## GET /accounts/{account_id}/email-security/submissions

List reclassify submissions

operationId: `email_security_submissions` · query: `start`, `end`, `type`, `submission_id`, `original_disposition`, `requested_disposition`, `outcome_disposition`, `status`, `query`, `escalated_from_user`, `order`, `direction`, `page`, `per_page`

**Response** 200 → `result`

[array of]
- `customer_status`: string enum: `escalated`, `reviewed`, `unreviewed`
- `escalated_as`: string
- `escalated_at`: string — When the submission was escalated to the security team.
- `escalated_by`: string — Email address of the user who escalated the submission.
- `escalated_submission_id`: string — Submission ID of the escalated team submission, when this user submission was escalated.
- `original_disposition`: string
- `original_edf_hash`: string — EDF hash of the original message.
- `original_postfix_id`: string — The postfix ID of the original message that was submitted.
- `outcome`: string — Processing outcome of the submission.
- `outcome_disposition`: string
- `requested_at`: string **required** — When the submission was requested (UTC).
- `requested_by`: string — Email address of the user who requested the submission.
- `requested_disposition`: string
- `requested_ts`: string — Deprecated, use `requested_at` instead.
- `status`: string — Processing status of the submission.
- `subject`: string — Subject line of the submitted message.
- `submission_id`: string **required**
- `type`: string enum: `Team`, `User` — Indicates whether a team member or an end user created the submission.

## POST /accounts/{account_id}/email-security/submissions

Create new submissions

operationId: `email_security_create_submissions`

**Request** (application/json)

(one of 2 variants; showing the first)
- `messages`: object[] **required**
  [array of]
  - `alert_id`: string **required** — Alert ID of the detection to reclassify.
  - `escalated_submission_id`: string — Submission ID of the original user submission, when reclassifying an escalated user report.
  - `expected_disposition`: string **required** enum: `MALICIOUS`, `SUSPICIOUS`, `SPOOF`, `SPAM`, `BULK`, `NONE` — The disposition a message is submitted to have.
- `type`: string **required** enum: `reclassification`

**Response** 202 → `result`

- `results`: object[] **required**
  [array of]
  - `accepted`: boolean **required**
  - `error`: string
  - `id`: string **required**
