<div align="center">

<img src="docs/readme/icon.png" width="112" alt="CloudFlare Mobile icon" />

# CloudFlare Mobile

**Manage Cloudflare from your phone.**<br/>
DNS, firewall, analytics, Workers and an AI assistant in one clean Android app.

<a href="https://play.google.com/store/apps/details?id=id.imtaqin.cfmobile">
  <img alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" height="72" />
</a>

<br/>

![Platform](https://img.shields.io/badge/platform-Android-3DDC84?logo=android&logoColor=white)
![Expo SDK 54](https://img.shields.io/badge/Expo-SDK%2054-000020?logo=expo&logoColor=white)
![React Native 0.81](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Languages](https://img.shields.io/badge/languages-12-F6821F)
![License](https://img.shields.io/badge/license-MIT-7C5CF0)

<br/>

<img src="docs/readme/banner.png" alt="Manage Cloudflare from your phone" width="100%" />

</div>

> [!IMPORTANT]
> **This is the `foss` branch.** It builds the same app without ads, without Google Play billing and without any Google Play services library. Every feature is unlocked, and usage signals are off unless you turn them on. It is the branch used for GitHub Releases and F-Droid; the Play Store build comes from `main`.

> [!NOTE]
> CloudFlare Mobile is an independent, unofficial client. It is not affiliated with, endorsed by or sponsored by Cloudflare, Inc. It talks to the official Cloudflare API with your own API token.

<br/>

## Screenshots

<p align="center">
  <img src="docs/readme/shot-1.png" width="24%" alt="Dashboard" />
  <img src="docs/readme/shot-2.png" width="24%" alt="Zone controls" />
  <img src="docs/readme/shot-3.png" width="24%" alt="DNS records" />
  <img src="docs/readme/shot-4.png" width="24%" alt="Analytics" />
</p>
<p align="center">
  <img src="docs/readme/shot-5.png" width="24%" alt="AI security audit" />
  <img src="docs/readme/shot-6.png" width="24%" alt="AI chat" />
  <img src="docs/readme/shot-7.png" width="24%" alt="Firewall rules" />
  <img src="docs/readme/shot-8.png" width="24%" alt="Workers, KV, R2, Pages and D1" />
</p>

<p align="center"><sub>Screenshots use demo data.</sub></p>

## Features

<table>
<tr>
<td width="50%" valign="top">

### 🌐 Zones and DNS
- Search, filter and edit DNS records
- Toggle the Cloudflare proxy with one tap
- DNS templates, BIND import and export
- Global search across zones and records

</td>
<td width="50%" valign="top">

### 🛡️ Security
- Under Attack Mode, Development Mode and Pause Zone on top of every zone
- WAF custom rules and IP access rules
- SSL/TLS mode, Always Use HTTPS, minimum TLS

</td>
</tr>
<tr>
<td valign="top">

### 📈 Analytics
- Requests, cached vs uncached, bandwidth, threats
- Cache hit rate at a glance
- 1 day, 7 day and 30 day ranges

</td>
<td valign="top">

### ✨ AI assistant
- AI security audit with a score and fixes
- Ask for a change in plain language
- Every action is shown first; nothing runs until you approve it

</td>
</tr>
<tr>
<td valign="top">

### ⚙️ Developer platform
- Workers with live logs
- KV, R2 and D1 browsers
- Pages projects and deployments

</td>
<td valign="top">

### 📱 The app itself
- Multiple accounts and profiles
- Light and dark theme, 12 languages
- Biometric app lock
- Tokens encrypted on device (Android Keystore)

</td>
</tr>
</table>

Also in the app: Email Routing, cache purge, page rules, account audit logs, and screens for many more Cloudflare products. [`docs/ROADMAP.md`](docs/ROADMAP.md) tracks what is finished and what is still read-only.

## Getting started

<details>
<summary><b>1. Create a Cloudflare API token</b></summary>

<br/>

**API Token (recommended)**

1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Open **My Profile → API Tokens → Create Token**
3. Start from the **Edit zone DNS** template, or build a custom token with only what you need:

   | Permission | Used for |
   |---|---|
   | `Zone:Read` | Listing zones |
   | `Zone Settings:Read/Edit` | SSL, cache and zone switches |
   | `DNS:Read/Edit` | DNS records |
   | `Firewall Services:Read/Edit` | Firewall rules |
   | `Analytics:Read` | Analytics |
   | `Workers Scripts:Read/Edit` | Workers |
   | `Account Settings:Read` | Account info |

4. Create the token and copy it. Cloudflare shows it only once.

**Global API Key (not recommended)**

**My Profile → API Tokens → Global API Key → View**. You also need your Cloudflare email. This key has full access to the whole account, so prefer a scoped token.

</details>

<details>
<summary><b>2. Sign in</b></summary>

<br/>

Open the app, pick **API Token** or **Global Key**, paste your credentials and tap **Sign In**. A token that lacks a permission only hides the section that needs it; the rest of the app keeps working.

</details>

<details>
<summary><b>3. Find your way around</b></summary>

<br/>

| Tab | What it does |
|---|---|
| **Dashboard** | Zone counts, quick actions, shortcuts |
| **Zones** | Every zone, with search. Tap one to manage it |
| **AI Chat** | Ask the assistant to inspect or change a zone |
| **Services** | Workers, KV, R2, Pages, D1 and other account products |
| **Settings** | Theme, language, accounts, app lock |

</details>

## Privacy and security

| | |
|---|---|
| **Credentials** | Stored on your device with hardware-backed encryption. Sent only to `api.cloudflare.com`. |
| **AI features** | Send the zone configuration needed to answer to a hosted backend. Your API token is never sent to it. That backend is not part of this repository. |
| **Ads** | The free version shows ads. A one-time purchase removes them. |
| **Policy** | [Privacy policy](https://imtaqin.id/page/-privacy-policy-cloudflare-mobile) |

| Auth method | Header | Scope |
|---|---|---|
| **API Token** | `Authorization: Bearer <token>` | Scoped. Recommended. |
| **Global API Key** | `X-Auth-Email` + `X-Auth-Key` | Full account access. |

## Development

**Requirements:** Node.js 18+, JDK 17+, Android Studio with the Android SDK.

```bash
git clone https://github.com/imtaqin/CFMobile.git
cd CFMobile
npm install
npx expo run:android
```

| Command | What it does |
|---|---|
| `npx expo start` | Start the dev server |
| `npx expo run:android` | Build and run on a device or emulator |
| `npx tsc --noEmit` | Typecheck. Must be clean |
| `npm test` | Run the Jest tests |
| `npm run cf:schema` then `npm run cf:docs` | Regenerate the API reference in `docs/cf-api/` |
| `node scripts/i18n-translate.js <namespace> <source.json>` | Translate new strings into all 12 locales |

<details>
<summary><b>Release build</b></summary>

<br/>

```bash
npx expo prebuild --platform android
cd android && ./gradlew bundleRelease
# android/app/build/outputs/bundle/release/app-release.aab
```

Release signing reads its keystore settings from your own Gradle properties. Updates ship through Google Play.

</details>

### Project layout

```
app/                 Expo Router screens
  (tabs)/            dashboard, zones, ai-chat, services, settings
  zone/[id]/         zone-scoped screens (dns, ssl, firewall, analytics, ...)
  d1/ kv/ r2/        storage browsers
  worker-tail/       live Worker logs
components/ui/       shared UI kit (see docs/UI_STYLE.md)
services/            cloudflare.ts (all API calls), ai.ts, premium.ts, ...
contexts/            auth (multi-profile), theme
locales/             12 languages, identical key sets
docs/cf-api/         generated Cloudflare API reference
store/               Play Store screenshots, icon and listing sources
```

### Tech stack

React Native 0.81 · Expo SDK 54 · Expo Router · TypeScript · Axios · i18next · react-native-svg · Expo Secure Store · react-native-iap · Google Mobile Ads

## Known limitations

- **Rate limits.** Cloudflare allows 1,200 API requests per five minutes. Requests are not batched, so heavy use can hit the limit.
- **No offline mode.** Everything is fetched live.
- **Android first.** iOS is untested.
- **Two-factor auth.** The app signs in with API tokens, not your dashboard password.

## License

MIT

<div align="center">
<sub>Built by <a href="https://github.com/imtaqin">imtaqin</a>. Cloudflare is a trademark of Cloudflare, Inc.</sub>
</div>
