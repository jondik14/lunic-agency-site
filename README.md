# LUNIC Studio — Web Design for Service Businesses

Site repo: **[github.com/jondik14/lunic-agency-site](https://github.com/jondik14/lunic-agency-site)**

## Run locally

**Prerequisites:** Node.js

1. Clone and install:
   ```bash
   git clone https://github.com/jondik14/lunic-agency-site.git
   cd lunic-agency-site
   npm install
   ```
2. Copy [.env.example](.env.example) to `.env.local` and set `VITE_WEB3FORMS_ACCESS_KEY` (get a key at [web3forms.com](https://web3forms.com)).
3. Run the app:
   ```bash
   npm run dev
   ```

## Build for production

```bash
npm run build
npm run preview   # optional: preview the built site
```

## Deploy

See [DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md) for the full checklist. To push this project to the GitHub repo and deploy:

1. **Push to GitHub** (if not already):
   ```bash
   git remote add origin https://github.com/jondik14/lunic-agency-site.git
   git branch -M main
   git push -u origin main
   ```
2. **Connect to Vercel/Netlify:** Import the repo, build command `npm run build`, output directory `dist`, and add `VITE_WEB3FORMS_ACCESS_KEY` in the host’s environment variables.
