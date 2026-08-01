# finding_types

3 endpoints.

## GET /accounts/{account_id}/data-security/posture/finding_types

List all finding types

operationId: `ListFindingTypes`

## GET /accounts/{account_id}/data-security/posture/finding_types/{finding_type_id}

Get finding by ID

operationId: `GetFindingType`

## GET /accounts/{account_id}/data-security/posture/finding_types/{finding_type_id}/remediation_types

List remediation types for a finding type

operationId: `GetRemediationTypesForFindingType` · query: `cursor`
