# Deploying LUNIC Studio

The site is a static Vite + React SPA and can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Build

```bash
npm install
npm run build
```

Output is in the **`dist`** folder. Deploy the contents of `dist` (or point your host at `dist` as the build output directory).

## Environment variable (production)

For the **Request a website review** form to send submissions to **hello.lunicstudio@gmail.com**, set this in your hosting dashboard:

| Variable | Value | Where |
|----------|--------|--------|
| `VITE_WEB3FORMS_ACCESS_KEY` | Your Web3Forms access key | Hosting → Project Settings → Environment Variables |

- Get the key at [web3forms.com](https://web3forms.com): create a form, set the receiving email to **hello.lunicstudio@gmail.com**, copy the Access Key.
- Add it as **VITE_WEB3FORMS_ACCESS_KEY** (same name locally and in production).
- Redeploy after adding the variable so the build picks it up.

## Platform-specific

### Vercel

1. Push the repo and import the project in [Vercel](https://vercel.com).
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add **VITE_WEB3FORMS_ACCESS_KEY** under Settings → Environment Variables.
5. Deploy.

### Netlify

1. New site from Git (or drag-and-drop the `dist` folder).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add **VITE_WEB3FORMS_ACCESS_KEY** under Site settings → Environment variables.
5. Deploy.

### Other static hosts

- Build locally: `npm run build`
- Upload the **`dist`** folder, or connect Git and set build command to `npm run build` and publish directory to `dist`.
- Add **VITE_WEB3FORMS_ACCESS_KEY** in the host’s environment/config if supported.

## Routing

The app uses **HashRouter** (URLs like `yoursite.com/#/work`, `yoursite.com/#/contact`). No server rewrites are needed; the same `index.html` is served for all routes.

## Local preview of production build

```bash
npm run build
npm run preview
```

Then open the URL shown (e.g. http://localhost:4173) to test the built site locally.
