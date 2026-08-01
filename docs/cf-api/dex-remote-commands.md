# DEX Remote Commands

5 endpoints.

## GET /accounts/{account_id}/dex/commands

List account commands

operationId: `get-commands` · query: `page`, `per_page`, `from`, `to`, `device_id`, `user_email`, `command_type`, `status`

## POST /accounts/{account_id}/dex/commands

Create account commands

operationId: `post-commands`

## GET /accounts/{account_id}/dex/commands/{command_id}/downloads/{filename}

Download command output file

operationId: `get-commands-command-id-downloads-filename`

## GET /accounts/{account_id}/dex/commands/devices

List devices eligible for remote captures

operationId: `get-commands-eligible-devices` · query: `page`, `per_page`, `search`

## GET /accounts/{account_id}/dex/commands/quota

Returns account commands usage, quota, and reset time

operationId: `get-commands-quota`
