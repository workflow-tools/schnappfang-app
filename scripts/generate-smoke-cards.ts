/**
 * Batch smoke test card generator.
 *
 * Reads docs/bayern-species-smoketest.csv, starts the Next.js dev server,
 * and fetches cards for each species via the /api/card route.
 *
 * Usage:
 *   npm run generate-cards
 *   # or directly:
 *   npx tsx scripts/generate-smoke-cards.ts
 *
 * Output: scripts/output/ directory with PNGs per species × template × format.
 *
 * This script is a smoke test production tool AND a proof-of-concept for the
 * card renderer. It validates that the CSV → API → PNG pipeline works end-to-end.
 *
 * NOTE: Requires `npm run dev` to be running in another terminal,
 * OR pass --standalone to use satori directly (no server needed).
 */

import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// ── Config ──────────────────────────────────────────────────

const CSV_PATH = join(__dirname, '..', 'docs', 'bayern-species-smoketest.csv')
const OUTPUT_DIR = join(__dirname, 'output')
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000'

const TEMPLATES = ['klassisch', 'bayern', 'lagerfeuer'] as const
const FORMATS = ['feed', 'stories'] as const // skip pdf_a6 for smoke test PNGs

// Which blocks to show on smoke test cards (all fun ones)
const SMOKE_BLOCKS = 'fun_fact,name_origin,recipe_camp,season_hint,moon_solunar'

// Placeholder photo for smoke test (replace with real photos as they arrive)
const PLACEHOLDER_PHOTO = 'https://placehold.co/1080x600/1a2e1a/f5f0e8?text=Foto+folgt'

// ── CSV Parser (minimal, no dependency needed — Rule 11) ────

interface CsvRow {
  species_de: string
  species_la: string
  fun_fact_de: string
  german_name_origin: string
  catch_season_hint: string
  recipe_camp: string
  recipe_home: string
  moon_solunar_relevance: string
  habitat_de: string
  regulations_link: string
  [key: string]: string
}

function parseCsv(content: string): CsvRow[] {
  const lines = content.split('\n').filter((l) => l.trim())
  if (lines.length < 2) return []

  // Handle CSV with quoted fields containing commas
  const parseRow = (line: string): string[] => {
    const fields: string[] = []
    let current = ''
    let inQuotes = false
    for (const char of line) {
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === ',' && !inQuotes) {
        fields.push(current.trim())
        current = ''
      } else {
        current += char
      }
    }
    fields.push(current.trim())
    return fields
  }

  const headers = parseRow(lines[0])
  return lines.slice(1).map((line) => {
    const values = parseRow(line)
    const row: Record<string, string> = {}
    headers.forEach((h, i) => {
      row[h] = values[i] ?? ''
    })
    return row as CsvRow
  })
}

// ── Main ────────────────────────────────────────────────────

async function main() {
  console.log('🐟 Schnappfang Smoke Test Card Generator')
  console.log('─'.repeat(50))

  // Read CSV
  const csvContent = readFileSync(CSV_PATH, 'utf-8')
  const species = parseCsv(csvContent)
  console.log(`📋 Loaded ${species.length} species from CSV`)

  // Create output directory
  mkdirSync(OUTPUT_DIR, { recursive: true })

  let generated = 0
  let failed = 0

  for (const sp of species) {
    for (const template of TEMPLATES) {
      for (const format of FORMATS) {
        const params = new URLSearchParams({
          species: sp.species_de,
          species_la: sp.species_la,
          template,
          format,
          blocks: SMOKE_BLOCKS,
          photo: PLACEHOLDER_PHOTO,
          fun_fact: sp.fun_fact_de,
          name_origin: sp.german_name_origin,
          season_hint: sp.catch_season_hint,
          recipe_camp: sp.recipe_camp,
          moon_solunar: sp.moon_solunar_relevance,
        })

        const url = `${BASE_URL}/api/card?${params.toString()}`
        const filename = `${sp.species_de.toLowerCase()}_${template}_${format}.png`

        try {
          console.log(`  🎨 ${sp.species_de} × ${template} × ${format}...`)
          const response = await fetch(url)

          if (!response.ok) {
            const errorText = await response.text()
            console.error(`  ❌ FAILED: ${response.status} — ${errorText}`)
            failed++
            continue
          }

          const buffer = Buffer.from(await response.arrayBuffer())
          writeFileSync(join(OUTPUT_DIR, filename), buffer)
          generated++
        } catch (err) {
          console.error(`  ❌ FAILED: ${err instanceof Error ? err.message : err}`)
          failed++
        }
      }
    }
  }

  console.log('─'.repeat(50))
  console.log(`✅ Generated: ${generated} cards`)
  if (failed > 0) console.log(`❌ Failed: ${failed} cards`)
  console.log(`📁 Output: ${OUTPUT_DIR}`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
