# Schnappfang — Native App Toolkit Reference

> Open-source libraries, starter templates, and architectural references
> for building the Schnappfang native app (iOS + Android). Compiled
> 2026-04-13 from a sweep of actively maintained projects (2025–2026).
>
> **Timing:** This toolkit is a *research artefact* — collect now, build
> after the smoke test validates demand. Nothing here commits to a
> framework choice yet, but the evidence strongly favours Expo + React
> Native given the existing React + TypeScript stack.

---

## 1. Recommended Stack (Solo-Founder Optimised)

| Layer | Library | Why |
|-------|---------|-----|
| Framework | **Expo (SDK 53+)** | Managed builds, OTA updates, app store submission. No Xcode/Android Studio babysitting. |
| Scaffold | **Ignite 11 "Bison"** or **Obytes Starter** | 100+ hours saved setup. Ignite ships React Navigation v7 + MMKV. Obytes ships Expo Router + Tailwind. |
| Navigation | **Expo Router** | File-based routing, automatic deep linking, web/native code-sharing. Now the default in `create-expo-app`. |
| Camera | **react-native-vision-camera** | Frame processors, autofocus, pinch-zoom, ML integration. ~8.8k stars, updated Jan 2026. |
| EXIF | **exifr** | Fastest client-side EXIF parser. Selective field extraction: `exifr.parse(blob, {pick: ['GPSLatitude', 'GPSLongitude', 'DateTime']})`. |
| Image crop/resize | **expo-image-manipulator** | Built into Expo SDK. Crop, resize, rotate, flip. Fits photos to card templates (1080×1350, 1080×1920). |
| Offline storage | **MMKV** (react-native-mmkv) | 30× faster than AsyncStorage. Perfect for 50KB species cache. 8.2k stars, March 2026. |
| Offline queue | **Custom queue in MMKV** | Store pending AI ID requests as JSON array, process on reconnect via NetInfo. Zero extra dependencies. |
| Network detection | **NetInfo** (react-native-netinfo) | Hooks-based (`useNetInfo`). Standard community solution. |
| Card rendering | **react-native-view-shot** | Snapshots React components to PNG/JPEG. Render card as component → capture → share. v4.0.3, maintained. |
| Card rendering (v2) | **react-native-skia** (Shopify) | Lower-level 2D primitives. Better for shadows, gradients, off-screen rendering. Upgrade path if view-shot limits. |
| Sharing | **react-native-share** | 549k weekly downloads. App-specific targeting (Instagram, WhatsApp, Pinterest). Base64 support. |
| i18n | **i18next + expo-localization** | Device language detection + React hooks for UI strings. ~1 hour setup. De facto standard. |
| On-device AI | **expo-ai-kit** | December 2025 release. ExecuTorch integration. No servers, no API keys, fully private. Optional upgrade path. |

---

## 2. Camera + Photo Pipeline

### Architecture

```
VisionCamera capture
    → exifr extracts GPS + timestamp
    → expo-image-manipulator crops/resizes to card dimensions
    → MMKV stores metadata
    → expo-file-system stores image
    → If online: send to Claude Vision API for fish ID
    → If offline: queue request in MMKV, process on reconnect
```

### Key Libraries

**react-native-vision-camera** ([GitHub](https://github.com/mrousavy/react-native-vision-camera))
- ~8.8k stars, updated January 2026
- Frame Processors run on C++/Java/Objective-C threads — zero dropped frames
- Supports autofocus, pinch-to-zoom, real-time ML integration
- Gotcha: Steeper setup than expo-camera (native configuration required). Not pure Expo — needs config plugin or bare workflow for advanced features.

**exifr** ([GitHub](https://github.com/MikeKovarik/exifr))
- Fastest and most versatile client-side EXIF parser
- Selective extraction avoids parsing entire file:
  ```typescript
  const exif = await exifr.parse(imageBlob, {
    pick: ['GPSLatitude', 'GPSLongitude', 'DateTime']
  })
  ```
- Works on Blob/Buffer/Uint8Array

**expo-image-manipulator** ([Docs](https://docs.expo.dev/versions/latest/sdk/imagemanipulator/))
- Built into Expo SDK — zero extra dependencies
- Handles crop, resize, rotate, flip
- Gotcha: Does NOT preserve EXIF by default. Extract metadata with exifr *before* manipulating.

**react-native-image-crop-picker** ([GitHub](https://github.com/ivpusic/react-native-image-crop-picker))
- 10k+ npm downloads, built-in compression and crop UI
- Alternative to expo-image-picker if you need more control

**react-native-photo-manipulator**
- Batch operations: crop + resize + text overlay + rotation in a single native call
- Good for template-fitting workflows at scale

---

## 3. Offline-First Architecture

### Storage Decision Tree

| Data type | Size | Solution |
|-----------|------|----------|
| Species + regulations cache | ~50KB JSON | **MMKV** (key-value, instant reads) |
| Pending AI ID requests | Variable, small | **MMKV** (JSON array queue) |
| Card images | MBs per card | **expo-file-system** (native filesystem) |
| Catch history (v0.3+) | Growing over time | **expo-sqlite** (structured queries) |

### Key Libraries

**MMKV** ([GitHub](https://github.com/mrousavy/react-native-mmkv))
- 8.2k stars, March 2026, by mrousavy (same author as VisionCamera)
- 30× faster than AsyncStorage
- Simple key-value API, zero configuration
- Perfect for: species cache, request queue, user preferences

**expo-sqlite** ([Docs](https://docs.expo.dev/versions/latest/sdk/sqlite/))
- SQL queries, structured schema
- Use for catch history if/when relational queries become needed
- Reference: [expo-sqlite-drizzle](https://github.com/israataha/expo-sqlite-drizzle) (habit tracker with local-first pattern)

**WatermelonDB** ([GitHub](https://github.com/Nozbe/WatermelonDB))
- Overkill for 50KB, but relevant if catch history grows to thousands of records
- Complex setup — skip unless you hit that scale

**NetInfo** ([GitHub](https://github.com/react-native-netinfo/react-native-netinfo))
- Standard community network detection
- Hooks-based: `const { isConnected } = useNetInfo()`
- Use to trigger queue processing on reconnect

### Offline Queue Pattern (Custom, Zero Dependencies)

```typescript
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV()
const QUEUE_KEY = 'pending_fish_id_requests'

// Enqueue when offline
function enqueue(request: FishIdRequest) {
  const queue = JSON.parse(storage.getString(QUEUE_KEY) ?? '[]')
  queue.push({ ...request, queued_at: Date.now() })
  storage.set(QUEUE_KEY, JSON.stringify(queue))
}

// Process when back online (triggered by NetInfo listener)
async function processQueue() {
  const queue = JSON.parse(storage.getString(QUEUE_KEY) ?? '[]')
  const remaining: FishIdRequest[] = []
  
  for (const request of queue) {
    try {
      await submitFishId(request) // your API call
    } catch {
      remaining.push(request) // retry next time
    }
  }
  
  storage.set(QUEUE_KEY, JSON.stringify(remaining))
}
```

---

## 4. Card Generation + Sharing

### On-Device Card Rendering

The web version uses `@vercel/og` (satori + resvg) for server-side card generation. This does NOT port to React Native — satori requires a Node runtime. For native, render cards client-side.

**react-native-view-shot** ([GitHub](https://github.com/gre/react-native-view-shot))
- v4.0.3, actively maintained
- Captures any React Native View hierarchy to PNG/JPEG
- Pattern: render your card as a styled React component → snapshot → share
- Gotcha: requires the component to be rendered (on-screen or off-screen) to capture it

**react-native-skia** ([GitHub](https://github.com/Shopify/react-native-skia))
- By Shopify, production-grade (powers their apps)
- Lower-level 2D primitives: shadows, gradients, image filters, SVG paths
- Can generate images without layout (off-screen rendering)
- Steeper learning curve, but more powerful for complex card overlays
- Upgrade path from view-shot if you need real-time filters or blur effects

**react-native-image-generator** ([GitHub](https://github.com/evgenusov/react-native-image-generator))
- Generates images from layer stack
- Good reference for layering architecture (photo base + text overlays + watermark)

### Reusing Web Design Tokens

While the rendering engine changes (satori → view-shot/skia), the design system transfers directly. Share:
- `src/templates/config.ts` — colour tokens, fonts, spacing
- `src/types/card.ts` — CardBlockSelection, CardInput, CARD_DIMENSIONS
- `src/i18n/de.ts` — German string table

### Native Sharing

**react-native-share** ([NPM](https://www.npmjs.com/package/react-native-share))
- 549k weekly downloads, far more capable than expo-sharing
- App-specific routing: target Instagram Stories, WhatsApp, Pinterest directly
- Base64 image support (no temp file needed)
- expo-sharing is simpler but limited to local files without social app pre-fill

### Deep Linking

- Use Open Graph meta tags on shared card URLs so Instagram/WhatsApp render rich previews
- Expo Router handles inbound universal links automatically
- React Navigation also supports deep linking but requires manual route registration

---

## 5. Architectural References (Open Source)

### Fish / Nature ID Apps

**Fishpic** ([GitHub](https://github.com/ashleyjsands/fishpic))
- React Native fish ID app, TensorFlow Lite, 72-species model, ~80% accuracy
- Google Play listed, open source
- Directly relevant architecture for camera → AI → result flow

**Fishial.AI** ([fishial.ai](https://www.fishial.ai/))
- Open-source fish ID library + model + mobile app
- Sponsored foundation project, all data and code public
- Potential source for pre-trained fish ID models

**Seek by iNaturalist** ([GitHub](https://github.com/inaturalist/SeekReactNative))
- Full multi-species identification app (plants, animals, fungi)
- Well-architected React Native reference
- Uses VisionCamera for camera I/O

**PlantRecog** ([GitHub](https://github.com/sarthakpranesh/PlantRecog))
- Plant ID with public API and models
- Simpler architecture, good for understanding the camera → API → result pattern

### Starter Templates

**Ignite 11 "Bison"** ([GitHub](https://github.com/infinitered/ignite))
- By Infinite Red, the gold standard for RN boilerplates
- Expo 53, React Native 0.81, TypeScript 5, New Architecture on by default
- Ships with React Navigation v7, Reanimated v4, MMKV persistence
- Best for: structured utility apps with offline requirements

**Obytes Starter** ([starter.obytes.com](https://starter.obytes.com/))
- Production-ready, includes Expo Router, TailwindCSS, modern tooling
- Lighter than Ignite, Expo-Router-first
- Best for: fast scaffolding if you prefer file-based routing

---

## 6. Gotchas & Solo-Founder Notes

**Camera permissions differ between iOS and Android.** Use `expo-permissions` or the config plugin for VisionCamera. Test on both platforms early.

**Image size budget:** Keep captured photos under 2MB to avoid memory crashes on older devices. expo-image-manipulator can compress on capture.

**On-device ML model size:** TensorFlow Lite models should stay under ~30–50MB for reasonable app bundle size. The Claude Vision API (cloud) is the MVP path; on-device is an optimisation for v0.3+.

**New Architecture adoption:** Ignite 11 ships with it on by default. Most actively maintained community packages (VisionCamera, MMKV, Skia) support it. Check compatibility before adding any older packages.

**Satori code does not transfer to native.** The web card renderer (`@vercel/og`) and the native card renderer (view-shot or Skia) are separate rendering pipelines. Design tokens, types, and i18n strings transfer; rendering code does not. Plan for this from the start.

**expo-ai-kit (December 2025)** enables on-device AI via ExecuTorch. This could eventually replace the Claude Vision API call for fish identification, making the app fully offline-capable. Keep an eye on this for v0.3+.

---

## 7. Micro-SaaS Signal

The "camera → AI identification → styled card → native share" pipeline is not fishing-specific. The same architecture serves: mushroom foraging cards, bird watching cards, plant identification cards, wildlife photography cards, hiking summit cards, dive log cards. If the Schnappfang native app proves the pattern, extracting it as a white-label "catch card SDK" or template could be a separate micro-SaaS product.

---

*Stand: April 2026. Libraries and star counts will shift — verify before committing to any dependency.*
