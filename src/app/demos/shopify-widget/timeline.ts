import type { TimelineConfig } from '@/lib/types';

// Layout reference (offsetTop within #shopify-scroll, gap 20 +
// UserMessage CSS margins 12/12 + MetaRow in-flow at margin-top 8,
// height 16 → adds 24 to its bot's height):
//   bot-1 botBlock      0..44   (text 0..20, meta-0 inline at 28..44)
//   user-1 row         76..120  (margin 12, bubble 44 — single line)
//   bot-2 wrapper     152..~    (text 0..20 + marginTop:12 widget area below)
//
// .messages has 20px padding + overflow:hidden.
// User-message anchor at padding-box y = 20 (inset edge):
//   -76  user-1 anchor — bot-1+meta-0 scroll up together

export const timeline: TimelineConfig = {
  cycle: '15s',
  introHold: '0.35s',
  outroFade: '0.6s',
  metaFadeIn: '0.2s',
  metaHold: '0.1s',
  metaFadeOut: '0.2s',
  steps: [
    // AI bot greets — meta-0 fadeOut '0s' so it scrolls up with bot-1
    { type: 'bot', id: 'bot-1', lines: [20], pause: '0.2s',
      meta: { id: 'meta-0', fadeOut: '0s' } },

    // user-1 turn-anchor (parallel): scroll runs concurrently with the
    // user bubble pop, so user-1 is anchored at the top from the first
    // frame. y: -76 lands user-1 at padding-box y=20 (the inset edge)
    // and lifts bot-1 + meta-0 above the visible viewport.
    { type: 'scroll', target: 'shopify-scroll', y: -76, duration: '0.5s', parallel: true },
    { type: 'user', id: 'user-1', duration: '0.35s', pause: '0.2s' },

    // Catalog lookup runs behind the pending indicator.
    { type: 'thinking', id: 'trace-1', duration: '0.6s' },

    // Bot offers categories list — `lines:` mode so the engine tracks the
    // line span (#bot-2-line-1) and a later `untype` step can backspace it
    // ahead of the success transition. 46 characters type in about 0.38s.
    { type: 'bot', id: 'bot-2', lines: [46], cps: 120, pause: '0.1s' },

    // Phase: categories
    { type: 'widget', id: 'categories-widget', duration: '0.4s', pause: '0.1s' },
    { type: 'meta', id: 'meta-cat', fadeIn: '0.2s', hold: '0s', fadeOut: '0s', parallel: true },
    { type: 'cursor', id: 'cursor',
      // Enter from the right side at mid-card height — feels like the user
      // moved the mouse aside between turns, not "appeared at the top edge".
      startX: 360, startY: 320,
      appear: '0.2s',
      waypoints: [
        { target: 'btn-mens-view', travel: '0.55s', click: '0.1s', pause: '0.25s', select: 'btn-mens-view' },
      ],
      rest: { x: 290, travel: '0.25s' },
    },

    // Transition: categories → picker
    { type: 'transition', hide: 'state-categories', show: 'state-picker', duration: '0.5s', pause: '0s' },
    { type: 'widget', id: 'picker-widget', duration: '0.4s', pause: '0.1s' },
    { type: 'meta', id: 'meta-picker', fadeIn: '0.2s', hold: '0s', fadeOut: '0s', parallel: true },

    // Phase: pick first product (XY Metcon 64)
    { type: 'cursor', id: 'cursor',
      waypoints: [
        { target: 'btn-metcon', travel: '0.5s', click: '0.1s', pause: '0.2s', select: 'btn-metcon' },
      ],
      rest: { x: 280, travel: '0.25s' },
    },

    // Overlay + sheet open IN SYNC — parallel:true on the overlay keeps the
    // cursor at the same start time so the sheet widget below runs concurrent.
    // Both 0.6s with ease-scroll (no overshoot) so they read as one motion.
    { type: 'widget', id: 'sheet-overlay-1', duration: '0.6s', pause: '0s', slideY: '0px', ease: 'var(--ease-scroll)', parallel: true },
    { type: 'widget', id: 'sheet-metcon', duration: '0.6s', pause: '0.1s', slideY: '100%', ease: 'var(--ease-scroll)' },
    { type: 'cursor', id: 'cursor',
      waypoints: [
        { target: 'btn-add-metcon', travel: '0.5s', click: '0.1s', pause: '0.2s', select: 'btn-add-metcon' },
      ],
      rest: { x: 290, travel: '0.25s' },
    },

    // Close in sync: sheet slides down + overlay fades out + Select-options
    // button morphs to qty-stepper, all starting at the same time. parallel:true
    // on the first two keeps the cursor anchored so the third (overlay, no
    // parallel) drives the cursor advance.
    { type: 'transition', hide: 'sheet-metcon', show: 'noop-1', duration: '0.85s', pause: '0s', slideOutY: '100%', parallel: true },
    { type: 'transition', hide: 'btn-metcon', show: 'qty-metcon', duration: '0.3s', pause: '0s', slideOutY: '0px', parallel: true },
    { type: 'transition', hide: 'sheet-overlay-1', show: 'noop-4', duration: '0.6s', pause: '0.1s', slideOutY: '0px' },

    // Transition: picker → cart. Plain cross-fade — NOT morph: state-cart
    // is also the hide-target of the cart→success morph below, and the engine
    // emits one #state-cart { animation: ... } rule per transition; the last
    // wins, so adding a morph here would have hide-state-cart override the
    // show-state-cart, leaving state-cart opacity:1 from t=0 (visible from
    // demo start). Plain cross-fade pairs with cart-widget's own widget
    // animation to reveal the contents.
    { type: 'transition', hide: 'state-picker', show: 'state-cart', duration: '0.5s', pause: '0s' },
    { type: 'widget', id: 'cart-widget', duration: '0.4s', pause: '0.1s' },
    { type: 'meta', id: 'meta-cart', fadeIn: '0.2s', hold: '0s', fadeOut: '0s', parallel: true },
    { type: 'cursor', id: 'cursor',
      waypoints: [
        { target: 'btn-checkout', travel: '0.6s', click: '0.1s', pause: '0.2s', select: 'btn-checkout' },
      ],
      // No `rest` — cursor fades out 0.18s after the click (engine default
      // for unparked cursor end), matching the forms demo's btn-submit beat.
      // Cursor disappears before the cart→success morph runs so the success
      // beat reads as "agent confirms order" without a stale pointer hanging.
    },

    // Cart → success — coordinated MORPH (parallel:true) running concurrent
    // with the bot-text untype→swap→type beat below, exactly like the forms
    // demo's submit→success transition. Both cards meet at scale 0.86 + blur
    // 1.5px at mid-point so it reads as one shape transforming.
    { type: 'transition', hide: 'state-cart', show: 'state-success', duration: '0.7s', morph: true, parallel: true },

    // Bot-2 backspaces during the morph — agent retracting "Here's a list…"
    // before committing to the success message.
    // The 0.35s erase runs alongside the cart-to-success morph.
    { type: 'untype', target: 'bot-2-line-1', duration: '0.35s', pause: '0.02s' },

    // Wrapper swap is purely an opacity flip — bot-3's line is still clipped
    // by its own typewriter, so the visible content arrives via the bot-3
    // step below. parallel:true keeps cursor on the typewriter's start frame.
    { type: 'transition', hide: 'state-shopify-bot', show: 'state-success-bot', duration: '0.05s', slideOutY: '0px', parallel: true },

    // Bot-3 types the 42-character confirmation at 140 cps during the morph.
    // Text and card settle at nearly the same time.
    { type: 'bot', id: 'bot-3', lines: [42], cps: 140, pause: '0.1s' },
    { type: 'meta', id: 'meta-success', fadeIn: '0.2s', hold: '0s', fadeOut: '0s', parallel: true },
  ],
};
