# Radar Email Security

24 endpoints.

## GET /radar/email/security/summary/{dimension}

Get email security summary by dimension

operationId: `radar-get-email-security-summary` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `limitPerGroup`, `format`

## GET /radar/email/security/summary/arc

Get email ARC validation summary

operationId: `radar-get-email-security-summary-by-arc` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/summary/dkim

Get email DKIM validation summary

operationId: `radar-get-email-security-summary-by-dkim` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/summary/dmarc

Get email DMARC validation summary

operationId: `radar-get-email-security-summary-by-dmarc` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/summary/malicious

Get email malicious classification summary

operationId: `radar-get-email-security-summary-by-malicious` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/summary/spam

Get email spam classification summary

operationId: `radar-get-email-security-summary-by-spam` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/summary/spf

Get email SPF validation summary

operationId: `radar-get-email-security-summary-by-spf` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `tlsVersion`, `format`

## GET /radar/email/security/summary/spoof

Get email spoof classification summary

operationId: `radar-get-email-security-summary-by-spoof` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/summary/threat_category

Get email threat category summary

operationId: `radar-get-email-security-summary-by-threat-category` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/summary/tls_version

Get email TLS version summary

operationId: `radar-get-email-security-summary-by-tls-version` · query: `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `format`

## GET /radar/email/security/timeseries_groups/{dimension}

Get email security time series grouped by dimension

operationId: `radar-get-email-security-timeseries-group` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `limitPerGroup`, `format`

## GET /radar/email/security/timeseries_groups/arc

Get email ARC validation time series

operationId: `radar-get-email-security-timeseries-group-by-arc` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/timeseries_groups/dkim

Get email DKIM validation time series

operationId: `radar-get-email-security-timeseries-group-by-dkim` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/timeseries_groups/dmarc

Get email DMARC validation time series

operationId: `radar-get-email-security-timeseries-group-by-dmarc` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/timeseries_groups/malicious

Get email malicious classification time series

operationId: `radar-get-email-security-timeseries-group-by-malicious` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/timeseries_groups/spam

Get email spam classification time series

operationId: `radar-get-email-security-timeseries-group-by-spam` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/timeseries_groups/spf

Get email SPF validation time series

operationId: `radar-get-email-security-timeseries-group-by-spf` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `tlsVersion`, `format`

## GET /radar/email/security/timeseries_groups/spoof

Get email spoof classification time series

operationId: `radar-get-email-security-timeseries-group-by-spoof` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/timeseries_groups/threat_category

Get email threat category time series

operationId: `radar-get-email-security-timeseries-group-by-threat-category` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `format`

## GET /radar/email/security/timeseries_groups/tls_version

Get email TLS version time series

operationId: `radar-get-email-security-timeseries-group-by-tls-version` · query: `aggInterval`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `format`

## GET /radar/email/security/top/tlds

Get top TLDs by email message volume

operationId: `radar-get-email-security-top-tlds-by-messages` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `tldCategory`, `format`

## GET /radar/email/security/top/tlds/malicious/{malicious}

Get top TLDs by email malicious classification

operationId: `radar-get-email-security-top-tlds-by-malicious` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `tldCategory`, `format`

## GET /radar/email/security/top/tlds/spam/{spam}

Get top TLDs by email spam classification

operationId: `radar-get-email-security-top-tlds-by-spam` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `tldCategory`, `format`

## GET /radar/email/security/top/tlds/spoof/{spoof}

Get top TLDs by email spoof classification

operationId: `radar-get-email-security-top-tlds-by-spoof` · query: `limit`, `name`, `dateRange`, `dateStart`, `dateEnd`, `arc`, `dkim`, `dmarc`, `spf`, `tlsVersion`, `tldCategory`, `format`
