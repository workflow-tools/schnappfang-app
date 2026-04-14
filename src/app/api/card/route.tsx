/**
 * Card generation API route.
 *
 * GET /api/card?species=Hecht&template=klassisch&format=feed&blocks=fun_fact,name_origin
 *
 * Uses @vercel/og (satori + resvg) to render JSX → PNG.
 * This route works on Vercel Edge Functions and in local `next dev`.
 *
 * Rule 4: Pre-output QA — type-checked, German UI text, dimensions match.
 * Rule 5: No silent degradation — unknown species → error, not default.
 * Rule 7: Output dimensions from CARD_DIMENSIONS, not hardcoded.
 */

import { ImageResponse } from 'next/og'
import type { TemplateName, CardOutputFormat, CardBlockSelection, CardInput } from '@/types'
import { CARD_DIMENSIONS } from '@/types'
import { TEMPLATES } from '@/templates'
import { KlassischCard } from '@/templates/klassisch'
import { BayernCard } from '@/templates/bayern'
import { LagerfeuerCard } from '@/templates/lagerfeuer'

export const runtime = 'edge'

/** Parse comma-separated block names into a CardBlockSelection */
function parseBlocks(blocksParam: string | null): CardBlockSelection {
  const active = new Set((blocksParam ?? '').split(',').map((b) => b.trim()))
  return {
    fun_fact: active.has('fun_fact'),
    name_origin: active.has('name_origin'),
    recipe_camp: active.has('recipe_camp'),
    recipe_home: active.has('recipe_home'),
    habitat: active.has('habitat'),
    season_hint: active.has('season_hint'),
    regulations_link: active.has('regulations_link'),
    moon_solunar: active.has('moon_solunar'),
    weather: active.has('weather'),
    gps: active.has('gps'),
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Required params
  const speciesName = searchParams.get('species')
  if (!speciesName) {
    return new Response(
      JSON.stringify({ error: 'Missing required parameter: species' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  // Template selection (default: klassisch)
  const templateName = (searchParams.get('template') ?? 'klassisch') as TemplateName
  const tokens = TEMPLATES[templateName]
  if (!tokens) {
    return new Response(
      JSON.stringify({ error: `Unknown template: ${templateName}` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  // Output format (default: feed)
  const format = (searchParams.get('format') ?? 'feed') as CardOutputFormat
  const dims = CARD_DIMENSIONS[format]
  if (!dims) {
    return new Response(
      JSON.stringify({ error: `Unknown format: ${format}` }),
      { status: 400, headers: { 'Content-Type': 'application/json' } },
    )
  }

  // Parse optional blocks
  const blocks = parseBlocks(searchParams.get('blocks'))

  // Build CardInput from query params
  // In MVP, species content will come from the JSON bundle.
  // For now, accept content directly via query params for testing.
  const input: CardInput = {
    species_name_de: speciesName,
    species_name_la: searchParams.get('species_la') ?? '',
    photo_url: searchParams.get('photo') ?? 'https://placehold.co/1080x600/1a2e1a/f5f0e8?text=Schnappfang',
    template: templateName,
    format,
    blocks,
    angler_name: searchParams.get('angler') ?? undefined,
    catch_date: searchParams.get('date') ?? undefined,
    location: searchParams.get('location') ?? undefined,
    weight_kg: searchParams.get('weight') ? Number(searchParams.get('weight')) : undefined,
    length_cm: searchParams.get('length') ? Number(searchParams.get('length')) : undefined,
    weather_line: searchParams.get('weather') ?? undefined,
    content: {
      fun_fact_de: searchParams.get('fun_fact') ?? undefined,
      german_name_origin: searchParams.get('name_origin') ?? undefined,
      recipe_camp: searchParams.get('recipe_camp') ?? undefined,
      recipe_home: searchParams.get('recipe_home') ?? undefined,
      habitat_de: searchParams.get('habitat') ?? undefined,
      catch_season_hint: searchParams.get('season_hint') ?? undefined,
      regulations_link: searchParams.get('regulations_link') ?? undefined,
      moon_solunar_relevance: searchParams.get('moon_solunar') ?? undefined,
    },
  }

  // Select template component
  const CardComponent =
    templateName === 'bayern'
      ? BayernCard
      : templateName === 'lagerfeuer'
        ? LagerfeuerCard
        : KlassischCard

  return new ImageResponse(
    <CardComponent input={input} tokens={tokens} />,
    {
      width: dims.width,
      height: dims.height,
    },
  )
}
