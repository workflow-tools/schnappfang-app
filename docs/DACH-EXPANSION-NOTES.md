# DACH Expansion Notes — Legal & Linguistic Constraints

> **Source:** Gemini research analysis, 2026-04-13.
> **Status:** Research notes. Not actionable for MVP (Bayern only).
> **Why this matters:** These constraints affect marketing, UX copy, and
> data model design *before* any code is written for CH/AT.

---

## Switzerland: Catch & Release Is Illegal

Swiss federal animal welfare law (Tierschutzgesetz, TSchG Art. 3) requires
**Entnahmeabsicht** (intent to harvest) as the sole legal justification for
recreational fishing. Catch-and-release for sport or photography is
expressly prohibited.

**Implications for Schnappfang:**
- Cards in CH must be framed as documenting a *harvested* fish (food), not
  a trophy release
- Recipe blocks become legally strategic, not just fun — they reinforce the
  Nahrungserwerb (food acquisition) narrative
- Photography guidance must emphasize rapid, humane documentation — no
  extended posing sessions
- Marketing copy must avoid any language that implies C&R for vanity

The Vollzugshilfe (enforcement guidance) from BAFU explicitly mandates
cantonal authorities to monitor and prosecute organised C&R fishing.

## Austria: Federal Fragmentation + Tightening Welfare Laws

Austrian fishing law is administered per Bundesland (no central regulation).
However, federal animal welfare law overrides regional fishing rules.

**Key constraint:** In many Austrian states, once a legally harvestable fish
is landed, it **must be killed immediately**. Keeping fish alive in
retention slings for later photography is increasingly prosecuted as
lacking "vernünftiger Grund" (reasonable ground).

**Implications for Schnappfang:**
- Same culinary-framing strategy as Switzerland
- Per-Bundesland regulatory data needed (like Bayern's per-Bundesland
  expansion plan, but for animal welfare overlay, not just Schonzeiten)
- Private pay-lakes may have different C&R rules — need to handle
  these as exceptions

## Linguistic Localisation Requirements

Species names vary significantly across DACH. A Swiss angler who sees
"Renke" on their card will reject it as foreign.

| Species (Latin)      | Germany (standard) | Bavaria    | Switzerland | Austria    |
|---------------------|--------------------|------------|-------------|------------|
| Perca fluviatilis   | Flussbarsch        | Flussbarsch| **Egli**    | Flussbarsch|
| Coregonus spp.      | Renke/Maräne       | Renke      | **Felchen** | Renke      |
| Squalius cephalus   | Döbel              | **Aitel**  | **Alet**    | **Aitel**  |
| Lota lota            | Quappe/Rutte       | Rutte      | **Trüsche** | Rutte      |

**Data model implication:** The `Species.name_de` field is currently a single
string. For DACH expansion, this becomes:

```typescript
readonly regional_names: Record<string, string>
// e.g. { "de-DE": "Flussbarsch", "de-CH": "Egli", "de-AT": "Flussbarsch", "de-BY": "Flussbarsch" }
```

This is already anticipated in the types — `name_de` stays as the default
display label, and `regional_names` can be added as an optional field
without breaking existing code.

## Market Context (Background Only)

- AlleAngeln has 1M+ digital catch reports — validates that anglers
  document catches digitally. Schnappfang differentiates via card format
  (shareable, beautiful) vs. log format (utilitarian).
- "Nature-oriented" anglers (~24% of dedicated tourist anglers) are the
  primary Schnappfang target segment — value experience and environment
  over trophy size.
- German CCG market $462M at 12% CAGR — this is *physical trading cards*,
  not digital catch cards. Interesting background but different market.

## Actionable for MVP (Bayern)

None of this changes the Bayern MVP. But two things to keep in mind:

1. **Recipe blocks are not just fun — they're legally strategic** for future
   DACH expansion. The convenience-first pivot accidentally positioned
   Schnappfang perfectly for Swiss/Austrian compliance.

2. **The i18n structure (Rule 9) pays off here.** The `name_de` + future
   `regional_names` pattern means Bayern cards show "Renke" while Swiss
   cards show "Felchen" — same species data, different display label.
