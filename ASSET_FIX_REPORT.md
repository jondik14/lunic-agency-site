# Asset 404 fix — report

## Cause

- Many image/video paths used **spaces** and **mixed case** (e.g. `Blue Logotype.svg`, `mobile shot 1.png`). On Vercel (Linux), URLs are case-sensitive and spaces become `%20`, which led to NOT_FOUND.
- Some assets lived only in root `Assets/` and were **not** in `public/`, so Vite did not copy them into `dist/` and they were never served.

## 1. Files added/renamed in `public/Assets/`

All of these are **lowercase-kebab-case**, no spaces. Sources were root `Assets/` or existing `public/Assets/`.

| New filename (in public/Assets/) | Source file |
|----------------------------------|-------------|
| blue-logotype.svg | Assets/Blue Logotype.svg |
| white-logotype.svg | Assets/White logotype.svg |
| hariz-logo-lines.svg | Assets/Hariz logo lines.svg |
| black-small-logo.svg | Assets/Black small logo.svg |
| bw-portrait.png | public/Assets/bw-portrait.png (already existed) |
| updated-magentic-videop.mp4 | Assets/updated magentic videop.mp4 |
| greenchain-showcase.mp4 | Assets/greenchain showcase.mp4 |
| novemesh-showcase.mp4 | Assets/novemesh showcase.mp4 |
| hariz-showcase.mp4 | Assets/hariz showcase.mp4 |
| demo.mp4 | public/Assets/demo.mp4 |
| macbook-air-13-4th-gen-midnight-1.png | Assets/MacBook Air 13_ - 4th Gen - Midnight 1.png |
| iphone-16-pro-max-black-titanium-portrait-1.png | public/Assets/iPhone 16 Pro Max - Black Titanium - Portrait 1.png |
| iphone-17-pro.glb | public/Assets/iPhone 17 Pro.glb |
| discovery-first-reflection.png | Assets/Disocvery first reflection.png |
| mobile-shot-1.png | Assets/mobile shot 1.png |
| mobile-shot-2.png | Assets/mobile shot 2.png |
| mobile-first-design-reflection.png | Assets/mobiole first design refleciton.png |
| mcbook-google-data.png | Assets/mcbook google data.png |
| conversion-driven-reflection.png | Assets/Conversion dirven reflection.png |
| google-analytics-page.png | Assets/google analytics page.png |
| google-search-console-page.png | Assets/google search console page .png |

## 2. Code references updated

All references now use **`/Assets/<kebab-case>.<ext>`** (no spaces, lowercase filenames). Path stays `/Assets/` to match folder name for case-sensitive servers.

| File | Old path | New path |
|------|----------|----------|
| **Layout.tsx** | /Assets/White logotype.svg, /Assets/Blue Logotype.svg | /Assets/white-logotype.svg, /Assets/blue-logotype.svg |
| **TrustSection.tsx** | (already /Assets/bw-portrait.png) | no change |
| **ServicesSection.tsx** | /Assets/updated magentic videop.mp4 | /Assets/updated-magentic-videop.mp4 |
| **WorkShowcaseSection.tsx** | greenchain showcase.mp4, novemesh showcase.mp4, hariz showcase.mp4 | greenchain-showcase.mp4, novemesh-showcase.mp4, hariz-showcase.mp4 |
| **constants.ts** | /Assets/bw portait.png | /Assets/bw-portrait.png |
| **BrandIdentitySection.tsx** | /Assets/Hariz logo lines.svg | /Assets/hariz-logo-lines.svg |
| **HarizCraneTrucks.tsx** | MacBook Air 13_..., iPhone 16 Pro Max... | macbook-air-13-4th-gen-midnight-1.png, iphone-16-pro-max-black-titanium-portrait-1.png |
| **ProcessSection.tsx** | Disocvery first reflection.png, mobile shot 1/2.png, mobiole first..., mcbook google data.png, Conversion dirven... | discovery-first-reflection.png, mobile-shot-1.png, mobile-shot-2.png, mobile-first-design-reflection.png, mcbook-google-data.png, conversion-driven-reflection.png |
| **AnalyticsProofGrid.tsx** | google analytics page.png, google search console page .png | google-analytics-page.png, google-search-console-page.png |
| **BookingSection.tsx** | /Assets/bw portait.png | /Assets/bw-portrait.png |
| **HeroIphone3D.tsx** | iPhone 17 Pro.glb | iphone-17-pro.glb |
| **HeroIphoneStatic.tsx** | iPhone 16 Pro Max - Black Titanium - Portrait 1.png | iphone-16-pro-max-black-titanium-portrait-1.png |
| **HeroMetallicLogo.tsx** | /Assets/Black small logo.svg | /Assets/black-small-logo.svg |
| **CaseStudySection.tsx** | MacBook Air 13_..., iPhone 16 Pro Max... (×3) | macbook-air-13-4th-gen-midnight-1.png, iphone-16-pro-max-black-titanium-portrait-1.png |

## 3. Case and static serving

- **Filenames:** All referenced assets in `public/Assets/` now use **lowercase-kebab-case**; code uses the same names, so Linux/Vercel will resolve them.
- **Path:** References use **`/Assets/`** (capital A) to match the folder name `public/Assets/` as committed (avoids Windows case-only rename issues).
- **Static files:** Everything used by the app lives under **`public/Assets/`**, so Vite copies it into `dist/Assets/` and it is served as static files.

## 4. Git

- No asset paths are in `.gitignore`. Ensure **`public/Assets/`** (and the new kebab-case files) is committed and pushed so production has the same files.

## 5. What you should do

1. **Commit and push**  
   - All changes under `public/Assets/` (new kebab-case assets).  
   - All code edits above (references to `/Assets/...` kebab-case).

2. **Redeploy** on Vercel so the new build uses the updated paths and static files.

3. **(Optional) Case for URL “assets”**  
   - If you want URLs like `/assets/blue-logotype.svg` (lowercase “assets”), you’d need the folder to be `public/assets/` on a **case-sensitive** system (e.g. rename on Linux or in Git with two renames). Current setup uses **`/Assets/`** so it works with the existing `public/Assets/` name on Windows and Linux.
