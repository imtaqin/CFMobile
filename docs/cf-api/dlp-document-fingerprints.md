# DLP Document Fingerprints

6 endpoints.

## GET /accounts/{account_id}/dlp/document_fingerprints

Retrieve data about all document fingerprints.

operationId: `dlp-document-fingerprints-read-all`

## POST /accounts/{account_id}/dlp/document_fingerprints

Creates a new document fingerprint.

operationId: `dlp-document-fingerprints-create`

## DELETE /accounts/{account_id}/dlp/document_fingerprints/{document_fingerprint_id}

Delete a single document fingerprint.

operationId: `dlp-document-fingerprints-delete`

## GET /accounts/{account_id}/dlp/document_fingerprints/{document_fingerprint_id}

Retrieve data about a specific document fingerprint.

operationId: `dlp-document-fingerprints-read`

## POST /accounts/{account_id}/dlp/document_fingerprints/{document_fingerprint_id}

Update the attributes of a single document fingerprint.

operationId: `dlp-document-fingerprints-update`

## PUT /accounts/{account_id}/dlp/document_fingerprints/{document_fingerprint_id}

Uploads a new version for a document fingerprint.

operationId: `dlp-document-fingerprints-upload`
