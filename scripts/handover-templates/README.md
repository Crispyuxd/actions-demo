# widget-demos

Animated chat-widget demos as drop-in React components. Each demo is a
short, looping animation showing a commerce agent flow: a storefront
order, an order lookup, a cancellation and a replacement order.

## What's in the box

```
widget-demos/
├── index.ts                  Public API — import demos from here
├── package.json              Peer deps + entry points
├── styles/
│   └── tokens.css            Design tokens (colors, easings, shadows).
│                             MUST be imported once at your app root.
├── components/               Shared widget primitives (ChatCard,
│                             ChatHeader, MessagesStack, etc.)
├── hooks/
│   └── useTimeline.ts        Drives the per-demo timeline engine
├── lib/                      Timeline engine internals
├── icons/                    Inline-SVG icons used by the components
├── public/                   Static images the demos load by URL.
│                             Copy into your app's public root.
└── demos/                    4 ready-to-render demo components
    ├── shopify-widget/       Also holds the shared widget chrome the
    │                         three order demos import. Keep it.
    ├── order-lookup/
    ├── order-cancellation/
    └── replacement-order/
```

## Quick start

1. Copy the entire `widget-demos/` folder into your project (e.g. into
   `src/widget-demos/`).
2. Copy the folders inside `widget-demos/public/` into your app's public
   root (see `INTEGRATION.md`, step 2b).
3. Import the token CSS once in your app entry (e.g. `app/layout.tsx`,
   `_app.tsx`, or wherever you import global styles):

   ```tsx
   import 'src/widget-demos/styles/tokens.css';
   ```

4. Render any demo:

   ```tsx
   import { OrderLookupDemo } from 'src/widget-demos';

   export default function MyPage() {
     return <OrderLookupDemo />;
   }
   ```

That's it. Every demo runs autonomously — no props, no state wiring needed.

## Available demos

| Component               | What it shows                                           |
|-------------------------|---------------------------------------------------------|
| `ShopifyWidgetDemo`     | Sale categories → product pick → order placed           |
| `OrderLookupDemo`       | Order status lookup with shipment map                   |
| `OrderCancellationDemo` | Cancel an order → cancellation confirmed                |
| `ReplacementOrderDemo`  | Pick items and sizes → replacement order placed         |

## Requirements

- **React** ≥ 18
- **React DOM** ≥ 18
- Native CSS animations + `linear()` easing — works in all evergreen
  browsers. No Framer Motion / GSAP runtime needed.
- TypeScript ≥ 5 if you import from `.ts` directly (most consumers will).
- **Next.js** ≥ 13 for `OrderLookupDemo` and `ReplacementOrderDemo`.
  They render their images with `next/image`. On a non-Next stack, swap
  those two `<Image>` tags for `<img>` (see `INTEGRATION.md`).
- **Inter** (400, 500, 600) on the page. The widgets inherit their font.

## Integration details

See `INTEGRATION.md` for:
- Path-alias setup (Next.js, Vite, Webpack)
- Static images (`public/`) and font
- Embedding demos at custom sizes
- Debug scrubber (`?debug` URL param)

## Sizing & scale

Every demo renders inside a `ChatCard` at full size, **406 × 732 px**.
If you need a different size, wrap the demo in a `<div>` with a CSS
`transform: scale(...)`.

## Updates

This bundle is delivered as a zip on release. Versions follow semver
(`MAJOR.MINOR.PATCH`).

## Support

Issues, requests, custom demos: contact the SupaStellar team.
