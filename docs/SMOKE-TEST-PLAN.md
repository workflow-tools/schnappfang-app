# Schnappfang — Smoke Test Plan

> **Purpose:** Determine whether German anglers experience genuine pull toward
> auto-assembled catch cards *before* any code is written. This plan is
> date-agnostic; phases are expressed as `T+0`, `T+1`, etc. so the window can
> be dropped onto the calendar when the founder is ready to execute.
>
> **Status when drafted:** 2026-04-11. **Pivoted:** 2026-04-12.
> No code written. Domain `schnappfang.de` reported available, not yet
> registered. Zero photos sourced. Zero cards produced.
>
> **Owner:** Ryan Hill (solo). ML Upskill Agents UG, Vilseck, Bayern.

---

## Pivot Notice (2026-04-12): Convenience-First MVP

**The insight:** by the time an angler uses Schnappfang, the keep/release
decision is already behind them. A retrospective regulation verdict answers
a question nobody is asking while inheriting €5,000-fine liability.

**The pivot:** Schnappfang MVP is now a **convenience-first composable catch
card** with optional fun info blocks. Cards no longer render keep/release
verdicts. All card elements except species ID and photo are optional:

- Catch-day weather (Bright Sky API)
- Recipe suggestion (camp + home variant)
- Moon phase / solunar indicator
- Species fun facts (German name origin, habitat, typical size)
- Germany-specific fun fact
- GPS coordinates of the catch
- Catch season hint (informational, not a verdict)
- Link to full regulations at gesetze-bayern.de

**What changed in this plan:**

- §3 (Constraints): Rule 6 no longer gates card production. Regulation data
  shown on cards is informational only — season hints and a regulations link,
  never a verdict.
- §5.3 (Regulation workbook): Superseded by `bayern-species-smoketest.csv`,
  a species info database with fun facts, recipes, moon data, and photo notes.
- §7.1 (Per-card workflow): Step 2 (regulation lookup + verdict) replaced by
  species fun fact population + optional season hint. The QA gate no longer
  blocks on AVBayFiG verification.
- §7.1 (QA gate): Verdict-related checkboxes removed. New checks: fun fact
  present, name origin present, recipe pair present (or flagged as gap).

**Sections below retain their original text** where it is still accurate.
Sections affected by the pivot are annotated inline with `[PIVOTED]` markers.
The original regulation-verdict text is left for audit trail; the `[PIVOTED]`
block is the current scope.

---

## 1. What We Are Testing

The MISAWA composite-gap hypothesis: *individual features of the Schnappfang
pipeline already exist as free or cheap products (FishLog, Fische bestimmen,
TrophyFish), but no product assembles all of them into a single shareable card
for the German angler*. The smoke test validates whether that composite —
photo → species → Bayern regulation verdict → recipe → beautiful card — creates
pull that the individual features do not.

**We are NOT testing:**

- The AI identification pipeline (Claude Vision) — manual species assignment
  only during the smoke test.
- The card generation code — cards are assembled by hand in Canva/Figma.
- Payment psychology — no price is mentioned in any post.
- The "unbekannte Art" failure path — every smoke test card shows a species we
  have already confirmed.

---

## 2. Success and Failure Signals

### Strong success

- Unprompted inbound asks: *"Wie hast du das gemacht?"*, *"Gibt's das als
  App?"*, *"Kannst du mir eine für meinen Hecht von letzter Woche machen?"*
- At least **3 strangers** (not personal contacts) request a card for their
  own catch across the five seeding channels.
- Any post reaches **double-digit genuine replies** (not likes) on
  Anglerboard, Alle Angeln, or r/Angeln.
- Any card is voluntarily reshared by someone we did not DM directly.
- Email signups to the landing page from a source other than direct DMs.

### Weak success / ambiguous

- Many likes, low reply volume. Interpretation: visually pleasant but not a
  felt need. Proceed to a smaller v0.1 scope (photo → card → share, skip
  regulation and recipe) and retest.

### Failure

- Polite likes, zero follow-up questions, "brauche ich nicht" consensus, or
  active pushback ("noch eine KI-App, braucht keiner"). Shelve the project,
  file a `[research]` entry in `patterns/DEV-LOG.md` with what the rejection
  told us, and move the card-generation template work to the
  `patterns/patterns/` library for reuse elsewhere.

### Decision gate

At `T+end` (end of measurement window) a single yes/no call:

1. Did we see at least one strong success signal? → **Go v0.1 scope.**
2. Only weak signals? → **Go narrowed scope (card + share only).**
3. No signals? → **No-go, archive the work.**

---

## 3. Constraints and Non-Negotiables

**[PIVOTED 2026-04-12]** Constraints updated to reflect convenience-first MVP.
Regulation-verdict constraints (Rule 5/6) are superseded by the pivot; the
card no longer renders keep/release verdicts. Remaining constraints:

- **Fun facts and species data must be accurate.** Fun facts, name origins,
  and habitat descriptions must be factually correct. Inaccuracy on a trivial
  fun fact ("the Äsche smells like thyme") is embarrassing; inaccuracy on a
  conservation claim ("the Nase is protected") could mislead. When in doubt,
  soften the claim or omit it.
- **Season hints are informational, not verdicts.** A card may say "Hecht —
  Frühling bis Herbst" but must never say "Darf entnommen werden" or imply a
  legal ruling. Where a species' status is variable (Äsche, Huchen, Nase,
  Renke), the hint must say "lokal informieren" and link to official sources.
- **Rule 9 (i18n).** All card copy is German. The watermark is the one
  English-ish word `Schnappfang` (or `schnappfang.de` post-registration).
- **Rule 10 (DSGVO).** Every photo used on a public card must have explicit
  written permission from the photographer. Permission is logged in the
  tracking sheet (see §10) with timestamp and channel. No stock photo is ever
  captioned with a named angler.
- **Rule 11 (Solo Founder Sustainability).** The smoke test must be runnable
  inside one working week of evening hours, not a full-time sprint. Any phase
  that cannot be time-boxed is cut.
- **All card info blocks are optional.** The angler chooses which blocks
  appear. The card must look complete and beautiful with any combination of:
  weather, recipe, moon phase, fun fact, GPS, season hint.

---

## 4. Phase Breakdown (Date-Agnostic)

| Phase | Relative window | Deliverable | Time-box |
|---|---|---|---|
| 0. Prep | `T-3` → `T-1` | Domain reserved, landing page live, templates drafted, species info database seeded, outreach list built | ~6 h |
| 1. Photo outreach | `T-2` → `T+0` | 12–15 photos collected with written permission | ~4 h over 3 days |
| 2. Card production | `T-1` → `T+2` | 12–15 finished cards with fun facts, recipe, weather, optional info blocks | ~6 h |
| 3. Seeding | `T+2` → `T+3` | Posts live on 5 channels | ~2 h |
| 4. Measurement | `T+3` → `T+17` | 2-week response tracking | ~30 min/day passive |
| 5. Decision | `T+17` → `T+18` | Go / narrow / no-go call, logged in DEV-LOG | ~1 h |

`T+0` is the first day of active smoke-test posting. Pick `T+0` when the
founder has a calm week ahead; do not start if a Rebeka, GRUND, or WritingPAD
fire is burning.

---

## 5. Phase 0 — Prep

### 5.1 Domain and landing page

- [ ] Register `schnappfang.de` at INWX or United Domains. Budget: ~€10/year.
- [ ] Register `snapfang.com` defensively. Budget: ~$12/year.
- [ ] Deploy a single-page "Kommt bald" on Vercel. Content:
  - One hero example card (the strongest of the 12–15 produced in Phase 2)
  - One-line pitch in German
  - Email capture field (ConvertKit, Buttondown, or Loops free tier)
  - Impressum linking to ML Upskill Agents UG details (legally required per
    §5 TMG — not optional)
  - Datenschutzerklärung stub noting only that the email is used for launch
    notification
- [ ] Watermark decision: use plain `Schnappfang` on cards until the domain
  resolves; switch to `schnappfang.de` on the next batch once DNS is live.

### 5.2 Card templates

- [ ] Draft three templates in Canva or Figma at the mandated dimensions:
  - **Klassisch** — clean, neutral, fish-forward; the "default" template
  - **Bayern** — white-and-blue Rautenmuster accent, Fraktur-ish display
    font for "Fang des Tages", Bayern state colors
  - **Lagerfeuer** — warm palette, rustic texture, targeted at angler
    camping trips and BBQ/grill recipes
- [ ] Every template must include all of: photo slot, species line (German +
  Latin in italics), date, location (city/region only — never GPS), verdict
  block, regulation citation with `Stand:` date, recipe line, and watermark.
- [ ] Export targets per card: PNG 1080×1350 (Instagram feed), PNG 1080×1920
  (Stories), PDF A6 landscape (print).
- [ ] Confirm template tokens (colors, fonts, spacing) are centralized in a
  Canva brand kit or Figma variables set, so a v0.1 template port is not a
  re-design.

### 5.3 Species info database

**[PIVOTED 2026-04-12]** Previously "Regulation workbook scaffold." Now a
species info database for the convenience-first card.

`schnappfang-app/docs/bayern-species-smoketest.csv` — **already seeded**
(18 species × 13 columns). Schema:

```
species_de, species_la, priority_tier, typical_size_cm, habitat_de,
german_name_origin, fun_fact_de, catch_season_hint, regulations_link,
recipe_camp, recipe_home, moon_solunar_relevance, photo_notes
```

- [x] 18 priority species seeded with fun facts, name origins, habitats,
  season hints, recipes (16/18), moon notes, and photo guidance.
- [x] See `SPECIES-PRIORITY-NOTES.md` for full justification of species
  selection criteria.
- [ ] QA pass: verify each fun fact and name origin against a reference
  source. Soften or remove any claim that cannot be confirmed.
- [ ] Fill recipe gaps for Huchen and Nase if appropriate (both are rare/
  protected — recipes may be intentionally omitted).

### 5.4 Outreach list

- [ ] Build a list of 20–30 angler contacts across Vilseck / Oberpfalz. Over-
  source on purpose — half will not reply in time.
- [ ] Group by channel: WhatsApp direct, Signal direct, Angelverein contact,
  Facebook group member, Anglerboard PN, colleague-of-colleague referral.
- [ ] For each contact log: name, channel, relationship, last contact, German
  or English comfort.

---

## 6. Phase 1 — Photo Outreach

### 6.1 Target mix

- **10 real photos** from angler contacts in Oberpfalz. Preferred.
- **3–5 royalty-free fallbacks** from Unsplash / Pexels / Wirestock, used only
  if personal sourcing stalls. Fallback cards are captioned with a neutral
  first name (not a real person) and marked internally as `SRC: stock` so they
  are never misattributed.

### 6.2 German outreach script (WhatsApp / Signal)

Use as a template; personalize the first line for each contact.

> Servus [Name],
>
> ich bastle gerade an einer kleinen Idee: eine automatische *Fangkarte*, die
> aus einem Foto den Fisch erkennt, ein passendes Rezept vorschlägt, das Wetter
> und die Mondphase zum Fangzeitpunkt dazupackt und das Ganze als schicke Karte
> zum Teilen zusammenbaut — in ein paar Sekunden, ohne App-Installation und
> ohne Konto.
>
> Ich brauche für einen kurzen Test 10–15 echte Fangfotos aus Bayern. Hättest
> du eins (oder mehrere) aus den letzten Monaten, das ich verwenden darf? Ich
> mache dir im Gegenzug eine fertige Karte zu deinem Fang, die du auf WhatsApp
> oder Insta teilen kannst.
>
> Wichtig: ich speichere keine Fotos irgendwo, und deinen Namen nenne ich nur,
> wenn du das ausdrücklich möchtest. Alles was du schickst, bleibt unter uns.
>
> Petri Heil,
> Ryan

- **Do not** use the words "App", "SaaS", "KI", "AI", or "KI-gestützt" in the
  outreach text. These words polarize outdoor communities (per MISAWA
  findings). Use "automatische Fangkarte", "Werkzeug", or "kleines Projekt".
- **Do** emphasize no account, no install, no tracking.
- **Do** offer a fair trade — a finished card for their catch — instead of
  asking for a free favor.
- **Do** ask explicitly for written permission to use the photo on a public
  post. Log the permission message with timestamp in the tracking sheet.

### 6.3 Permission and DSGVO log

For every photo accepted, record in `docs/smoketest-tracking.csv`:

```
photo_id, source_contact, permission_granted_at, permission_channel,
may_use_publicly, may_name_angler, may_name_water, photo_file_hash,
fish_species_claimed_by_angler, catch_location_city, catch_date, notes
```

- Default `may_name_water` to `false`. Anglers are protective of their
  Hausgewässer. Show region only (e.g., "Oberpfalz").
- If a contact grants permission by voice or in person, note that the written
  confirmation was requested in writing afterward.

---

## 7. Phase 2 — Card Production

### 7.1 Per-card workflow

**[PIVOTED 2026-04-12]** Updated for convenience-first MVP. Regulation
verdict step removed; replaced by species info population.

For each of the 12–15 cards, in this order:

1. **Species ID (manual).** Confirm the species against a reference guide
   (BLV Fischführer, Angelboard species pages). If the angler's claim and the
   reference disagree, ask the angler before proceeding. No Claude Vision is
   used during the smoke test; the goal is to avoid confounding the card-pull
   signal with AI-accuracy noise.
2. **Species info population.** Find the species in
   `docs/bayern-species-smoketest.csv`. Pull: fun fact, German name origin,
   habitat, typical size, catch season hint, moon/solunar note, and photo
   notes. All of these are optional on the card — the angler (or in the
   smoke test, the founder) picks which blocks appear.
3. **Recipe match.** Pick one camp recipe and one home recipe from the CSV's
   `recipe_camp` and `recipe_home` columns. If the species has no match
   (Huchen, Nase), skip the recipe block on the card and mark internally
   with `recipe: none` so we know the gap.
4. **Weather overlay.** Optional. If the catch date and city are known, pull
   the historical weather from Bright Sky (`api.brightsky.dev`) for that date
   and include one line (e.g., `12 °C, bedeckt, leichter Ostwind`). If
   unavailable, omit the line rather than invent one.
5. **Moon phase.** Optional. If the catch date is known, compute moon phase
   and include a one-line note (e.g., `🌕 Vollmond — Raubfische aktiver`).
   Moon phase computation is deterministic — no API needed.
6. **GPS coordinates.** Optional. Include only if the angler explicitly
   shares location AND grants permission. Default: omit. Show city/region
   only unless GPS is explicitly opted in.
7. **Card assembly.** Open the chosen template in Canva/Figma, drop in the
   photo, populate the selected info blocks, add watermark, export all three
   formats. The card must look complete regardless of which optional blocks
   are included.
8. **QA gate.** Before the card leaves the folder:
   - [ ] Species Latin name spelled correctly and italicised
   - [ ] Fun fact is accurate and sourced
   - [ ] German name origin is plausible / cited
   - [ ] Recipe matches the species (or gap is flagged)
   - [ ] Season hint says "lokal informieren" for variable-status species
   - [ ] No verdict language anywhere (no "Darf entnommen werden", no ✅/❌)
   - [ ] Watermark present
   - [ ] GPS only shown if angler opted in; otherwise city/region only
   - [ ] Photo permission logged in tracking sheet
   - [ ] File exported at 1080×1350 and 1080×1920 and PDF A6

### 7.2 Recipe seed list (smoke test subset)

Target: 2 recipes per likely species × (camp / home) = up to 24 recipe slots.
The smoke test can survive with partial coverage; the full 30-recipe v0.2
dataset is out of scope here.

- [ ] Draft recipes in `docs/recipes-smoketest.md` with columns: species,
  variant (`camp` / `home`), title, 3-line description, key ingredients, rough
  time. German-only copy; English internals only in front matter.
- [ ] Prioritise coverage in this order: Forelle, Hecht, Zander, Karpfen,
  Barsch, Saibling, Aitel. These account for most of the expected photo set.

### 7.3 Folder layout

```
schnappfang-app/docs/
  SMOKE-TEST-PLAN.md             ← this file
  SPECIES-PRIORITY-NOTES.md      ← species selection justification
  bayern-species-smoketest.csv   ← species info database (post-pivot)
  bayern-regulations-smoketest.csv ← superseded, retained for reference
  smoketest-tracking.csv
  cards/
    raw-photos/                  ← gitignored; photos never committed
    finished/
      card-001-hecht-klassisch.png
      card-001-hecht-klassisch-story.png
      card-001-hecht-klassisch.pdf
      ...
```

- [ ] Add a `.gitignore` entry in `schnappfang-app/` for `docs/cards/raw-photos/`
  and for any `*.heic` / `*.jpg` / `*.png` originals under the cards tree.
  Finished exports may be committed if every photo in them has public-use
  permission logged. When in doubt, gitignore the finished card too and keep
  it local.

---

## 8. Phase 3 — Seeding

### 8.1 The five channels

| # | Channel | Mechanic | Audience shape | Permission model |
|---|---|---|---|---|
| 1 | Anglerboard.de | Forum post in the appropriate Bayern / Allgemein subforum | Serious, opinionated, high-signal | Post as self, disclose solo-founder context openly |
| 2 | Alle Angeln | Post in a Bayern group or the general feed | Social-first, broader | Same |
| 3 | r/Angeln | Reddit post with 2–3 card images | English-DE mix, small but curious | Follow subreddit self-promo rules; ask mods if needed |
| 4 | WhatsApp / Signal groups | Drop the card into 2–3 angler groups the founder already belongs to | Warm, friend-of-friend | Implicit if the founder is already a group member |
| 5 | Facebook Bayern angler groups | Post to 1–2 regional groups | Older skew, higher noise | Read group rules first; disclose non-commercial test |

- [ ] Disclose up front in every post that this is an experiment, that no
  product exists yet, and that the cards were assembled by hand. Honesty
  protects against the "noch eine KI-App" reflex and builds credibility if
  the project ships.
- [ ] Space the posts across two or three days. Posting to all five channels
  at once is both overwhelming for the founder and harder to attribute
  signal to channel.

### 8.2 German post framing

Use this as the template for forum-style posts. Shorter variants for
WhatsApp / Signal.

> Hallo zusammen,
>
> ich bastle an einer Idee und möchte sie kurz mit euch testen, bevor ich
> irgendetwas baue: eine **automatische Fangkarte**, die aus einem Foto den
> Fisch erkennt, ein passendes Rezept vorschlägt, das Wetter und die Mondphase
> zum Fangzeitpunkt dazupackt und alles als schicke Karte zum Teilen
> zusammenbaut — in ein paar Sekunden, ohne App-Installation, ohne Konto.
>
> Zum Testen habe ich **ein paar Karten von Hand** (noch kein Code, noch
> keine Anwendung) auf Basis echter Fänge aus der Oberpfalz gebastelt.
>
> Hier sind drei davon: [Bild 1 · Bild 2 · Bild 3]
>
> Meine ehrliche Frage an euch:
> - Würdet ihr so eine Karte nach einem schönen Fang bauen / teilen wollen?
> - Was fehlt? Was ist überflüssig? Was würdet ihr anders machen?
> - Und: welche Info auf so einer Karte ist für euch Gold wert, welche ist
>   nur Deko?
>
> Ich bin Solo-Entwickler aus Vilseck, kein Marketing, kein Verkauf — ich
> will nur verstehen, ob das Ding einen Nerv trifft, bevor ich dran baue.
>
> Petri Heil,
> Ryan

Avoid in all variants: *App, SaaS, KI, AI, automatisch-gestützt*. Use:
*Fangkarte, automatisch, zum Teilen, Werkzeug, bastle*.

---

## 9. Phase 4 — Measurement (Two Weeks)

### 9.1 What to track

For each channel, every day for 14 days, log in `docs/smoketest-tracking.csv`
(second sheet or section):

```
date, channel, post_url, views_or_impressions, likes_or_upvotes,
comments_or_replies, inbound_dms, ask_count_how_did_you_do_it,
ask_count_is_it_an_app, third_party_reshares, new_email_signups,
strongest_quote_today
```

- **"Ask count — how did you do it"** and **"is it an app"** are the two
  signals MISAWA identified as strongest. Count them literally.
- **"Strongest quote today"** is the highest-signal single message received
  that day. Paste it verbatim (translate later). The winning quote is the
  single best piece of pull data the smoke test can produce.

### 9.2 Landing page signals

If the landing page is live:

- Daily email signup count
- Source attribution if the email tool supports it (e.g., `?src=anglerboard`
  UTM on each seeded link)
- Any unsubscribes within 24 h of signup (negative signal)

### 9.3 Passive, not active

The measurement window is passive. Do **not** push for replies during the
window. Do **not** ask "what did you think?" to people who liked but did not
comment. Pull that is manufactured by follow-up is not pull.

### 9.4 Respond to inbound with a fair trade

If someone DMs asking for a card for their own fish, make the card and send
it. This is cheap, high-trust, and doubles as a second wave of photos for a
follow-up smoke test if Phase 4 is ambiguous.

---

## 10. Phase 5 — Decision

At `T+17` or `T+18`, in one sitting of no more than an hour:

1. Count the signals. Compare against §2.
2. Read the "strongest quotes" column end to end.
3. Write a single paragraph in `patterns/DEV-LOG.md` (tag `[research]` and
   `[pivot]` if the call is narrow-scope or no-go) stating the call, the
   strongest quote that drove it, and one sentence on what we learned that
   would not have been visible without running the test.
4. If **Go** or **Narrow**, create a v0.1 planning doc in
   `schnappfang-app/docs/V0.1-PLAN.md` citing this file as the upstream
   artefact.
5. If **No-go**, archive this project directory to `_archive/` and file the
   card-template work as a reusable pattern proposal in `PATTERN-INBOX.md`
   (tag: "social card generator for regulated-content verticals").

---

## 11. Risks and Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| A smoke-test card prints a wrong Schonzeit verdict and a recipient acts on it | Low | **Very high** (€5,000 fine, reputational) | Rule 6 gate in §7.1; refuse to produce a card for any species not fully cited in the workbook |
| Photo permission dispute post-hoc | Low | High (DSGVO complaint, takedown) | Written permission logged per §6.3; default `may_name_angler=false` |
| "KI-App"-style backlash in forums | Medium | Medium (poisons the well for launch) | Posting framing in §8.2 avoids the trigger words; disclose solo-founder status up front |
| Phase 2 time-box blown by manual recipe matching | Medium | Low | Cap recipe coverage at "good enough"; use `recipe: generic` fallback marker |
| Domain not registered before Phase 3 | Medium | Low | Watermark falls back to plain `Schnappfang`; landing page is optional for the first posting wave |
| Signal is ambiguous and tempts a decision by vibes | High | Medium | §10 forces the call in writing with a quoted piece of evidence, not a gut read |
| Two-week window overlaps with a GRUND / Rebeka deadline | Medium | Medium | `T+0` is founder-scheduled; do not start if another product is on fire |
| Royalty-free stock photos bleed into real-angler attribution | Low | High (fraud accusation) | `SRC: stock` internal flag; stock cards are never captioned with a real first name |

---

## 12. Exit Artefacts

Whatever the decision, the smoke test must leave these files behind in
`schnappfang-app/docs/`:

- `SMOKE-TEST-PLAN.md` — this file (with pivot amendments)
- `SMOKE-TEST-RESULTS.md` — the Phase 5 write-up, created on the decision day
- `SPECIES-PRIORITY-NOTES.md` — species selection justification
- `bayern-species-smoketest.csv` — the species info database, now seed data
  for v0.1 or reusable research if the project is shelved
- `bayern-regulations-smoketest.csv` — superseded regulation workbook,
  retained for reference
- `smoketest-tracking.csv` — raw measurement data, kept for learning

All of the above are evidence, not ephemera. They also serve as primary-source
material for the dissertation's "indie developer pipeline" log if the
dissertation chapter on method ever needs an example of a disciplined no-code
validation pass.

---

## 13. Cross-References

- `INIT.md` (to be authored) — project context, competitive landscape,
  architecture direction
- `PROJECT-INSTRUCTIONS.md` (to be authored) — canonical development ruleset
  (Rules 1–12)
- `patterns/DEV-LOG.md` — workspace-wide dev log; phase transitions and the
  final decision are logged here
- `patterns/PATTERN-INBOX.md` — landing point for any reusable pattern
  discovered during smoke-test execution (e.g., a regulated-content card
  template pattern)
- `patterns/ideas/MICRO-SAAS-IDEAS.md` — landing point if the smoke test
  surfaces adjacent product signals not covered by the Schnappfang scope

---

*Alle Angaben ohne Gewähr. Es gelten die gesetzlichen Bestimmungen des
BayFiG / AVBayFiG. Stand dieses Plans: April 2026.*
