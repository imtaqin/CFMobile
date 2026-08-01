# Radar Certificate Transparency

7 endpoints.

## GET /radar/ct/authorities

List certificate authorities

operationId: `radar-get-certificate-authorities` · query: `limit`, `offset`, `format`

## GET /radar/ct/authorities/{ca_slug}

Get certificate authority details

operationId: `radar-get-certificate-authority-details` · query: `format`

## GET /radar/ct/logs

List certificate logs

operationId: `radar-get-certificate-logs` · query: `limit`, `offset`, `format`

## GET /radar/ct/logs/{log_slug}

Get certificate log details

operationId: `radar-get-certificate-log-details` · query: `format`

## GET /radar/ct/summary/{dimension}

Get certificate distribution by dimension

operationId: `radar-get-ct-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `limitPerGroup`, `ca`, `caOwner`, `duration`, `entryType`, `expirationStatus`, `hasIps`, `hasWildcards`, `log`, `logApi`, `logOperator`, `publicKeyAlgorithm`, `signatureAlgorithm`, `tld`, `validationLevel`, `uniqueEntries`, `normalization`, `format`

## GET /radar/ct/timeseries

Get certificates time series

operationId: `radar-get-ct-timeseries` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `ca`, `caOwner`, `duration`, `entryType`, `expirationStatus`, `hasIps`, `hasWildcards`, `log`, `logApi`, `logOperator`, `publicKeyAlgorithm`, `signatureAlgorithm`, `tld`, `validationLevel`, `uniqueEntries`, `format`

## GET /radar/ct/timeseries_groups/{dimension}

Get time series of certificate distribution by dimension

operationId: `radar-get-ct-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `limitPerGroup`, `ca`, `caOwner`, `duration`, `entryType`, `expirationStatus`, `hasIps`, `hasWildcards`, `log`, `logApi`, `logOperator`, `publicKeyAlgorithm`, `signatureAlgorithm`, `validationLevel`, `tld`, `normalization`, `uniqueEntries`, `format`
