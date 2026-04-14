/**
 * Centralized design tokens for all card templates.
 * Rule 7: Colors, fonts, spacing defined here — not in rendering code.
 *
 * Satori CSS support: flexbox, basic positioning, backgrounds, borders,
 * text styling, opacity. NO: gradients with multiple stops, blend modes,
 * advanced clip-paths, CSS Grid. Keep it clean.
 */

import type { TemplateName, TemplateTokens } from '../types'

export const TEMPLATES: Record<TemplateName, TemplateTokens> = {
  klassisch: {
    display_name_de: 'Klassisch',
    bg_primary: '#1a2e1a',      // Dark forest green
    bg_secondary: '#2a4a2a',    // Lighter forest green
    text_primary: '#f5f0e8',    // Warm off-white
    text_secondary: '#b8c4a8',  // Sage
    accent: '#d4a853',          // Warm gold
    font_heading: 'Inter',      // Will swap to a display font when custom fonts loaded
    font_body: 'Inter',
    block_radius: 8,
    watermark_opacity: 0.3,
    watermark_text: 'schnappfang.de',
  },

  bayern: {
    display_name_de: 'Bayern',
    bg_primary: '#0b3d91',      // Bavarian blue
    bg_secondary: '#1a4fa0',    // Lighter Bavarian blue
    text_primary: '#ffffff',    // White
    text_secondary: '#a8c8e8',  // Light blue
    accent: '#ffffff',          // White diamonds (Bavarian pattern)
    font_heading: 'Inter',
    font_body: 'Inter',
    block_radius: 4,
    watermark_opacity: 0.25,
    watermark_text: 'schnappfang.de',
  },

  lagerfeuer: {
    display_name_de: 'Lagerfeuer',
    bg_primary: '#2d1810',      // Dark wood brown
    bg_secondary: '#3d2820',    // Warm brown
    text_primary: '#f5e6d0',    // Warm cream
    text_secondary: '#c8a882',  // Tan
    accent: '#e8732a',          // Campfire orange
    font_heading: 'Inter',
    font_body: 'Inter',
    block_radius: 12,
    watermark_opacity: 0.3,
    watermark_text: 'schnappfang.de',
  },
} as const

/**
 * Disclaimer text — Rule 6: non-negotiable, every card and regulation screen.
 * Post-pivot: we no longer show verdicts, but the disclaimer still applies
 * to any regulation-adjacent content (season hints, regulation links).
 */
export const DISCLAIMER_DE =
  'Alle Angaben ohne Gewähr. Es gelten die gesetzlichen Bestimmungen des BayFiG/AVBayFiG.'

/**
 * Stand date for the current species dataset.
 * Displayed on cards that include regulation links or season hints.
 */
export const DATASET_STAND = 'Stand: April 2026'
