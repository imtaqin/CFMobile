# TagCategory

8 endpoints.

## DELETE /accounts/{account_id}/cloudforce-one/events/tag-categories/{category_uuid}

Delete a tag category

operationId: `delete_TagCategoryDelete`

**Response** 200 → `result`

- `uuid`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/tag-categories/{category_uuid}

Get a tag category

operationId: `get_TagCategoryDetail`

**Response** 200 → `result`

- `createdAt`: string
- `description`: string
- `name`: string **required**
- `schema`: object[] — Parsed FieldDefinition[] defining custom fields for this category, or null if none.
  [array of]
  - `allowedValues`: string[]
    [array]
  - `annotations`: object
    - `confidence`: boolean
    - `tlp`: boolean
  - `deprecated`: boolean — Marks a field as unavailable for new values while retaining its definition for historical values.
  - `deprecatedValues`: string[] — Enum values unavailable for new writes but retained in allowedValues for historical display.
    [array]
  - `element`: object — Nested FieldDefinition describing the element type of an array field. Required when kind is 'array'. See FieldDefinition (recursive).
  - `enforcement`: string enum: `error`, `warn`, `off`
  - `format`: string enum: `date`, `url`, `duration`, `country`
  - `key`: string **required**
  - `kind`: string **required** enum: `string`, `number`, `enum`, `date`, `array`, `object`
  - `label`: string
  - `maxLength`: integer
  - `numberConstraint`: object
    - `integer`: boolean
    - `max`: number
    - `min`: number
  - `properties`: object — Map of property key to FieldDefinition for object fields. Required when kind is 'object'. See FieldDefinition (recursive).
  - `required`: boolean
- `updatedAt`: string
- `uuid`: string **required**

## PATCH /accounts/{account_id}/cloudforce-one/events/tag-categories/{category_uuid}

Update a tag category

operationId: `patch_TagCategoryUpdate`

**Request** (application/json)

- `description`: string
- `name`: string
- `schema`: object[] — Optional array of FieldDefinition objects. When provided, replaces the existing field schema. When omitted, the existing schema is preserved
  [array of]
  - `allowedValues`: string[]
    [array]
  - `annotations`: object
    - `confidence`: boolean
    - `tlp`: boolean
  - `deprecated`: boolean — Marks a field as unavailable for new values while retaining its definition for historical values.
  - `deprecatedValues`: string[] — Enum values unavailable for new writes but retained in allowedValues for historical display.
    [array]
  - `element`: object — Nested FieldDefinition describing the element type of an array field. Required when kind is 'array'. See FieldDefinition (recursive).
  - `enforcement`: string enum: `error`, `warn`, `off`
  - `format`: string enum: `date`, `url`, `duration`, `country`
  - `key`: string **required**
  - `kind`: string **required** enum: `string`, `number`, `enum`, `date`, `array`, `object`
  - `label`: string
  - `maxLength`: integer
  - `numberConstraint`: object
    - `integer`: boolean
    - `max`: number
    - `min`: number
  - `properties`: object — Map of property key to FieldDefinition for object fields. Required when kind is 'object'. See FieldDefinition (recursive).
  - `required`: boolean

**Response** 200 → `result`

- `createdAt`: string
- `description`: string
- `name`: string **required**
- `schema`: object[] — Parsed FieldDefinition[] defining custom fields for this category, or null if none.
  [array of]
  - `allowedValues`: string[]
    [array]
  - `annotations`: object
    - `confidence`: boolean
    - `tlp`: boolean
  - `deprecated`: boolean — Marks a field as unavailable for new values while retaining its definition for historical values.
  - `deprecatedValues`: string[] — Enum values unavailable for new writes but retained in allowedValues for historical display.
    [array]
  - `element`: object — Nested FieldDefinition describing the element type of an array field. Required when kind is 'array'. See FieldDefinition (recursive).
  - `enforcement`: string enum: `error`, `warn`, `off`
  - `format`: string enum: `date`, `url`, `duration`, `country`
  - `key`: string **required**
  - `kind`: string **required** enum: `string`, `number`, `enum`, `date`, `array`, `object`
  - `label`: string
  - `maxLength`: integer
  - `numberConstraint`: object
    - `integer`: boolean
    - `max`: number
    - `min`: number
  - `properties`: object — Map of property key to FieldDefinition for object fields. Required when kind is 'object'. See FieldDefinition (recursive).
  - `required`: boolean
- `updatedAt`: string
- `uuid`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/tags/categories

List tag categories

operationId: `get_TagCategoryList` · query: `search`

**Response** 200 → `result`

- `categories`: object[] **required**
  [array of]
  - `createdAt`: string
  - `description`: string
  - `name`: string **required**
  - `schema`: object[] — Parsed FieldDefinition[] defining custom fields for this category, or null if none.
    [array of]
    - `allowedValues`: string[]
    - `annotations`: object
    - `deprecated`: boolean — Marks a field as unavailable for new values while retaining its definition for historical values.
    - `deprecatedValues`: string[] — Enum values unavailable for new writes but retained in allowedValues for historical display.
    - `element`: object — Nested FieldDefinition describing the element type of an array field. Required when kind is 'array'. See FieldDefinition (recursive).
    - `enforcement`: string enum: `error`, `warn`, `off`
    - `format`: string enum: `date`, `url`, `duration`, `country`
    - `key`: string **required**
    - `kind`: string **required** enum: `string`, `number`, `enum`, `date`, `array`, `object`
    - `label`: string
    - `maxLength`: integer
    - `numberConstraint`: object
    - `properties`: object — Map of property key to FieldDefinition for object fields. Required when kind is 'object'. See FieldDefinition (recursive).
    - `required`: boolean
  - `updatedAt`: string
  - `uuid`: string **required**

## DELETE /accounts/{account_id}/cloudforce-one/events/tags/categories/{category_uuid}

Delete a tag category (legacy)

operationId: `delete_LegacyTagCategoryDelete`

**Response** 200 → `result`

- `uuid`: string **required**

## GET /accounts/{account_id}/cloudforce-one/events/tags/categories/{category_uuid}

Get a tag category (legacy)

operationId: `get_LegacyTagCategoryDetail`

**Response** 200 → `result`

- `createdAt`: string
- `description`: string
- `name`: string **required**
- `schema`: object[] — Parsed FieldDefinition[] defining custom fields for this category, or null if none.
  [array of]
  - `allowedValues`: string[]
    [array]
  - `annotations`: object
    - `confidence`: boolean
    - `tlp`: boolean
  - `deprecated`: boolean — Marks a field as unavailable for new values while retaining its definition for historical values.
  - `deprecatedValues`: string[] — Enum values unavailable for new writes but retained in allowedValues for historical display.
    [array]
  - `element`: object — Nested FieldDefinition describing the element type of an array field. Required when kind is 'array'. See FieldDefinition (recursive).
  - `enforcement`: string enum: `error`, `warn`, `off`
  - `format`: string enum: `date`, `url`, `duration`, `country`
  - `key`: string **required**
  - `kind`: string **required** enum: `string`, `number`, `enum`, `date`, `array`, `object`
  - `label`: string
  - `maxLength`: integer
  - `numberConstraint`: object
    - `integer`: boolean
    - `max`: number
    - `min`: number
  - `properties`: object — Map of property key to FieldDefinition for object fields. Required when kind is 'object'. See FieldDefinition (recursive).
  - `required`: boolean
- `updatedAt`: string
- `uuid`: string **required**

## PATCH /accounts/{account_id}/cloudforce-one/events/tags/categories/{category_uuid}

Update a tag category (legacy)

operationId: `patch_LegacyTagCategoryUpdate`

**Request** (application/json)

- `description`: string
- `name`: string
- `schema`: object[] — Optional array of FieldDefinition objects. When provided, replaces the existing field schema. When omitted, the existing schema is preserved
  [array of]
  - `allowedValues`: string[]
    [array]
  - `annotations`: object
    - `confidence`: boolean
    - `tlp`: boolean
  - `deprecated`: boolean — Marks a field as unavailable for new values while retaining its definition for historical values.
  - `deprecatedValues`: string[] — Enum values unavailable for new writes but retained in allowedValues for historical display.
    [array]
  - `element`: object — Nested FieldDefinition describing the element type of an array field. Required when kind is 'array'. See FieldDefinition (recursive).
  - `enforcement`: string enum: `error`, `warn`, `off`
  - `format`: string enum: `date`, `url`, `duration`, `country`
  - `key`: string **required**
  - `kind`: string **required** enum: `string`, `number`, `enum`, `date`, `array`, `object`
  - `label`: string
  - `maxLength`: integer
  - `numberConstraint`: object
    - `integer`: boolean
    - `max`: number
    - `min`: number
  - `properties`: object — Map of property key to FieldDefinition for object fields. Required when kind is 'object'. See FieldDefinition (recursive).
  - `required`: boolean

**Response** 200 → `result`

- `createdAt`: string
- `description`: string
- `name`: string **required**
- `schema`: object[] — Parsed FieldDefinition[] defining custom fields for this category, or null if none.
  [array of]
  - `allowedValues`: string[]
    [array]
  - `annotations`: object
    - `confidence`: boolean
    - `tlp`: boolean
  - `deprecated`: boolean — Marks a field as unavailable for new values while retaining its definition for historical values.
  - `deprecatedValues`: string[] — Enum values unavailable for new writes but retained in allowedValues for historical display.
    [array]
  - `element`: object — Nested FieldDefinition describing the element type of an array field. Required when kind is 'array'. See FieldDefinition (recursive).
  - `enforcement`: string enum: `error`, `warn`, `off`
  - `format`: string enum: `date`, `url`, `duration`, `country`
  - `key`: string **required**
  - `kind`: string **required** enum: `string`, `number`, `enum`, `date`, `array`, `object`
  - `label`: string
  - `maxLength`: integer
  - `numberConstraint`: object
    - `integer`: boolean
    - `max`: number
    - `min`: number
  - `properties`: object — Map of property key to FieldDefinition for object fields. Required when kind is 'object'. See FieldDefinition (recursive).
  - `required`: boolean
- `updatedAt`: string
- `uuid`: string **required**

## POST /accounts/{account_id}/cloudforce-one/events/tags/categories/create

Create a tag category

operationId: `post_TagCategoryCreate`

**Request** (application/json)

- `description`: string
- `name`: string **required**
- `schema`: object[] — Optional array of FieldDefinition objects defining custom fields for tags in this category. Persisted as JSON; returned as a parsed array.
  [array of]
  - `allowedValues`: string[]
    [array]
  - `annotations`: object
    - `confidence`: boolean
    - `tlp`: boolean
  - `deprecated`: boolean — Marks a field as unavailable for new values while retaining its definition for historical values.
  - `deprecatedValues`: string[] — Enum values unavailable for new writes but retained in allowedValues for historical display.
    [array]
  - `element`: object — Nested FieldDefinition describing the element type of an array field. Required when kind is 'array'. See FieldDefinition (recursive).
  - `enforcement`: string enum: `error`, `warn`, `off`
  - `format`: string enum: `date`, `url`, `duration`, `country`
  - `key`: string **required**
  - `kind`: string **required** enum: `string`, `number`, `enum`, `date`, `array`, `object`
  - `label`: string
  - `maxLength`: integer
  - `numberConstraint`: object
    - `integer`: boolean
    - `max`: number
    - `min`: number
  - `properties`: object — Map of property key to FieldDefinition for object fields. Required when kind is 'object'. See FieldDefinition (recursive).
  - `required`: boolean

**Response** 200 → `result`

- `createdAt`: string
- `description`: string
- `name`: string **required**
- `schema`: object[] — Parsed FieldDefinition[] defining custom fields for this category, or null if none.
  [array of]
  - `allowedValues`: string[]
    [array]
  - `annotations`: object
    - `confidence`: boolean
    - `tlp`: boolean
  - `deprecated`: boolean — Marks a field as unavailable for new values while retaining its definition for historical values.
  - `deprecatedValues`: string[] — Enum values unavailable for new writes but retained in allowedValues for historical display.
    [array]
  - `element`: object — Nested FieldDefinition describing the element type of an array field. Required when kind is 'array'. See FieldDefinition (recursive).
  - `enforcement`: string enum: `error`, `warn`, `off`
  - `format`: string enum: `date`, `url`, `duration`, `country`
  - `key`: string **required**
  - `kind`: string **required** enum: `string`, `number`, `enum`, `date`, `array`, `object`
  - `label`: string
  - `maxLength`: integer
  - `numberConstraint`: object
    - `integer`: boolean
    - `max`: number
    - `min`: number
  - `properties`: object — Map of property key to FieldDefinition for object fields. Required when kind is 'object'. See FieldDefinition (recursive).
  - `required`: boolean
- `updatedAt`: string
- `uuid`: string **required**
