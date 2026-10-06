import Image from 'next/image';
import styles from './page.module.css';

export function OrderStatusCard() {
  return (
    <section id="lookup-card" className={styles.statusCard} aria-label="Order 84213 shipment status">
      <div className={styles.map} aria-hidden="true">
        <Image src="/order-lookup/map.webp" alt="" width={741} height={401} unoptimized />
        <span className={styles.mapPin} />
      </div>
      <div className={styles.statusPanel}>
        <div className={styles.statusHeading}>
          <div>
            <span className={styles.eyebrow}>Your package is</span>
            <strong>In-transit</strong>
          </div>
          <span className={styles.updated}>Updated 2m ago</span>
        </div>
        <div className={styles.progress} aria-label="Shipment is halfway to delivery">
          <span className={styles.done} />
          <span className={styles.done} />
          <span />
          <span />
        </div>
      </div>
    </section>
  );
}
