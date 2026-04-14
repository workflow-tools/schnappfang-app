/**
 * Card template and rendering types for Schnappfang.
 *
 * Card generation uses @vercel/og (satori + resvg) to convert JSX → PNG.
 * Three templates ship with v0.1: Klassisch, Bayern, Lagerfeuer.
 *
 * Rule 7: Template design tokens must be centralized in one config file.
 * Rule 7: Output formats — 1080×1350 (feed), 1080×1920 (stories), PDF A6.
 */

/** Supported card template identifiers */
export type TemplateName = 'klassisch' | 'bayern' | 'lagerfeuer'

/** Output format for card export */
export type CardOutputFormat = 'feed' | 'stories' | 'pdf_a6'

/** Pixel dimensions for each output format */
export const CARD_DIMENSIONS: Record<CardOutputFormat, { width: number; height: number }> = {
  feed: { width: 1080, height: 1350 },
  stories: { width: 1080, height: 1920 },
  pdf_a6: { width: 1240, height: 1748 }, // A6 landscape at 150 DPI, portrait orientation
} as const

/** Design tokens for a single card template */
export interface TemplateTokens {
  /** Template display name (German, user-facing) */
  readonly display_name_de: string
  /** Primary background color (hex) */
  readonly bg_primary: string
  /** Secondary background for info blocks (hex) */
  readonly bg_secondary: string
  /** Primary text color (hex) */
  readonly text_primary: string
  /** Secondary/muted text color (hex) */
  readonly text_secondary: string
  /** Accent color for highlights and borders (hex) */
  readonly accent: string
  /** Font family for headings (must be loaded in satori) */
  readonly font_heading: string
  /** Font family for body text (must be loaded in satori) */
  readonly font_body: string
  /** Border radius in px for info block cards */
  readonly block_radius: number
  /** Watermark opacity (0–1). Rule 7: tasteful, not punitive */
  readonly watermark_opacity: number
  /** Watermark text — always schnappfang.de */
  readonly watermark_text: string
}

/**
 * Which optional info blocks the user wants on this card.
 * All default to false — convenience-first, user opts IN.
 */
export interface CardBlockSelection {
  readonly fun_fact: boolean
  readonly name_origin: boolean
  readonly recipe_camp: boolean
  readonly recipe_home: boolean
  readonly habitat: boolean
  readonly season_hint: boolean
  readonly regulations_link: boolean
  readonly moon_solunar: boolean
  readonly weather: boolean
  readonly gps: boolean
}

/** Input data for generating a single card */
export interface CardInput {
  /** Species data (required — the minimum viable card) */
  readonly species_name_de: string
  readonly species_name_la: string

  /** User's photo as a data URL or public URL (required) */
  readonly photo_url: string

  /** Which template to render */
  readonly template: TemplateName

  /** Which output format */
  readonly format: CardOutputFormat

  /** Which optional blocks to include */
  readonly blocks: CardBlockSelection

  /** Optional: angler name for the card */
  readonly angler_name?: string

  /** Optional: catch date (ISO string) */
  readonly catch_date?: string

  /** Optional: location (city/region only — Rule 10: no GPS without consent) */
  readonly location?: string

  /** Optional: weight in kg */
  readonly weight_kg?: number

  /** Optional: length in cm */
  readonly length_cm?: number

  /** Optional: weather line (from Bright Sky API, omitted if offline) */
  readonly weather_line?: string

  /** Optional: GPS coordinates (only if user explicitly opted in) */
  readonly gps?: { lat: number; lng: number }

  /**
   * Species-specific content blocks, populated from the species dataset.
   * The renderer picks from these based on CardBlockSelection.
   */
  readonly content: {
    readonly fun_fact_de?: string
    readonly german_name_origin?: string
    readonly recipe_camp?: string
    readonly recipe_home?: string
    readonly habitat_de?: string
    readonly catch_season_hint?: string
    readonly regulations_link?: string
    readonly moon_solunar_relevance?: string
  }
}

/** Output of the card renderer */
export interface CardOutput {
  /** The rendered card as a PNG buffer */
  readonly png: Buffer
  /** Dimensions of the rendered card */
  readonly width: number
  readonly height: number
  /** Which template was used */
  readonly template: TemplateName
  /** Which format was rendered */
  readonly format: CardOutputFormat
}
