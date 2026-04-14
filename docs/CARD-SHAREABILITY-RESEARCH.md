# SnapCard — What Makes Cards Irresistible to Share

> Research compilation: psychology, design patterns, app analogues, and social media trends.
> Feeds into card template design for Schnappfang and the broader *fang family.
> Stand: April 2026.

---

## 1. The Psychology (Why People Share Visual Cards)

### Berger's STEPPS Framework (Contagious, 2013 — still the gold standard)

Six drivers of sharing, mapped to SnapCard block types:

| STEPPS Driver | What It Means | SnapCard Block That Triggers It |
|---------------|--------------|-------------------------------|
| **Social Currency** | Makes the sharer look smart/insider | Fun fact, Name origin |
| **Triggers** | Environmental cue reminds them to share | Season hint (seasonal sharing), Weather |
| **Emotion** | Awe, surprise, amusement | Fun fact (surprise), Ecology (awe) |
| **Public** | Visible format others can see and copy | Card format itself (branded, recognisable) |
| **Practical Value** | Useful to the recipient | Recipe (camp + home), Season hint |
| **Stories** | Narrative hook that carries the brand | Name origin, Ecology comeback stories |

**Key insight:** Fun facts are the triple-threat block — they trigger Social Currency, Emotion, AND Stories simultaneously. This validates giving fun_fact a share_appeal of 5.

### Emotion Hierarchy for Nature Content

Research from BuzzSumo (analysing 100M+ articles): **Awe > Surprise > Amusement > Interest > Joy** for share-driving emotions. For nature content specifically:

- **"I can't believe this is real"** beats **"That's nice"** every time
- Extreme facts outperform moderate ones: "250+ cm and 100 kg" (Wels) > "quite large fish"
- Counterintuitive facts beat confirming ones: "Smells like thyme" (Äsche) > "Lives in rivers"
- The "Sargasso Sea mystery" (Aal) is textbook awe+surprise — no scientist has ever seen an eel spawn

---

## 2. Design Patterns from Successful Card-Sharing Apps

### The "Earned Card" Pattern

Apps where the card feels *earned* get shared more than apps where cards are freely generated.

| App | What Makes It Feel Earned | Shareability |
|-----|--------------------------|-------------|
| **Spotify Wrapped** | Annual ritual, personalised to YOUR listening | Compulsory sharing — cultural moment |
| **Strava** | Physical effort recorded with GPS proof | Social proof of achievement |
| **Duolingo** | Daily streak milestone — effort over time | Status signalling |
| **Nike Run Club** | Route map + pace data — YOUR run, not generic | Personal accomplishment |
| **iNaturalist** | Species observation verified by community | Scientific contribution |
| **Letterboxd** | Film rating with personal quote | Taste curation |

**SnapCard parallel:** The angler's own photo + species they identified + location = THEIR moment. The card isn't a generic template — it's proof they were there, they caught this, they know what it is. This is fundamentally different from a stock nature infographic.

### The Anatomy of a Shareable Card

Reverse-engineering the most shared card formats across apps:

```
┌─────────────────────────┐
│                         │
│   HERO PHOTO (55-60%)   │  ← The hook. Must be visually arresting.
│   + subtle gradient     │     Semi-transparent overlay from bottom.
│   overlay at bottom     │
│                         │
├─────────────────────────┤
│ SPECIES NAME (large)    │  ← Identity. Bold, accent colour.
│ Latin name (small, muted)│
├─────────────────────────┤
│ 💡 Fun Fact Block       │  ← The shareability driver.
│                         │     1 block = focused. 2-3 max.
├─────────────────────────┤
│ 🏕️ Recipe / 🌿 Ecology │  ← Practical value OR awe.
├─────────────────────────┤
│ 📍 Location · 📅 Date  │  ← Personal proof. Makes it THEIR card.
│ schnappfang.de  0.3 opa │  ← Watermark = distribution channel.
└─────────────────────────┘
```

### What Makes Cards NOT Get Shared

- Too much text (more than ~40 words of body copy)
- Generic/stock feeling (no personal photo, no location, no date)
- Ugly colour clashes (especially text on busy photo backgrounds)
- Forced watermarks that obscure the photo
- No clear visual hierarchy (everything same size/weight)
- No "I was there" element (location, date, angler name)

---

## 3. Design Trends for Nature Cards (2025–2026)

### Glassmorphism 2.0 (Trending)

Translucent frosted panels with soft blur behind text, floating over the photo. Feels premium and modern. Works well for info blocks overlaid on nature photos.

**Satori compatibility:** Partial — satori supports `background: rgba()` and `borderRadius` but NOT `backdrop-filter: blur()`. Workaround: use a semi-transparent solid colour block (`rgba(26, 46, 26, 0.85)`) which achieves 80% of the effect.

### Neobrutalism (Attention-Grabbing)

Bold borders, blocky shapes, high-contrast colours. Captures attention in scroll feeds. Good for safety-critical cards (poisonous mushrooms in Pilzfang, protected species).

**Satori compatibility:** Full — just needs bold borders, solid colours, thick font weights.

### Earth Tone Palette (Nature Content Winner)

Pinterest 2026 trends report: mossy greens, stony greys, khaki utility tones, cool blues dominate nature content. This validates the existing SnapCard palettes:
- Klassisch (#1a2e1a forest green) = mossy green ✓
- Lagerfeuer (#2d1810 dark wood) = earthy khaki ✓
- Bayern (#0b3d91 blue) = cool blue ✓

---

## 4. Gamification Elements (Light Touch for Solo Users)

### What Works WITHOUT Daily Commitment

| Element | Why It Works | Solo-Founder Maintenance |
|---------|-------------|------------------------|
| **Species collection** | "I've caught 12 of 18 Bayern species" | Zero — data already exists |
| **Rarity tiers** | Huchen card = rare, Rotauge = common | Zero — already in priority_tier |
| **Seasonal badges** | "Winter Fisher 2026" for Dec-Feb catch | Annual config, no real-time |
| **Location stamps** | Map of where you've fished | GPS data already optional |
| **Card count** | "Your 47th catch card" — simple counter | Trivial to implement |

### What DOESN'T Work (Avoid)

- **Daily streaks** — anglers don't fish every day. Streak pressure kills casual users.
- **Leaderboards** — competition is antithetical to relaxed fishing culture.
- **Social feed** — Rule 11 violation (requires moderation, content policy, abuse handling).
- **Points/currency** — adds complexity for zero return in a utility app.

---

## 5. Social Media Format Insights

### Pinterest (Longest Content Lifespan)

Pins have a **3.88-month average lifespan** — longest of any platform. Nature/outdoor pins last even longer. Recipe cards are the #1 saved format on Pinterest.

**Implication for SnapCard:** Cards with recipes will get saved more than cards without. Recipe blocks aren't just fun — they're a Pinterest distribution strategy. The feed format (1080×1350) works on Pinterest, but 1000×1500 (2:3 ratio) is the Pinterest sweet spot. Consider adding this as an output format.

### Instagram (Carousels Win)

Carousels get **6.9% median engagement** vs. single images. Multi-card sequences work.

**Implication for SnapCard:** Consider a "card deck" export — 3 slides for a carousel:
1. Hero photo with species name
2. Fun fact + name origin
3. Recipe + location/date

### TikTok ("Did You Know" Format)

The viral nature-education format: surprising opener → one focused fact → visual reinforcement.

**Implication for SnapCard:** The Stories format (1080×1920) can double as TikTok-ready content if we add a "Did You Know?" header treatment. The Aal fact (5,000 km to the Sargasso Sea) and the Äsche fact (smells like thyme) are textbook TikTok hooks.

---

## 6. Concrete Improvements for SnapCard Templates

Based on all research, these changes would boost shareability:

### High-Impact (Do Now)

1. **Gradient overlay on photo zone.** Semi-transparent gradient from bg_primary at bottom fading to transparent at 40%. Ensures text over photo is always readable.

2. **Fun fact FIRST.** When the user selects multiple blocks, fun_fact should render immediately below the species name — it's the share driver.

3. **"Wusstest du?" prefix.** The "Did you know?" framing increases attention by 23% (BuzzSumo data). The German "Wusstest du?" is already in the i18n file — use it as the fun_fact block header.

4. **Personal metadata matters.** Angler name, date, and location should feel integrated, not tacked on. They convert a generic info card into "proof I was there."

### Medium-Impact (v0.2)

5. **Pinterest-optimised format.** Add 1000×1500 (2:3) as a fourth output format. Pinterest-native ratio.

6. **Carousel export.** Generate 3-slide Instagram carousel from a single card config.

7. **Rarity badge.** Subtle tier indicator — e.g., "Seltener Fang" (rare catch) badge for Tier 1 predators and protected species.

### Low-Impact (v0.3+)

8. **Glassmorphism info blocks.** When satori gets `backdrop-filter` support (or when moving to native), upgrade info blocks to frosted glass.

9. **Animated card reveal.** For Stories/TikTok — the card builds up block by block. Requires video export.

---

## 7. Accounts & Communities Worth Studying

### Mushroom/Foraging
- **@shroom_momma** (Instagram, 45K followers) — Beautiful foraging cards, high reshare rate
- **@no_morels** (Instagram) — Focused mushroom content, education-first
- **Pilzforum.eu** — Active German community, photo-centric discussions

### Birding
- **#birdsofinstagram** (1M+ posts) — Volume proves demand
- **Tom's Bird Academy** (TikTok, 220K followers) — Weekly bird spotlights, education format
- **NABU Vogelwelt app** — German bird ID with community elements

### Fishing
- **AlleAngeln** (1M+ catch reports) — Utilitarian catch logs, NO pretty cards = gap
- **FishBrain** (20M+ users) — Catch data, social feed, but no shareable designed cards = gap
- **@thefishinglife** (Instagram) — Photo-first fishing content

### General Card/Share Patterns
- **Spotify Wrapped** (Figma community templates) — Study the typography and colour treatment
- **Strava Year in Sport** — Activity summary cards, clean design
- **Letterboxd** — Film review cards, font-forward, screenshot-friendly

---

*This research feeds directly into card template design. The species JSON configs at `data/species/bayern.json` are structured to make the highest-shareability blocks easy to access for the renderer.*
