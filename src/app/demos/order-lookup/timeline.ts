import type { TimelineConfig } from '@/lib/types';

// The customer bubble begins at the 20px inset. The response follows after
// the standard 32px event gap, and the Figma status card sits 12px below it.
export const timeline: TimelineConfig = {
  cycle: '6s',
  introHold: '0.4s',
  outroFade: '0.7s',
  metaFadeIn: '0.25s',
  metaHold: '0s',
  metaFadeOut: '0s',
  steps: [
    { type: 'user', id: 'lookup-user', duration: '0.45s', pause: '0.55s' },
    { type: 'bot', id: 'lookup-bot', lines: [53], cps: 90, pause: '0.2s' },
    { type: 'widget', id: 'lookup-card', duration: '0.6s', pause: '0.2s' },
    { type: 'meta', id: 'lookup-meta', fadeIn: '0.25s', hold: '0s', fadeOut: '0s' },
  ],
};
