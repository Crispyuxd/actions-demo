import type { TimelineConfig } from '@/lib/types';

// The inner stack uses a 32px event gap and zero user-row margins.
// bot-1: 20px text + 8px meta gap + 16px meta = 44px.
// user-1 starts at 44 + 32 = 76px, so -76 anchors it to the 20px inset.
// Rendered layout: user-2 starts at 228px, so -228 anchors it at the inset.
export const timeline: TimelineConfig = {
  cycle: '15s',
  introHold: '0.4s',
  outroFade: '0.7s',
  metaFadeIn: '0.25s',
  metaHold: '0.2s',
  metaFadeOut: '0.2s',
  steps: [
    { type: 'bot', id: 'bot-1', lines: [35], cps: 75, pause: '0.45s',
      meta: { id: 'meta-0', fadeOut: '0s' } },
    { type: 'scroll', target: 'cancellation-scroll', y: -76, duration: '0.5s', parallel: true },
    { type: 'user', id: 'user-1', duration: '0.35s', pause: '0.35s' },
    { type: 'thinking', id: 'trace-1', duration: '0.75s' },
    { type: 'bot', id: 'bot-2', lines: [42], cps: 90, pause: '0.35s',
      meta: { id: 'meta-1', hold: '0.8s', fadeOut: '0s' } },
    { type: 'scroll', target: 'cancellation-scroll', y: -228, duration: '0.5s', parallel: true },
    { type: 'user', id: 'user-2', duration: '0.35s', pause: '0.45s' },
    { type: 'thinking', id: 'trace-2', duration: '0.9s' },
    { type: 'bot', id: 'bot-3', lines: [39], cps: 90, pause: '0.2s' },
    { type: 'widget', id: 'cancellation-result', duration: '0.4s', pause: '0.2s' },
    { type: 'meta', id: 'meta-result', fadeIn: '0.25s', hold: '0s', fadeOut: '0s' },
  ],
};
