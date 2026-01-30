# Microsoft Clarity Setup Guide

Microsoft Clarity has been integrated into your website. Follow these steps to complete the setup:

## 1. Get Your Clarity Project ID

1. Go to [Microsoft Clarity](https://clarity.microsoft.com/)
2. Sign in with your Microsoft account
3. Create a new project or select an existing one
4. Go to **Settings > Overview**
5. Copy your **Project ID**

## 2. Add Project ID to Environment Variables

Create or update your `.env.local` file in the root of your project:

```env
VITE_CLARITY_PROJECT_ID=your-project-id-here
```

**Important:** Replace `your-project-id-here` with your actual Clarity project ID.

## 3. Restart Your Development Server

After adding the environment variable, restart your dev server:

```bash
npm run dev
```

## 4. Verify Installation

1. Open your website in a browser
2. Open the browser console (F12)
3. You should see Clarity initialized (or a warning if the project ID is missing)
4. Check your Clarity dashboard - you should start seeing sessions within a few minutes

## Features Included

✅ **Automatic Page Tracking** - Tracks all page views and route changes  
✅ **Page Type Tags** - Automatically tags pages as 'home', 'blog', 'work', 'contact', etc.  
✅ **Cookie Consent** - Configured for analytics storage (adjust if needed)  
✅ **Helper Functions** - Ready-to-use functions for custom event tracking

## Using Custom Events

You can track custom events throughout your app using the helper functions:

```typescript
import { trackClarityEvent, upgradeClaritySession } from '../utils/clarity';

// Track a button click
trackClarityEvent('cta-clicked');

// Upgrade session for important actions
upgradeClaritySession('form-submitted');
```

## Cookie Consent

If your site requires cookie consent, update the consent in `components/ClarityAnalytics.tsx`:

```typescript
// After user grants consent
setClarityConsent('denied', 'granted');
```

## Troubleshooting

- **No data appearing?** Make sure your project ID is correct and the environment variable is loaded
- **Console warnings?** Check that `VITE_CLARITY_PROJECT_ID` is set in `.env.local`
- **Not tracking?** Verify Clarity is initialized by checking the browser console

For more information, visit the [Clarity documentation](https://learn.microsoft.com/en-us/clarity/).
