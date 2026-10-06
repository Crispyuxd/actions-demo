/* eslint-disable @next/next/no-img-element */
'use client';

import Image from 'next/image';
import styles from './ReplacementCards.module.css';

const assets = '/replacement-order';
export type ReplacementItem = 'hoodie' | 'shoes';
export const products = {
  hoodie: { image: `${assets}/hoodie.png`, name: 'Classic Hoodie', color: 'Red', receivedSize: 'M', defaultSize: 'L', sizes: ['M', 'L', 'XL'] },
  shoes: { image: `${assets}/shoes.png`, name: 'Runners Shoes', color: 'White', receivedSize: '10', defaultSize: '11', sizes: ['10', '11', '12'] },
} as const;

function ProductRow({ image, name, detail }: { image: string; name: string; detail: string }) {
  return (
    <span className={styles.productRow}>
      <span className={styles.productImage}>
        <Image src={image} alt="" width={44} height={44} />
      </span>
      <span className={styles.productText}>
        <span className={styles.productName}>{name}</span>
        <span className={styles.productDetail}>{detail}</span>
      </span>
    </span>
  );
}

export function SelectItemCard({ selected, onSelect, onContinue }: { selected: ReplacementItem; onSelect: (item: ReplacementItem) => void; onContinue: () => void }) {
  return (
    <div id="replacement-select-card" className={styles.card}>
      <h3 className={styles.title}>Select item to replace</h3>
      <div className={styles.separator} />
      <div className={styles.items} role="radiogroup" aria-label="Item to replace">
        {(['hoodie', 'shoes'] as const).map(item => {
          const product = products[item];
          return (
            <label key={item} className={styles.itemChoice}>
              <ProductRow image={product.image} name={product.name} detail={`${product.color} · Size ${product.receivedSize}`} />
              <input type="radio" name="replacement-item" className={styles.choiceInput} checked={selected === item} onChange={() => onSelect(item)} />
            </label>
          );
        })}
      </div>
      <button id="replacement-select-button" className={styles.primaryButton} type="button" onClick={onContinue}>Select item</button>
    </div>
  );
}

export function OptionsCard({ item, size, onSizeChange, onBack, onContinue }: { item: ReplacementItem; size: string; onSizeChange: (size: string) => void; onBack: () => void; onContinue: () => void }) {
  const product = products[item];
  return (
    <div id="replacement-options-card" className={styles.card}>
      <div className={styles.titleRow}>
        <button type="button" className={styles.backButton} aria-label="Back to item selection" onClick={onBack}>
          <img src={`${assets}/arrow-left.svg`} alt="" />
        </button>
        <h3 className={styles.title}>Replacement options</h3>
      </div>
      <div className={styles.separator} />
      <div className={styles.fields}>
        <label className={styles.field}>
          <span>Color</span>
          <select key={item} className={styles.dropdown} aria-label="Replacement color" defaultValue={product.color}>
            <option value={product.color}>{product.color}</option>
          </select>
        </label>
        <label className={styles.field}>
          <span>Size</span>
          <select className={styles.dropdown} aria-label="Replacement size" value={size} onChange={event => onSizeChange(event.target.value)}>
            {product.sizes.map(option => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>
      <button id="replacement-continue-button" className={styles.primaryButton} type="button" onClick={onContinue}>Continue</button>
    </div>
  );
}

export function ConfirmCard({ item, size, onCancel, onConfirm }: { item: ReplacementItem; size: string; onCancel: () => void; onConfirm: () => void }) {
  const product = products[item];
  return (
    <div id="replacement-confirm-card" className={styles.card}>
      <h3 className={styles.title}>Confirm replacement</h3>
      <div className={styles.swapBlock}>
        <span className={styles.swapLabel}>Received</span>
        <strong>{product.name}, {product.color} &middot; Size {product.receivedSize}</strong>
      </div>
      <div className={styles.transferDivider}>
        <span className={styles.transferLine} />
        <img src={`${assets}/transfer-down.svg`} alt="" />
        <span className={styles.transferLine} />
      </div>
      <div className={styles.swapBlock}>
        <span className={styles.swapLabel}>Sending</span>
        <strong>{product.name}, {product.color} &middot; Size {size}</strong>
      </div>
      <div className={styles.confirmButtons}>
        <button id="replacement-cancel-button" className={styles.secondaryButton} type="button" onClick={onCancel}>Cancel</button>
        <button id="replacement-confirm-button" className={styles.primaryButton} type="button" onClick={onConfirm}>Confirm</button>
      </div>
    </div>
  );
}

export function ReplacementSuccessCard({ item, size, onDownload }: { item: ReplacementItem; size: string; onDownload: () => void }) {
  const product = products[item];
  return (
    <div id="replacement-success-card" className={styles.card}>
      <div className={styles.titleRow}>
        <span className={styles.successIcon}><img src={`${assets}/check-circle.svg`} alt="" /></span>
        <h3 className={styles.title}>Replacement created</h3>
      </div>
      <div className={styles.separator} />
      <ProductRow image={product.image} name={product.name} detail={`${product.color} · Size ${size}`} />
      <div className={styles.separator} />
      <dl className={styles.details}>
        <div><dt>Replacement ID</dt><dd>#R1932</dd></div>
        <div><dt>Estimated arrival</dt><dd>3-5 business days</dd></div>
      </dl>
      <button id="replacement-label-button" className={styles.secondaryButton} type="button" onClick={onDownload}>Download return label</button>
    </div>
  );
}
