import type { TimelineConfig } from '@/lib/types';

// The customer bubble starts at the 20px messages inset. The reply follows
// at the shared 32px event gap; each card sits 12px below its bot message.
// The four card states crossfade after the animated cursor clicks each action.
export const timeline: TimelineConfig = {
  cycle: '15s',
  introHold: '0.25s',
  outroFade: '0.7s',
  metaFadeIn: '0.25s',
  metaHold: '0s',
  metaFadeOut: '0s',
  steps: [
    { type: 'user', id: 'replacement-user', duration: '0.4s', pause: '0.25s' },
    { type: 'bot', id: 'replacement-bot-select', lines: [48, 10], cps: 85, pause: '0.2s' },
    { type: 'widget', id: 'replacement-select-card', duration: '0.6s', pause: '0.15s' },
    { type: 'meta', id: 'replacement-meta-select', fadeIn: '0.25s', hold: '0s', fadeOut: '0s', parallel: true },
    { type: 'cursor', id: 'replacement-cursor', startX: 355, startY: 490, appear: '0.2s',
      waypoints: [{ target: 'replacement-select-button', travel: '0.55s', click: '0.1s', pause: '0.15s', select: 'replacement-select-button' }] },
    { type: 'transition', hide: 'replacement-stage-select', show: 'replacement-stage-options', duration: '0.5s', pause: '0s' },
    { type: 'bot', id: 'replacement-bot-options', lines: [43], cps: 95, pause: '0.15s' },
    { type: 'widget', id: 'replacement-options-card', duration: '0.6s', pause: '0.15s' },
    { type: 'meta', id: 'replacement-meta-options', fadeIn: '0.25s', hold: '0s', fadeOut: '0s', parallel: true },
    { type: 'cursor', id: 'replacement-cursor',
      waypoints: [{ target: 'replacement-continue-button', travel: '0.55s', click: '0.1s', pause: '0.15s', select: 'replacement-continue-button' }] },
    { type: 'transition', hide: 'replacement-stage-options', show: 'replacement-stage-confirm', duration: '0.5s', pause: '0s' },
    { type: 'bot', id: 'replacement-bot-confirm', lines: [39], cps: 95, pause: '0.15s' },
    { type: 'widget', id: 'replacement-confirm-card', duration: '0.6s', pause: '0.15s' },
    { type: 'meta', id: 'replacement-meta-confirm', fadeIn: '0.25s', hold: '0s', fadeOut: '0s', parallel: true },
    { type: 'cursor', id: 'replacement-cursor',
      waypoints: [{ target: 'replacement-confirm-button', travel: '0.55s', click: '0.1s', pause: '0.15s', select: 'replacement-confirm-button' }] },
    { type: 'transition', hide: 'replacement-stage-confirm', show: 'replacement-stage-success', duration: '0.55s', pause: '0s' },
    { type: 'bot', id: 'replacement-bot-success', lines: [40], cps: 95, pause: '0.15s' },
    { type: 'widget', id: 'replacement-success-card', duration: '0.5s', pause: '0.15s' },
    { type: 'meta', id: 'replacement-meta-success', fadeIn: '0.25s', hold: '0s', fadeOut: '0s' },
  ],
};
