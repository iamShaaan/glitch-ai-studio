# Project Constitution: Glitch AI Studio

## Data Schemas

### Asset Preloading Manifest
```json
{
  "assets": [
    {
      "id": "hero_sequence",
      "type": "image_sequence",
      "path": "/assets/hero-sequence/",
      "count": 120,
      "priority": "high"
    },
    {
      "id": "review_assets",
      "type": "image",
      "urls": ["/assets/reviews/1.png", "..."],
      "priority": "medium"
    }
  ],
  "progress": 0,
  "isReady": false
}
```

## Behavioral Rules
- **Non-Interruption**: The website must remain hidden behind a cinematic loading screen until 100% of critical assets (Hero Sequence, Reviews) are pre-cached in memory.
- **Deterministic Ready State**: Visibility is triggered only when the `isReady` signal is received from the loader.
- **GPU Acceleration**: Use hardware-accelerated transitions for the grand reveal.

## Architectural Invariants
- All landing components must register their assets with the central `PreloadManager`.
- Animations (Framer Motion) should be paused/stashed until the `isReady` state is true.

## Maintenance Log
- **[2026-04-08] Unified Preloading Strategy**: Initiated transition to a centralized loading state to resolve "flickering" and "half-loaded" animation issues reported on slower connections.
