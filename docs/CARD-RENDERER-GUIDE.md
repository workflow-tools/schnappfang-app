# Schnappfang Card Renderer — Step-by-Step Guide

> **Audience:** You (Ryan), first time using `@vercel/og` / satori.
> **Goal:** Go from zero to generating smoke test catch cards as PNGs.
> **Time estimate:** ~30 minutes if npm cooperates, ~60 if it doesn't.

---

## What You're Working With

The card renderer uses **`@vercel/og`**, which is built into Next.js 15.
Under the hood it chains two libraries:

1. **Satori** — converts JSX + inline CSS → SVG (layout engine, no browser)
2. **Resvg** — converts SVG → PNG (Rust-based, fast)

You write a React component with inline styles, pass it to `ImageResponse`,
and get back a PNG at whatever dimensions you specify. That's it.

**Key constraint:** Satori is NOT a browser. It supports flexbox, basic
text styling, images, borders, opacity, and border-radius. It does NOT
support CSS Grid, complex gradients, blend modes, or `clip-path`. Every
style must be an inline object — no Tailwind, no CSS files.

---

## Step 0: Prerequisites

You need Node.js 18+ on your MacBook Air. Check:

```bash
node --version   # Should be v18.x or v20.x or v22.x
npm --version    # Should be v9+ or v10+
```

If not installed, the fastest path on macOS:

```bash
brew install node
```

---

## Step 1: Install Dependencies

```bash
cd ~/dev/schnappfang-app
npm install
```

This installs Next.js 15, React 19, TypeScript, and the dev tools.
`@vercel/og` ships inside Next.js — no separate install needed.

Expected output: a `node_modules/` folder and `package-lock.json`.

---

## Step 2: Verify Types Compile

```bash
npm run typecheck
```

This runs `tsc --noEmit` (Rule 1 gate). If it passes with no errors,
the types and templates are correctly wired.

If you see errors about `next/og` not being found, it means `npm install`
didn't complete — re-run it.

---

## Step 3: Start the Dev Server

```bash
npm run dev
```

You should see:

```
  ▲ Next.js 15.x.x
  - Local:   http://localhost:3000
```

Leave this terminal running. Open a browser.

---

## Step 4: Test a Single Card

Visit this URL in your browser:

```
http://localhost:3000/api/card?species=Hecht&species_la=Esox+lucius&template=klassisch&format=feed&blocks=fun_fact,name_origin&fun_fact=Der+Hecht+kann+bis+zu+1,5+m+lang+werden+und+frisst+Fische+bis+zur+Hälfte+seiner+eigenen+Körperlänge.&name_origin=Mhd.+'hëchet'+—+der+Stecher,+nach+dem+spitzen+Maul
```

You should see a **1080×1350 PNG** rendered in your browser — a dark green
card with "Hecht" in gold, the Latin name in sage, and two info blocks.

**If you see an error instead:**
- Check the terminal running `npm run dev` for error messages
- Make sure the URL is correctly formatted (no line breaks)

**Try the other templates:**
- Change `template=klassisch` to `template=bayern` → Bavarian blue card
- Change `template=klassisch` to `template=lagerfeuer` → warm brown card

**Try stories format:**
- Change `format=feed` to `format=stories` → taller 1080×1920 card

---

## Step 5: Test with a Real Photo

Find any fish photo URL (or use one of your own hosted somewhere) and add
it as the `photo` parameter:

```
http://localhost:3000/api/card?species=Karpfen&species_la=Cyprinus+carpio&template=bayern&format=feed&blocks=fun_fact&fun_fact=Die+Oberpfalz+ist+eines+der+ältesten+Karpfenzuchtgebiete+Europas.&photo=https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Cyprinus_carpio3.jpg/1280px-Cyprinus_carpio3.jpg
```

The photo renders as a cover image in the top 55% of the card.

---

## Step 6: Batch-Generate Smoke Test Cards

With the dev server still running in one terminal, open a second terminal:

```bash
cd ~/dev/schnappfang-app
npm run generate-cards
```

This runs `scripts/generate-smoke-cards.ts`, which:

1. Reads all 18 species from `docs/bayern-species-smoketest.csv`
2. For each species × 3 templates × 2 formats = **108 cards**
3. Fetches each from `http://localhost:3000/api/card`
4. Saves PNGs to `scripts/output/`

Output files are named: `hecht_klassisch_feed.png`, `hecht_bayern_stories.png`, etc.

**Note:** The first run uses placeholder images. As real angler photos arrive
during the smoke test, you'll update the `PLACEHOLDER_PHOTO` constant in the
script, or add a `photo_url` column to the CSV.

---

## Step 7: Inspect and Iterate

Open `scripts/output/` in Finder and review the cards:

- Are the info blocks readable?
- Does the text fit without overflow?
- Do the three templates feel distinct?
- Is the watermark visible but not intrusive?

Common tweaks you might want:

| What to change | Where to change it |
|---|---|
| Colors, fonts, opacity | `src/templates/config.ts` |
| Layout structure (photo %, spacing) | `src/templates/klassisch.tsx` (etc.) |
| Which blocks show on smoke cards | `scripts/generate-smoke-cards.ts` → `SMOKE_BLOCKS` |
| Card dimensions | `src/types/card.ts` → `CARD_DIMENSIONS` |
| Info block labels | `src/i18n/de.ts` |

---

## Step 8: Swap in Real Photos

When angler photos come in during the smoke test:

1. Host the photo somewhere accessible (even a GitHub raw URL works)
2. Either:
   - **Per card:** Add a `photo_url` column to `bayern-species-smoketest.csv`
   - **Batch override:** Change `PLACEHOLDER_PHOTO` in the generate script
3. Re-run `npm run generate-cards`

For the smoke test's 12–15 cards, you only need photos for the species
you're actually posting — not all 18.

---

## What Carries Forward to MVP

Everything you've just built is MVP-ready code, not throwaway:

| Smoke test file | MVP role |
|---|---|
| `src/types/` | Canonical type definitions (Rule 1) |
| `src/templates/config.ts` | Design token system (Rule 7) |
| `src/templates/*.tsx` | Card rendering components |
| `src/app/api/card/route.tsx` | Production card API endpoint |
| `src/i18n/de.ts` | i18n string table (Rule 9) |
| `scripts/generate-smoke-cards.ts` | Becomes a test/QA tool |

The MVP adds: photo upload UI, Claude Vision species ID, Supabase species
data lookup, Clerk auth, Stripe billing. The card rendering pipeline stays
exactly as scaffolded here.

---

## Troubleshooting

**"Module not found: Can't resolve '@/types'"**
→ Run `npm install` again, then check that `tsconfig.json` has the `paths`
  config with `"@/*": ["./src/*"]`.

**Card renders but text overflows**
→ Satori doesn't auto-shrink text. Reduce font size in the template, or
  truncate long content blocks. This is a known satori limitation.

**Photo doesn't appear**
→ Satori fetches images at render time. The URL must be publicly accessible
  (no localhost, no auth-gated URLs). For local photos, use a data URL or
  host via `npx serve` temporarily.

**"TypeError: Failed to fetch"** in generate script
→ The dev server isn't running. Start it with `npm run dev` in another terminal.

---

## Quick Reference: Project Structure

```
schnappfang-app/
├── docs/                          # Planning & data
│   ├── SMOKE-TEST-PLAN.md
│   ├── CARD-RENDERER-GUIDE.md     ← you are here
│   ├── SPECIES-PRIORITY-NOTES.md
│   └── bayern-species-smoketest.csv
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Placeholder landing
│   │   └── api/card/route.tsx     # 🎨 Card renderer API
│   ├── types/
│   │   ├── species.ts             # Species data types
│   │   ├── card.ts                # Card/template types
│   │   └── index.ts               # Re-exports
│   ├── templates/
│   │   ├── config.ts              # Design tokens (colors, fonts)
│   │   ├── klassisch.tsx          # Klassisch template
│   │   ├── bayern.tsx             # Bayern template
│   │   ├── lagerfeuer.tsx         # Lagerfeuer template
│   │   └── index.ts              # Template registry
│   └── i18n/
│       └── de.ts                  # German string table
├── scripts/
│   ├── generate-smoke-cards.ts    # Batch card generator
│   └── output/                    # Generated PNGs land here
├── public/fonts/                  # Custom fonts (add later)
├── package.json
├── tsconfig.json
└── next.config.ts
```
