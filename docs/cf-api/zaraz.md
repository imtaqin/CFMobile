# Zaraz

10 endpoints.

## GET /zones/{zone_id}/settings/zaraz/config

Get Zaraz configuration

operationId: `get-zones-zone_identifier-zaraz-config`

**Response** 200 → `result`

- `analytics`: object — Cloudflare Monitoring settings.
  - `defaultPurpose`: string — Consent purpose assigned to Monitoring.
  - `enabled`: boolean — Whether Advanced Monitoring reports are enabled.
  - `sessionExpTime`: integer — Session expiration time (seconds).
- `consent`: object — Consent management configuration.
  - `buttonTextTranslations`: object
    - `accept_all`: object **required** — Object where keys are language codes.
    - `confirm_my_choices`: object **required** — Object where keys are language codes.
    - `reject_all`: object **required** — Object where keys are language codes.
  - `companyEmail`: string
  - `companyName`: string
  - `companyStreetAddress`: string
  - `consentModalIntroHTML`: string
  - `consentModalIntroHTMLWithTranslations`: object — Object where keys are language codes.
  - `cookieName`: string
  - `customCSS`: string
  - `customIntroDisclaimerDismissed`: boolean
  - `defaultLanguage`: string
  - `enabled`: boolean **required**
  - `hideModal`: boolean
  - `purposes`: object — Object where keys are purpose alpha-numeric IDs.
  - `purposesWithTranslations`: object — Object where keys are purpose alpha-numeric IDs.
  - `tcfCompliant`: boolean
- `dataLayer`: boolean **required** — Data layer compatibility mode enabled.
- `debugKey`: string **required** — The key for Zaraz debug mode.
- `historyChange`: boolean — Single Page Application support enabled.
- `settings`: object **required** — General Zaraz settings.
  - `autoInjectScript`: boolean **required** — Automatic injection of Zaraz scripts enabled.
  - `contextEnricher`: object — Details of the worker that receives and edits Zaraz Context object.
    - `escapedWorkerName`: string **required**
    - `workerTag`: string **required**
  - `cookieDomain`: string — The domain Zaraz will use for writing and reading its cookies.
  - `ecommerce`: boolean — Ecommerce API enabled.
  - `eventsApiPath`: string — Custom endpoint for server-side track events.
  - `hideExternalReferer`: boolean — Hiding external referrer URL enabled.
  - `hideIPAddress`: boolean — Trimming IP address enabled.
  - `hideQueryParams`: boolean — Removing URL query params enabled.
  - `hideUserAgent`: boolean — Removing sensitive data from User Agent string enabled.
  - `initPath`: string — Custom endpoint for Zaraz init script.
  - `injectIframes`: boolean — Injection of Zaraz scripts into iframes enabled.
  - `mcRootPath`: string — Custom path for Managed Components server functionalities.
  - `scriptPath`: string — Custom endpoint for Zaraz main script.
  - `trackPath`: string — Custom endpoint for Zaraz tracking requests.
- `triggers`: object **required** — Triggers set up under Zaraz configuration, where key is the trigger alpha-numeric ID and value is the trigger configuration.
- `variables`: object **required** — Variables set up under Zaraz configuration, where key is the variable alpha-numeric ID and value is the variable configuration. Values of va
- `zarazVersion`: integer **required** — Zaraz internal version of the config.
- `tools`: object — Tools set up under Zaraz configuration, where key is the alpha-numeric tool ID and value is the tool configuration object.

## PUT /zones/{zone_id}/settings/zaraz/config

Update Zaraz configuration

operationId: `put-zones-zone_identifier-zaraz-config`

**Request** (application/json)

- `analytics`: object — Cloudflare Monitoring settings.
  - `defaultPurpose`: string — Consent purpose assigned to Monitoring.
  - `enabled`: boolean — Whether Advanced Monitoring reports are enabled.
  - `sessionExpTime`: integer — Session expiration time (seconds).
- `consent`: object — Consent management configuration.
  - `buttonTextTranslations`: object
    - `accept_all`: object **required** — Object where keys are language codes.
    - `confirm_my_choices`: object **required** — Object where keys are language codes.
    - `reject_all`: object **required** — Object where keys are language codes.
  - `companyEmail`: string
  - `companyName`: string
  - `companyStreetAddress`: string
  - `consentModalIntroHTML`: string
  - `consentModalIntroHTMLWithTranslations`: object — Object where keys are language codes.
  - `cookieName`: string
  - `customCSS`: string
  - `customIntroDisclaimerDismissed`: boolean
  - `defaultLanguage`: string
  - `enabled`: boolean **required**
  - `hideModal`: boolean
  - `purposes`: object — Object where keys are purpose alpha-numeric IDs.
  - `purposesWithTranslations`: object — Object where keys are purpose alpha-numeric IDs.
  - `tcfCompliant`: boolean
- `dataLayer`: boolean **required** — Data layer compatibility mode enabled.
- `debugKey`: string **required** — The key for Zaraz debug mode.
- `historyChange`: boolean — Single Page Application support enabled.
- `settings`: object **required** — General Zaraz settings.
  - `autoInjectScript`: boolean **required** — Automatic injection of Zaraz scripts enabled.
  - `contextEnricher`: object — Details of the worker that receives and edits Zaraz Context object.
    - `escapedWorkerName`: string **required**
    - `workerTag`: string **required**
  - `cookieDomain`: string — The domain Zaraz will use for writing and reading its cookies.
  - `ecommerce`: boolean — Ecommerce API enabled.
  - `eventsApiPath`: string — Custom endpoint for server-side track events.
  - `hideExternalReferer`: boolean — Hiding external referrer URL enabled.
  - `hideIPAddress`: boolean — Trimming IP address enabled.
  - `hideQueryParams`: boolean — Removing URL query params enabled.
  - `hideUserAgent`: boolean — Removing sensitive data from User Agent string enabled.
  - `initPath`: string — Custom endpoint for Zaraz init script.
  - `injectIframes`: boolean — Injection of Zaraz scripts into iframes enabled.
  - `mcRootPath`: string — Custom path for Managed Components server functionalities.
  - `scriptPath`: string — Custom endpoint for Zaraz main script.
  - `trackPath`: string — Custom endpoint for Zaraz tracking requests.
- `triggers`: object **required** — Triggers set up under Zaraz configuration, where key is the trigger alpha-numeric ID and value is the trigger configuration.
- `variables`: object **required** — Variables set up under Zaraz configuration, where key is the variable alpha-numeric ID and value is the variable configuration. Values of va
- `zarazVersion`: integer **required** — Zaraz internal version of the config.
- `tools`: object — Tools set up under Zaraz configuration, where key is the alpha-numeric tool ID and value is the tool configuration object.

**Response** 200 → `result`

- `analytics`: object — Cloudflare Monitoring settings.
  - `defaultPurpose`: string — Consent purpose assigned to Monitoring.
  - `enabled`: boolean — Whether Advanced Monitoring reports are enabled.
  - `sessionExpTime`: integer — Session expiration time (seconds).
- `consent`: object — Consent management configuration.
  - `buttonTextTranslations`: object
    - `accept_all`: object **required** — Object where keys are language codes.
    - `confirm_my_choices`: object **required** — Object where keys are language codes.
    - `reject_all`: object **required** — Object where keys are language codes.
  - `companyEmail`: string
  - `companyName`: string
  - `companyStreetAddress`: string
  - `consentModalIntroHTML`: string
  - `consentModalIntroHTMLWithTranslations`: object — Object where keys are language codes.
  - `cookieName`: string
  - `customCSS`: string
  - `customIntroDisclaimerDismissed`: boolean
  - `defaultLanguage`: string
  - `enabled`: boolean **required**
  - `hideModal`: boolean
  - `purposes`: object — Object where keys are purpose alpha-numeric IDs.
  - `purposesWithTranslations`: object — Object where keys are purpose alpha-numeric IDs.
  - `tcfCompliant`: boolean
- `dataLayer`: boolean **required** — Data layer compatibility mode enabled.
- `debugKey`: string **required** — The key for Zaraz debug mode.
- `historyChange`: boolean — Single Page Application support enabled.
- `settings`: object **required** — General Zaraz settings.
  - `autoInjectScript`: boolean **required** — Automatic injection of Zaraz scripts enabled.
  - `contextEnricher`: object — Details of the worker that receives and edits Zaraz Context object.
    - `escapedWorkerName`: string **required**
    - `workerTag`: string **required**
  - `cookieDomain`: string — The domain Zaraz will use for writing and reading its cookies.
  - `ecommerce`: boolean — Ecommerce API enabled.
  - `eventsApiPath`: string — Custom endpoint for server-side track events.
  - `hideExternalReferer`: boolean — Hiding external referrer URL enabled.
  - `hideIPAddress`: boolean — Trimming IP address enabled.
  - `hideQueryParams`: boolean — Removing URL query params enabled.
  - `hideUserAgent`: boolean — Removing sensitive data from User Agent string enabled.
  - `initPath`: string — Custom endpoint for Zaraz init script.
  - `injectIframes`: boolean — Injection of Zaraz scripts into iframes enabled.
  - `mcRootPath`: string — Custom path for Managed Components server functionalities.
  - `scriptPath`: string — Custom endpoint for Zaraz main script.
  - `trackPath`: string — Custom endpoint for Zaraz tracking requests.
- `triggers`: object **required** — Triggers set up under Zaraz configuration, where key is the trigger alpha-numeric ID and value is the trigger configuration.
- `variables`: object **required** — Variables set up under Zaraz configuration, where key is the variable alpha-numeric ID and value is the variable configuration. Values of va
- `zarazVersion`: integer **required** — Zaraz internal version of the config.
- `tools`: object — Tools set up under Zaraz configuration, where key is the alpha-numeric tool ID and value is the tool configuration object.

## GET /zones/{zone_id}/settings/zaraz/default

Get default Zaraz configuration

operationId: `get-zones-zone_identifier-zaraz-default`

**Response** 200 → `result`

- `analytics`: object — Cloudflare Monitoring settings.
  - `defaultPurpose`: string — Consent purpose assigned to Monitoring.
  - `enabled`: boolean — Whether Advanced Monitoring reports are enabled.
  - `sessionExpTime`: integer — Session expiration time (seconds).
- `consent`: object — Consent management configuration.
  - `buttonTextTranslations`: object
    - `accept_all`: object **required** — Object where keys are language codes.
    - `confirm_my_choices`: object **required** — Object where keys are language codes.
    - `reject_all`: object **required** — Object where keys are language codes.
  - `companyEmail`: string
  - `companyName`: string
  - `companyStreetAddress`: string
  - `consentModalIntroHTML`: string
  - `consentModalIntroHTMLWithTranslations`: object — Object where keys are language codes.
  - `cookieName`: string
  - `customCSS`: string
  - `customIntroDisclaimerDismissed`: boolean
  - `defaultLanguage`: string
  - `enabled`: boolean **required**
  - `hideModal`: boolean
  - `purposes`: object — Object where keys are purpose alpha-numeric IDs.
  - `purposesWithTranslations`: object — Object where keys are purpose alpha-numeric IDs.
  - `tcfCompliant`: boolean
- `dataLayer`: boolean **required** — Data layer compatibility mode enabled.
- `debugKey`: string **required** — The key for Zaraz debug mode.
- `historyChange`: boolean — Single Page Application support enabled.
- `settings`: object **required** — General Zaraz settings.
  - `autoInjectScript`: boolean **required** — Automatic injection of Zaraz scripts enabled.
  - `contextEnricher`: object — Details of the worker that receives and edits Zaraz Context object.
    - `escapedWorkerName`: string **required**
    - `workerTag`: string **required**
  - `cookieDomain`: string — The domain Zaraz will use for writing and reading its cookies.
  - `ecommerce`: boolean — Ecommerce API enabled.
  - `eventsApiPath`: string — Custom endpoint for server-side track events.
  - `hideExternalReferer`: boolean — Hiding external referrer URL enabled.
  - `hideIPAddress`: boolean — Trimming IP address enabled.
  - `hideQueryParams`: boolean — Removing URL query params enabled.
  - `hideUserAgent`: boolean — Removing sensitive data from User Agent string enabled.
  - `initPath`: string — Custom endpoint for Zaraz init script.
  - `injectIframes`: boolean — Injection of Zaraz scripts into iframes enabled.
  - `mcRootPath`: string — Custom path for Managed Components server functionalities.
  - `scriptPath`: string — Custom endpoint for Zaraz main script.
  - `trackPath`: string — Custom endpoint for Zaraz tracking requests.
- `triggers`: object **required** — Triggers set up under Zaraz configuration, where key is the trigger alpha-numeric ID and value is the trigger configuration.
- `variables`: object **required** — Variables set up under Zaraz configuration, where key is the variable alpha-numeric ID and value is the variable configuration. Values of va
- `zarazVersion`: integer **required** — Zaraz internal version of the config.
- `tools`: object — Tools set up under Zaraz configuration, where key is the alpha-numeric tool ID and value is the tool configuration object.

## GET /zones/{zone_id}/settings/zaraz/export

Export Zaraz configuration

operationId: `get-zones-zone_identifier-zaraz-export`

**Response** 200 → `result`

- `analytics`: object — Cloudflare Monitoring settings.
  - `defaultPurpose`: string — Consent purpose assigned to Monitoring.
  - `enabled`: boolean — Whether Advanced Monitoring reports are enabled.
  - `sessionExpTime`: integer — Session expiration time (seconds).
- `consent`: object — Consent management configuration.
  - `buttonTextTranslations`: object
    - `accept_all`: object **required** — Object where keys are language codes.
    - `confirm_my_choices`: object **required** — Object where keys are language codes.
    - `reject_all`: object **required** — Object where keys are language codes.
  - `companyEmail`: string
  - `companyName`: string
  - `companyStreetAddress`: string
  - `consentModalIntroHTML`: string
  - `consentModalIntroHTMLWithTranslations`: object — Object where keys are language codes.
  - `cookieName`: string
  - `customCSS`: string
  - `customIntroDisclaimerDismissed`: boolean
  - `defaultLanguage`: string
  - `enabled`: boolean **required**
  - `hideModal`: boolean
  - `purposes`: object — Object where keys are purpose alpha-numeric IDs.
  - `purposesWithTranslations`: object — Object where keys are purpose alpha-numeric IDs.
  - `tcfCompliant`: boolean
- `dataLayer`: boolean **required** — Data layer compatibility mode enabled.
- `debugKey`: string **required** — The key for Zaraz debug mode.
- `historyChange`: boolean — Single Page Application support enabled.
- `settings`: object **required** — General Zaraz settings.
  - `autoInjectScript`: boolean **required** — Automatic injection of Zaraz scripts enabled.
  - `contextEnricher`: object — Details of the worker that receives and edits Zaraz Context object.
    - `escapedWorkerName`: string **required**
    - `workerTag`: string **required**
  - `cookieDomain`: string — The domain Zaraz will use for writing and reading its cookies.
  - `ecommerce`: boolean — Ecommerce API enabled.
  - `eventsApiPath`: string — Custom endpoint for server-side track events.
  - `hideExternalReferer`: boolean — Hiding external referrer URL enabled.
  - `hideIPAddress`: boolean — Trimming IP address enabled.
  - `hideQueryParams`: boolean — Removing URL query params enabled.
  - `hideUserAgent`: boolean — Removing sensitive data from User Agent string enabled.
  - `initPath`: string — Custom endpoint for Zaraz init script.
  - `injectIframes`: boolean — Injection of Zaraz scripts into iframes enabled.
  - `mcRootPath`: string — Custom path for Managed Components server functionalities.
  - `scriptPath`: string — Custom endpoint for Zaraz main script.
  - `trackPath`: string — Custom endpoint for Zaraz tracking requests.
- `triggers`: object **required** — Triggers set up under Zaraz configuration, where key is the trigger alpha-numeric ID and value is the trigger configuration.
- `variables`: object **required** — Variables set up under Zaraz configuration, where key is the variable alpha-numeric ID and value is the variable configuration. Values of va
- `zarazVersion`: integer **required** — Zaraz internal version of the config.
- `tools`: object — Tools set up under Zaraz configuration, where key is the alpha-numeric tool ID and value is the tool configuration object.

## GET /zones/{zone_id}/settings/zaraz/history

List Zaraz historical configuration records

operationId: `get-zones-zone_identifier-zaraz-history` · query: `offset`, `limit`, `sortField`, `sortOrder`

**Response** 200 → `result`

[array of]
- `createdAt`: string **required** — Date and time the configuration was created.
- `id`: integer **required** — ID of the configuration.
- `updatedAt`: string **required** — Date and time the configuration was last updated.
- `userId`: string **required** — Alpha-numeric ID of the account user who published the configuration.
- `description`: string **required** — Configuration description provided by the user who published this configuration.

## PUT /zones/{zone_id}/settings/zaraz/history

Restore Zaraz historical configuration by ID

operationId: `put-zones-zone_identifier-zaraz-history`

**Request** (application/json)

integer

**Response** 200 → `result`

- `analytics`: object — Cloudflare Monitoring settings.
  - `defaultPurpose`: string — Consent purpose assigned to Monitoring.
  - `enabled`: boolean — Whether Advanced Monitoring reports are enabled.
  - `sessionExpTime`: integer — Session expiration time (seconds).
- `consent`: object — Consent management configuration.
  - `buttonTextTranslations`: object
    - `accept_all`: object **required** — Object where keys are language codes.
    - `confirm_my_choices`: object **required** — Object where keys are language codes.
    - `reject_all`: object **required** — Object where keys are language codes.
  - `companyEmail`: string
  - `companyName`: string
  - `companyStreetAddress`: string
  - `consentModalIntroHTML`: string
  - `consentModalIntroHTMLWithTranslations`: object — Object where keys are language codes.
  - `cookieName`: string
  - `customCSS`: string
  - `customIntroDisclaimerDismissed`: boolean
  - `defaultLanguage`: string
  - `enabled`: boolean **required**
  - `hideModal`: boolean
  - `purposes`: object — Object where keys are purpose alpha-numeric IDs.
  - `purposesWithTranslations`: object — Object where keys are purpose alpha-numeric IDs.
  - `tcfCompliant`: boolean
- `dataLayer`: boolean **required** — Data layer compatibility mode enabled.
- `debugKey`: string **required** — The key for Zaraz debug mode.
- `historyChange`: boolean — Single Page Application support enabled.
- `settings`: object **required** — General Zaraz settings.
  - `autoInjectScript`: boolean **required** — Automatic injection of Zaraz scripts enabled.
  - `contextEnricher`: object — Details of the worker that receives and edits Zaraz Context object.
    - `escapedWorkerName`: string **required**
    - `workerTag`: string **required**
  - `cookieDomain`: string — The domain Zaraz will use for writing and reading its cookies.
  - `ecommerce`: boolean — Ecommerce API enabled.
  - `eventsApiPath`: string — Custom endpoint for server-side track events.
  - `hideExternalReferer`: boolean — Hiding external referrer URL enabled.
  - `hideIPAddress`: boolean — Trimming IP address enabled.
  - `hideQueryParams`: boolean — Removing URL query params enabled.
  - `hideUserAgent`: boolean — Removing sensitive data from User Agent string enabled.
  - `initPath`: string — Custom endpoint for Zaraz init script.
  - `injectIframes`: boolean — Injection of Zaraz scripts into iframes enabled.
  - `mcRootPath`: string — Custom path for Managed Components server functionalities.
  - `scriptPath`: string — Custom endpoint for Zaraz main script.
  - `trackPath`: string — Custom endpoint for Zaraz tracking requests.
- `triggers`: object **required** — Triggers set up under Zaraz configuration, where key is the trigger alpha-numeric ID and value is the trigger configuration.
- `variables`: object **required** — Variables set up under Zaraz configuration, where key is the variable alpha-numeric ID and value is the variable configuration. Values of va
- `zarazVersion`: integer **required** — Zaraz internal version of the config.
- `tools`: object — Tools set up under Zaraz configuration, where key is the alpha-numeric tool ID and value is the tool configuration object.

## GET /zones/{zone_id}/settings/zaraz/history/configs

Get Zaraz historical configurations by ID(s)

operationId: `get-zones-zone_identifier-zaraz-config-history` · query: `ids`

**Response** 200 → `result`

object

## POST /zones/{zone_id}/settings/zaraz/publish

Publish Zaraz preview configuration

operationId: `post-zones-zone_identifier-zaraz-publish`

**Request** (application/json)

string

**Response** 200 → `result`

string

## GET /zones/{zone_id}/settings/zaraz/workflow

Get Zaraz workflow

operationId: `get-zones-zone_identifier-zaraz-workflow`

**Response** 200 → `result`

string

## PUT /zones/{zone_id}/settings/zaraz/workflow

Update Zaraz workflow

operationId: `put-zones-zone_identifier-zaraz-workflow`

**Request** (text/plain)

string

**Response** 200 → `result`

string
