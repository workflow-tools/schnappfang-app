/**
 * Placeholder landing page. Will be replaced with the actual upload UI.
 * For now, it documents how to use the card API for smoke testing.
 */

export default function Home() {
  return (
    <main style={{ fontFamily: 'system-ui', maxWidth: 640, margin: '2rem auto', padding: '0 1rem' }}>
      <h1>🐟 Schnappfang</h1>
      <p>Fangkarten-Generator — Smoke Test Mode</p>
      <h2>Card API</h2>
      <p>
        Generate a card by visiting:
      </p>
      <pre style={{ background: '#f4f4f4', padding: '1rem', borderRadius: 8, overflowX: 'auto' }}>
        {`/api/card?species=Hecht&species_la=Esox+lucius&template=klassisch&format=feed&blocks=fun_fact,name_origin&fun_fact=Der+Hecht+kann+bis+zu+1,5+m+lang+werden`}
      </pre>
      <h2>Parameters</h2>
      <ul>
        <li><code>species</code> — German species name (required)</li>
        <li><code>species_la</code> — Latin name</li>
        <li><code>template</code> — klassisch | bayern | lagerfeuer</li>
        <li><code>format</code> — feed (1080×1350) | stories (1080×1920)</li>
        <li><code>blocks</code> — comma-separated: fun_fact, name_origin, recipe_camp, recipe_home, season_hint, moon_solunar</li>
        <li><code>photo</code> — URL to the fish photo</li>
        <li><code>angler</code>, <code>date</code>, <code>location</code>, <code>length</code>, <code>weight</code> — optional metadata</li>
      </ul>
    </main>
  )
}
