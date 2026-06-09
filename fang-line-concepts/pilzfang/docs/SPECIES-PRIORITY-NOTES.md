# Pilzfang — Species Priority Notes

> Justification for the 16 mushroom species in the smoke test dataset.
> Mirrors Schnappfang's 4-criteria framework.
> Stand: April 2026.

---

## §1. How the list was constructed

### Criterion A — Photo-likelihood
Species that foragers actually photograph in the field. Favours visually distinctive, commonly encountered species over rare or nondescript ones.

### Criterion B — Fun-info richness
Species with compelling stories: dramatic colour changes, deadly toxicity, cultural significance, record sizes, unusual growth patterns. The content that makes people share.

### Criterion C — Central European geography
Species that grow in Bayern and broader DACH region. Prioritises species found in typical Bavarian forests (mixed deciduous-coniferous, elevation 300–1200m).

### Criterion D — Safety-education value
Species involved in common identification mistakes (Champignon vs. Knollenblätterpilz) or with safety-critical handling requirements (Hallimasch raw toxicity, Morchel cooking requirement). Cards for these species double as safety education.

---

## §2. The 16 species, tier by tier

### Tier 1 — Core Edibles + Iconic Toxic (4 species)

**Steinpilz** (Boletus edulis) — The king of German foraging. Most sought-after, most photographed, most shared. *Carries on: A, B, C*

**Pfifferling** (Cantharellus cibarius) — Germany's most popular wild mushroom after Champignon. Apricot scent is a shareworthy detail. Sammelmengen-Regelung makes it legally interesting. *Carries on: A, B, C*

**Fliegenpilz** (Amanita muscaria) — ⚠️ GIFTIG. The most recognisable mushroom worldwide. Every forager photographs it. The "Ökologie statt Rezept" pattern applies — ecology blocks replace recipes. *Carries on: A, B, D*

**Marone** (Imleria badia) — Most common edible in German conifer forests. The harmless blue-staining reaction is both a safety lesson and a shareworthy visual. *Carries on: A, B, C*

### Tier 2 — Popular Edibles (4 species)

**Parasol** (Macrolepiota procera) — Size is the wow factor — 40cm hats. "Pilz-Schnitzel" recipe is beloved. Confusion risk with poisonous Chlorophyllum adds safety dimension. *Carries on: A, B, D*

**Hallimasch** (Armillaria mellea) — The name etymology ("Heil im Arsch") is unforgettable. Raw toxicity adds safety-critical dimension. Oregon mycelium fact (9 km²) is peak fun fact. *Carries on: B, C, D*

**Birkenpilz** (Leccinum scabrum) — THE beginner mushroom. Easy to identify, mild taste, grows only with birch trees. Perfect entry point for new foragers. *Carries on: A, C*

**Rotkappe** (Leccinum aurantiacum) — Dramatic black colour change when cut. Visually stunning orange cap. Colour-change photography is highly shareable. *Carries on: A, B*

### Tier 3 — Common + Safety-Critical (4 species)

**Champignon** (Agaricus bisporus) — World's most eaten mushroom. Wild variants tastier than cultivated. ⚠️ Safety-critical: commonly confused with Knollenblätterpilz (deadly). *Carries on: A, C, D*

**Knollenblätterpilz** (Amanita phalloides) — ⚠️ TÖDLICH GIFTIG. 90% of fatal poisonings in Europe. MUST be in the dataset as a safety reference. Ecology-only card. *Carries on: B, D*

**Krause Glucke** (Sparassis crispa) — Unmistakable brain/sponge shape. No poisonous look-alikes. Up to 5 kg weight. Beginner-friendly and visually striking. *Carries on: A, B*

**Morchel** (Morchella esculenta) — Premium spring mushroom (€50–100/kg). Only premium species available in spring (March–May), filling a seasonal gap. ⚠️ Raw toxicity warning. *Carries on: B, C, D*

### Tier 4 — Niche Interest + Shareworthy (4 species)

**Schopf-Tintling** (Coprinus comatus) — Autolyse (self-dissolution into black ink) is PEAK viral content. Time-lapse potential. Extreme time pressure (harvest to cook in hours). *Carries on: B*

**Trüffel** (Tuber aestivum) — Luxury foraging. Legal in Germany but rare. Price (€200–600/kg) and the dog-hunting tradition are compelling stories. *Carries on: B*

**Judasohr** (Auricularia auricula-judae) — Year-round availability is unique. Chinese cuisine crossover (Mu-Err). Cultural bridge between European and Asian foraging traditions. *Carries on: B, C*

**Hexenröhrling** (Neoboletus luridiformis) — Instant blue-staining is dramatic and shareworthy. Confusion with poisonous Satanspilz adds safety dimension. Name etymology ("verhext") is fun. *Carries on: B, D*

---

## §3. Coverage gaps and known limitations

1. **Safety pairings incomplete.** Ideally every toxic species would be paired with its look-alike edible. Current coverage: Fliegenpilz (standalone iconic), Knollenblätterpilz↔Champignon, Satanspilz↔Hexenröhrling (mentioned in notes). Gap: Frühjahrs-Lorchel↔Morchel pairing not as species entry.

2. **Regional specificity.** Bayern has more Fichte (spruce) than national average, favouring Marone and Steinpilz. Northern German heathland species (Sandröhrling, Birkenreizker) underrepresented.

3. **Seasonal spread.** Good coverage: June–November. Gap: December–February (only Judasohr is truly winter-active). Spring covered by Morchel (March–May).

4. **Photo sourcing difficulty.** Trüffel (underground), Morchel (spring-only, brief season), and rarer species will be harder to source personal photos for. iNaturalist and Wikimedia fill the gap.

---

## §4. What might be added in v0.1 expansion

- **Sandröhrling** (Suillus variegatus) — Common in sandy pine forests, northern Germany expansion
- **Birkenreizker** (Lactarius torminosus) — Beautiful but mildly toxic, safety education value
- **Semmelstoppelpilz** (Hydnum repandum) — Beginner-friendly, no look-alikes, pleasant nutty flavour
- **Goldröhrling** (Suillus grevillei) — Exclusively under larch, bright yellow, photogenic
- **Herbsttrompete** (Craterellus cornucopioides) — "Schwarze Trüffel der Armen", difficult to photograph (dark colour), but prized

---

## §5. Cross-references

- Species CSV: `docs/pilze-smoketest.csv`
- Channel strategy: `docs/SMOKE-TEST-CHANNELS-AND-IMAGERY.md`
- Domain manifest: `../schnappfang-app/data/domain-manifest.json` (mushroom_foraging entry)

*Stand: April 2026*
