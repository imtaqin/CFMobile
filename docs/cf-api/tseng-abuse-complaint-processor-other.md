# tseng-abuse-complaint-processor_other

10 endpoints.

## GET /accounts/{account_id}/abuse-reports

List abuse reports against the account

operationId: `ListAbuseReports` · query: `page`, `per_page`, `sort`, `search`, `domain`, `created_before`, `created_after`, `status`, `type`, `mitigation_status`, `pending_notice`

**Response** 200 → `result`

- `reports`: object[] **required**
  [array of]
  - `cdate`: string **required** — Creation date of report. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)
  - `domain`: string **required** — Domain that relates to the report.
  - `has_pending_notice`: boolean — Whether the report is in an open Notice and Takedown notice period: no mitigation is placed yet, but one will take effect when the period en
  - `id`: string **required** — Public facing ID of abuse report, aka abuse_rand.
  - `justification`: string — Justification for the report.
  - `mitigation_summary`: object **required** — A summary of the mitigations related to this report.
    - `accepted_url_count`: integer **required** — How many of the reported URLs were confirmed as abusive.
    - `active_count`: integer **required** — How many mitigations are active.
    - `external_host_notified`: boolean **required** — Whether the report has been forwarded to an external hosting provider.
    - `in_review_count`: integer **required** — How many mitigations are under review.
    - `pending_count`: integer **required** — How many mitigations are pending their effective date.
  - `original_work`: string — Original work / Targeted brand in the alleged abuse.
  - `status`: string **required** enum: `accepted`, `in_review` — An enum value that represents the status of an abuse record
  - `submitter`: object — Information about the submitter of the report.
    - `company`: string
    - `email`: string
    - `name`: string
    - `telephone`: string
  - `type`: string **required** enum: `PHISH`, `GEN`, `THREAT`, `DMCA`, `EMER`, `TM`, `REG_WHO`, `NCSEI` — The abuse report type
  - `urls`: string[]
    [array]

## GET /accounts/{account_id}/abuse-reports/{report_id}/appeals/eligibility

Check whether a report can be appealed

operationId: `CheckAppealEligibility`

**Response** 200 → `result`

- `appeal_count`: integer **required** — Number of appeals submitted against the report so far.
- `appealable`: boolean **required** — Whether the report can currently be appealed under the policy applied to it.
- `has_appealable_mitigations`: boolean **required** — Whether the report has at least one mitigation an appeal could reverse.
- `has_open_appeal`: boolean **required** — Whether the report already has an open (undecided) appeal.
- `has_pending_notice`: boolean **required** — Whether the report is in its Notice and Takedown notice period. No mitigation is applied yet, but one will be applied at `notice_deadline` u
- `max_appeals`: integer **required** — Maximum number of appeals allowed per report.
- `notice_deadline`: string — When the notice period ends and the mitigation is applied. Present only when `has_pending_notice` is true. Time in RFC 3339 format (https://

## GET /accounts/{account_id}/abuse-reports/{report_id}/emails

List abuse report emails

operationId: `ListEmails` · query: `page`, `per_page`

**Response** 200 → `result`

- `emails`: object[] **required**
  [array of]
  - `body`: string **required** — Body content of the email.
  - `id`: string **required** — Unique identifier of the email.
  - `recipient`: string **required** — Email address of the recipient.
  - `sent_at`: string **required** — When the email was sent. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)
  - `subject`: string **required** — Subject line of the email.

## GET /accounts/{account_id}/abuse-reports/{report_id}/mitigations

List abuse report mitigations

operationId: `ListMitigations` · query: `page`, `per_page`, `sort`, `type`, `effective_before`, `effective_after`, `status`, `entity_type`

**Response** 200 → `result`

- `mitigations`: object[] **required**
  [array of]
  - `effective_date`: string **required** — Date when the mitigation will become active. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)
  - `entity_id`: string **required**
  - `entity_type`: string **required** enum: `url_pattern`, `account`, `zone`, `custom_expression` — The type of entity targeted by a mitigation.
  - `id`: string **required** — ID of remediation.
  - `status`: string **required** enum: `pending`, `active`, `in_review`, `cancelled`, `removed` — The status of a mitigation
  - `type`: string **required** — The type of mitigation applied to a reported entity.

## POST /accounts/{account_id}/abuse-reports/{report_id}/mitigations/appeal

Request review on mitigations

operationId: `RequestReview`

**Request** (application/json)

(one of 2 variants; showing the first)
object

**Response** 200 → `result`

[array of]
- `effective_date`: string **required** — Date when the mitigation will become active. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)
- `entity_id`: string **required**
- `entity_type`: string **required** enum: `url_pattern`, `account`, `zone`, `custom_expression` — The type of entity targeted by a mitigation.
- `id`: string **required** — ID of remediation.
- `status`: string **required** enum: `pending`, `active`, `in_review`, `cancelled`, `removed` — The status of a mitigation
- `type`: string **required** — The type of mitigation applied to a reported entity.

## GET /accounts/{account_id}/abuse-reports/{report_param}

Get an abuse report against the account

operationId: `GetAbuseReport`

**Response** 200 → `result`

- `cdate`: string **required** — Creation date of report. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)
- `domain`: string **required** — Domain that relates to the report.
- `has_pending_notice`: boolean — Whether the report is in an open Notice and Takedown notice period: no mitigation is placed yet, but one will take effect when the period en
- `id`: string **required** — Public facing ID of abuse report, aka abuse_rand.
- `justification`: string — Justification for the report.
- `mitigation_summary`: object **required** — A summary of the mitigations related to this report.
  - `accepted_url_count`: integer **required** — How many of the reported URLs were confirmed as abusive.
  - `active_count`: integer **required** — How many mitigations are active.
  - `external_host_notified`: boolean **required** — Whether the report has been forwarded to an external hosting provider.
  - `in_review_count`: integer **required** — How many mitigations are under review.
  - `pending_count`: integer **required** — How many mitigations are pending their effective date.
- `original_work`: string — Original work / Targeted brand in the alleged abuse.
- `status`: string **required** enum: `accepted`, `in_review` — An enum value that represents the status of an abuse record
- `submitter`: object — Information about the submitter of the report.
  - `company`: string
  - `email`: string
  - `name`: string
  - `telephone`: string
- `type`: string **required** enum: `PHISH`, `GEN`, `THREAT`, `DMCA`, `EMER`, `TM`, `REG_WHO`, `NCSEI` — The abuse report type
- `urls`: string[]
  [array]

## POST /accounts/{account_id}/abuse-reports/{report_param}

Submit an abuse report

operationId: `SubmitAbuseReport`

**Request** (application/json)

(one of 8 variants; showing the first)
- `act`: string **required** — The report type for submitted reports.
- `comments`: string — Any additional comments about the infringement not exceeding 2000 characters. With the exception of delegated reports, comments are kept int
- `company`: string — Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendataba
- `email`: string **required** — A valid email of the abuse reporter. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendata
- `email2`: string **required** — Should match the value provided in `email`
- `name`: string **required** — Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendataba
- `reported_country`: string — Text containing 2 characters
- `reported_user_agent`: string — Text not exceeding 255 characters
- `tele`: string — Text not exceeding 20 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendatabas
- `title`: string — Text not exceeding 255 characters
- `urls`: string **required** — A list of valid URLs separated by ‘\n’ (new line character). The list of the URLs should not exceed 250 URLs. All URLs should have the same 
- `act`: string enum: `abuse_dmca`
- `address1`: string **required** — Text not exceeding 100 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendataba
- `agent_name`: string **required** — The name of the copyright holder. Text not exceeding 60 characters. This field may be released by Cloudflare to third parties such as the Lu
- `agree`: integer **required** enum: `1` — Can be `0` for false or `1` for true. Must be value: 1 for DMCA reports
- `city`: string **required** — Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendataba
- `country`: string **required** — Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendataba
- `host_notification`: string **required** enum: `send` — Notification type based on the abuse type. For delegated reports, the report—including contact information and comments—will be forwarded to
- `original_work`: string **required** — Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendataba
- `owner_notification`: string **required** enum: `send` — Notification type based on the abuse type. For delegated reports, the report—including contact information and comments—will be forwarded to
- `signature`: string **required** — Required for DMCA reports, should be same as Name. An affirmation that all information in the report is true and accurate while agreeing to 
- `state`: string **required** — Text not exceeding 255 characters. This field may be released by Cloudflare to third parties such as the Lumen Database (https://lumendataba

**Response** 200 → `result`

string

## GET /accounts/{account_id}/abuse-reports/submitted

List submitted abuse reports

operationId: `ListSubmittedAbuseReports` · query: `page`, `per_page`, `sort`, `id`, `domain`, `created_before`, `created_after`, `status`, `type`

**Response** 200 → `result`

- `reports`: object[] **required**
  [array of]
  - `cdate`: string **required** — Time the report was submitted.
  - `denial_reason`: string **required** — Submitter-safe reason for a denied report. Null when unavailable.
  - `domain`: string **required** — Domain identified in the report.
  - `id`: string **required** — Public report code.
  - `status`: string **required** enum: `submitted`, `accepted`, `denied` — Status visible to the account that submitted the report.
  - `submitter`: object — Information about the submitter of the report.
    - `company`: string
    - `email`: string
    - `name`: string
    - `telephone`: string
  - `type`: string **required** enum: `PHISH`, `GEN`, `THREAT`, `DMCA`, `EMER`, `TM`, `REG_WHO`, `NCSEI` — The abuse report type

## GET /accounts/{account_id}/abuse-reports/submitted/{report_id}

Get a submitted abuse report

operationId: `GetSubmittedAbuseReport`

**Response** 200 → `result`

- `cdate`: string **required** — Time the report was submitted.
- `denial_reason`: string **required** — Submitter-safe reason for a denied report. Null when unavailable.
- `domain`: string **required** — Domain identified in the report.
- `id`: string **required** — Public report code.
- `status`: string **required** enum: `submitted`, `accepted`, `denied` — Status visible to the account that submitted the report.
- `submitter`: object — Information about the submitter of the report.
  - `company`: string
  - `email`: string
  - `name`: string
  - `telephone`: string
- `type`: string **required** enum: `PHISH`, `GEN`, `THREAT`, `DMCA`, `EMER`, `TM`, `REG_WHO`, `NCSEI` — The abuse report type
- `agent_name`: string — Authorized agent name supplied with the report.
- `comments`: string — Additional comments supplied with the report.
- `court`: string — The string "on" when a court proceeding applies to the report; otherwise omitted.
- `destination_ips`: string[] — Destination IP addresses supplied with a network abuse report.
  [array]
- `dsa_attestation`: boolean **required** — Whether the submitter provided the Digital Services Act attestation.
- `host_notification`: string — Submitter preference for notifying the hosting provider.
- `justification`: string — Evidence supplied with the report.
- `ncmec_notification`: string — Submitter preference for notifying NCMEC.
- `ncsei_subject_representation`: boolean — Representation supplied for an NCSEI report.
- `original_work`: string — Original work or targeted brand supplied with the report.
- `owner_notification`: string — Submitter preference for notifying the content owner.
- `ports_protocols`: string[] — Ports and protocols supplied with a network abuse report.
  [array]
- `reg_who_request`: object — RDP-mandated fields for registrar WHOIS data disclosure requests.
  - `reg_who_authorization_statement`: string — Optional authorization statement or power of attorney per RDP 10.2.1.3.
  - `reg_who_good_faith_affirmation`: boolean **required** — Affirmation that the request is made in good faith per RDP 10.2.4. Must be true.
  - `reg_who_lawful_processing_agreement`: boolean **required** — Agreement to process data lawfully per RDP 10.2.5. Must be true.
  - `reg_who_legal_basis`: string **required** — Legal rights and rationale for the request per RDP 10.2.3. Required for all WHOIS requests.
  - `reg_who_request_type`: string **required** enum: `disclosure`, `invalid_whois` — The type of WHOIS data request per RDP procedure.
  - `reg_who_requested_data_elements`: string[] **required** — The specific WHOIS data elements being requested per RDP 10.2.2. Required for all WHOIS requests.
    [array]
  - `reg_who_requestor_type`: string enum: `government`, `corporation`, `individual` — The nature of the requestor per RDP 10.2.1.2.
- `reported_country`: string — Country associated with the reported activity.
- `reported_user_agent`: string — User agent associated with the reported activity.
- `source_ips`: string[] — Source IP addresses supplied with a network abuse report.
  [array]
- `subtypes`: string[] — Additional abuse classifications supplied with the report.
  [array]
- `title`: string — Title supplied with the report.
- `udrp`: string — The string "on" when a UDRP proceeding applies to the report; otherwise omitted.
- `urls`: string[] **required** — URLs supplied with the report.
  [array]
- `urs`: string — The string "on" when a URS proceeding applies to the report; otherwise omitted.

## GET /accounts/{account_id}/abuse-reports/submitted/{report_id}/emails

List emails sent to an abuse report submitter

operationId: `ListSubmittedAbuseReportEmails` · query: `page`, `per_page`

**Response** 200 → `result`

- `emails`: object[] **required**
  [array of]
  - `body`: string **required** — Body content of the email.
  - `id`: string **required** — Unique identifier of the email.
  - `recipient`: string **required** — Email address of the recipient.
  - `sent_at`: string **required** — When the email was sent. Time in RFC 3339 format (https://www.rfc-editor.org/rfc/rfc3339.html)
  - `subject`: string **required** — Subject line of the email.
