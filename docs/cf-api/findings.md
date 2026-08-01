# findings

10 endpoints.

## GET /accounts/{account_id}/data-security/posture/findings

List posture findings

operationId: `ListFindings` · query: `cursor`

## GET /accounts/{account_id}/data-security/posture/findings/{finding_id}

Get a finding type

operationId: `GetFinding`

## GET /accounts/{account_id}/data-security/posture/findings/{finding_id}/instances

List instances of a finding

operationId: `ListFindingInstances` · query: `cursor`

## GET /accounts/{account_id}/data-security/posture/findings/{finding_id}/instances/{instance_id}

Get a finding instance using an instance ID

operationId: `GetFindingInstance`

## POST /accounts/{account_id}/data-security/posture/findings/{finding_id}/instances/archive

Archive a finding

operationId: `ArchiveFindingInstance`

## POST /accounts/{account_id}/data-security/posture/findings/{finding_id}/instances/unarchive

Remove the archive marking from a finding instance

operationId: `UnarchiveFindingInstance`

## POST /accounts/{account_id}/data-security/posture/findings/{finding_id}/reset_finding_severity

Reset severity for a finding back to the default

operationId: `ResetFindingSeverity`

## POST /accounts/{account_id}/data-security/posture/findings/{finding_id}/tune_finding_severity

Update the severity for a finding

operationId: `ChangeFindingSeverity`

## POST /accounts/{account_id}/data-security/posture/findings/ignore

Mark a finding as ignored

operationId: `IgnoreFinding`

## POST /accounts/{account_id}/data-security/posture/findings/unignore

Remove ignore marker from a finding

operationId: `UnIgnoreFinding`
