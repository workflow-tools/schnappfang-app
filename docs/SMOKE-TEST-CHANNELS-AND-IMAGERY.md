# Schnappfang — Smoke Test Channels & Imagery Guide

> **Purpose:** Where to post smoke test cards, what accounts to create,
> and ready-to-use Nano Banana Pro (Gemini) prompts for all brand imagery.
>
> **Companion files:**
> - [Card Preview Tool](../tools/card-preview.html) — open in browser, no server needed
> - [Card System Documentation](./Schnappfang-Card-System.docx) — colour schemes, shareability research, step-by-step guide
> - [Smoke Test Plan](./SMOKE-TEST-PLAN.md) — full execution plan
>
> **Status:** Pre-smoke-test. No accounts created yet.

---

## Part 1: Where to Post (Channel Strategy)

The smoke test plan (§8) calls for seeding cards across 5 channels. Here's
the specific account setup and posting strategy for each.

### 1.1 Pinterest (Primary — highest share-appeal alignment)

**Why first:** Pinterest is a visual discovery engine, not a social feed.
Pins have a long shelf life (months, not hours). Angler wives, outdoor
lifestyle browsers, and recipe seekers all use Pinterest. This is where
Schnappfang cards have the best chance of reaching *non-anglers* — the
demographic that validates whether the card format has broad appeal.

**Account to create:**
- Business account at pinterest.com/business/create
- Display name: `Schnappfang 🐟`
- Username: `schnappfang`
- Website: `schnappfang.de` (claim the domain when registered)
- Category: Outdoors / Hobbies

**Boards to create:**
- `Fangkarten Bayern` — main board, all smoke test cards go here
- `Rezepte vom Wasser` — cards that feature recipe blocks (cross-discovers with recipe searchers)
- `Bayerische Fische` — species-focused pins (fun facts, name origins)
- `Am Lagerfeuer` — Lagerfeuer template cards specifically (outdoor/camping aesthetic)

**Posting cadence:** 2–3 pins per day during the smoke test window. Each
card in both feed and stories format. Add keyword-rich German descriptions:
species name, Bavarian location, "Fangkarte", "Angelkarte", "Bayern angeln".

**Pin description template:**
```
🐟 [Species] — [Fun fact hook in one line]
📍 [Location, Bayern]
🔥 Rezept: [Recipe one-liner]

Fangkarte erstellt mit schnappfang.de
#angeln #bayern #fischen #fangkarte #[species] #schnappfang
```

---

### 1.2 Instagram (Secondary — social proof and community)

**Why:** Instagram is where anglers already post their catches. Schnappfang
cards stand out in a feed of raw fish photos because they're *designed* — 
they have typography, info blocks, and a consistent aesthetic.

**Account to create:**
- Instagram business or creator account
- Handle: `@schnappfang.de`
- Bio: `🐟 Fangkarten für bayerische Angler. Dein Fang. Deine Karte. Kostenlos testen → schnappfang.de`
- Profile pic: app icon (see imagery prompts below)
- Link in bio: schnappfang.de (or linktree with landing + preview tool)

**Content types:**
- **Feed posts (1080×1350):** One species card per post. Carousel format works well — slide 1 is the card, slide 2 is the "how it's made" breakdown.
- **Stories (1080×1920):** Daily story with a different species. Use the stories format cards. Add a poll sticker: "Wusstest du das? 🤯 / Klar! 💪"
- **Reels (optional):** 15-second "card assembly" animation — photo drops in, info blocks slide up. Can be faked with simple video editing.

**Hashtag sets (rotate):**
- `#angeln #fischen #petrijeil #anglerlife #fangkarte #schnappfang`
- `#bayernangeln #oberpfalz #donaufischen #alpensee #forelle`
- `#hecht #zander #wels #karpfen #barsch` (species-specific)

---

### 1.3 German Angling Forums (Validation — real anglers)

These are where you get honest feedback from the target demographic. Forums
are skeptical of marketing, so the approach must be genuine: "I'm building
this, here are sample cards, would you use it?"

**Forums to join and post in:**

| Forum | URL | Why |
|-------|-----|-----|
| AlleAngeln | alleangeln.de/forum | Largest German fishing community. Has a "Neuvorstellungen" section for new products. |
| Anglerboard | anglerboard.de | Biggest traditional forum. Has "Angeln und Umwelt" and regional Bayern sub-forums. |
| Barsch-Alarm | barsch-alarm.de/community | Predator-fishing focused. Perfect for Hecht/Zander/Wels T1 cards. |
| Alpines Angeln | alpines-angeln.de/forum | Alpine/Bavarian focus. Ideal for Seeforelle, Saibling, Renke cards. |
| Fisch-Hitparade | fisch-hitparade.de | Catch records community. They understand the "document your catch" mindset. |

**Forum post template (adapt per forum's tone):**
```
Betreff: Fangkarten-Generator für bayerische Angler — Feedback gesucht

Hallo zusammen,

ich arbeite an einem kleinen Tool namens Schnappfang, mit dem man aus
einem Fangfoto automatisch eine teilbare Fangkarte erstellen kann — mit
Artname, Fun Facts, Rezeptvorschlag und optionaler Mondphase.

Hier sind ein paar Beispiele (Bayern-Fische):
[Bilder der Karten]

Wäre so etwas für euch nützlich? Was fehlt, was nervt?
Ehrliches Feedback ist mir lieber als Höflichkeit. 😄

Tight lines,
Ryan
```

---

### 1.4 Facebook Groups (Reach — volume)

**Groups to join:**
- **Anglerforum Bayern** — ~12K members, Bayern-specific
- **Angeln in Bayern** — general Bayern angling
- **Karpfenangeln Deutschland** — for Karpfen/T3 species cards
- **Raubfischangeln** — for Hecht/Zander/Wels T1 cards
- **Angeln für Anfänger** — Flussbarsch cards work perfectly here (beginner gateway species)

**Approach:** Same genuine-feedback framing as forums. Don't sell. Ask.
Facebook groups have strict self-promotion rules — always check group rules
first and lead with value (the card), not the pitch.

---

### 1.5 WhatsApp / Telegram (Viral seeding)

**Why:** WhatsApp is Germany's dominant messaging app. If a card is good
enough to forward in a fishing group chat, that's the strongest signal.

**How:** You don't need to create accounts here. Instead, make it easy for
forum/Instagram followers to share cards via WhatsApp. The Web Share API
(planned for MVP) handles this natively on mobile. For the smoke test,
include "Teile diese Karte" + a download link in every Instagram post.

---

### 1.6 TikTok (Optional — low effort, high ceiling)

**Why maybe:** TikTok's German fishing community (#angeln has 1B+ views)
is massive and young. A 15-second "watch this fish photo become a card"
video could organically reach 10K+ views.

**Why optional:** Video creation takes more time than static card posting.
Defer unless the smoke test has bandwidth.

---

## Part 2: Account Creation Checklist

Create these accounts before starting the smoke test:

- [ ] **schnappfang.de** — Register the domain (check availability)
- [ ] **Pinterest** — Business account, `schnappfang`, 4 boards
- [ ] **Instagram** — Creator account, `@schnappfang.de`
- [ ] **AlleAngeln** — Forum account, introduce yourself
- [ ] **Anglerboard** — Forum account
- [ ] **Barsch-Alarm** — Forum account
- [ ] **Facebook** — Join 3–5 angling groups (use personal account)
- [ ] **Email** — `hallo@schnappfang.de` (for forum registrations and replies)
- [ ] **Google Business** — Optional but helpful for local SEO when the site goes live

---

## Part 3: Nano Banana Pro Image Prompts

### Prompting Best Practices (Nano Banana Pro / Gemini)

Based on [Google's official prompt guide](https://blog.google/products-and-platforms/products/gemini/prompting-tips-nano-banana-pro/)
and the [Cloud blog guide](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana):

**Formula:** `[Subject + adjectives] doing [action] in [location/context], [composition/camera], [lighting/atmosphere], [style/media]`

**Key principles:**
- Write 1–3 natural sentences. No tag soup ("4k, trending, masterpiece").
- Be specific: not "a fish" but "a Northern Pike with olive-green flanks and gold spots."
- Specify text exactly: font style, placement, what it says.
- Use camera terms: "85mm lens", "shallow depth of field", "golden hour."
- Nano Banana Pro is a "thinking" model — describe intent, not just keywords.
- Iterate conversationally: if 80% right, ask for the specific change.

---

### 3.1 Website Banner / Hero Image (1920×1080)

**Prompt — Option A (Photo-realistic, atmospheric):**
```
A freshly caught Northern Pike (Hecht) lying on a rustic wooden dock
beside a misty Bavarian lake at golden hour. The pike's olive-green
flanks glisten with water droplets, and its gold lateral spots catch the
warm sunset light. In the background, soft-focus Alpine foothills with
dark spruce forests. A weathered fishing rod leans against the dock rail.
The mood is quiet, proud, authentic — a moment of solitary achievement.
Shot with an 85mm lens at f/2.8, shallow depth of field, warm natural
lighting with long golden shadows. Photorealistic style.
```

**Prompt — Option B (Stylised, brand-forward):**
```
A wide cinematic banner image for a German fishing app called
"Schnappfang". The scene shows a close-up of an angler's hands holding
a beautiful Brown Trout (Bachforelle) with vivid red and black spots,
partially submerged in crystal-clear mountain stream water. The
background is a soft bokeh of green forest and grey river stones.
Overlaid at the right side in clean, bold sans-serif white text: the
word "SCHNAPPFANG" with a small fish silhouette icon. The colour palette
is dark forest green (#1a2e1a) and warm gold (#d4a853). Warm, natural
late-afternoon light. Photorealistic with a slight cinematic colour
grade.
```

**Prompt — Option C (Illustrated, versatile):**
```
A wide panoramic illustration of a Bavarian fishing scene for a website
banner. A stylised Alpine lake in the foreground with crystal-clear
teal water, a wooden fishing pier extending from the left. Three fish
silhouettes visible under the water surface — a pike, a trout, and a
carp. Rolling green foothills and a traditional Bavarian onion-dome
church in the mid-ground. Soft cumulus clouds in a warm sky. The art
style is modern flat illustration with subtle texture, using a palette
of dark forest green, warm gold, and muted blues. Clean, friendly,
premium feel — not cartoonish.
```

---

### 3.2 App Icon (1024×1024, iOS + Android)

**Prompt — Primary (fish + card motif):**
```
A square app icon for a fishing app called "Schnappfang". The icon shows
a stylised fish silhouette — a pike in profile, mouth slightly open —
rendered in warm gold (#d4a853) on a dark forest green (#1a2e1a)
background. The fish overlaps a subtle rectangular card shape with
slightly rounded corners, suggesting a "catch card." Clean, minimal,
modern. The style is flat icon design with no gradients, no text, no
photorealism. The silhouette has enough detail to read as a pike (pointed
snout, elongated body) but is simple enough to be recognisable at 29×29px
on an iPhone home screen. Solid colour background with no border.
```

**Prompt — Alternate (circular badge):**
```
A square app icon with a circular badge centred on a dark forest green
(#1a2e1a) background. Inside the circle: a warm gold (#d4a853) fish
hook that curves into the silhouette of a fish tail, forming an elegant
continuous line. The circle has a thin gold border. Minimal, modern,
no text. Flat design, no gradients. The icon must read clearly at very
small sizes (29px) — keep the line weight thick enough to be visible.
```

**Prompt — Bayern variant:**
```
A square app icon on a deep Bavarian blue (#0b3d91) background. A white
fish silhouette (pike profile) centred, with two small white diamond
shapes (Rauten) flanking it — a subtle nod to the Bavarian flag pattern.
Clean, minimal, flat design. No text, no gradients. The fish reads
clearly at small sizes. Premium, authoritative feel.
```

---

### 3.3 Social Media Profile Picture (800×800, circular crop)

**Prompt:**
```
A circular profile picture for a fishing brand. A warm gold (#d4a853)
fish silhouette (pike in profile) on a dark forest green (#1a2e1a)
background. The fish is centred and sized to fill about 60% of the
circle. Clean flat design, no text, no gradients. Must look sharp
when displayed at 110×110px on Instagram.
```

---

### 3.4 Open Graph / Social Share Card (1200×630)

**Prompt:**
```
A wide social media preview card for a website called "schnappfang.de".
Left half: a moody, atmospheric close-up of a freshly caught Zander
(pikeperch) with its distinctive olive-gold flanks, lying on a dark
wooden surface. Right half: dark forest green (#1a2e1a) background with
the text "SCHNAPPFANG" in large warm gold (#d4a853) bold sans-serif
letters, and below it in smaller white text: "Deine Fangkarte. Dein
Fang." A thin gold horizontal line separates the title from the
subtitle. Clean, premium, photorealistic fish + graphic text split.
```

---

### 3.5 Pinterest Pin Cover (1000×1500)

**Prompt:**
```
A tall Pinterest pin image for a German fishing catch card service.
The top 60% shows a photorealistic overhead shot of a beautiful Karpfen
(common carp) on a bed of wet autumn leaves beside a traditional
Oberpfälzer fish pond at dawn. The bottom 40% is a dark forest green
(#1a2e1a) panel with text in warm gold (#d4a853) bold sans-serif:
"Oberpfälzer Karpfen" as the headline, and below in smaller white text:
"EU-geschützte Herkunft seit Jahrhunderten." The overall feel is
premium, seasonal, German. Natural soft morning light on the fish,
warm autumn colour palette.
```

---

### 3.6 Instagram Stories Template Background (1080×1920)

**Prompt:**
```
A tall vertical background image for an Instagram story about fishing
in Bavaria. The scene is a serene pre-Alpine lake (like Walchensee) at
blue hour — deep blue water with the faintest reflection of snow-capped
mountains. The lower third of the image fades into solid dark forest
green (#1a2e1a) to create space for text overlay. The transition from
photo to solid colour is a smooth, natural gradient. No text in the
image itself. Photorealistic, cinematic mood, cool blue tones with
warm highlights on the mountain peaks. Shot at wide angle.
```

---

### 3.7 Forum Signature Banner (728×90)

**Prompt:**
```
A slim horizontal banner (728×90 pixels aspect ratio) for a fishing
forum signature. Dark forest green (#1a2e1a) background. On the left,
a small warm gold (#d4a853) fish silhouette (pike). Centre text in
white: "schnappfang.de — Fangkarten für bayerische Angler". On the
right, three tiny coloured dots representing the three card templates:
forest green, Bavarian blue, campfire orange. Clean, minimal, flat
design. The banner must be legible at actual 728×90px display size,
so keep text large relative to the banner height.
```

---

### 3.8 Favicon (512×512, will be downscaled)

**Prompt:**
```
A simple square favicon icon. A single warm gold (#d4a853) fish hook
shape on a solid dark forest green (#1a2e1a) background. The hook is
thick-lined, centred, and fills about 70% of the square. Extremely
minimal — must be recognisable at 16×16px in a browser tab. No text,
no detail, just the bold hook shape. Flat design.
```

---

### 3.9 Card Template Showcase (for forums and landing page)

**Prompt:**
```
A product showcase mockup showing three digital catch cards fanned out
at slight angles on a dark textured wood surface. The left card has a
dark forest green (#1a2e1a) colour scheme with gold text, the middle
card has a deep Bavarian blue (#0b3d91) scheme with white text, and
the right card has a dark brown (#2d1810) scheme with orange text. Each
card shows a different fish photo in the top portion and German text
info blocks below. The cards cast soft shadows on the wood. The overall
lighting is warm and natural, as if photographed on a cabin table.
Photorealistic product photography style, shallow depth of field with
the middle card in sharpest focus.
```

---

## Part 4: Image Generation Workflow

### Recommended process:

1. **Open Gemini** (gemini.google.com) — make sure you're on a plan
   that includes Nano Banana Pro image generation.
2. **Paste the prompt** exactly as written above. Don't shorten it.
3. **Iterate conversationally:** If the first result is 80% right, say
   "Make the fish silhouette slightly larger" or "Change the background
   to be darker" — Nano Banana Pro handles edits well.
4. **Download at highest resolution** and save to
   `schnappfang-app/assets/brand/` (create the directory).
5. **For the app icon specifically:** Generate at 1024×1024, then use
   an icon generator tool (like appicon.co) to create all required
   iOS and Android sizes from that single master image.

### Asset directory structure:
```
schnappfang-app/
└── assets/
    └── brand/
        ├── banner-hero-1920x1080.png
        ├── icon-1024x1024.png
        ├── icon-bayern-variant-1024x1024.png
        ├── profile-800x800.png
        ├── og-card-1200x630.png
        ├── pinterest-cover-1000x1500.png
        ├── stories-bg-1080x1920.png
        ├── forum-banner-728x90.png
        ├── favicon-512x512.png
        └── template-showcase.png
```

---

## Part 5: Quick Reference — Colour Codes for All Prompts

| Token | Hex | Where Used |
|-------|-----|------------|
| Dark forest green | `#1a2e1a` | Klassisch bg, primary brand colour |
| Lighter forest green | `#2a4a2a` | Klassisch info blocks |
| Warm gold | `#d4a853` | Klassisch accent, primary brand accent |
| Warm off-white | `#f5f0e8` | Klassisch text |
| Sage | `#b8c4a8` | Klassisch muted text |
| Bavarian blue | `#0b3d91` | Bayern bg |
| Lighter Bavarian blue | `#1a4fa0` | Bayern info blocks |
| White | `#ffffff` | Bayern text + accent |
| Light blue | `#a8c8e8` | Bayern muted text |
| Dark wood brown | `#2d1810` | Lagerfeuer bg |
| Warm brown | `#3d2820` | Lagerfeuer info blocks |
| Warm cream | `#f5e6d0` | Lagerfeuer text |
| Campfire orange | `#e8732a` | Lagerfeuer accent |
| Tan | `#c8a882` | Lagerfeuer muted text |
