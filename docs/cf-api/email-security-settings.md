# Email Security Settings

44 endpoints.

## GET /accounts/{account_id}/email-security/settings/allow_policies

List email allow policies

operationId: `email_security_list_allow_policies` · query: `order`, `is_exempt_recipient`, `is_trusted_sender`, `is_acceptable_sender`, `verify_sender`, `pattern_type`, `pattern`

## POST /accounts/{account_id}/email-security/settings/allow_policies

Create email allow policy

operationId: `email_security_create_allow_policy`

## DELETE /accounts/{account_id}/email-security/settings/allow_policies/{policy_id}

Delete an email allow policy

operationId: `email_security_delete_allow_policy`

## GET /accounts/{account_id}/email-security/settings/allow_policies/{policy_id}

Get an email allow policy

operationId: `email_security_get_allow_policy`

## PATCH /accounts/{account_id}/email-security/settings/allow_policies/{policy_id}

Update an email allow policy

operationId: `email_security_update_allow_policy`

## POST /accounts/{account_id}/email-security/settings/allow_policies/batch

Batch allow policies operations

operationId: `email_security_batch_allow_policies`

## GET /accounts/{account_id}/email-security/settings/block_senders

List blocked email senders

operationId: `email_security_list_blocked_senders` · query: `order`, `pattern_type`, `pattern`

## POST /accounts/{account_id}/email-security/settings/block_senders

Create blocked email sender

operationId: `email_security_create_blocked_sender`

## DELETE /accounts/{account_id}/email-security/settings/block_senders/{pattern_id}

Delete a blocked email sender

operationId: `email_security_delete_blocked_sender`

## GET /accounts/{account_id}/email-security/settings/block_senders/{pattern_id}

Get a blocked email sender

operationId: `email_security_get_blocked_sender`

## PATCH /accounts/{account_id}/email-security/settings/block_senders/{pattern_id}

Update a blocked email sender

operationId: `email_security_update_blocked_sender`

## POST /accounts/{account_id}/email-security/settings/block_senders/batch

Batch blocked senders operations

operationId: `email_security_batch_blocked_senders`

## DELETE /accounts/{account_id}/email-security/settings/domains

Unprotect multiple email domains

operationId: `email_security_delete_domains`

## GET /accounts/{account_id}/email-security/settings/domains

List protected email domains

operationId: `email_security_list_domains` · query: `order`, `allowed_delivery_mode`, `domain`, `active_delivery_mode`, `integration_id`, `status`

## POST /accounts/{account_id}/email-security/settings/domains

Add a new email domain

operationId: `email_security_create_domains`

## DELETE /accounts/{account_id}/email-security/settings/domains/{domain_id}

Unprotect an email domain

operationId: `email_security_delete_domain`

## GET /accounts/{account_id}/email-security/settings/domains/{domain_id}

Get an email domain

operationId: `email_security_get_domain`

## PATCH /accounts/{account_id}/email-security/settings/domains/{domain_id}

Update an email domain

operationId: `email_security_update_domain`

## PUT /accounts/{account_id}/email-security/settings/domains/{domain_id}

Replace an email domain

operationId: `email_security_replace_domain`

## GET /accounts/{account_id}/email-security/settings/domains/{domain_id}/verification

Get domain verification details

operationId: `email_security_get_domain_verification`

## POST /accounts/{account_id}/email-security/settings/domains/batch

Batch domain operations

operationId: `email_security_batch_domains`

## GET /accounts/{account_id}/email-security/settings/impersonation_registry

List entries in impersonation registry

operationId: `email_security_list_impersonation_registry` · query: `order`, `provenance`

## POST /accounts/{account_id}/email-security/settings/impersonation_registry

Create impersonation registry entry

operationId: `email_security_create_impersonation_registry`

## DELETE /accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}

Delete an impersonation registry entry

operationId: `email_security_delete_impersonation_registry`

## GET /accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}

Get an impersonation registry entry

operationId: `email_security_get_impersonation_registry`

## PATCH /accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}

Update an impersonation registry entry

operationId: `email_security_update_impersonation_registry`

## GET /accounts/{account_id}/email-security/settings/sending_domain_restrictions

List sending domain restrictions

operationId: `email_security_list_sending_domain_restrictions` · query: `order`

## POST /accounts/{account_id}/email-security/settings/sending_domain_restrictions

Create a sending domain restriction

operationId: `email_security_create_sending_domain_restriction`

## DELETE /accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}

Delete a sending domain restriction

operationId: `email_security_delete_sending_domain_restriction`

## GET /accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}

Get a sending domain restriction

operationId: `email_security_get_sending_domain_restriction`

## PATCH /accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}

Update a sending domain restriction

operationId: `email_security_update_sending_domain_restriction`

## POST /accounts/{account_id}/email-security/settings/sending_domain_restrictions/batch

Batch sending domain restrictions operations

operationId: `email_security_batch_sending_domain_restrictions`

## GET /accounts/{account_id}/email-security/settings/trusted_domains

List trusted email domains

operationId: `email_security_list_trusted_domains` · query: `order`, `is_recent`, `is_similarity`, `pattern`

## POST /accounts/{account_id}/email-security/settings/trusted_domains

Create trusted email domain

operationId: `email_security_create_trusted_domain`

## DELETE /accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}

Delete a trusted email domain

operationId: `email_security_delete_trusted_domain`

## GET /accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}

Get a trusted email domain

operationId: `email_security_get_trusted_domain`

## PATCH /accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}

Update a trusted email domain

operationId: `email_security_update_trusted_domain`

## POST /accounts/{account_id}/email-security/settings/trusted_domains/batch

Batch trusted domains operations

operationId: `email_security_batch_trusted_domains`

## GET /accounts/{account_id}/email-security/settings/url_ignore_patterns

List URL ignore patterns

operationId: `email_security_list_url_ignore_patterns`

## POST /accounts/{account_id}/email-security/settings/url_ignore_patterns

Create a URL ignore pattern

operationId: `email_security_create_url_ignore_pattern`

## DELETE /accounts/{account_id}/email-security/settings/url_ignore_patterns/{pattern_id}

Delete a URL ignore pattern

operationId: `email_security_delete_url_ignore_pattern`

## GET /accounts/{account_id}/email-security/settings/url_ignore_patterns/{pattern_id}

Get a URL ignore pattern

operationId: `email_security_get_url_ignore_pattern`

## PATCH /accounts/{account_id}/email-security/settings/url_ignore_patterns/{pattern_id}

Update a URL ignore pattern

operationId: `email_security_update_url_ignore_pattern`

## POST /accounts/{account_id}/email-security/settings/url_ignore_patterns/batch

Batch URL ignore patterns

operationId: `email_security_batch_url_ignore_patterns`
