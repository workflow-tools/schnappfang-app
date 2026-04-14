/**
 * Species data types for Schnappfang.
 *
 * These types model the post-pivot convenience-first species info system.
 * No regulation verdicts — all info blocks are optional fun/convenience content.
 *
 * Canonical data source (smoke test): docs/bayern-species-smoketest.csv
 * Canonical data source (MVP):        data/species/bayern.json
 */

/** Priority tier for smoke test ordering and content investment */
export type PriorityTier = 1 | 2 | 3 | 4

/** Content block types that can appear on a card or in the species bundle */
export type ContentBlockType =
  | 'fun_fact'
  | 'ecology_predator'
  | 'ecology_prey'
  | 'ecology_behavior'
  | 'conservation'
  | 'cultural'
  | 'name_origin'
  | 'recipe_camp'
  | 'recipe_home'
  | 'habitat'
  | 'season_hint'
  | 'regulations_link'

/** A single content block with metadata for rendering and curation */
export interface ContentBlock {
  /** Block type — determines icon and rendering slot on the card */
  readonly type: ContentBlockType
  /** The display text (German, user-facing) */
  readonly text_de: string
  /** i18n key for future translations (Rule 9) */
  readonly i18n_key?: string
  /**
   * 1–5 rating: how likely is this block to make someone share the card?
   * Used for auto-selecting which blocks appear when space is limited.
   */
  readonly share_appeal: 1 | 2 | 3 | 4 | 5
  /**
   * True if the content replaces a recipe slot for protected/rare species.
   * Triggers the 🌿 prefix in rendering. (Ökologie statt Rezept pattern)
   */
  readonly is_ecology_substitute: boolean
}

/** Moon/solunar relevance level for the species */
export type MoonRelevance = 'high' | 'moderate' | 'low' | 'none'

/** A species entry in the Schnappfang species database */
export interface Species {
  /** German common name (user-facing display label) */
  readonly name_de: string
  /** Latin scientific name (universal key, canonical identifier) */
  readonly name_la: string
  /** Priority tier for smoke test and content investment */
  readonly priority_tier: PriorityTier
  /** Typical size range in cm (display string, e.g. "40–130") */
  readonly typical_size_cm: string
  /** Habitat description in German */
  readonly habitat_de: string
  /** German name etymology */
  readonly german_name_origin: string
  /** Primary fun fact in German */
  readonly fun_fact_de: string
  /** Catch season hint — general guidance, NOT a regulation verdict */
  readonly catch_season_hint: string
  /** URL to the relevant regulation page (informational link only) */
  readonly regulations_link: string
  /** Camp/outdoor recipe or 🌿 ecology block for protected species */
  readonly recipe_camp: string
  /** Home/kitchen recipe or 🌿 ecology block for protected species */
  readonly recipe_home: string
  /** Moon/solunar fishing relevance description */
  readonly moon_solunar_relevance: string
  /** Photo guidance notes for the smoke test */
  readonly photo_notes: string
}

/**
 * The full species dataset for a Bundesland.
 * MVP: Bayern only. Structure supports future expansion (Rule 6).
 */
export interface SpeciesDataset {
  /** Bundesland identifier */
  readonly bundesland: string
  /** ISO date string of when this dataset was last verified */
  readonly stand: string
  /** Species entries keyed by Latin name */
  readonly species: Record<string, Species>
}
