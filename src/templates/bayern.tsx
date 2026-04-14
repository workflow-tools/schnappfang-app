/**
 * Bayern template — Bavarian blue and white, regional pride.
 * Uses the same structural layout as Klassisch but with
 * Bavarian color tokens and tighter border radius.
 *
 * TODO (v0.2): Add subtle Rauten (diamond) pattern as SVG overlay.
 * Satori supports inline SVG, so this is feasible.
 */

import type { CardInput, TemplateTokens } from '../types'
import { CARD_DIMENSIONS } from '../types'

interface BayernProps {
  input: CardInput
  tokens: TemplateTokens
}

export function BayernCard({ input, tokens }: BayernProps) {
  const dims = CARD_DIMENSIONS[input.format]
  const photoHeight = Math.round(dims.height * 0.55)
  const isEcologySubstitute = (text: string) => text.startsWith('🌿')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: dims.width,
        height: dims.height,
        backgroundColor: tokens.bg_primary,
        fontFamily: tokens.font_body,
        color: tokens.text_primary,
      }}
    >
      {/* Photo with white border accent */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: photoHeight,
          overflow: 'hidden',
          borderBottom: `4px solid ${tokens.accent}`,
        }}
      >
        <img
          src={input.photo_url}
          alt={input.species_name_de}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Species header */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '24px 32px 12px 32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 48,
            fontWeight: 700,
            fontFamily: tokens.font_heading,
            color: tokens.accent,
          }}
        >
          {input.species_name_de}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            fontStyle: 'italic',
            color: tokens.text_secondary,
            marginTop: 4,
          }}
        >
          {input.species_name_la}
        </div>
      </div>

      {/* Optional info blocks */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '8px 32px',
          gap: 8,
          flex: 1,
        }}
      >
        {input.blocks.fun_fact && input.content.fun_fact_de && (
          <BayernInfoBlock
            label="Wusstest du?"
            text={input.content.fun_fact_de}
            tokens={tokens}
          />
        )}
        {input.blocks.name_origin && input.content.german_name_origin && (
          <BayernInfoBlock
            label="Namensherkunft"
            text={input.content.german_name_origin}
            tokens={tokens}
          />
        )}
        {input.blocks.recipe_camp && input.content.recipe_camp && (
          <BayernInfoBlock
            label={isEcologySubstitute(input.content.recipe_camp) ? '🌿 Ökologie' : '🔥 Am Wasser'}
            text={input.content.recipe_camp.replace('🌿 Ökologie statt Rezept: ', '')}
            tokens={tokens}
          />
        )}
        {input.blocks.recipe_home && input.content.recipe_home && (
          <BayernInfoBlock
            label={isEcologySubstitute(input.content.recipe_home) ? '🌿 Lebensraum' : '🏠 Zuhause'}
            text={input.content.recipe_home.replace('🌿 Ökologie statt Rezept: ', '')}
            tokens={tokens}
          />
        )}
        {input.blocks.season_hint && input.content.catch_season_hint && (
          <BayernInfoBlock
            label="Saison"
            text={input.content.catch_season_hint}
            tokens={tokens}
          />
        )}
        {input.blocks.moon_solunar && input.content.moon_solunar_relevance && (
          <BayernInfoBlock
            label="🌙 Mond & Beißzeit"
            text={input.content.moon_solunar_relevance}
            tokens={tokens}
          />
        )}
      </div>

      {/* Meta footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: '8px 32px 16px 32px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 18,
            color: tokens.text_secondary,
            gap: 2,
          }}
        >
          {input.catch_date && <span>{input.catch_date}</span>}
          {input.location && <span>{input.location}</span>}
          {input.length_cm && <span>{input.length_cm} cm</span>}
          {input.weight_kg && <span>{input.weight_kg} kg</span>}
          {input.angler_name && <span>{input.angler_name}</span>}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 16,
            color: tokens.text_secondary,
            opacity: tokens.watermark_opacity,
          }}
        >
          {tokens.watermark_text}
        </div>
      </div>
    </div>
  )
}

function BayernInfoBlock({
  label,
  text,
  tokens,
}: {
  label: string
  text: string
  tokens: TemplateTokens
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: tokens.bg_secondary,
        borderRadius: tokens.block_radius,
        borderLeft: `3px solid ${tokens.accent}`,
        padding: '10px 16px',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontSize: 16,
          fontWeight: 600,
          color: tokens.accent,
          marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 18,
          color: tokens.text_primary,
          lineHeight: 1.4,
        }}
      >
        {text}
      </div>
    </div>
  )
}
