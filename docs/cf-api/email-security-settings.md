# Email Security Settings

53 endpoints.

## GET /accounts/{account_id}/email-security/settings/allow_policies

List email allow policies

operationId: `email_security_list_allow_policies` · query: `page`, `per_page`, `search`, `order`, `direction`, `is_exempt_recipient`, `is_trusted_sender`, `is_acceptable_sender`, `verify_sender`, `pattern_type`, `pattern`, `expired`

**Response** 200 → `result`

[array of]
- `comments`: string
- `created_at`: any **required**
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any **required**
- `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
- `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
- `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
- `is_regex`: boolean
- `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
- `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
- `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
- `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
- `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

## POST /accounts/{account_id}/email-security/settings/allow_policies

Create email allow policy

operationId: `email_security_create_allow_policy`

**Request** (application/json)

- `comments`: string
- `created_at`: any **required**
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any **required**
- `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
- `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
- `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
- `is_regex`: boolean
- `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
- `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
- `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
- `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
- `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

**Response** 201 → `result`

- `comments`: string
- `created_at`: any **required**
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any **required**
- `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
- `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
- `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
- `is_regex`: boolean
- `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
- `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
- `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
- `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
- `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

## DELETE /accounts/{account_id}/email-security/settings/allow_policies/{policy_id}

Delete an email allow policy

operationId: `email_security_delete_allow_policy`

**Response** 200 → `result`

- `id`: string **required** — Allow policy identifier.

## GET /accounts/{account_id}/email-security/settings/allow_policies/{policy_id}

Get an email allow policy

operationId: `email_security_get_allow_policy`

**Response** 200 → `result`

- `comments`: string
- `created_at`: any **required**
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any **required**
- `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
- `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
- `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
- `is_regex`: boolean
- `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
- `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
- `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
- `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
- `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

## PATCH /accounts/{account_id}/email-security/settings/allow_policies/{policy_id}

Update an email allow policy

operationId: `email_security_update_allow_policy`

**Request** (application/json)

- `comments`: string
- `created_at`: any **required**
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any **required**
- `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
- `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
- `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
- `is_regex`: boolean
- `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
- `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
- `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
- `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
- `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

**Response** 200 → `result`

- `comments`: string
- `created_at`: any **required**
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any **required**
- `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
- `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
- `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
- `is_regex`: boolean
- `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
- `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
- `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
- `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
- `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

## PUT /accounts/{account_id}/email-security/settings/allow_policies/{policy_id}

Replace an email allow policy

operationId: `email_security_replace_allow_policy`

**Request** (application/json)

- `comments`: string
- `created_at`: any **required**
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any **required**
- `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
- `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
- `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
- `is_regex`: boolean
- `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
- `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
- `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
- `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
- `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

**Response** 200 → `result`

- `comments`: string
- `created_at`: any **required**
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any **required**
- `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
- `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
- `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
- `is_regex`: boolean
- `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
- `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
- `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
- `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
- `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

## POST /accounts/{account_id}/email-security/settings/allow_policies/batch

Batch allow policy operations

operationId: `email_security_batch_allow_policies`

**Request** (application/json)

- `deletes`: object[] **required** — IDs of the allow policies to delete.
  [array of]
  - `id`: string **required** — Allow policy identifier.
- `patches`: object[] **required** — Partial updates to apply — each entry carries the policy's ID and only the fields to change.
  [array of]
  - `comments`: string
  - `created_at`: any **required**
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any **required**
  - `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
  - `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
  - `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
  - `is_regex`: boolean
  - `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
  - `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
  - `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
  - `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
  - `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.
  - `id`: any **required**
- `posts`: object[] **required** — Allow policies to create.
  [array of]
  - `comments`: string
  - `created_at`: any **required**
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any **required**
  - `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
  - `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
  - `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
  - `is_regex`: boolean
  - `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
  - `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
  - `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
  - `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
  - `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.
- `puts`: object[] **required** — Full replacements to apply — each entry carries the policy's ID and every field of its new value.
  [array of]
  - `comments`: string
  - `created_at`: any **required**
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any **required**
  - `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
  - `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
  - `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
  - `is_regex`: boolean
  - `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
  - `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
  - `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
  - `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
  - `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.
  - `id`: any **required**

**Response** 200 → `result`

- `deletes`: object[]
  [array of]
  - `id`: string **required** — Allow policy identifier.
- `patches`: object[]
  [array of]
  - `comments`: string
  - `created_at`: any **required**
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any **required**
  - `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
  - `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
  - `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
  - `is_regex`: boolean
  - `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
  - `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
  - `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
  - `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
  - `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.
- `posts`: object[]
  [array of]
  - `comments`: string
  - `created_at`: any **required**
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any **required**
  - `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
  - `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
  - `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
  - `is_regex`: boolean
  - `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
  - `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
  - `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
  - `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
  - `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.
- `puts`: object[]
  [array of]
  - `comments`: string
  - `created_at`: any **required**
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any **required**
  - `is_acceptable_sender`: boolean — Exempts messages from this sender from Spam, Spoof and Bulk dispositions only; Malicious and Suspicious dispositions still apply.
  - `is_exempt_recipient`: boolean — Bypasses all detections for messages to this recipient.
  - `is_recipient`: boolean — Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.
  - `is_regex`: boolean
  - `is_sender`: boolean — Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.
  - `is_spoof`: boolean — Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.
  - `is_trusted_sender`: boolean — Bypasses all detections and link following for messages from this sender.
  - `last_modified`: any **required** — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
  - `verify_sender`: boolean — Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

## GET /accounts/{account_id}/email-security/settings/block_senders

List blocked email senders

operationId: `email_security_list_blocked_senders` · query: `page`, `per_page`, `search`, `order`, `direction`, `pattern_type`, `pattern`, `expired`

**Response** 200 → `result`

[array of]
- `comments`: string
- `created_at`: any
- `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
- `id`: any
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.

## POST /accounts/{account_id}/email-security/settings/block_senders

Create blocked email sender

operationId: `email_security_create_blocked_sender`

**Request** (application/json)

- `comments`: string
- `created_at`: any
- `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
- `id`: any
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.

**Response** 201 → `result`

- `comments`: string
- `created_at`: any
- `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
- `id`: any
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.

## DELETE /accounts/{account_id}/email-security/settings/block_senders/{pattern_id}

Delete a blocked email sender

operationId: `email_security_delete_blocked_sender`

**Response** 200 → `result`

- `id`: string **required** — Blocked sender pattern identifier.

## GET /accounts/{account_id}/email-security/settings/block_senders/{pattern_id}

Get a blocked email sender

operationId: `email_security_get_blocked_sender`

**Response** 200 → `result`

- `comments`: string
- `created_at`: any
- `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
- `id`: any
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.

## PATCH /accounts/{account_id}/email-security/settings/block_senders/{pattern_id}

Update a blocked email sender

operationId: `email_security_update_blocked_sender`

**Request** (application/json)

- `comments`: string
- `created_at`: any
- `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
- `id`: any
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.

**Response** 200 → `result`

- `comments`: string
- `created_at`: any
- `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
- `id`: any
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.

## PUT /accounts/{account_id}/email-security/settings/block_senders/{pattern_id}

Replace a blocked email sender

operationId: `email_security_replace_blocked_sender`

**Request** (application/json)

- `comments`: string
- `created_at`: any
- `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
- `id`: any
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.

**Response** 200 → `result`

- `comments`: string
- `created_at`: any
- `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
- `id`: any
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
- `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.

## POST /accounts/{account_id}/email-security/settings/block_senders/batch

Batch blocked sender operations

operationId: `email_security_batch_blocked_senders`

**Request** (application/json)

- `deletes`: object[] **required** — IDs of the blocked sender patterns to delete.
  [array of]
  - `id`: string **required** — Blocked sender pattern identifier.
- `patches`: object[] **required** — Partial updates to apply — each entry carries the pattern's ID and only the fields to change.
  [array of]
  - `comments`: string
  - `created_at`: any
  - `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
  - `id`: any
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
  - `id`: any **required**
- `posts`: object[] **required** — Blocked sender patterns to create.
  [array of]
  - `comments`: string
  - `created_at`: any
  - `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
  - `id`: any
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
- `puts`: object[] **required** — Full replacements to apply — each entry carries the pattern's ID and every field of its new value.
  [array of]
  - `comments`: string
  - `created_at`: any
  - `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
  - `id`: any
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
  - `id`: any **required**

**Response** 200 → `result`

- `deletes`: object[]
  [array of]
  - `id`: string **required** — Blocked sender pattern identifier.
- `patches`: object[]
  [array of]
  - `comments`: string
  - `created_at`: any
  - `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
  - `id`: any
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
- `posts`: object[]
  [array of]
  - `comments`: string
  - `created_at`: any
  - `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
  - `id`: any
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.
- `puts`: object[]
  [array of]
  - `comments`: string
  - `created_at`: any
  - `expires_at`: string — Timestamp at which the pattern expires. After this time, Email Security ignores the pattern. The value must lie in the future. Send `null` t
  - `id`: any
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal value.
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The pattern value to match. The format depends on `pattern_type`: a valid email address for EMAIL (e.g. `user@example.com`), a valid domain 
  - `pattern_type`: string enum: `EMAIL`, `DOMAIN`, `IP`, `UNKNOWN` — Type of pattern matching.

## GET /accounts/{account_id}/email-security/settings/content_policies

List content policies

operationId: `email_security_list_content_policies` · query: `page`, `per_page`, `search`, `order`, `direction`, `enabled`, `name`, `expired`

**Response** 200 → `result`

[array of]
- `created_at`: any
- `enabled`: boolean — Whether the policy is active.
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any
- `modified_at`: any
- `name`: string — Human-readable name of the policy.
- `notes`: string — Optional note describing the purpose of the policy.
- `pattern`: string — Regular expression the policy matches against.
- `targets`: string[] — Parts of the email the pattern is matched against.
  [array]

## POST /accounts/{account_id}/email-security/settings/content_policies

Create a content policy

operationId: `email_security_create_content_policy`

**Request** (application/json)

- `created_at`: any
- `enabled`: boolean — Whether the policy is active.
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any
- `modified_at`: any
- `name`: string — Human-readable name of the policy.
- `notes`: string — Optional note describing the purpose of the policy.
- `pattern`: string — Regular expression the policy matches against.
- `targets`: string[] — Parts of the email the pattern is matched against.
  [array]

**Response** 201 → `result`

- `created_at`: any
- `enabled`: boolean — Whether the policy is active.
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any
- `modified_at`: any
- `name`: string — Human-readable name of the policy.
- `notes`: string — Optional note describing the purpose of the policy.
- `pattern`: string — Regular expression the policy matches against.
- `targets`: string[] — Parts of the email the pattern is matched against.
  [array]

## DELETE /accounts/{account_id}/email-security/settings/content_policies/{policy_id}

Delete a content policy

operationId: `email_security_delete_content_policy`

**Response** 200 → `result`

- `id`: string **required** — Content policy identifier.

## GET /accounts/{account_id}/email-security/settings/content_policies/{policy_id}

Get a content policy

operationId: `email_security_get_content_policy`

**Response** 200 → `result`

- `created_at`: any
- `enabled`: boolean — Whether the policy is active.
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any
- `modified_at`: any
- `name`: string — Human-readable name of the policy.
- `notes`: string — Optional note describing the purpose of the policy.
- `pattern`: string — Regular expression the policy matches against.
- `targets`: string[] — Parts of the email the pattern is matched against.
  [array]

## PATCH /accounts/{account_id}/email-security/settings/content_policies/{policy_id}

Update a content policy

operationId: `email_security_update_content_policy`

**Request** (application/json)

- `created_at`: any
- `enabled`: boolean — Whether the policy is active.
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any
- `modified_at`: any
- `name`: string — Human-readable name of the policy.
- `notes`: string — Optional note describing the purpose of the policy.
- `pattern`: string — Regular expression the policy matches against.
- `targets`: string[] — Parts of the email the pattern is matched against.
  [array]

**Response** 200 → `result`

- `created_at`: any
- `enabled`: boolean — Whether the policy is active.
- `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
- `id`: any
- `modified_at`: any
- `name`: string — Human-readable name of the policy.
- `notes`: string — Optional note describing the purpose of the policy.
- `pattern`: string — Regular expression the policy matches against.
- `targets`: string[] — Parts of the email the pattern is matched against.
  [array]

## POST /accounts/{account_id}/email-security/settings/content_policies/batch

Batch content policy operations

operationId: `email_security_batch_content_policies`

**Request** (application/json)

- `deletes`: object[] **required** — IDs of the content policies to delete.
  [array of]
  - `id`: string **required** — Content policy identifier.
- `patches`: object[] **required** — Partial updates to apply — each entry carries the policy's ID and only the fields to change.
  [array of]
  - `created_at`: any
  - `enabled`: boolean — Whether the policy is active.
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any
  - `modified_at`: any
  - `name`: string — Human-readable name of the policy.
  - `notes`: string — Optional note describing the purpose of the policy.
  - `pattern`: string — Regular expression the policy matches against.
  - `targets`: string[] — Parts of the email the pattern is matched against.
    [array]
  - `id`: any **required**
- `posts`: object[] **required** — Content policies to create.
  [array of]
  - `created_at`: any
  - `enabled`: boolean — Whether the policy is active.
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any
  - `modified_at`: any
  - `name`: string — Human-readable name of the policy.
  - `notes`: string — Optional note describing the purpose of the policy.
  - `pattern`: string — Regular expression the policy matches against.
  - `targets`: string[] — Parts of the email the pattern is matched against.
    [array]
- `puts`: object[] **required** — Full replacements to apply — each entry carries the policy's ID and every field of its new value.
  [array of]
  - `created_at`: any
  - `enabled`: boolean — Whether the policy is active.
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any
  - `modified_at`: any
  - `name`: string — Human-readable name of the policy.
  - `notes`: string — Optional note describing the purpose of the policy.
  - `pattern`: string — Regular expression the policy matches against.
  - `targets`: string[] — Parts of the email the pattern is matched against.
    [array]
  - `id`: any **required**

**Response** 200 → `result`

- `deletes`: object[]
  [array of]
  - `id`: string **required** — Content policy identifier.
- `patches`: object[]
  [array of]
  - `created_at`: any
  - `enabled`: boolean — Whether the policy is active.
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any
  - `modified_at`: any
  - `name`: string — Human-readable name of the policy.
  - `notes`: string — Optional note describing the purpose of the policy.
  - `pattern`: string — Regular expression the policy matches against.
  - `targets`: string[] — Parts of the email the pattern is matched against.
    [array]
- `posts`: object[]
  [array of]
  - `created_at`: any
  - `enabled`: boolean — Whether the policy is active.
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any
  - `modified_at`: any
  - `name`: string — Human-readable name of the policy.
  - `notes`: string — Optional note describing the purpose of the policy.
  - `pattern`: string — Regular expression the policy matches against.
  - `targets`: string[] — Parts of the email the pattern is matched against.
    [array]
- `puts`: object[]
  [array of]
  - `created_at`: any
  - `enabled`: boolean — Whether the policy is active.
  - `expires_at`: string — Timestamp at which the policy expires. After this time, Email Security ignores the policy. The value must lie in the future. Send `null` to 
  - `id`: any
  - `modified_at`: any
  - `name`: string — Human-readable name of the policy.
  - `notes`: string — Optional note describing the purpose of the policy.
  - `pattern`: string — Regular expression the policy matches against.
  - `targets`: string[] — Parts of the email the pattern is matched against.
    [array]

## DELETE /accounts/{account_id}/email-security/settings/domains

Unprotect multiple email domains

operationId: `email_security_delete_domains`

**Request** (application/json)

[array of]
- `id`: string **required** — Domain identifier.

**Response** 200 → `result`

[array of]
- `id`: string **required** — Domain identifier.

## GET /accounts/{account_id}/email-security/settings/domains

List protected email domains

operationId: `email_security_list_domains` · query: `page`, `per_page`, `search`, `order`, `direction`, `allowed_delivery_mode`, `domain`, `active_delivery_mode`, `integration_id`, `status`

**Response** 200 → `result`

[array of]
- `allowed_delivery_modes`: string[]
  [array]
- `authorization`: object
- `created_at`: any
- `dmarc_status`: string enum: `none`, `good`, `invalid`, `null`
- `domain`: string
- `drop_dispositions`: string[]
  [array]
- `emails_processed`: object
- `folder`: any
- `id`: string — Domain identifier.
- `inbox_provider`: string enum: `Microsoft`, `Google`, `null`
- `integration_id`: string
- `ip_restrictions`: string[]
  [array]
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `lookback_hops`: integer
- `modified_at`: any
- `o365_tenant_id`: string
- `regions`: string[]
  [array]
- `require_tls_inbound`: boolean
- `require_tls_outbound`: boolean
- `spf_status`: string enum: `none`, `good`, `neutral`, `open`, `invalid`, `null`
- `status`: string enum: `PENDING`, `ACTIVE`, `FAILED`, `TIMEOUT`, `null`
- `transport`: string

## POST /accounts/{account_id}/email-security/settings/domains

Add a new email domain

operationId: `email_security_create_domains`

**Request** (application/json)

- `allowed_delivery_modes`: string[] **required** — Delivery modes to onboard the domain through.
  [array]
- `domain`: string **required** — The email domain to protect.
- `drop_dispositions`: string[] **required** — Dispositions to drop instead of delivering, e.g. `["MALICIOUS", "SPAM"]`.
  [array]
- `folder`: any — The mailbox folder to scan, for API-scanning domains.
- `integration_id`: string — Identifier of the CASB integration that authorizes this domain. The integration also enables API scanning, post-delivery actions, and direct
- `ip_restrictions`: string[] **required** — Source IP ranges mail is accepted from. Any other source is rejected.
  [array]
- `lookback_hops`: integer — Number of hops to trace back through received headers when reconstructing the original message (1-20).
- `regions`: string[] **required** — Regions that process messages for this domain, e.g. `["GLOBAL"]` or `["US"]`.
  [array]
- `require_tls_inbound`: boolean — Require TLS on inbound connections.
- `require_tls_outbound`: boolean — Require TLS on outbound connections.
- `transport`: string — The mail transport hostname for MX/Inline delivery — the MX record Cloudflare delivers email to (e.g. `mx.example.com`).

**Response** 201 → `result`

- `allowed_delivery_modes`: string[]
  [array]
- `authorization`: object
- `created_at`: any
- `dmarc_status`: string enum: `none`, `good`, `invalid`, `null`
- `domain`: string
- `drop_dispositions`: string[]
  [array]
- `emails_processed`: object
- `folder`: any
- `id`: string — Domain identifier.
- `inbox_provider`: string enum: `Microsoft`, `Google`, `null`
- `integration_id`: string
- `ip_restrictions`: string[]
  [array]
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `lookback_hops`: integer
- `modified_at`: any
- `o365_tenant_id`: string
- `regions`: string[]
  [array]
- `require_tls_inbound`: boolean
- `require_tls_outbound`: boolean
- `spf_status`: string enum: `none`, `good`, `neutral`, `open`, `invalid`, `null`
- `status`: string enum: `PENDING`, `ACTIVE`, `FAILED`, `TIMEOUT`, `null`
- `transport`: string

## DELETE /accounts/{account_id}/email-security/settings/domains/{domain_id}

Unprotect an email domain

operationId: `email_security_delete_domain`

**Response** 200 → `result`

- `id`: string **required** — Domain identifier.

## GET /accounts/{account_id}/email-security/settings/domains/{domain_id}

Get an email domain

operationId: `email_security_get_domain`

**Response** 200 → `result`

- `allowed_delivery_modes`: string[]
  [array]
- `authorization`: object
- `created_at`: any
- `dmarc_status`: string enum: `none`, `good`, `invalid`, `null`
- `domain`: string
- `drop_dispositions`: string[]
  [array]
- `emails_processed`: object
- `folder`: any
- `id`: string — Domain identifier.
- `inbox_provider`: string enum: `Microsoft`, `Google`, `null`
- `integration_id`: string
- `ip_restrictions`: string[]
  [array]
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `lookback_hops`: integer
- `modified_at`: any
- `o365_tenant_id`: string
- `regions`: string[]
  [array]
- `require_tls_inbound`: boolean
- `require_tls_outbound`: boolean
- `spf_status`: string enum: `none`, `good`, `neutral`, `open`, `invalid`, `null`
- `status`: string enum: `PENDING`, `ACTIVE`, `FAILED`, `TIMEOUT`, `null`
- `transport`: string

## PATCH /accounts/{account_id}/email-security/settings/domains/{domain_id}

Update an email domain

operationId: `email_security_update_domain`

**Request** (application/json)

- `allowed_delivery_modes`: string[] — Delivery modes to onboard the domain through.
  [array]
- `drop_dispositions`: string[] — Dispositions to drop instead of delivering, e.g. `["MALICIOUS", "SPAM"]`.
  [array]
- `folder`: any — The mailbox folder to scan, for API-scanning domains.
- `integration_id`: string — Identifier of the CASB integration that authorizes this domain. The integration also enables API scanning, post-delivery actions, and direct
- `ip_restrictions`: string[] — Source IP ranges mail is accepted from. Any other source is rejected.
  [array]
- `lookback_hops`: integer — Number of hops to trace back through received headers when reconstructing the original message (1-20).
- `regions`: string[] — Regions that process messages for this domain, e.g. `["GLOBAL"]` or `["US"]`.
  [array]
- `require_tls_inbound`: boolean — Require TLS on inbound connections.
- `require_tls_outbound`: boolean — Require TLS on outbound connections.
- `transport`: string — The mail transport hostname for MX/Inline delivery — the MX record Cloudflare delivers email to (e.g. `mx.example.com`).

**Response** 200 → `result`

- `allowed_delivery_modes`: string[]
  [array]
- `authorization`: object
- `created_at`: any
- `dmarc_status`: string enum: `none`, `good`, `invalid`, `null`
- `domain`: string
- `drop_dispositions`: string[]
  [array]
- `emails_processed`: object
- `folder`: any
- `id`: string — Domain identifier.
- `inbox_provider`: string enum: `Microsoft`, `Google`, `null`
- `integration_id`: string
- `ip_restrictions`: string[]
  [array]
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `lookback_hops`: integer
- `modified_at`: any
- `o365_tenant_id`: string
- `regions`: string[]
  [array]
- `require_tls_inbound`: boolean
- `require_tls_outbound`: boolean
- `spf_status`: string enum: `none`, `good`, `neutral`, `open`, `invalid`, `null`
- `status`: string enum: `PENDING`, `ACTIVE`, `FAILED`, `TIMEOUT`, `null`
- `transport`: string

## PUT /accounts/{account_id}/email-security/settings/domains/{domain_id}

Replace an email domain

operationId: `email_security_replace_domain`

**Request** (application/json)

- `allowed_delivery_modes`: string[] **required** — Delivery modes to onboard the domain through.
  [array]
- `drop_dispositions`: string[] **required** — Dispositions to drop instead of delivering, e.g. `["MALICIOUS", "SPAM"]`.
  [array]
- `folder`: any — The mailbox folder to scan, for API-scanning domains.
- `integration_id`: string — Identifier of the CASB integration that authorizes this domain. The integration also enables API scanning, post-delivery actions, and direct
- `ip_restrictions`: string[] **required** — Source IP ranges mail is accepted from. Any other source is rejected.
  [array]
- `lookback_hops`: integer — Number of hops to trace back through received headers when reconstructing the original message (1-20).
- `regions`: string[] **required** — Regions that process messages for this domain, e.g. `["GLOBAL"]` or `["US"]`.
  [array]
- `require_tls_inbound`: boolean — Require TLS on inbound connections.
- `require_tls_outbound`: boolean — Require TLS on outbound connections.
- `transport`: string — The mail transport hostname for MX/Inline delivery — the MX record Cloudflare delivers email to (e.g. `mx.example.com`).

**Response** 200 → `result`

- `allowed_delivery_modes`: string[]
  [array]
- `authorization`: object
- `created_at`: any
- `dmarc_status`: string enum: `none`, `good`, `invalid`, `null`
- `domain`: string
- `drop_dispositions`: string[]
  [array]
- `emails_processed`: object
- `folder`: any
- `id`: string — Domain identifier.
- `inbox_provider`: string enum: `Microsoft`, `Google`, `null`
- `integration_id`: string
- `ip_restrictions`: string[]
  [array]
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `lookback_hops`: integer
- `modified_at`: any
- `o365_tenant_id`: string
- `regions`: string[]
  [array]
- `require_tls_inbound`: boolean
- `require_tls_outbound`: boolean
- `spf_status`: string enum: `none`, `good`, `neutral`, `open`, `invalid`, `null`
- `status`: string enum: `PENDING`, `ACTIVE`, `FAILED`, `TIMEOUT`, `null`
- `transport`: string

## GET /accounts/{account_id}/email-security/settings/domains/{domain_id}/verification

Get domain verification details

operationId: `email_security_get_domain_verification`

**Response** 200 → `result`

- `last_checked_at`: string — When the last DNS TXT check was attempted, if any.
- `status`: string **required** enum: `PENDING`, `ACTIVE`, `FAILED`, `TIMEOUT`, `null`
- `txt_record_name`: string — Full DNS TXT record name (e.g. `_cf-email-sec-challenge.example.com`).
- `txt_record_value`: string — Token value to publish in the TXT record.

## POST /accounts/{account_id}/email-security/settings/domains/batch

Batch domain operations

operationId: `email_security_batch_domains`

**Request** (application/json)

- `deletes`: object[] **required** — IDs of the domains to remove protection from.
  [array of]
  - `id`: string **required** — Domain identifier.
- `patches`: object[] **required** — Partial updates to apply — each entry carries the domain's ID and only the fields to change.
  [array of]
  - `allowed_delivery_modes`: string[] — Delivery modes to onboard the domain through.
    [array]
  - `drop_dispositions`: string[] — Dispositions to drop instead of delivering, e.g. `["MALICIOUS", "SPAM"]`.
    [array]
  - `folder`: any — The mailbox folder to scan, for API-scanning domains.
  - `integration_id`: string — Identifier of the CASB integration that authorizes this domain. The integration also enables API scanning, post-delivery actions, and direct
  - `ip_restrictions`: string[] — Source IP ranges mail is accepted from. Any other source is rejected.
    [array]
  - `lookback_hops`: integer — Number of hops to trace back through received headers when reconstructing the original message (1-20).
  - `regions`: string[] — Regions that process messages for this domain, e.g. `["GLOBAL"]` or `["US"]`.
    [array]
  - `require_tls_inbound`: boolean — Require TLS on inbound connections.
  - `require_tls_outbound`: boolean — Require TLS on outbound connections.
  - `transport`: string — The mail transport hostname for MX/Inline delivery — the MX record Cloudflare delivers email to (e.g. `mx.example.com`).
  - `id`: string **required** — Domain identifier.
- `posts`: object[] **required** — Domains to add protection for.
  [array of]
  - `allowed_delivery_modes`: string[] **required** — Delivery modes to onboard the domain through.
    [array]
  - `domain`: string **required** — The email domain to protect.
  - `drop_dispositions`: string[] **required** — Dispositions to drop instead of delivering, e.g. `["MALICIOUS", "SPAM"]`.
    [array]
  - `folder`: any — The mailbox folder to scan, for API-scanning domains.
  - `integration_id`: string — Identifier of the CASB integration that authorizes this domain. The integration also enables API scanning, post-delivery actions, and direct
  - `ip_restrictions`: string[] **required** — Source IP ranges mail is accepted from. Any other source is rejected.
    [array]
  - `lookback_hops`: integer — Number of hops to trace back through received headers when reconstructing the original message (1-20).
  - `regions`: string[] **required** — Regions that process messages for this domain, e.g. `["GLOBAL"]` or `["US"]`.
    [array]
  - `require_tls_inbound`: boolean — Require TLS on inbound connections.
  - `require_tls_outbound`: boolean — Require TLS on outbound connections.
  - `transport`: string — The mail transport hostname for MX/Inline delivery — the MX record Cloudflare delivers email to (e.g. `mx.example.com`).
- `puts`: object[] **required** — Full replacements to apply — each entry carries the domain's ID and every field of its new value.
  [array of]
  - `allowed_delivery_modes`: string[] **required** — Delivery modes to onboard the domain through.
    [array]
  - `drop_dispositions`: string[] **required** — Dispositions to drop instead of delivering, e.g. `["MALICIOUS", "SPAM"]`.
    [array]
  - `folder`: any — The mailbox folder to scan, for API-scanning domains.
  - `integration_id`: string — Identifier of the CASB integration that authorizes this domain. The integration also enables API scanning, post-delivery actions, and direct
  - `ip_restrictions`: string[] **required** — Source IP ranges mail is accepted from. Any other source is rejected.
    [array]
  - `lookback_hops`: integer — Number of hops to trace back through received headers when reconstructing the original message (1-20).
  - `regions`: string[] **required** — Regions that process messages for this domain, e.g. `["GLOBAL"]` or `["US"]`.
    [array]
  - `require_tls_inbound`: boolean — Require TLS on inbound connections.
  - `require_tls_outbound`: boolean — Require TLS on outbound connections.
  - `transport`: string — The mail transport hostname for MX/Inline delivery — the MX record Cloudflare delivers email to (e.g. `mx.example.com`).
  - `id`: string **required** — Domain identifier.

**Response** 200 → `result`

- `deletes`: object[] **required**
  [array of]
  - `id`: string **required** — Domain identifier.
- `patches`: object[] **required**
  [array of]
  - `allowed_delivery_modes`: string[]
    [array]
  - `authorization`: object
  - `created_at`: any
  - `dmarc_status`: string enum: `none`, `good`, `invalid`, `null`
  - `domain`: string
  - `drop_dispositions`: string[]
    [array]
  - `emails_processed`: object
  - `folder`: any
  - `id`: string — Domain identifier.
  - `inbox_provider`: string enum: `Microsoft`, `Google`, `null`
  - `integration_id`: string
  - `ip_restrictions`: string[]
    [array]
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `lookback_hops`: integer
  - `modified_at`: any
  - `o365_tenant_id`: string
  - `regions`: string[]
    [array]
  - `require_tls_inbound`: boolean
  - `require_tls_outbound`: boolean
  - `spf_status`: string enum: `none`, `good`, `neutral`, `open`, `invalid`, `null`
  - `status`: string enum: `PENDING`, `ACTIVE`, `FAILED`, `TIMEOUT`, `null`
  - `transport`: string
- `posts`: object[] **required**
  [array of]
  - `allowed_delivery_modes`: string[]
    [array]
  - `authorization`: object
  - `created_at`: any
  - `dmarc_status`: string enum: `none`, `good`, `invalid`, `null`
  - `domain`: string
  - `drop_dispositions`: string[]
    [array]
  - `emails_processed`: object
  - `folder`: any
  - `id`: string — Domain identifier.
  - `inbox_provider`: string enum: `Microsoft`, `Google`, `null`
  - `integration_id`: string
  - `ip_restrictions`: string[]
    [array]
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `lookback_hops`: integer
  - `modified_at`: any
  - `o365_tenant_id`: string
  - `regions`: string[]
    [array]
  - `require_tls_inbound`: boolean
  - `require_tls_outbound`: boolean
  - `spf_status`: string enum: `none`, `good`, `neutral`, `open`, `invalid`, `null`
  - `status`: string enum: `PENDING`, `ACTIVE`, `FAILED`, `TIMEOUT`, `null`
  - `transport`: string
- `puts`: object[] **required**
  [array of]
  - `allowed_delivery_modes`: string[]
    [array]
  - `authorization`: object
  - `created_at`: any
  - `dmarc_status`: string enum: `none`, `good`, `invalid`, `null`
  - `domain`: string
  - `drop_dispositions`: string[]
    [array]
  - `emails_processed`: object
  - `folder`: any
  - `id`: string — Domain identifier.
  - `inbox_provider`: string enum: `Microsoft`, `Google`, `null`
  - `integration_id`: string
  - `ip_restrictions`: string[]
    [array]
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `lookback_hops`: integer
  - `modified_at`: any
  - `o365_tenant_id`: string
  - `regions`: string[]
    [array]
  - `require_tls_inbound`: boolean
  - `require_tls_outbound`: boolean
  - `spf_status`: string enum: `none`, `good`, `neutral`, `open`, `invalid`, `null`
  - `status`: string enum: `PENDING`, `ACTIVE`, `FAILED`, `TIMEOUT`, `null`
  - `transport`: string

## GET /accounts/{account_id}/email-security/settings/impersonation_registry

List impersonation registry entries

operationId: `email_security_list_impersonation_registry` · query: `page`, `per_page`, `search`, `order`, `direction`, `provenance`

**Response** 200 → `result`

[array of]
- `comments`: string — Optional note describing the entry.
- `created_at`: any
- `directory_id`: integer — Identifier of the directory the entry was synced from, when directory-synced.
- `directory_node_id`: integer — Identifier of the directory node the entry was synced from, when directory-synced.
- `email`: string — Email address (or pattern) of the protected identity.
- `external_directory_node_id`: string — Deprecated. External identifier of the directory node.
- `id`: any
- `is_email_regex`: boolean — Whether `email` is a regular expression instead of a literal address.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `name`: string — Display name of the protected identity.
- `provenance`: string — Source the entry was created from.

## POST /accounts/{account_id}/email-security/settings/impersonation_registry

Create impersonation registry entry

operationId: `email_security_create_impersonation_registry`

**Request** (application/json)

- `comments`: string — Optional note describing the entry.
- `created_at`: any
- `directory_id`: integer — Identifier of the directory the entry was synced from, when directory-synced.
- `directory_node_id`: integer — Identifier of the directory node the entry was synced from, when directory-synced.
- `email`: string — Email address (or pattern) of the protected identity.
- `external_directory_node_id`: string — Deprecated. External identifier of the directory node.
- `id`: any
- `is_email_regex`: boolean — Whether `email` is a regular expression instead of a literal address.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `name`: string — Display name of the protected identity.
- `provenance`: string — Source the entry was created from.

**Response** 201 → `result`

- `comments`: string — Optional note describing the entry.
- `created_at`: any
- `directory_id`: integer — Identifier of the directory the entry was synced from, when directory-synced.
- `directory_node_id`: integer — Identifier of the directory node the entry was synced from, when directory-synced.
- `email`: string — Email address (or pattern) of the protected identity.
- `external_directory_node_id`: string — Deprecated. External identifier of the directory node.
- `id`: any
- `is_email_regex`: boolean — Whether `email` is a regular expression instead of a literal address.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `name`: string — Display name of the protected identity.
- `provenance`: string — Source the entry was created from.

## DELETE /accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}

Delete an impersonation registry entry

operationId: `email_security_delete_impersonation_registry`

**Response** 200 → `result`

- `id`: string **required** — Impersonation registry entry identifier.

## GET /accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}

Get an impersonation registry entry

operationId: `email_security_get_impersonation_registry`

**Response** 200 → `result`

- `comments`: string — Optional note describing the entry.
- `created_at`: any
- `directory_id`: integer — Identifier of the directory the entry was synced from, when directory-synced.
- `directory_node_id`: integer — Identifier of the directory node the entry was synced from, when directory-synced.
- `email`: string — Email address (or pattern) of the protected identity.
- `external_directory_node_id`: string — Deprecated. External identifier of the directory node.
- `id`: any
- `is_email_regex`: boolean — Whether `email` is a regular expression instead of a literal address.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `name`: string — Display name of the protected identity.
- `provenance`: string — Source the entry was created from.

## PATCH /accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}

Update an impersonation registry entry

operationId: `email_security_update_impersonation_registry`

**Request** (application/json)

- `comments`: string — Optional note describing the entry.
- `created_at`: any
- `directory_id`: integer — Identifier of the directory the entry was synced from, when directory-synced.
- `directory_node_id`: integer — Identifier of the directory node the entry was synced from, when directory-synced.
- `email`: string — Email address (or pattern) of the protected identity.
- `external_directory_node_id`: string — Deprecated. External identifier of the directory node.
- `id`: any
- `is_email_regex`: boolean — Whether `email` is a regular expression instead of a literal address.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `name`: string — Display name of the protected identity.
- `provenance`: string — Source the entry was created from.

**Response** 200 → `result`

- `comments`: string — Optional note describing the entry.
- `created_at`: any
- `directory_id`: integer — Identifier of the directory the entry was synced from, when directory-synced.
- `directory_node_id`: integer — Identifier of the directory node the entry was synced from, when directory-synced.
- `email`: string — Email address (or pattern) of the protected identity.
- `external_directory_node_id`: string — Deprecated. External identifier of the directory node.
- `id`: any
- `is_email_regex`: boolean — Whether `email` is a regular expression instead of a literal address.
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `name`: string — Display name of the protected identity.
- `provenance`: string — Source the entry was created from.

## GET /accounts/{account_id}/email-security/settings/sending_domain_restrictions

List sending domain restrictions

operationId: `email_security_list_sending_domain_restrictions` · query: `page`, `per_page`, `search`, `order`, `direction`

**Response** 200 → `result`

[array of]
- `comments`: string
- `created_at`: any
- `domain`: string — Domain that requires TLS enforcement.
- `exclude`: string[] — Subdomains to exempt from TLS requirements.
  [array]
- `id`: any
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any

## POST /accounts/{account_id}/email-security/settings/sending_domain_restrictions

Create a sending domain restriction

operationId: `email_security_create_sending_domain_restriction`

**Request** (application/json)

- `comments`: string
- `created_at`: any
- `domain`: string — Domain that requires TLS enforcement.
- `exclude`: string[] — Subdomains to exempt from TLS requirements.
  [array]
- `id`: any
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any

**Response** 201 → `result`

- `comments`: string
- `created_at`: any
- `domain`: string — Domain that requires TLS enforcement.
- `exclude`: string[] — Subdomains to exempt from TLS requirements.
  [array]
- `id`: any
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any

## DELETE /accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}

Delete a sending domain restriction

operationId: `email_security_delete_sending_domain_restriction`

**Response** 200 → `result`

- `id`: string **required** — Sending domain restriction identifier.

## GET /accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}

Get a sending domain restriction

operationId: `email_security_get_sending_domain_restriction`

**Response** 200 → `result`

- `comments`: string
- `created_at`: any
- `domain`: string — Domain that requires TLS enforcement.
- `exclude`: string[] — Subdomains to exempt from TLS requirements.
  [array]
- `id`: any
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any

## PATCH /accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}

Update a sending domain restriction

operationId: `email_security_update_sending_domain_restriction`

**Request** (application/json)

- `comments`: string
- `created_at`: any
- `domain`: string — Domain that requires TLS enforcement.
- `exclude`: string[] — Subdomains to exempt from TLS requirements.
  [array]
- `id`: any
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any

**Response** 200 → `result`

- `comments`: string
- `created_at`: any
- `domain`: string — Domain that requires TLS enforcement.
- `exclude`: string[] — Subdomains to exempt from TLS requirements.
  [array]
- `id`: any
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any

## POST /accounts/{account_id}/email-security/settings/sending_domain_restrictions/batch

Batch sending domain restriction operations

operationId: `email_security_batch_sending_domain_restrictions`

**Request** (application/json)

- `deletes`: object[] **required** — IDs of the sending domain restrictions to delete.
  [array of]
  - `id`: string **required** — Sending domain restriction identifier.

**Response** 200 → `result`

- `deletes`: object[] **required**
  [array of]
  - `id`: string **required** — Sending domain restriction identifier.

## GET /accounts/{account_id}/email-security/settings/trusted_domains

List trusted email domains

operationId: `email_security_list_trusted_domains` · query: `page`, `per_page`, `search`, `order`, `direction`, `is_recent`, `is_similarity`, `pattern`

**Response** 200 → `result`

[array of]
- `comments`: string
- `created_at`: any
- `id`: any
- `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
- `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The domain pattern to trust, e.g. `example.com`.

## POST /accounts/{account_id}/email-security/settings/trusted_domains

Create trusted email domain

operationId: `email_security_create_trusted_domain`

**Request** (application/json)

- `comments`: string
- `created_at`: any
- `id`: any
- `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
- `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The domain pattern to trust, e.g. `example.com`.

**Response** 201 → `result`

- `comments`: string
- `created_at`: any
- `id`: any
- `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
- `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The domain pattern to trust, e.g. `example.com`.

## DELETE /accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}

Delete a trusted email domain

operationId: `email_security_delete_trusted_domain`

**Response** 200 → `result`

- `id`: string **required** — Trusted domain identifier.

## GET /accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}

Get a trusted email domain

operationId: `email_security_get_trusted_domain`

**Response** 200 → `result`

- `comments`: string
- `created_at`: any
- `id`: any
- `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
- `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The domain pattern to trust, e.g. `example.com`.

## PATCH /accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}

Update a trusted email domain

operationId: `email_security_update_trusted_domain`

**Request** (application/json)

- `comments`: string
- `created_at`: any
- `id`: any
- `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
- `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The domain pattern to trust, e.g. `example.com`.

**Response** 200 → `result`

- `comments`: string
- `created_at`: any
- `id`: any
- `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
- `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The domain pattern to trust, e.g. `example.com`.

## PUT /accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}

Replace a trusted email domain

operationId: `email_security_replace_trusted_domain`

**Request** (application/json)

- `comments`: string
- `created_at`: any
- `id`: any
- `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
- `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The domain pattern to trust, e.g. `example.com`.

**Response** 200 → `result`

- `comments`: string
- `created_at`: any
- `id`: any
- `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
- `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
- `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
- `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: any
- `pattern`: string — The domain pattern to trust, e.g. `example.com`.

## POST /accounts/{account_id}/email-security/settings/trusted_domains/batch

Batch trusted domain operations

operationId: `email_security_batch_trusted_domains`

**Request** (application/json)

- `deletes`: object[] **required** — IDs of the trusted domain patterns to delete.
  [array of]
  - `id`: string **required** — Trusted domain identifier.
- `patches`: object[] **required** — Partial updates to apply — each entry carries the pattern's ID and only the fields to change.
  [array of]
  - `comments`: string
  - `created_at`: any
  - `id`: any
  - `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
  - `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The domain pattern to trust, e.g. `example.com`.
  - `id`: any **required**
- `posts`: object[] **required** — Trusted domain patterns to create.
  [array of]
  - `comments`: string
  - `created_at`: any
  - `id`: any
  - `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
  - `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The domain pattern to trust, e.g. `example.com`.
- `puts`: object[] **required** — Full replacements to apply — each entry carries the pattern's ID and every field of its new value.
  [array of]
  - `comments`: string
  - `created_at`: any
  - `id`: any
  - `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
  - `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The domain pattern to trust, e.g. `example.com`.
  - `id`: any **required**

**Response** 200 → `result`

- `deletes`: object[]
  [array of]
  - `id`: string **required** — Trusted domain identifier.
- `patches`: object[]
  [array of]
  - `comments`: string
  - `created_at`: any
  - `id`: any
  - `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
  - `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The domain pattern to trust, e.g. `example.com`.
- `posts`: object[]
  [array of]
  - `comments`: string
  - `created_at`: any
  - `id`: any
  - `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
  - `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The domain pattern to trust, e.g. `example.com`.
- `puts`: object[]
  [array of]
  - `comments`: string
  - `created_at`: any
  - `id`: any
  - `is_recent`: boolean — Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.
  - `is_regex`: boolean — Whether `pattern` is a regular expression instead of a literal domain.
  - `is_similarity`: boolean — Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a
  - `last_modified`: any — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: any
  - `pattern`: string — The domain pattern to trust, e.g. `example.com`.

## GET /accounts/{account_id}/email-security/settings/url_ignore_patterns

List URL ignore patterns

operationId: `email_security_list_url_ignore_patterns` · query: `page`, `per_page`

**Response** 200 → `result`

[array of]
- `comments`: string — Optional note describing the reason for the ignore pattern.
- `created_at`: string **required**
- `id`: any **required**
- `last_modified`: string — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: string
- `pattern`: string **required** — Regular expression identifying URLs to exempt from rewriting.

## POST /accounts/{account_id}/email-security/settings/url_ignore_patterns

Create a URL ignore pattern

operationId: `email_security_create_url_ignore_pattern`

**Request** (application/json)

- `comments`: string — Optional note describing the reason for the ignore pattern.
- `pattern`: string **required** — Regular expression identifying URLs to exempt from rewriting.

**Response** 201 → `result`

- `comments`: string — Optional note describing the reason for the ignore pattern.
- `created_at`: string **required**
- `id`: any **required**
- `last_modified`: string — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: string
- `pattern`: string **required** — Regular expression identifying URLs to exempt from rewriting.

## DELETE /accounts/{account_id}/email-security/settings/url_ignore_patterns/{pattern_id}

Delete a URL ignore pattern

operationId: `email_security_delete_url_ignore_pattern`

**Response** 200 → `result`

- `id`: string **required** — URL ignore pattern identifier.

## GET /accounts/{account_id}/email-security/settings/url_ignore_patterns/{pattern_id}

Get a URL ignore pattern

operationId: `email_security_get_url_ignore_pattern`

**Response** 200 → `result`

- `comments`: string — Optional note describing the reason for the ignore pattern.
- `created_at`: string **required**
- `id`: any **required**
- `last_modified`: string — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: string
- `pattern`: string **required** — Regular expression identifying URLs to exempt from rewriting.

## PATCH /accounts/{account_id}/email-security/settings/url_ignore_patterns/{pattern_id}

Update a URL ignore pattern

operationId: `email_security_update_url_ignore_pattern`

**Request** (application/json)

- `comments`: string — Optional note describing the reason for the ignore pattern.
- `pattern`: string — Regular expression identifying URLs to exempt from rewriting.

**Response** 200 → `result`

- `comments`: string — Optional note describing the reason for the ignore pattern.
- `created_at`: string **required**
- `id`: any **required**
- `last_modified`: string — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
- `modified_at`: string
- `pattern`: string **required** — Regular expression identifying URLs to exempt from rewriting.

## POST /accounts/{account_id}/email-security/settings/url_ignore_patterns/batch

Batch URL ignore pattern operations

operationId: `email_security_batch_url_ignore_patterns`

**Request** (application/json)

- `deletes`: object[] **required** — IDs of the URL ignore patterns to delete.
  [array of]
  - `id`: string **required** — URL ignore pattern identifier.
- `patches`: object[] **required** — Partial updates to apply — each entry carries the pattern's ID and only the fields to change.
  [array of]
  - `comments`: string — Optional note describing the reason for the ignore pattern.
  - `pattern`: string — Regular expression identifying URLs to exempt from rewriting.
  - `id`: any **required**
- `posts`: object[] **required** — URL ignore patterns to create.
  [array of]
  - `comments`: string — Optional note describing the reason for the ignore pattern.
  - `pattern`: string **required** — Regular expression identifying URLs to exempt from rewriting.
- `puts`: object[] **required** — Full replacements to apply — each entry carries the pattern's ID and every field of its new value.
  [array of]
  - `comments`: string — Optional note describing the reason for the ignore pattern.
  - `pattern`: string **required** — Regular expression identifying URLs to exempt from rewriting.
  - `id`: any **required**

**Response** 200 → `result`

- `deletes`: object[] **required**
  [array of]
  - `id`: string **required** — URL ignore pattern identifier.
- `patches`: object[] **required**
  [array of]
  - `comments`: string — Optional note describing the reason for the ignore pattern.
  - `created_at`: string **required**
  - `id`: any **required**
  - `last_modified`: string — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: string
  - `pattern`: string **required** — Regular expression identifying URLs to exempt from rewriting.
- `posts`: object[] **required**
  [array of]
  - `comments`: string — Optional note describing the reason for the ignore pattern.
  - `created_at`: string **required**
  - `id`: any **required**
  - `last_modified`: string — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: string
  - `pattern`: string **required** — Regular expression identifying URLs to exempt from rewriting.
- `puts`: object[] **required**
  [array of]
  - `comments`: string — Optional note describing the reason for the ignore pattern.
  - `created_at`: string **required**
  - `id`: any **required**
  - `last_modified`: string — Deprecated, use `modified_at` instead. End of life: November 1, 2026.
  - `modified_at`: string
  - `pattern`: string **required** — Regular expression identifying URLs to exempt from rewriting.
