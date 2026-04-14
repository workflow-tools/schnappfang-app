/**
 * Canonical type re-exports for Schnappfang.
 * Rule 1: Types as Law — all types imported from here.
 *
 * Architecture:
 *   core-engine.ts     → Domain-agnostic SnapCard pipeline types
 *   domain.ts          → Domain adapter interface + registry
 *   snippet-catalog.ts → Reusable snippet/pattern catalog schema
 *   species.ts         → Fishing-specific subject types
 *   card.ts            → Fishing-specific card config
 */

// ── Core Engine (domain-agnostic) ──
export type {
  IdentificationResult,
  IdentificationCandidate,
  ConfidenceThresholds,
  ContentBlockCore,
  CoreOutputFormat,
  Dimensions,
  CoreTemplateTokens,
  CoreCardInput,
  CoreCardOutput,
  PhotoMetadata,
  ProcessedPhoto,
  QueueItemStatus,
  QueueItem,
  ShareTarget,
  ShareResult,
} from './core-engine'

export {
  DEFAULT_CONFIDENCE_THRESHOLDS,
  CORE_CARD_DIMENSIONS,
} from './core-engine'

// ── Domain Adapter ──
export type {
  DomainAdapter,
  SubjectBase,
  SubjectMetadataField,
  BlockTypeDefinition,
  IdentificationConfig,
  ComplianceConfig,
  LegalWarning,
  DomainTemplate,
  DomainRegistry,
  FishingBlockType,
  FishingSubject,
  MushroomBlockType,
  BirdingBlockType,
  DiveLogBlockType,
  HikingSummitBlockType,
} from './domain'

// ── Snippet Catalog ──
export type {
  PipelineStage,
  SnippetPlatform,
  SnippetMaturity,
  SnippetTech,
  SnippetEntry,
  SnippetDependency,
  SnippetCatalog,
  PipelinePattern,
  PipelinePatternCatalog,
} from './snippet-catalog'

// ── Fishing Domain (Schnappfang-specific) ──
export type {
  PriorityTier,
  ContentBlockType,
  ContentBlock,
  MoonRelevance,
  Species,
  SpeciesDataset,
} from './species'

export type {
  TemplateName,
  CardOutputFormat,
  TemplateTokens,
  CardBlockSelection,
  CardInput,
  CardOutput,
} from './card'

export { CARD_DIMENSIONS } from './card'
