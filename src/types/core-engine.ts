/**
 * SnapCard Core Engine — Domain-Agnostic Types
 *
 * These types define the "camera → AI ID → styled card → share" pipeline
 * independently of any specific domain. Schnappfang (fishing) is the first
 * domain adapter built on top of this engine.
 *
 * The same engine could power:
 *   - Mushroom foraging cards (Pilzfang?)
 *   - Bird watching cards (Vogelfang?)
 *   - Plant identification cards
 *   - Dive log cards
 *   - Hiking summit cards
 *   - Wildlife photography cards
 *
 * Abstraction boundary:
 *   core-engine.ts  → domain-agnostic pipeline types
 *   domain.ts       → domain adapter interface + registry
 *   species.ts      → fishing-specific subject types (implements domain adapter)
 *   card.ts         → fishing-specific card config (extends core card types)
 *
 * Rule 1: All types readonly + strict.
 * Rule 11: No unnecessary abstraction — only extract what 2+ domains would share.
 */

// ─────────────────────────────────────────────
// IDENTIFICATION PIPELINE
// ─────────────────────────────────────────────

/** Confidence level from AI identification */
export interface IdentificationResult {
  /** The identified subject (domain-specific key) */
  readonly subject_key: string
  /** Human-readable name in the app's primary locale */
  readonly display_name: string
  /** Scientific/canonical name (Latin, ICZN, etc.) */
  readonly canonical_name: string
  /** AI confidence 0–1. Rule 5: low confidence must surface to user */
  readonly confidence: number
  /** Optional secondary candidates (top-N results) */
  readonly alternatives?: readonly IdentificationCandidate[]
  /** Which model/service produced this result */
  readonly source: string
  /** ISO timestamp of identification */
  readonly identified_at: string
}

export interface IdentificationCandidate {
  readonly subject_key: string
  readonly display_name: string
  readonly canonical_name: string
  readonly confidence: number
}

/**
 * Confidence thresholds for UI treatment.
 * Rule 5: Never present low-confidence as certain.
 */
export interface ConfidenceThresholds {
  /** Above this: show as confirmed. Default 0.85 */
  readonly confirmed: number
  /** Above this but below confirmed: show with "unsicher" warning. Default 0.60 */
  readonly probable: number
  /** Below probable: show as "nicht erkannt", require manual selection */
}

export const DEFAULT_CONFIDENCE_THRESHOLDS: ConfidenceThresholds = {
  confirmed: 0.85,
  probable: 0.60,
} as const

// ─────────────────────────────────────────────
// CONTENT BLOCKS (Domain-Agnostic)
// ─────────────────────────────────────────────

/**
 * A renderable content block that can appear on any card.
 *
 * Domains register their own block types (fun_fact, recipe, ecology, etc.)
 * but all blocks share this shape for the renderer.
 */
export interface ContentBlockCore {
  /** Block type identifier — domain defines the vocabulary */
  readonly type: string
  /** Display label (localised) */
  readonly label: string
  /** The actual content text (localised) */
  readonly text: string
  /** i18n key for future translations (Rule 9) */
  readonly i18n_key?: string
  /** Icon identifier (emoji or icon-set key) */
  readonly icon?: string
  /**
   * 1–5 shareability rating.
   * Higher = more likely to make someone share the card.
   * Used for auto-block selection when space is limited.
   */
  readonly share_appeal: 1 | 2 | 3 | 4 | 5
  /** If true, this block replaces a standard slot (e.g., ecology replaces recipe) */
  readonly is_substitute: boolean
  /** What standard slot this substitutes, if is_substitute is true */
  readonly substitutes_for?: string
}

// ─────────────────────────────────────────────
// CARD RENDERING (Domain-Agnostic)
// ─────────────────────────────────────────────

/** Output format for card export — shared across all domains */
export type CoreOutputFormat = 'feed' | 'stories' | 'pdf_a6'

/** Pixel dimensions */
export interface Dimensions {
  readonly width: number
  readonly height: number
}

/** Standard card dimensions — same for every domain */
export const CORE_CARD_DIMENSIONS: Record<CoreOutputFormat, Dimensions> = {
  feed: { width: 1080, height: 1350 },
  stories: { width: 1080, height: 1920 },
  pdf_a6: { width: 1240, height: 1748 },
} as const

/**
 * Design tokens for a card template — domain-agnostic palette structure.
 * Individual domains can extend this with domain-specific tokens.
 */
export interface CoreTemplateTokens {
  /** Template display name (localised) */
  readonly display_name: string
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
  /** Font family for headings */
  readonly font_heading: string
  /** Font family for body text */
  readonly font_body: string
  /** Border radius in px for info blocks */
  readonly block_radius: number
  /** Watermark opacity (0–1) */
  readonly watermark_opacity: number
  /** Watermark text (brand URL) */
  readonly watermark_text: string
}

/**
 * Core card input — the minimum data every domain provides to render a card.
 * Domains extend this with subject-specific fields.
 */
export interface CoreCardInput {
  /** Primary display name of the identified subject */
  readonly subject_display_name: string
  /** Canonical/scientific name */
  readonly subject_canonical_name: string
  /** User's photo as a data URL or public URL */
  readonly photo_url: string
  /** Which template to render */
  readonly template_id: string
  /** Which output format */
  readonly format: CoreOutputFormat
  /** Content blocks selected for this card */
  readonly blocks: readonly ContentBlockCore[]
  /** Optional: user/creator name */
  readonly creator_name?: string
  /** Optional: capture date (ISO string) */
  readonly capture_date?: string
  /** Optional: location (region-level, no precise GPS without consent) */
  readonly location?: string
  /** Optional: GPS coordinates (only with explicit consent — Rule 10) */
  readonly gps?: { readonly lat: number; readonly lng: number }
  /** Optional: weather line (omitted if offline — Rule 8) */
  readonly weather_line?: string
  /** Disclaimer text (Rule 6: non-negotiable on every card) */
  readonly disclaimer: string
  /** Dataset stand date */
  readonly dataset_stand: string
}

/** Core card output — what the renderer produces */
export interface CoreCardOutput {
  /** The rendered card as a PNG buffer */
  readonly png: Buffer
  /** Dimensions of the rendered card */
  readonly dimensions: Dimensions
  /** Which template was used */
  readonly template_id: string
  /** Which format was rendered */
  readonly format: CoreOutputFormat
  /** Generation timestamp (ISO) */
  readonly generated_at: string
}

// ─────────────────────────────────────────────
// PHOTO PIPELINE
// ─────────────────────────────────────────────

/** Extracted metadata from a captured photo */
export interface PhotoMetadata {
  /** GPS coordinates from EXIF (if available and consented) */
  readonly gps?: { readonly lat: number; readonly lng: number }
  /** Capture timestamp from EXIF */
  readonly captured_at?: string
  /** Camera/device model */
  readonly device?: string
  /** Original image dimensions */
  readonly original_dimensions?: Dimensions
  /** Orientation from EXIF (1–8) */
  readonly orientation?: number
}

/** A photo ready for the card pipeline */
export interface ProcessedPhoto {
  /** Photo URI (local file or data URL) */
  readonly uri: string
  /** Dimensions after crop/resize */
  readonly dimensions: Dimensions
  /** Extracted metadata */
  readonly metadata: PhotoMetadata
  /** Content hash for deduplication */
  readonly hash?: string
}

// ─────────────────────────────────────────────
// OFFLINE QUEUE
// ─────────────────────────────────────────────

/** Status of a queued operation */
export type QueueItemStatus = 'pending' | 'in_progress' | 'completed' | 'failed'

/** A queued operation for offline-first processing */
export interface QueueItem<TPayload = unknown> {
  /** Unique identifier */
  readonly id: string
  /** What kind of operation (e.g., 'fish_id', 'weather_fetch') */
  readonly operation: string
  /** The payload to process when online */
  readonly payload: TPayload
  /** Current status */
  readonly status: QueueItemStatus
  /** When the item was queued (ISO) */
  readonly queued_at: string
  /** Number of retry attempts */
  readonly retry_count: number
  /** Last error message, if any */
  readonly last_error?: string
}

// ─────────────────────────────────────────────
// SHARING
// ─────────────────────────────────────────────

/** Target platform for card sharing */
export type ShareTarget =
  | 'native'       // OS share sheet
  | 'instagram'
  | 'whatsapp'
  | 'pinterest'
  | 'facebook'
  | 'clipboard'
  | 'download'

/** Share action result */
export interface ShareResult {
  readonly target: ShareTarget
  readonly success: boolean
  /** Error message if not successful */
  readonly error?: string
  /** Timestamp of share action */
  readonly shared_at: string
}
