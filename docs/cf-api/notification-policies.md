# Notification policies

8 endpoints.

## GET /accounts/{account_id}/alerting/v3/policies

List Notification policies

operationId: `notification-policies-list-notification-policies`

**Response** 200 → `result`

[array of]
- `alert_interval`: string — Optional specification of how often to re-alert from the same incident, not support on all alert types.
- `alert_type`: string enum: `abuse_report_alert`, `access_custom_certificate_expiration_type`, `advanced_ddos_attack_l4_alert`, `advanced_ddos_attack_l7_alert`, `advanced_http_alert_error`, `bgp_hijack_notification`, `billing_usage_alert`, `block_notification_block_removed` — Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a
- `created`: string
- `description`: string — Optional description for the Notification policy.
- `enabled`: boolean default: `true` — Whether or not the Notification policy is enabled.
- `filters`: object — Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available 
  - `actions`: string[] — Usage depends on specific alert type
    [array]
  - `affected_asns`: string[] — Used for configuring radar_notification
    [array]
  - `affected_components`: string[] — Used for configuring incident_alert
    [array]
  - `affected_locations`: string[] — Used for configuring radar_notification
    [array]
  - `airport_code`: string[] — Used for configuring maintenance_event_notification
    [array]
  - `alert_trigger_preferences`: string[] — Usage depends on specific alert type
    [array]
  - `alert_trigger_preferences_value`: string[] — Usage depends on specific alert type
    [array]
  - `enabled`: string[] — Used for configuring load_balancing_pool_enablement_alert
    [array]
  - `environment`: string[] — Used for configuring pages_event_alert
    [array]
  - `event`: string[] — Used for configuring pages_event_alert
    [array]
  - `event_source`: string[] — Used for configuring load_balancing_health_alert
    [array]
  - `event_type`: string[] — Usage depends on specific alert type
    [array]
  - `group_by`: string[] — Usage depends on specific alert type
    [array]
  - `health_check_id`: string[] — Used for configuring health_check_status_notification
    [array]
  - `incident_impact`: string[] — Used for configuring incident_alert
    [array]
  - `input_id`: string[] — Used for configuring stream_live_notifications
    [array]
  - `insight_class`: string[] — Used for configuring security_insights_alert
    [array]
  - `limit`: string[] — Used for configuring billing_usage_alert
    [array]
  - `logo_tag`: string[] — Used for configuring logo_match_alert
    [array]
  - `megabits_per_second`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `new_health`: string[] — Used for configuring load_balancing_health_alert
    [array]
  - `new_status`: string[] — Used for configuring tunnel_health_event
    [array]
  - `packets_per_second`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `pool_id`: string[] — Usage depends on specific alert type
    [array]
  - `pop_names`: string[] — Usage depends on specific alert type
    [array]
  - `product`: string[] — Used for configuring billing_usage_alert
    [array]
  - `project_id`: string[] — Used for configuring pages_event_alert
    [array]
  - `protocol`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `query_tag`: string[] — Usage depends on specific alert type
    [array]
  - `requests_per_second`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `selectors`: string[] — Usage depends on specific alert type
    [array]
  - `services`: string[] — Used for configuring clickhouse_alert_fw_ent_anomaly
    [array]
  - `slo`: string[] — Usage depends on specific alert type
    [array]
  - `status`: string[] — Used for configuring health_check_status_notification
    [array]
  - `target_hostname`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `target_ip`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `target_zone_name`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `token_id`: string[] — Access service token IDs to include for expiring_service_token_alert. Omit this property to include all current and future service tokens.
    [array]
  - `traffic_exclusions`: string[] — Used for configuring traffic_anomalies_alert
    [array]
  - `tunnel_id`: string[] — Used for configuring tunnel_health_event
    [array]
  - `tunnel_name`: string[] — Usage depends on specific alert type
    [array]
  - `type`: string[] — Usage depends on specific alert type
    [array]
  - `where`: string[] — Usage depends on specific alert type
    [array]
  - `zones`: string[] — Usage depends on specific alert type
    [array]
- `id`: string — The unique identifier of a notification policy
- `mechanisms`: object — List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.
  - `email`: object[]
    [array of]
    - `id`: string — The email address
  - `pagerduty`: object[]
    [array of]
    - `id`: string — UUID
  - `webhooks`: object[]
    [array of]
    - `id`: string — UUID
- `modified`: string
- `name`: string — Name of the policy.

## POST /accounts/{account_id}/alerting/v3/policies

Create a Notification policy

operationId: `notification-policies-create-a-notification-policy`

**Request** (application/json)

- `alert_interval`: string — Optional specification of how often to re-alert from the same incident, not support on all alert types.
- `alert_type`: string **required** enum: `abuse_report_alert`, `access_custom_certificate_expiration_type`, `advanced_ddos_attack_l4_alert`, `advanced_ddos_attack_l7_alert`, `advanced_http_alert_error`, `bgp_hijack_notification`, `billing_usage_alert`, `block_notification_block_removed` — Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a
- `description`: string — Optional description for the Notification policy.
- `enabled`: boolean **required** default: `true` — Whether or not the Notification policy is enabled.
- `filters`: object — Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available 
  - `actions`: string[] — Usage depends on specific alert type
    [array]
  - `affected_asns`: string[] — Used for configuring radar_notification
    [array]
  - `affected_components`: string[] — Used for configuring incident_alert
    [array]
  - `affected_locations`: string[] — Used for configuring radar_notification
    [array]
  - `airport_code`: string[] — Used for configuring maintenance_event_notification
    [array]
  - `alert_trigger_preferences`: string[] — Usage depends on specific alert type
    [array]
  - `alert_trigger_preferences_value`: string[] — Usage depends on specific alert type
    [array]
  - `enabled`: string[] — Used for configuring load_balancing_pool_enablement_alert
    [array]
  - `environment`: string[] — Used for configuring pages_event_alert
    [array]
  - `event`: string[] — Used for configuring pages_event_alert
    [array]
  - `event_source`: string[] — Used for configuring load_balancing_health_alert
    [array]
  - `event_type`: string[] — Usage depends on specific alert type
    [array]
  - `group_by`: string[] — Usage depends on specific alert type
    [array]
  - `health_check_id`: string[] — Used for configuring health_check_status_notification
    [array]
  - `incident_impact`: string[] — Used for configuring incident_alert
    [array]
  - `input_id`: string[] — Used for configuring stream_live_notifications
    [array]
  - `insight_class`: string[] — Used for configuring security_insights_alert
    [array]
  - `limit`: string[] — Used for configuring billing_usage_alert
    [array]
  - `logo_tag`: string[] — Used for configuring logo_match_alert
    [array]
  - `megabits_per_second`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `new_health`: string[] — Used for configuring load_balancing_health_alert
    [array]
  - `new_status`: string[] — Used for configuring tunnel_health_event
    [array]
  - `packets_per_second`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `pool_id`: string[] — Usage depends on specific alert type
    [array]
  - `pop_names`: string[] — Usage depends on specific alert type
    [array]
  - `product`: string[] — Used for configuring billing_usage_alert
    [array]
  - `project_id`: string[] — Used for configuring pages_event_alert
    [array]
  - `protocol`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `query_tag`: string[] — Usage depends on specific alert type
    [array]
  - `requests_per_second`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `selectors`: string[] — Usage depends on specific alert type
    [array]
  - `services`: string[] — Used for configuring clickhouse_alert_fw_ent_anomaly
    [array]
  - `slo`: string[] — Usage depends on specific alert type
    [array]
  - `status`: string[] — Used for configuring health_check_status_notification
    [array]
  - `target_hostname`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `target_ip`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `target_zone_name`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `token_id`: string[] — Access service token IDs to include for expiring_service_token_alert. Omit this property to include all current and future service tokens.
    [array]
  - `traffic_exclusions`: string[] — Used for configuring traffic_anomalies_alert
    [array]
  - `tunnel_id`: string[] — Used for configuring tunnel_health_event
    [array]
  - `tunnel_name`: string[] — Usage depends on specific alert type
    [array]
  - `type`: string[] — Usage depends on specific alert type
    [array]
  - `where`: string[] — Usage depends on specific alert type
    [array]
  - `zones`: string[] — Usage depends on specific alert type
    [array]
- `mechanisms`: object **required** — List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.
  - `email`: object[]
    [array of]
    - `id`: string — The email address
  - `pagerduty`: object[]
    [array of]
    - `id`: string — UUID
  - `webhooks`: object[]
    [array of]
    - `id`: string — UUID
- `name`: string **required** — Name of the policy.

**Response** 200 → `result`

- `id`: string — UUID

## DELETE /accounts/{account_id}/alerting/v3/policies/{policy_id}

Delete a Notification policy

operationId: `notification-policies-delete-a-notification-policy`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer
  - `message`: string **required**
- `messages`: object[] **required**
  [array of]
  - `code`: integer
  - `message`: string **required**
- `success`: boolean **required** enum: `true` — Whether the API call was successful
- `result_info`: object
  - `count`: number — Total number of results for the requested service
  - `page`: number — Current page within paginated list of results
  - `per_page`: number — Number of results per page of results
  - `total_count`: number — Total results available without any search parameters

## GET /accounts/{account_id}/alerting/v3/policies/{policy_id}

Get a Notification policy

operationId: `notification-policies-get-a-notification-policy`

**Response** 200 → `result`

- `alert_interval`: string — Optional specification of how often to re-alert from the same incident, not support on all alert types.
- `alert_type`: string enum: `abuse_report_alert`, `access_custom_certificate_expiration_type`, `advanced_ddos_attack_l4_alert`, `advanced_ddos_attack_l7_alert`, `advanced_http_alert_error`, `bgp_hijack_notification`, `billing_usage_alert`, `block_notification_block_removed` — Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a
- `created`: string
- `description`: string — Optional description for the Notification policy.
- `enabled`: boolean default: `true` — Whether or not the Notification policy is enabled.
- `filters`: object — Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available 
  - `actions`: string[] — Usage depends on specific alert type
    [array]
  - `affected_asns`: string[] — Used for configuring radar_notification
    [array]
  - `affected_components`: string[] — Used for configuring incident_alert
    [array]
  - `affected_locations`: string[] — Used for configuring radar_notification
    [array]
  - `airport_code`: string[] — Used for configuring maintenance_event_notification
    [array]
  - `alert_trigger_preferences`: string[] — Usage depends on specific alert type
    [array]
  - `alert_trigger_preferences_value`: string[] — Usage depends on specific alert type
    [array]
  - `enabled`: string[] — Used for configuring load_balancing_pool_enablement_alert
    [array]
  - `environment`: string[] — Used for configuring pages_event_alert
    [array]
  - `event`: string[] — Used for configuring pages_event_alert
    [array]
  - `event_source`: string[] — Used for configuring load_balancing_health_alert
    [array]
  - `event_type`: string[] — Usage depends on specific alert type
    [array]
  - `group_by`: string[] — Usage depends on specific alert type
    [array]
  - `health_check_id`: string[] — Used for configuring health_check_status_notification
    [array]
  - `incident_impact`: string[] — Used for configuring incident_alert
    [array]
  - `input_id`: string[] — Used for configuring stream_live_notifications
    [array]
  - `insight_class`: string[] — Used for configuring security_insights_alert
    [array]
  - `limit`: string[] — Used for configuring billing_usage_alert
    [array]
  - `logo_tag`: string[] — Used for configuring logo_match_alert
    [array]
  - `megabits_per_second`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `new_health`: string[] — Used for configuring load_balancing_health_alert
    [array]
  - `new_status`: string[] — Used for configuring tunnel_health_event
    [array]
  - `packets_per_second`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `pool_id`: string[] — Usage depends on specific alert type
    [array]
  - `pop_names`: string[] — Usage depends on specific alert type
    [array]
  - `product`: string[] — Used for configuring billing_usage_alert
    [array]
  - `project_id`: string[] — Used for configuring pages_event_alert
    [array]
  - `protocol`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `query_tag`: string[] — Usage depends on specific alert type
    [array]
  - `requests_per_second`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `selectors`: string[] — Usage depends on specific alert type
    [array]
  - `services`: string[] — Used for configuring clickhouse_alert_fw_ent_anomaly
    [array]
  - `slo`: string[] — Usage depends on specific alert type
    [array]
  - `status`: string[] — Used for configuring health_check_status_notification
    [array]
  - `target_hostname`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `target_ip`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `target_zone_name`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `token_id`: string[] — Access service token IDs to include for expiring_service_token_alert. Omit this property to include all current and future service tokens.
    [array]
  - `traffic_exclusions`: string[] — Used for configuring traffic_anomalies_alert
    [array]
  - `tunnel_id`: string[] — Used for configuring tunnel_health_event
    [array]
  - `tunnel_name`: string[] — Usage depends on specific alert type
    [array]
  - `type`: string[] — Usage depends on specific alert type
    [array]
  - `where`: string[] — Usage depends on specific alert type
    [array]
  - `zones`: string[] — Usage depends on specific alert type
    [array]
- `id`: string — The unique identifier of a notification policy
- `mechanisms`: object — List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.
  - `email`: object[]
    [array of]
    - `id`: string — The email address
  - `pagerduty`: object[]
    [array of]
    - `id`: string — UUID
  - `webhooks`: object[]
    [array of]
    - `id`: string — UUID
- `modified`: string
- `name`: string — Name of the policy.

## PUT /accounts/{account_id}/alerting/v3/policies/{policy_id}

Update a Notification policy

operationId: `notification-policies-update-a-notification-policy`

**Request** (application/json)

- `alert_interval`: string — Optional specification of how often to re-alert from the same incident, not support on all alert types.
- `alert_type`: string enum: `abuse_report_alert`, `access_custom_certificate_expiration_type`, `advanced_ddos_attack_l4_alert`, `advanced_ddos_attack_l7_alert`, `advanced_http_alert_error`, `bgp_hijack_notification`, `billing_usage_alert`, `block_notification_block_removed` — Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a
- `description`: string — Optional description for the Notification policy.
- `enabled`: boolean default: `true` — Whether or not the Notification policy is enabled.
- `filters`: object — Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available 
  - `actions`: string[] — Usage depends on specific alert type
    [array]
  - `affected_asns`: string[] — Used for configuring radar_notification
    [array]
  - `affected_components`: string[] — Used for configuring incident_alert
    [array]
  - `affected_locations`: string[] — Used for configuring radar_notification
    [array]
  - `airport_code`: string[] — Used for configuring maintenance_event_notification
    [array]
  - `alert_trigger_preferences`: string[] — Usage depends on specific alert type
    [array]
  - `alert_trigger_preferences_value`: string[] — Usage depends on specific alert type
    [array]
  - `enabled`: string[] — Used for configuring load_balancing_pool_enablement_alert
    [array]
  - `environment`: string[] — Used for configuring pages_event_alert
    [array]
  - `event`: string[] — Used for configuring pages_event_alert
    [array]
  - `event_source`: string[] — Used for configuring load_balancing_health_alert
    [array]
  - `event_type`: string[] — Usage depends on specific alert type
    [array]
  - `group_by`: string[] — Usage depends on specific alert type
    [array]
  - `health_check_id`: string[] — Used for configuring health_check_status_notification
    [array]
  - `incident_impact`: string[] — Used for configuring incident_alert
    [array]
  - `input_id`: string[] — Used for configuring stream_live_notifications
    [array]
  - `insight_class`: string[] — Used for configuring security_insights_alert
    [array]
  - `limit`: string[] — Used for configuring billing_usage_alert
    [array]
  - `logo_tag`: string[] — Used for configuring logo_match_alert
    [array]
  - `megabits_per_second`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `new_health`: string[] — Used for configuring load_balancing_health_alert
    [array]
  - `new_status`: string[] — Used for configuring tunnel_health_event
    [array]
  - `packets_per_second`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `pool_id`: string[] — Usage depends on specific alert type
    [array]
  - `pop_names`: string[] — Usage depends on specific alert type
    [array]
  - `product`: string[] — Used for configuring billing_usage_alert
    [array]
  - `project_id`: string[] — Used for configuring pages_event_alert
    [array]
  - `protocol`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `query_tag`: string[] — Usage depends on specific alert type
    [array]
  - `requests_per_second`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `selectors`: string[] — Usage depends on specific alert type
    [array]
  - `services`: string[] — Used for configuring clickhouse_alert_fw_ent_anomaly
    [array]
  - `slo`: string[] — Usage depends on specific alert type
    [array]
  - `status`: string[] — Used for configuring health_check_status_notification
    [array]
  - `target_hostname`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `target_ip`: string[] — Used for configuring advanced_ddos_attack_l4_alert
    [array]
  - `target_zone_name`: string[] — Used for configuring advanced_ddos_attack_l7_alert
    [array]
  - `token_id`: string[] — Access service token IDs to include for expiring_service_token_alert. Omit this property to include all current and future service tokens.
    [array]
  - `traffic_exclusions`: string[] — Used for configuring traffic_anomalies_alert
    [array]
  - `tunnel_id`: string[] — Used for configuring tunnel_health_event
    [array]
  - `tunnel_name`: string[] — Usage depends on specific alert type
    [array]
  - `type`: string[] — Usage depends on specific alert type
    [array]
  - `where`: string[] — Usage depends on specific alert type
    [array]
  - `zones`: string[] — Usage depends on specific alert type
    [array]
- `mechanisms`: object — List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.
  - `email`: object[]
    [array of]
    - `id`: string — The email address
  - `pagerduty`: object[]
    [array of]
    - `id`: string — UUID
  - `webhooks`: object[]
    [array of]
    - `id`: string — UUID
- `name`: string — Name of the policy.

**Response** 200 → `result`

- `id`: string — UUID

## GET /accounts/{account_id}/alerting/v3/policies/{policy_id}/email/unsubscribe

Show email unsubscribe details

operationId: `notification-policies-show-email-unsubscribe-details` · query: `email`, `token`

**Response** 200 → `result`

- `account_id`: string — The account id
- `email`: string
- `id`: string — The unique identifier of a notification policy
- `name`: string — Name of the policy.
- `token`: string

## POST /accounts/{account_id}/alerting/v3/policies/{policy_id}/email/unsubscribe

Unsubscribe email from a Notification policy

operationId: `notification-policies-unsubscribe-email-from-notification-policy` · query: `email`, `token`

**Response** 200 → `result`

- `account_id`: string — The account id
- `email`: string
- `id`: string — The unique identifier of a notification policy

## POST /accounts/{account_id}/alerting/v3/policies/{policy_id}/test

Test a Notification policy

operationId: `notification-policies-test-a-notification-policy`

**Request** (application/json)

- `severity`: integer enum: `0`, `1`, `2`, `3`, `4` — Severity level for the test alert. Defaults to INFO (1) if omitted.
- `source`: string — Source identifier for the test alert.
- `state_correlation_id`: string — Correlation ID for stateful test alerts. Required when state_event is set.
- `state_event`: integer enum: `0`, `1`, `2` — State event type for stateful test alerts. Use with state_correlation_id.

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer
  - `message`: string **required**
- `messages`: object[] **required**
  [array of]
  - `code`: integer
  - `message`: string **required**
- `success`: boolean **required** enum: `true` — Whether the API call was successful
