# Gipfelfang Smoke Test: Channels and Imagery Strategy

---

## Part 1: Growth Channels & Community Discovery

### Primary Channels

#### 1. Pinterest (Alpine Travel + Hiking Boards)
- **Board targeting:** "Bayern hiking trails", "Alpine summits", "Berchtesgaden", "Allgäu hiking"
- **Pin strategy:** Summit panorama + trail difficulty badge + "collect them all" framing
- **Engagement hook:** "16 iconic Alpine summits collectible card app"
- **Traffic potential:** High (visual-first platform, hiking/travel interest heavy)
- **Account:** @gipfelfang.app (handle reserved, pins link to gipfelfang.de)

#### 2. Instagram (Visual Storytelling + Hiking Community)
- **Content pillar 1:** User summit captures (reposted with credit)
- **Content pillar 2:** "Peak of the week" deep-dives (history, geology, route options)
- **Content pillar 3:** Reels: "Can you summit all 16?" challenges, time-lapses
- **Hashtag strategy:** #gipfelfang #alpenhöhe #bergwandern #bayernwandern #sammeln
- **Engagement:** Tag @DAVAlpenverein, @alpenverein.de, local hiking influencers
- **Account:** @gipfelfang (10–20 posts/month cadence)

#### 3. Komoot Community (Route Logging + Direct Navigation)
- **Strategy:** Embed 16 summits as top-rated collections on Komoot
- **Leverage:** Komoot users typically share + log summits; natural pipeline to Gipfelfang cards
- **Cross-promotion:** "Log your summit on Komoot → collect card on Gipfelfang"
- **Integration:** Komoot deep-links → gipfelfang.de/summits/{gipfel_id}
- **Engagement:** Comment on user routes tagged with summit names

#### 4. hikr.org (German Alpine Hiking Logs)
- **Strategy:** Hikr.org users are serious Alpine loggers; high propensity to collect
- **Route posting:** Register as "gipfelfang-guide" account, post official 16 route guides
- **Engagement:** Comment on user logs with "Did you capture this on Gipfelfang?"
- **Community:** Tag local Alpine clubs; hikr.org traffic skews German-speaking

#### 5. DAV Sections (Local Alpine Club Chapters)
- **Target sections:** DAV Garmisch, DAV Bad Hindelang, DAV München, DAV Kempten
- **Strategy:** Pitch Gipfelfang as engagement tool for section members
- **Collaboration:** Co-branded "16 summits challenge" for section meets
- **Newsletter:** Contact section newsletter editors; offer free promo codes
- **Events:** Sponsorship angle for summer hiking meetups

#### 6. bergfex.de Community (Austrian/German Mountain Portal)
- **Strategy:** Bergfex is heavy-traffic mountain portal for DACH region
- **Route integration:** Post 16 summit guides to bergfex; link profile to gipfelfang.de
- **Community posts:** "Gipfelfang collection challenge" post in forum
- **Weather data:** Bergfex weather feeds API integration potential (future)

#### 7. Facebook Hiking Groups (Regional Targeting)
- **Groups to target:**
  - "Bayern Wanderer" (30k members)
  - "Alpen Wandergruppe" (25k members)
  - "Bayerische Alpen Wanderungen" (15k members)
  - "Berchtesgaden & Umgebung Wanderer" (12k members)
  - Regional town-specific groups (Garmisch, Füssen, Oberstdorf, Bad Tölz)
- **Post strategy:** Week 1–2 soft launch ("collect summits app"), Week 3+ user testimonials + challenge posts
- **Engagement:** Admin approval required; position as "Bayern hiking resource tool"

---

## Part 2: Account Creation Checklist for gipfelfang.de

### Domain & Brand Setup
- [ ] Domain registered: `gipfelfang.de` (owner: Gipfelfang UG)
- [ ] WHOIS privacy enabled
- [ ] SSL certificate installed (Let's Encrypt auto-renewal)
- [ ] Primary domain redirect: www → non-www (or opposite; choose 1)

### Email & Communications
- [ ] Transactional email: `noreply@gipfelfang.de` (SendGrid or Brevo SMTP)
- [ ] Support email: `support@gipfelfang.de` (redirects to team inbox)
- [ ] No-reply policy: Auto-responder off; use notification system only

### Social Accounts (Primary)
- [ ] **Instagram:** @gipfelfang (linked profile → gipfelfang.de/instagram)
  - Bio: "Sammle alpine Gipfel in Bayern & den Alpen"
  - Link in bio: gipfelfang.de
- [ ] **Pinterest:** @gipfelfang.app (linked profile)
  - Board: "16 Gipfel der Alpen"
  - Rich pins enabled (clickthrough to app)
- [ ] **Facebook Page:** Gipfelfang (linked profile, verified if possible)
  - Category: App / Travel / Sports
  - CTA button: "Collect Summits"

### Social Accounts (Secondary / Community)
- [ ] **Komoot:** Register as "gipfelfang-guide", collection: "16 Gipfel Challenge"
- [ ] **Twitter/X:** @gipfelfang (optional; low priority for hiking demographic)
- [ ] **TikTok:** @gipfelfang (optional; test with Shorts/Reels first)
- [ ] **Bluesky:** @gipfelfang.de (Alpine tech community emerging)

### SEO & Analytics
- [ ] Google Search Console: Domain verified
- [ ] Google Analytics 4: Property created, measurement ID installed
- [ ] Google My Business: Optional (local presence if HQ in Bayern)
- [ ] Bing Webmaster Tools: Sitemap submitted
- [ ] Open Graph meta tags: Configured for Pinterest, Facebook, Komoot previews
- [ ] robots.txt & sitemap.xml: Generated and accessible

### App Store Presences
- [ ] iOS App Store: Developer account setup, bundle ID registered
  - Keyword tags: gipfel, alpen, wandern, sammeln, bayern
  - Promotional assets (screenshots, preview video) uploaded
- [ ] Google Play Store: Developer account setup
  - Content rating form completed
  - Privacy policy linked in app store listing
- [ ] F-Droid (optional): Separate submission if open-source

### Legal & Privacy
- [ ] Privacy Policy: Compliant with GDPR, CCPA (published at gipfelfang.de/privacy)
- [ ] Terms of Service: Published at gipfelfang.de/terms
- [ ] Imprint (Impressum): Required in Germany, published at gipfelfang.de/imprint
- [ ] Data Processing Agreement (if storing user hikes): Ready for DAV/user audits
- [ ] GDPR data subject request process: Documented

### Content & Marketing
- [ ] Logo files: SVG + PNG (1x, 2x, 3x) in brand folder
- [ ] Colour palette: Exported to CSS variables (see Part 5)
- [ ] Favicon: 32x32 PNG + .ico
- [ ] Apple Touch Icon: 180x180 PNG (for iOS home screen)
- [ ] Press kit: One-page PDF (Logo, screenshots, taglines)
- [ ] Email signature templates: HTML (support@ and noreply@ versions)

### Community & Partnerships
- [ ] DAV contact list: Emails for local section managers (16 sections)
- [ ] Komoot partnership inquiry: Submission to creator program
- [ ] Hikr.org moderator contact: Request for route guide directory listing
- [ ] Bergfex.de community manager: Notify of new guides posted
- [ ] Local hiking influencer list: 20–30 micro-influencers (10k–100k Instagram followers)

---

## Part 3: Nano Banana Pro Prompts for Alpine-Themed Imagery

### Prompt Architecture
**Base template:** "Alpine summit professional photography, Bayern Alpen, outdoor travel style, [season], [specific detail]"

### 1. Hero Banner Image (1500×600px, accent: Alpenglühn #e85d75)

**Prompt A (Primary):**
```
Alpine summit banner photography, Bayern Alpen, Zugspitze or Watzmann iconic peak, 
clear sunrise light, hikers silhouetted in foreground, dramatic granite cliffs, 
golden hour lighting, travel magazine aesthetic, 8K, horizontal orientation, 
banner-safe composition (no critical content in top/bottom 200px margin).
```

**Prompt B (Secondary, winter variant):**
```
Alpine summit winter photography, snow-covered Bayern peak, clear blue sky, 
pristine snow, distant forest, golden hour, dramatic shadows, high-altitude aesthetic, 
8K, horizontal banner composition, professional outdoor travel style.
```

### 2. App Icon (512×512px → scaled to 180×180, accent: Gipfelkreuz #f0f4f8)

**Prompt:**
```
Minimalist Alpine summit icon, gipfelkreuz (white mountain cross) silhouette, 
granite peak shape, clean geometric style, warm granite grey background (#3a3a3a), 
white cross accent (#f0f4f8), flat design, highly scalable, iconic mountain symbol, 
app store style, no text, centered composition.
```

### 3. OG Social Card (1200×630px, accent: #e85d75 + #f0f4f8)

**Prompt:**
```
Alpine summit social media card, horizontal 16:9, mountain panorama top-half, 
Bayern Alpen iconic peaks, clear sky, "Sammle 16 Gipfel" text overlay space 
(bottom 30% reserved), warm sunset lighting, professional travel aesthetic, 
high contrast for mobile sharing, 8K, vibrant but not oversaturated.
```

### 4. Profile Picture (1080×1080px, accent: Gipfelkreuz white)

**Prompt:**
```
Alpine summit profile picture, single iconic peak (Zugspitze or Watzmann), 
close-up mountain cross, blue sky background, dramatic lighting, square composition, 
professional outdoor photography, app branding icon, 8K, high detail, scalable to 200px.
```

### 5. Stories Background (1080×1920px vertical, accent: sky blue #2a4a6b)

**Prompt:**
```
Alpine summit vertical background, Bayern peak full-height composition, hikers 
ascending trail visible mid-frame, dramatic sky (blue hour or sunrise), depth 
of field (foreground blurred green valley, sharp peak), immersive vertical format, 
travel Instagram aesthetic, 8K, mobile-optimized, bottom 30% safe for text overlay.
```

### 6. In-App Summit Card Background (500×300px, accent subtle)

**Prompt:**
```
Alpine peak aerial landscape photograph, specific Bayern summit (rotating per card), 
authentic topographic beauty, clear daylight, high detail, professional outdoor style, 
card-sized composition (16:10 aspect), 4K minimum, vibrant but non-distracting, 
suitable for text overlay at bottom.
```

---

## Part 4: Image Workflow

### Asset Inventory

| Asset | Dimensions | Format | Count | Priority | Notes |
|-------|-----------|--------|-------|----------|-------|
| Hero Banner | 1500×600 | WebP + PNG | 2 | P0 | Alpenglühn + winter variant |
| App Icon | 512×512 | PNG + SVG | 2 | P0 | Gipfelkreuz minimalist |
| OG Card | 1200×630 | WebP + PNG | 1 | P0 | Shareable social default |
| Profile Pic | 1080×1080 | PNG | 1 | P0 | App store + social |
| Stories BG | 1080×1920 | WebP + PNG | 1 | P1 | Instagram Stories vertical |
| Summit Cards | 500×300 | WebP + PNG | 16 | P1 | One per gipfel (rotation) |
| Favicon | 32×32 | ICO + PNG | 1 | P0 | Web browser tab |
| Apple Touch | 180×180 | PNG | 1 | P1 | iOS home screen icon |

### Generation Steps

1. **Generate base assets** using Nano Banana Pro (Part 3 prompts)
2. **Screenshot/capture** real summit photos from Unsplash/DAV as reference layer
3. **Composite in Figma:** Add typography, brand colours, safety margins
4. **Export variants:**
   - 1x (web), 2x (retina), 3x (mobile high-density)
   - WebP (primary), PNG (fallback)
   - Lossless PNG for icons, lossy WebP for photography
5. **Optimize:** ImageOptim or Squoosh (target <200KB per image, <50KB for icons)
6. **Version control:** Store in `/design-system/images/v1/` with naming convention:
   - `hero-banner-alpengluehn.webp`
   - `app-icon-gipfelkreuz.svg`
   - `og-card-default.webp`
   - `summit-card-{gipfel_id}.webp` (e.g., `summit-card-zugspitze.webp`)

### Refresh Schedule

- **Seasonal rotation:** Q1 (winter snow), Q2 (spring green), Q3 (summer clear), Q4 (autumn colour)
- **Stories BG:** Update monthly (new seasonal variant)
- **Summit cards:** New user submissions prioritized; refresh 1–2 per month from DAV/Unsplash

---

## Part 5: Colour Scheme — Alpenglühn & Gipfelkreuz Templates

### Template 1: "Alpenglühn" (Alpine Glow)

**Concept:** Warm granite + alpine rose evening light. Conveys warmth, accessibility, traditional Bavarian Alpine aesthetic.

```css
--alpengluehn-primary-grey: #3a3a3a;      /* Granite foundation */
--alpengluehn-accent-rose: #e85d75;       /* Alpine rose evening glow */
--alpengluehn-light-grey: #f5f5f5;        /* Snow/sky light */
--alpengluehn-mid-grey: #8a8a8a;          /* Ridge shadow tone */
--alpengluehn-warm-brown: #6b5344;        /* Alpine earth/hut wood */
```

**Usage:**
- Primary buttons: `#e85d75` (Alpine rose)
- Text on light backgrounds: `#3a3a3a` (Granite)
- Card backgrounds: `#f5f5f5` (Snow light)
- Secondary CTA: `#6b5344` (Warm wood, DAV hut vibes)
- Hover states: Darken rose to `#d04860`, lighten grey to `#4a4a4a`

**Hex Palette:** `#3a3a3a`, `#e85d75`, `#f5f5f5`, `#8a8a8a`, `#6b5344`

---

### Template 2: "Gipfelkreuz" (Summit Cross)

**Concept:** Sky blue + pure white alpine contrast. Conveys clarity, spiritual simplicity, Tyrol-influenced minimalism.

```css
--gipfelkreuz-sky-blue: #2a4a6b;          /* Deep Alpine sky */
--gipfelkreuz-snow-white: #f0f4f8;        /* Pure mountain snow */
--gipfelkreuz-accent-gold: #c9a961;       /* Sunrise/afternoon light on white cross */
--gipfelkreuz-dark-blue: #1a2a4b;         /* Deep shadow blue (dark mode) */
--gipfelkreuz-light-blue: #5a7a9b;        /* Mid-tone sky (secondary text) */
```

**Usage:**
- Primary buttons: `#2a4a6b` (Sky blue)
- Text on light backgrounds: `#1a2a4b` (Dark blue shadow)
- Card backgrounds: `#f0f4f8` (Snow white)
- Accent/highlights: `#c9a961` (Gold sunrise on cross)
- Secondary CTA: `#5a7a9b` (Mid-tone sky)
- Hover states: Darken blue to `#1a3a5b`, warm white to `#e8ecf0`

**Hex Palette:** `#2a4a6b`, `#f0f4f8`, `#c9a961`, `#1a2a4b`, `#5a7a9b`

---

### Template Selection Guide

| Context | Template | Rationale |
|---------|----------|-----------|
| Main CTA button | Alpenglühn (rose) | Warm, inviting, drives action |
| Summit card overlay text | Gipfelkreuz (sky) | High contrast on outdoor photos |
| Navigation bar | Gipfelkreuz (sky) | Professional, structured |
| Success states (collected) | Alpenglühn (rose) | Celebratory, emotional reward |
| Dark mode | Gipfelkreuz (dark blue) | Native to sky-blue foundation |
| Footer & legal | Gipfelkreuz (light blue) | Subtle, professional |
| Seasonal campaigns | Alpenglühn (warm) | Festive, community-oriented |
| Accessibility alerts (error) | Alpenglühn (rose) | High visibility without pure red |

---

### Dark Mode Variant (Gipfelkreuz-aligned)

```css
--dark-bg-primary: #0f1a2e;               /* Deep night sky */
--dark-bg-secondary: #1a2a4b;             /* Gipfelkreuz dark blue */
--dark-text-primary: #f0f4f8;             /* Snow white on dark */
--dark-text-secondary: #c9a961;           /* Gold accents for depth */
--dark-border: #2a4a6b;                   /* Sky blue borders */
--dark-hover: #3a5a7b;                    /* Lighter blue on hover */
```

**Dark mode philosophy:** Mimics high-altitude night sky; Gipfelkreuz palette naturally dark-mode compatible.

---

## Part 6: Image Sourcing & Attribution

### Primary Sources (Royalty-Free, DACH-Optimized)

1. **Unsplash — Alps & Mountain Collections**
   - URL: https://unsplash.com/napi/search/photos?query=alpen%20bergspitze
   - Keywords: "Bayern", "Zugspitze", "Watzmann", "Allgäu", "alpine"
   - Attribution: Standard Unsplash (free, no credit required but appreciated)
   - Quality: High; professional outdoor photographers

2. **DAV (Deutscher Alpenverein) Photo Archive**
   - URL: https://www.alpenverein.de/
   - Contact: Fotoarchiv-Team (licensing inquiry)
   - Terms: DAV-licensed images available for partners; request via official channels
   - Quality: Authentic, summit-verified, historical depth
   - Cost: Licensing may apply; negotiate for app partnership

3. **Wikimedia Commons — Mountain Photography**
   - URL: https://commons.wikimedia.org/wiki/Category:Alps
   - License: CC-BY-SA (requires attribution in image footer)
   - Keywords: "Zugspitze", "Watzmann", "Bayern", "Alps"
   - Quality: User-submitted, variable quality; curate for consistency

4. **Bergfex.de Community Gallery**
   - URL: https://www.bergfex.de/
   - Contact: Bergfex licensing (partnership inquiry)
   - Terms: Community-contributed; licensing negotiable
   - Quality: Authentic user captures; authentic hiking context

5. **Pixabay — Free Alpine Stock**
   - URL: https://pixabay.com/photos/?q=alps%20mountain
   - License: Pixabay License (free use, no attribution required)
   - Keywords: "Alpine", "mountain", "peak", "hiking"
   - Quality: Good for generic compositions; less summit-specific

### Secondary Sources (User-Generated & Community)

6. **Komoot User Uploads**
   - Strategy: Reach out to top Komoot route loggers for summit photo contributions
   - Incentive: Featured profile, Gipfelfang app credit, free premium access
   - License: Creative Commons (CC-BY or CC-BY-SA) preferred

7. **DAV Section Photo Submissions**
   - Strategy: Partner with local DAV sections (München, Garmisch, Bad Hindelang) for curated submissions
   - Incentive: Photo credit, section visibility in app
   - License: Work-for-hire agreement (DAV sections often own member submissions)

8. **Instagram Repost Program**
   - Strategy: Feature user summit photos with tag @gipfelfang + #gipfelfang
   - License: Terms of service include perpetual, non-exclusive right to repost (in-app + social)
   - Credit: Always credit photographer in caption

### AI-Generated Imagery (Nano Banana Pro)

9. **Nano Banana Pro Composite Layers**
   - Use AI for: Hero banners, seasonal backgrounds, abstract alpine concepts
   - Avoid: AI-only summit cards (must use authentic photography for trust)
   - Style guidance: Realistic outdoor photography, not artistic/illustrative
   - File naming: Prefix with `generated-` to distinguish from authentic sources

### Best Practices

- **Attribution format (in-app):** "Photo: © [Photographer Name] / [Source] — CC-BY" (in image footer)
- **Legal audit:** Before launch, review all 16 summit card images for licensing compliance
- **Fallback strategy:** If specific summit photo unavailable, use generic Alpine landscape (clearly labeled "Illustration")
- **Seasonal rotation:** Commit to rotating images quarterly to avoid stale content
- **Accessibility:** All images require alt-text describing peak name, season, view angle (for screen readers)

---

## Deployment Checklist

### Pre-Launch (Week 1)
- [ ] All P0 assets (hero, icon, OG card, profile pic) generated and exported
- [ ] Colour palettes implemented in CSS variables
- [ ] Social accounts created (Instagram, Pinterest, Facebook)
- [ ] App store listings drafted (iOS, Google Play)
- [ ] Domain active; email infrastructure live

### Launch Week (Week 2)
- [ ] First pinned posts across social channels
- [ ] Press kit distributed to 10–15 micro-influencers
- [ ] DAV section emails sent (introduction + collaboration offer)
- [ ] Komoot and hikr.org guide posts live
- [ ] Analytics tracking confirmed (GA4, app installs)

### Post-Launch (Weeks 3–4)
- [ ] User submissions trickling in; repost top 2–3 per week
- [ ] Seasonal Stories BG ready for first update
- [ ] Mountain photo partnerships finalized (DAV, Bergfex)
- [ ] Community engagement (reply to comments, engage with partner hashtags)
- [ ] Monthly content calendar drafted (Peak of the Week series)

