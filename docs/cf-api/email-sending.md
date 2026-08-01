# Email Sending

4 endpoints.

## GET /accounts/{account_id}/email/sending/limits

Get sending limits

operationId: `email-sending-get-sending-limits`

## GET /accounts/{account_id}/email/sending/messages/{message_id}

Fetch an email message

operationId: `email-sending-get-email-message`

## POST /accounts/{account_id}/email/sending/send

Send an email

operationId: `email-sending-account-send-builder`

## POST /accounts/{account_id}/email/sending/send_raw

Send a raw MIME email

operationId: `email-sending-account-send-raw-message`
