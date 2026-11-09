# security.txt

3 endpoints.

## DELETE /zones/{zone_id}/security-center/securitytxt

Deletes security.txt

operationId: `delete-security-txt`

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.

## GET /zones/{zone_id}/security-center/securitytxt

Retrieves security.txt

operationId: `get-security-txt`

**Response** 200 → `result`

- `acknowledgments`: string[]
  [array]
- `canonical`: string[]
  [array]
- `contact`: string[]
  [array]
- `enabled`: boolean
- `encryption`: string[]
  [array]
- `expires`: string
- `hiring`: string[]
  [array]
- `policy`: string[]
  [array]
- `preferred_languages`: string

## PUT /zones/{zone_id}/security-center/securitytxt

Updates security.txt

operationId: `update-security-txt`

**Request** (application/json)

- `acknowledgments`: string[]
  [array]
- `canonical`: string[]
  [array]
- `contact`: string[]
  [array]
- `enabled`: boolean
- `encryption`: string[]
  [array]
- `expires`: string
- `hiring`: string[]
  [array]
- `policy`: string[]
  [array]
- `preferred_languages`: string

**Response** 200 → `result`

- `errors`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `messages`: object[] **required**
  [array of]
  - `code`: integer **required**
  - `documentation_url`: string
  - `message`: string **required**
  - `source`: object
    - `pointer`: string
- `success`: boolean **required** enum: `true` — Whether the API call was successful.
