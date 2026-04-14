/**
 * Snippet Catalog Schema — SnapCard Engine
 *
 * A structured catalog for reusable code snippets, patterns, and
 * components that transfer across SnapCard domain adapters.
 *
 * Purpose:
 *   - Catalog proven implementations as they're built for Schnappfang
 *   - Tag them by pipeline stage + platform so future domains can find them
 *   - Track maturity (smoke-test hack vs. production-hardened)
 *   - Link to source files so snippets don't go stale
 *
 * This is a *type schema* — the actual catalog data lives in
 * `data/snippet-catalog.json` (or a future Supabase table).
 *
 * Rule 11: The catalog is a JSON file, not a database. Solo-founder friendly.
 * Rule 12: Snippets link to source files — if the source moves, update the link.
 */

// ─────────────────────────────────────────────
// PIPELINE STAGES
// ─────────────────────────────────────────────

/**
 * The 6 stages of the SnapCard pipeline.
 * Every snippet belongs to exactly one stage.
 */
export type PipelineStage =
  | 'capture'        // 📸 Photo capture, EXIF extraction, image processing
  | 'identify'       // 🔍 AI identification, confidence handling, manual fallback
  | 'enrich'         // 📚 Content block population, data lookup, API enrichment
  | 'render'         // 🎨 Card template rendering, design tokens, layout
  | 'export'         // 📤 PNG/PDF generation, format conversion, compression
  | 'share'          // 🌐 Share sheet, deep links, social platform targeting

/**
 * Platform the snippet runs on.
 * Some snippets are platform-specific, others work everywhere.
 */
export type SnippetPlatform =
  | 'web'            // Next.js / browser
  | 'native'         // React Native / Expo
  | 'server'         // Node.js / edge function
  | 'universal'      // Works on all platforms

/**
 * Maturity level of the snippet.
 * Tracks how battle-tested the code is.
 */
export type SnippetMaturity =
  | 'sketch'         // Untested concept / pseudocode
  | 'smoke_test'     // Used in smoke test, not production-hardened
  | 'mvp'            // Shipped in MVP, basic error handling
  | 'production'     // Production-hardened, tested, monitored

/**
 * Technology category for filtering.
 */
export type SnippetTech =
  | 'react'
  | 'react_native'
  | 'typescript'
  | 'satori'         // @vercel/og card rendering
  | 'skia'           // react-native-skia
  | 'view_shot'      // react-native-view-shot
  | 'vision_camera'  // react-native-vision-camera
  | 'exifr'          // EXIF extraction
  | 'mmkv'           // MMKV offline storage
  | 'sqlite'         // expo-sqlite
  | 'supabase'       // Supabase client
  | 'clerk'          // Clerk auth
  | 'stripe'         // Stripe payments
  | 'i18n'           // Internationalisation
  | 'tailwind'       // Tailwind CSS
  | 'pwa'            // Service Worker / PWA
  | 'share_api'      // Web Share API / react-native-share
  | 'ai_vision'      // Claude Vision / TensorFlow Lite
  | 'canvas'         // HTML Canvas / node-canvas
  | 'other'

// ─────────────────────────────────────────────
// SNIPPET ENTRY
// ─────────────────────────────────────────────

/** A single reusable code snippet in the catalog */
export interface SnippetEntry {
  /** Unique identifier (e.g., 'SC-001') */
  readonly id: string

  /** Human-readable title */
  readonly title: string

  /** One-line description of what the snippet does */
  readonly description: string

  /** Which pipeline stage this snippet belongs to */
  readonly stage: PipelineStage

  /** Which platform(s) this runs on */
  readonly platform: SnippetPlatform

  /** How mature/tested is this code */
  readonly maturity: SnippetMaturity

  /** Technologies used */
  readonly tech: readonly SnippetTech[]

  /**
   * Which domains have used this snippet.
   * Starts with ['fishing'] and grows as domains adopt it.
   */
  readonly used_by_domains: readonly string[]

  /**
   * Source file path (relative to project root).
   * Rule 12: if the source moves, update this link.
   */
  readonly source_path: string

  /**
   * Line range in the source file (approximate, for quick location).
   * Format: "45-78" or "12" for a single line.
   */
  readonly source_lines?: string

  /**
   * The actual code snippet (optional — prefer source_path for freshness).
   * Include only for small, self-contained patterns (<30 lines).
   */
  readonly code?: string

  /** Language of the code snippet */
  readonly language: 'typescript' | 'tsx' | 'json' | 'css' | 'bash' | 'sql'

  /**
   * Dependencies required by this snippet.
   * Format: package name + version range.
   */
  readonly dependencies: readonly SnippetDependency[]

  /**
   * Cross-references to related snippets.
   * Format: snippet IDs (e.g., ['SC-003', 'SC-007']).
   */
  readonly related: readonly string[]

  /**
   * Known limitations or gotchas.
   * Things a future developer should know before using this.
   */
  readonly gotchas: readonly string[]

  /** When this snippet was cataloged (ISO date) */
  readonly cataloged_at: string

  /** When the snippet was last verified against its source (ISO date) */
  readonly last_verified: string

  /** Who cataloged it (session/thread name or 'manual') */
  readonly cataloged_by: string
}

/** A dependency required by a snippet */
export interface SnippetDependency {
  readonly package: string
  readonly version: string
  /** Is this a devDependency? */
  readonly dev: boolean
}

// ─────────────────────────────────────────────
// SNIPPET CATALOG
// ─────────────────────────────────────────────

/** The full snippet catalog */
export interface SnippetCatalog {
  /** Schema version for forward compatibility */
  readonly schema_version: '1.0'
  /** When the catalog was last updated */
  readonly last_updated: string
  /** All snippet entries */
  readonly snippets: readonly SnippetEntry[]
}

// ─────────────────────────────────────────────
// PIPELINE PATTERN (higher-level than snippets)
// ─────────────────────────────────────────────

/**
 * A pipeline pattern is a larger, reusable architectural recipe
 * that composes multiple snippets into a working feature.
 *
 * e.g., "Offline-First AI Identification" composes:
 *   - SC-010 (photo capture)
 *   - SC-011 (EXIF extraction)
 *   - SC-015 (MMKV queue)
 *   - SC-020 (Claude Vision call)
 *   - SC-021 (confidence threshold UI)
 *   - SC-025 (NetInfo reconnect handler)
 */
export interface PipelinePattern {
  /** Unique identifier (e.g., 'PP-001') */
  readonly id: string

  /** Human-readable title */
  readonly title: string

  /** What problem does this pattern solve? */
  readonly problem: string

  /** How does it solve it? (1-3 sentences) */
  readonly solution: string

  /** Ordered list of snippet IDs that compose this pattern */
  readonly snippet_sequence: readonly string[]

  /** Which pipeline stages does this pattern span? */
  readonly stages: readonly PipelineStage[]

  /** Which domains have implemented this pattern? */
  readonly implemented_by: readonly string[]

  /**
   * Architecture diagram as a simple text flow.
   * e.g., "capture → queue(MMKV) → [online?] → identify(Claude) → enrich → render"
   */
  readonly flow: string

  /** Estimated implementation time for a solo developer */
  readonly estimated_hours: number

  /** When this pattern was documented */
  readonly documented_at: string
}

/** Collection of pipeline patterns */
export interface PipelinePatternCatalog {
  readonly schema_version: '1.0'
  readonly last_updated: string
  readonly patterns: readonly PipelinePattern[]
}
