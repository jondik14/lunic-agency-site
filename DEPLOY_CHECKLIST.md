# Deploy checklist — LUNIC Studio

Use this before going live.

## Content ✓

- **Hero:** Clear message (what you do + who it’s for). One primary CTA: “Request a website review”.
- **Services:** “Common situations we help with” section with four clear situations.
- **Contact:** Form on home (#contact) and /contact; submits to hello.lunicstudio@gmail.com via Web3Forms.
- **No placeholder copy:** No lorem ipsum in live content. Form placeholders are hints (e.g. “Your name…”), not lorem.
- **Mobile:** Hero, services, work cards, and contact are responsive; mobile fixes applied (e.g. Services section not cut off).

## Trust ✓

- **Real work only:** Work section shows Hariz Crane Trucks, Greenchain, Nova Mesh (real projects).
- **About:** Trust section — “The face behind the studio” with Luke Niccol, short intro, portrait.
- **Location:** “Sydney / Remote” under founder name in Trust section.

## Tech ✓

- **Console:** Clarity usage guarded so missing SDK methods don’t throw; no intentional console errors.
- **Meta:** `index.html` has title and description (+ og/twitter tags). Update if you change positioning.
- **Form:** Set `VITE_WEB3FORMS_ACCESS_KEY` in your host’s environment (e.g. Vercel/Netlify). See `.env.example`.

## Before you deploy

1. **Test the form**  
   Submit “Request a website review” and confirm the email arrives at hello.lunicstudio@gmail.com.

2. **Images**  
   For best performance, compress large images and prefer WebP where possible (e.g. portrait, project assets). Current assets in `public/Assets` and `Assets` are fine to ship; optimize later if needed.

3. **Build**  
   Run `npm run build` and open `dist` with `npm run preview` to double-check.

4. **Env on host**  
   Add `VITE_WEB3FORMS_ACCESS_KEY` (your Web3Forms key) in your hosting dashboard so the form works in production.

## Deploy

**GitHub repo:** [github.com/jondik14/lunic-agency-site](https://github.com/jondik14/lunic-agency-site)

1. **Push to GitHub** (from your project folder):
   ```bash
   git init
   git add .
   git commit -m "Initial commit — LUNIC Studio site"
   git remote add origin https://github.com/jondik14/lunic-agency-site.git
   git branch -M main
   git push -u origin main
   ```
   (If the repo already has a remote, use `git remote set-url origin https://github.com/jondik14/lunic-agency-site.git` then `git push -u origin main`.)

2. **Static host (Vercel, Netlify, etc.):** Connect the repo, build command `npm run build`, output directory `dist`. Add `VITE_WEB3FORMS_ACCESS_KEY` in the host’s environment variables.

3. **Router:** App uses `HashRouter`, so no server config is needed for client-side routes; works on any static host.
