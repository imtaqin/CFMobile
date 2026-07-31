# Privacy Policy

**CloudFlare Mobile**
Last updated: July 31, 2026

---

## Overview

CloudFlare Mobile is an unofficial, open-source mobile application that allows you to manage your Cloudflare account from your Android device. This privacy policy explains how the app handles your data.

**CloudFlare Mobile is not affiliated with, endorsed by, or officially connected to Cloudflare, Inc.**

---

## Data We Collect

### Authentication Credentials

To use the app, you must provide one of the following:

- **API Token** — A scoped Cloudflare API token
- **Global API Key + Email** — Your Cloudflare email and global API key

These credentials are stored **locally on your device only**, using Android Keystore hardware-backed encryption. They are never transmitted to any server other than the official Cloudflare API.

### Anonymous Usage Statistics

To decide which features to build and maintain, the app sends anonymous usage
signals to a server we operate (`cfmobile-ai.imtaqin.id`):

- A random install identifier, generated on your device — it is not derived from
  your account, email, device ID, or advertising ID, and it identifies an install,
  not a person
- The name of the feature used (for example `ai_audit_start`, `monitor_enabled`)
- App version and interface language
- Country, as determined by Cloudflare's network from the connection — we never
  request location permission and never store IP addresses

You can turn this off at any time: **Settings → Security → Share anonymous usage**.
When it is off, nothing is sent at all.

### No Additional Data Collection

We do **not** collect, store, or transmit:

- Personal information beyond what you provide for authentication
- Device identifiers, fingerprints, or advertising identifiers
- Precise location data
- Your domains, DNS record contents, or credentials in usage statistics
- Crash reports
- Cookies or cross-app tracking data

---

## How Your Data Is Used

| Data | Purpose | Stored Where |
|------|---------|-------------|
| API Token or Global API Key | Authenticate with Cloudflare API | Device only (encrypted) |
| Email address | Required for Global API Key auth | Device only (encrypted) |
| Theme preference | Remember your Light/Dark/System choice | Device only |
| Language preference | Remember your language selection | Device only |
| Onboarding status | Skip onboarding after first use | Device only |

---

## Third-Party Services

### Cloudflare API

The app communicates with the official Cloudflare API for all account management features:

```
https://api.cloudflare.com/client/v4
```

### Google AdMob

The free version of the app displays advertisements via Google AdMob. AdMob may collect certain data as described in [Google's Privacy Policy](https://policies.google.com/privacy), including:

- Advertising ID
- Approximate location (IP-based)
- Device information (model, OS version)
- Ad interaction data

You can opt out of personalized ads in your device settings under **Google > Ads**. Purchasing the one-time **Premium (Remove Ads)** upgrade removes all advertisements and stops all AdMob data collection.

### Google Play Billing

The optional Premium upgrade is processed by Google Play Billing. We never see or store your payment details — the entire transaction is handled by Google Play. The purchase state is stored locally on your device.

No other third-party services, analytics platforms, or tracking SDKs are used.

---

## Data Storage & Security

- All sensitive data (API tokens, API keys, email) is encrypted using **Android Keystore**, which provides hardware-backed encryption on supported devices
- Data is stored in the app's private storage, inaccessible to other apps
- No data is stored on external storage or shared directories
- No data is backed up to cloud services by the app

---

## Data Sharing

We do **not** share your data with any third parties. Your credentials and account information remain on your device and are only sent to the Cloudflare API for authentication and management operations.

---

## Data Retention & Deletion

- All data is stored locally on your device
- **Signing out** from the app immediately deletes all stored credentials
- **Uninstalling** the app removes all app data from your device
- No server-side data exists to delete — we have no servers

---

## Children's Privacy

CloudFlare Mobile is not intended for use by children under the age of 18. We do not knowingly collect data from children. The app is a technical infrastructure management tool designed for Cloudflare account administrators.

---

## Your Rights

Since all data is stored locally on your device, you have full control:

- **Access** — View your stored credentials in Settings
- **Delete** — Sign out to remove all stored data, or uninstall the app
- **Portability** — Not applicable as no data is stored externally

---

## Open Source

CloudFlare Mobile is open source. You can review the source code to verify our privacy practices at any time.

---

## Changes to This Policy

We may update this privacy policy from time to time. Changes will be reflected in the "Last updated" date at the top of this page.

---

## Contact

If you have questions about this privacy policy, please open an issue on the project's GitHub repository.
