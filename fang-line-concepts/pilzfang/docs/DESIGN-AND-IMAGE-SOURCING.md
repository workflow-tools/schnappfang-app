# Pilzfang — Design & Image Sourcing Guide

> How to create professional-looking mushroom cards without being a designer.
> Applicable to all SnapCard domains. Stand: April 2026.

---

## Part 1: Programmatic Card Design (No Designer Required)

### Current Approach (Proven)
Schnappfang uses **@vercel/og (satori + resvg)** — JSX → SVG → PNG server-side. This works for all SnapCard domains. The card is a React component with inline flexbox styles, consuming design tokens from a central config.

### Design Token Workflow
1. **Pick 1 primary colour** for the domain (Pilzfang: moss green #6b8f4e)
2. **Generate accessible palette** with [Leonardo Color](https://leonardocolor.io/) — it produces tints/shades that pass WCAG AA contrast automatically
3. **Export as CSS custom properties** or TypeScript const
4. **Wire into `templates/config.ts`** following Schnappfang's `Record<TemplateName, TemplateTokens>` pattern

### Typography Rules for Non-Designers
- **2 fonts maximum.** One for headings (display/serif), one for body (sans-serif).
- **Hierarchy:** Title 28–32px → Subtitle 16–18px → Body 12–14px → Metadata 10–11px
- **Line height:** 1.5× body text. 1.2× headings.
- **Font pairing:** Inter (body) + any Google Fonts display face (headings). Safe default: just use Inter for everything — it's what Schnappfang does.

### Layout Formula
- **55% photo / 45% content** — proven split from Schnappfang
- **24–40px padding** on all sides
- **Group into 3 visual blocks:** photo zone → species header → info blocks
- **2–3 info blocks maximum** for feed format (1080×1350). Stories (1080×1920) can fit 4–5.

### What Makes Cards Look Professional
- **Consistent spacing** (same padding everywhere)
- **One accent colour** used sparingly (borders, highlights, icons)
- **Semi-transparent overlays** on photos (40–60% opacity gradient from bg_primary)
- **Subtle watermark** in bottom-right (30% opacity)
- **No more than 2 font sizes** per card section

---

## Part 2: Image Sourcing Strategy (All Domains)

### Tier 1: Programmatic APIs (Free, Automated)

**iNaturalist API**
- Best for: Mushrooms, birds, plants, marine life
- License: CC-BY or CC-BY-NC per photographer
- Access: `GET /v1/observations?taxon_name=Boletus+edulis&place_id=7244&photos=true`
- Python: `pip install pyinaturalist`
- Gotcha: Check license per image. Some are CC-BY-NC (non-commercial).

**Wikimedia Commons API**
- Best for: Scientific illustrations, public domain species photos
- License: Mixed (verify per image) — many are CC-BY-SA or public domain
- Access: `GET /w/api.php?action=query&titles=File:Boletus_edulis.jpg&prop=imageinfo`
- Gotcha: CC-BY-SA requires sharing derivatives under same license.

**Unsplash API**
- Best for: Atmospheric backgrounds, landscapes, lifestyle shots
- License: Unsplash License (free for commercial use, no attribution required)
- Access: `GET /photos?query=mushroom+forest&orientation=portrait`
- Rate limit: 50 requests/hour (free tier)

### Tier 2: Manual Curation (Free, One-Time)

| Source | Best For | License |
|--------|----------|---------|
| Pixabay | Species photos, nature scenes | CC0 (no attribution) |
| Pexels | Lifestyle/atmospheric | CC0 |
| Ocean Image Bank | Underwater/marine | Free for ocean conservation |
| Wikimedia Commons | Scientific illustrations | Mixed — check each |

### Tier 3: AI-Generated (Branded Assets Only)

**Use Nano Banana Pro for:**
- Banners, app icons, profile pictures
- Atmospheric backgrounds (forest floor, underwater, alpine)
- Marketing imagery and social media templates
- Texture overlays for card backgrounds

**Do NOT use AI for:**
- Species identification reference photos (anatomical inaccuracies)
- Card subject photos (must be real photos)
- Safety-critical content (poisonous species must show REAL specimens)

### Tier 4: Community Contributions (Seasonal)

- Post in domain forums asking for photo contributions
- Log permissions in `docs/smoketest-tracking.csv`
- Credit contributors on cards (optional, increases sharing)
- Foraging season (mushrooms): June–November
- Birding: Year-round (migration peaks spring/autumn)
- Diving: Year-round (Mediterranean peak: May–October)
- Hiking: April–October

---

## Part 3: Batch Image Processing Script Pattern

Reusable across all domains. Fetch → resize → cache.

```typescript
// Sketch — adapt per domain
import sharp from 'sharp'

interface SubjectPhoto {
  subject_key: string      // Latin name
  source_url: string       // Original image URL
  license: string          // CC-BY, CC0, etc.
  attribution?: string     // Photographer credit
}

async function processPhoto(photo: SubjectPhoto, outputDir: string) {
  const response = await fetch(photo.source_url)
  const buffer = Buffer.from(await response.arrayBuffer())

  // Resize to card photo zone (1080 wide, variable height)
  await sharp(buffer)
    .resize(1080, null, { fit: 'inside' })
    .jpeg({ quality: 85 })
    .toFile(`${outputDir}/${photo.subject_key}.jpg`)

  // Generate thumbnail for picker UI
  await sharp(buffer)
    .resize(200, 200, { fit: 'cover' })
    .jpeg({ quality: 70 })
    .toFile(`${outputDir}/thumb_${photo.subject_key}.jpg`)
}
```

---

*This guide applies to all SnapCard domains. Domain-specific sourcing notes are in each domain's CHANNELS-AND-IMAGERY doc.*
