import styles from './ChatCard.module.css';

export function ChatCard({ children, ariaLabel = 'AI Agent chat', scale }: { children: React.ReactNode; ariaLabel?: string; scale?: number }) {
  // Outer wrapper reserves the scaled footprint (406×732 × --card-scale)
  // so page layout matches the visible area. The inner .card keeps its
  // native 406×732 dimensions; transform: scale(var(--card-scale))
  // shrinks the rendered visual without changing any internal layout,
  // animation, or scroll math — every demo's offsets/cursor/timing stays
  // identical regardless of scale. The default is 0.7; pass scale={1}
  // for the product widget's native 406 by 732 size.
  return (
    <div className={styles.scaledWrap} style={scale === undefined ? undefined : { '--card-scale': scale } as React.CSSProperties}>
      <div className={`${styles.card} chatCard`} role="region" aria-label={ariaLabel}>{children}</div>
    </div>
  );
}
