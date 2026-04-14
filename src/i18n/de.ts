/**
 * German string table — Rule 9: i18n key system from day one.
 * Even MVP-only German goes through this file, not inline in JSX.
 *
 * Keys are dot-separated: section.element.variant
 * Values are the German user-facing strings.
 */

export const de = {
  // Card info block labels
  'card.label.fun_fact': 'Wusstest du?',
  'card.label.name_origin': 'Namensherkunft',
  'card.label.recipe_camp': '🔥 Am Wasser',
  'card.label.recipe_home': '🏠 Zuhause',
  'card.label.ecology': '🌿 Ökologie',
  'card.label.habitat': '🌿 Lebensraum',
  'card.label.season_hint': 'Saison',
  'card.label.moon_solunar': '🌙 Mond & Beißzeit',
  'card.label.weather': '☁️ Wetter',
  'card.label.regulations_link': '📋 Vorschriften',

  // Card meta labels
  'card.meta.angler': 'Angler',
  'card.meta.date': 'Datum',
  'card.meta.location': 'Ort',
  'card.meta.length': 'Länge',
  'card.meta.weight': 'Gewicht',

  // Disclaimer — Rule 6: non-negotiable
  'disclaimer.full':
    'Alle Angaben ohne Gewähr. Es gelten die gesetzlichen Bestimmungen des BayFiG/AVBayFiG.',
  'disclaimer.stand': 'Stand: April 2026',

  // Offline / error messages — Rule 5: no silent degradation
  'error.species_unknown':
    'Art nicht in der Datenbank. Bitte Schonzeiten selbst prüfen.',
  'error.weather_offline': 'Wetter: nicht verfügbar (offline).',
  'error.cache_stale':
    'Daten möglicherweise veraltet. Bitte online aktualisieren.',
  'error.ai_low_confidence':
    'Artbestimmung unsicher. Bitte manuell überprüfen.',

  // Template names
  'template.klassisch': 'Klassisch',
  'template.bayern': 'Bayern',
  'template.lagerfeuer': 'Lagerfeuer',
} as const

export type I18nKey = keyof typeof de
