# Magic Account Apps

5 endpoints.

## GET /accounts/{account_id}/magic/apps

List Apps

operationId: `magic-account-apps-list-apps`

**Response** 200 → `result`

[array of]
object

## POST /accounts/{account_id}/magic/apps

Create a new App

operationId: `magic-account-apps-add-app`

**Request** (application/json)

(one of 3 variants; showing the first)
object

**Response** 201 → `result`

object

## DELETE /accounts/{account_id}/magic/apps/{account_app_id}

Delete Account App

operationId: `magic-account-apps-delete-app`

**Response** 200 → `result`

object

## PATCH /accounts/{account_id}/magic/apps/{account_app_id}

Update an App

operationId: `magic-account-apps-patch-app`

**Request** (application/json)

(one of 5 variants; showing the first)
object

**Response** 200 → `result`

object

## PUT /accounts/{account_id}/magic/apps/{account_app_id}

Update an App

operationId: `magic-account-apps-update-app`

**Request** (application/json)

(one of 5 variants; showing the first)
object

**Response** 200 → `result`

object
