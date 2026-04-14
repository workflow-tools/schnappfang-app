/**
 * Domain Adapter Interface — SnapCard Engine
 *
 * A domain adapter tells the core engine how to handle a specific
 * subject domain (fishing, mushrooms, birds, plants, etc.).
 *
 * Each domain provides:
 *   1. Subject data schema (what fields describe an identified subject)
 *   2. Content block vocabulary (what info blocks are available)
 *   3. AI identification config (what model/prompt to use)
 *   4. Legal/compliance rules (disclaimers, data handling)
 *   5. Template overrides (domain-specific design tokens, if any)
 *
 * Schnappfang (fishing) is the first adapter. Future domains register
 * themselves via the DomainRegistry without touching core engine code.
 *
 * Rule 11: This is a schema, not a framework. No runtime overhead.
 */

import type {
  CoreTemplateTokens,
  ConfidenceThresholds,
  ContentBlockCore,
  CoreOutputFormat,
} from './core-engine'

// ─────────────────────────────────────────────
// DOMAIN ADAPTER
// ─────────────────────────────────────────────

/**
 * A domain adapter defines everything the SnapCard engine needs
 * to support a new subject domain.
 *
 * @template TSubject  The domain's subject type (Species, Mushroom, Bird, etc.)
 * @template TBlockType  Union of block type strings the domain supports
 */
export interface DomainAdapter<
  TSubject extends SubjectBase = SubjectBase,
  TBlockType extends string = string,
> {
  /** Unique domain identifier (e.g., 'fishing', 'mushroom', 'birding') */
  readonly domain_id: string

  /** Human-readable domain name (localised) */
  readonly display_name: string

  /** Primary locale for this domain instance */
  readonly locale: string

  /** Version of this adapter definition */
  readonly version: string

  /** AI identification configuration */
  readonly identification: IdentificationConfig

  /** Available content block types for this domain */
  readonly block_types: readonly BlockTypeDefinition<TBlockType>[]

  /** Legal and compliance configuration */
  readonly compliance: ComplianceConfig

  /** Template overrides or extensions (domain can add templates or modify tokens) */
  readonly templates?: readonly DomainTemplate[]

  /** Subject-specific metadata schema description */
  readonly subject_metadata: readonly SubjectMetadataField[]

  /** Available output formats (defaults to all core formats if omitted) */
  readonly output_formats?: readonly CoreOutputFormat[]

  /** Watermark/brand text override (default: uses core engine brand) */
  readonly watermark_text?: string
}

// ─────────────────────────────────────────────
// SUBJECT (the thing being identified)
// ─────────────────────────────────────────────

/**
 * Base interface for any identifiable subject.
 * Every domain's subject type must extend this.
 */
export interface SubjectBase {
  /** Display name in the domain's primary locale */
  readonly display_name: string
  /** Canonical/scientific name (Latin binomial, etc.) */
  readonly canonical_name: string
  /** Content blocks available for this subject */
  readonly content_blocks: readonly ContentBlockCore[]
  /** Photo guidance notes */
  readonly photo_notes?: string
}

/** Describes a metadata field on the domain's subject type */
export interface SubjectMetadataField {
  /** Field key (e.g., 'typical_size_cm', 'edibility_rating') */
  readonly key: string
  /** Human-readable label */
  readonly label: string
  /** Data type */
  readonly type: 'string' | 'number' | 'boolean' | 'enum' | 'url'
  /** If type is 'enum', the allowed values */
  readonly enum_values?: readonly string[]
  /** Whether this field appears on the card */
  readonly card_visible: boolean
  /** Whether this field is required or optional */
  readonly required: boolean
}

// ─────────────────────────────────────────────
// BLOCK TYPE DEFINITIONS
// ─────────────────────────────────────────────

/** Definition of a content block type within a domain */
export interface BlockTypeDefinition<TBlockType extends string = string> {
  /** Block type identifier (e.g., 'fun_fact', 'recipe_camp', 'toxicity_warning') */
  readonly type: TBlockType
  /** Display label (localised) */
  readonly label: string
  /** Icon (emoji or icon-set key) */
  readonly icon: string
  /** Default share-appeal rating for this block type */
  readonly default_share_appeal: 1 | 2 | 3 | 4 | 5
  /**
   * Can this block type substitute for another?
   * e.g., ecology blocks substitute for recipe blocks in fishing.
   */
  readonly can_substitute_for?: TBlockType
  /**
   * Display priority (lower = higher priority when space is limited).
   * Used for auto-selecting blocks in compact formats.
   */
  readonly priority: number
  /**
   * Is this block type safety-critical?
   * If true, the block MUST display a warning styling.
   * e.g., toxicity warnings for mushrooms, protected species for fishing.
   */
  readonly safety_critical: boolean
}

// ─────────────────────────────────────────────
// IDENTIFICATION CONFIG
// ─────────────────────────────────────────────

/** How the domain handles AI identification */
export interface IdentificationConfig {
  /** Which AI service to use ('claude_vision', 'local_tflite', 'custom') */
  readonly service: string
  /** Prompt template for the AI service (with {photo} placeholder) */
  readonly prompt_template: string
  /** Confidence thresholds for this domain */
  readonly confidence_thresholds: ConfidenceThresholds
  /** Maximum number of alternative candidates to return */
  readonly max_alternatives: number
  /** Domain-specific prompt context (e.g., "This is a freshwater fish from Bavaria") */
  readonly context_hint: string
  /**
   * Whether to support offline/on-device identification.
   * If true, the adapter should specify a local model path.
   */
  readonly supports_offline: boolean
  /** Path to local ML model (if supports_offline is true) */
  readonly local_model_path?: string
}

// ─────────────────────────────────────────────
// COMPLIANCE CONFIG
// ─────────────────────────────────────────────

/**
 * Legal and compliance rules for a domain.
 * Rule 6 + Rule 10: every domain must define these.
 */
export interface ComplianceConfig {
  /** Non-negotiable disclaimer text (Rule 6) */
  readonly disclaimer: string
  /** Data source citation */
  readonly data_source: string
  /** Dataset as-of date (ISO string) */
  readonly dataset_stand: string
  /**
   * Privacy sensitivity level for photos in this domain.
   * 'standard' = normal DSGVO handling.
   * 'elevated' = extra care (e.g., photos may contain children, location of rare species).
   */
  readonly photo_sensitivity: 'standard' | 'elevated'
  /** Whether GPS data requires explicit opt-in (default: true) */
  readonly gps_requires_consent: boolean
  /**
   * Domain-specific legal warnings.
   * e.g., Swiss C&R law for fishing, foraging restrictions for mushrooms.
   */
  readonly legal_warnings: readonly LegalWarning[]
}

/** A domain-specific legal warning */
export interface LegalWarning {
  /** Which region this applies to (ISO country/region code) */
  readonly region: string
  /** Warning text (localised) */
  readonly text: string
  /** Legal citation */
  readonly citation: string
  /** Severity: 'info' shows as note, 'warning' shows prominent, 'blocking' prevents card generation */
  readonly severity: 'info' | 'warning' | 'blocking'
}

// ─────────────────────────────────────────────
// DOMAIN TEMPLATES
// ─────────────────────────────────────────────

/** A domain-specific template (extends or overrides core templates) */
export interface DomainTemplate {
  /** Template identifier */
  readonly template_id: string
  /** Design tokens (extends CoreTemplateTokens) */
  readonly tokens: CoreTemplateTokens
  /** Whether this template is domain-exclusive or shared across domains */
  readonly domain_exclusive: boolean
}

// ─────────────────────────────────────────────
// DOMAIN REGISTRY
// ─────────────────────────────────────────────

/**
 * Registry of all available domain adapters.
 * In a white-label SDK, this would be the plugin system's entry point.
 *
 * For now, Schnappfang is the only registered domain.
 * Future domains (Pilzfang, Vogelfang, etc.) register here.
 */
export interface DomainRegistry {
  readonly domains: Record<string, DomainAdapter>
  readonly default_domain: string
}

// ─────────────────────────────────────────────
// FISHING DOMAIN ADAPTER (Schnappfang)
// ─────────────────────────────────────────────

/**
 * Fishing-specific content block types.
 * These are the block types Schnappfang registers with the core engine.
 */
export type FishingBlockType =
  | 'fun_fact'
  | 'name_origin'
  | 'recipe_camp'
  | 'recipe_home'
  | 'habitat'
  | 'season_hint'
  | 'regulations_link'
  | 'moon_solunar'
  | 'ecology_predator'
  | 'ecology_prey'
  | 'ecology_behavior'
  | 'conservation'
  | 'cultural'

/**
 * Fishing subject — extends SubjectBase with fishing-specific fields.
 * This is what Species becomes in the domain adapter model.
 */
export interface FishingSubject extends SubjectBase {
  /** German common name */
  readonly name_de: string
  /** Latin scientific name */
  readonly name_la: string
  /** Typical size range in cm */
  readonly typical_size_cm: string
  /** Habitat description */
  readonly habitat_de: string
  /** German name etymology */
  readonly german_name_origin: string
  /** Primary fun fact */
  readonly fun_fact_de: string
  /** Catch season hint (informational, NOT a regulation verdict) */
  readonly catch_season_hint: string
  /** URL to regulation page */
  readonly regulations_link: string
  /** Camp recipe or ecology substitute */
  readonly recipe_camp: string
  /** Home recipe or ecology substitute */
  readonly recipe_home: string
  /** Moon/solunar relevance */
  readonly moon_solunar_relevance: string
  /** Photo guidance notes */
  readonly photo_notes: string
  /** Optional: catch weight in kg */
  readonly weight_kg?: number
  /** Optional: catch length in cm */
  readonly length_cm?: number
}

/**
 * Example domain definitions for future white-label extraction.
 * These are type-only sketches — no implementation yet.
 */

/** Mushroom foraging block types */
export type MushroomBlockType =
  | 'edibility'
  | 'toxicity_warning'
  | 'look_alikes'
  | 'habitat'
  | 'season'
  | 'fun_fact'
  | 'recipe'
  | 'ecology'

/** Bird watching block types */
export type BirdingBlockType =
  | 'fun_fact'
  | 'song_description'
  | 'migration_pattern'
  | 'habitat'
  | 'conservation_status'
  | 'similar_species'
  | 'season'

/** Dive log block types */
export type DiveLogBlockType =
  | 'fun_fact'
  | 'depth_range'
  | 'visibility'
  | 'water_temp'
  | 'buddy'
  | 'marine_life'
  | 'conservation_status'

/** Hiking summit block types */
export type HikingSummitBlockType =
  | 'elevation'
  | 'fun_fact'
  | 'trail_difficulty'
  | 'route_time'
  | 'best_season'
  | 'nearby_huts'
  | 'flora_fauna'
