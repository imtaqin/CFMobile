# Privacy Policy

**CloudFlare Mobile**
Last updated: April 2, 2026

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

### No Additional Data Collection

We do **not** collect, store, or transmit:

- Personal information beyond what you provide for authentication
- Device identifiers or fingerprints
- Location data
- Usage analytics or telemetry
- Crash reports
- Advertising identifiers
- Cookies or tracking data

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

The app uses Google AdMob to display banner advertisements. AdMob may collect certain data as described in [Google's Privacy Policy](https://policies.google.com/privacy). This may include:

- Advertising ID
- Approximate location (IP-based)
- Device information (model, OS version)
- Ad interaction data

You can opt out of personalized ads in your device settings under **Google > Ads > Opt out of Ads Personalization**.

No other third-party services, analytics platforms, or tracking SDKs are used beyond the above.

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
