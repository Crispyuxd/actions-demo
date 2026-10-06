'use client';

import {
  ChatCard, BotMessage, UserMessage, MessagesStack,
  CategoriesWidget, PickerWidget, ProductSheet, SheetOverlay, CartWidget, OrderSuccessWidget, DemoCursor,
  ThinkingTrace,
} from '@/components';
import { useState } from 'react';
import { useTimeline } from '@/hooks/useTimeline';
import { timeline } from './timeline';
import { WidgetHeader, WidgetHistory, WidgetInput, WidgetMetaRow, WidgetDemoState } from './WidgetChrome';
import { ChatbaseMark } from './WidgetIcons';
import styles from './page.module.css';

export default function ShopifyWidgetDemo() {
  useTimeline(timeline);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <div className={styles.frame}>
    <div className={minimized ? styles.minimized : undefined}>
    <ChatCard scale={1}>
      <WidgetHeader
        onHistory={() => setHistoryOpen(true)}
        onNewChat={() => window.location.reload()}
        onMinimize={() => setMinimized(true)}
      />
      <MessagesStack>
        <div
          id="shopify-scroll"
          style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'stretch', width: 366 }}
        >
          <BotMessage id="bot-1" lines={['Hey, how can I help?']} meta={<WidgetMetaRow id="meta-0" gap={8} />} />

          <UserMessage id="user-1">
            Show me categories on sale
          </UserMessage>

          <div style={{ position: 'relative' }}>
            {/* Bot text — bot-2 untypes/backspaces and bot-3 types in at the
                success state, matching the forms demo's untype→swap→type
                pattern. Both are BotMessage components in `lines:` mode so
                the engine can target their line spans (#bot-2-line-1 etc.)
                for the typewriter and untype animations. The state-success-bot
                wrapper is absolutely positioned over state-shopify-bot so
                they occupy the same line. */}
            <div id="state-shopify-bot">
              <BotMessage id="bot-2" trace={<ThinkingTrace id="trace-1" />} lines={["Here's a list of categories currently on sale:"]} />
            </div>
            <div id="state-success-bot" style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0 }}>
              <BotMessage id="bot-3" lines={['Done! You have placed an order for 1 item.']} />
            </div>

            <div style={{ marginTop: 12, position: 'relative' }}>
              <WidgetDemoState id="state-categories" metaId="meta-cat" metaGap={12}>
                <CategoriesWidget
                  id="categories-widget"
                  items={[
                    { id: 'cat-mens', buttonId: 'btn-mens-view', title: ["Men’s Workout", 'Shoes'], height: 154, imageSrc: '/shopify/mens.png' },
                    { id: 'cat-womens', buttonId: 'btn-womens-view', title: ["Women’s Workout", 'Shoes'], height: 172, imageSrc: '/shopify/womens.png' },
                  ]}
                />
              </WidgetDemoState>

              <WidgetDemoState id="state-picker" overlay metaId="meta-picker" metaGap={12}>
                <PickerWidget
                  id="picker-widget"
                  category="Men’s Workout Shoes"
                  products={[
                    { id: 'prod-metcon', name: 'XY Metcon 64', price: '$16.00', imageSrc: '/shopify/airmax.png', buttonId: 'btn-metcon', qtyId: 'qty-metcon' },
                    { id: 'prod-v2run', name: 'XY V2 Run', price: '$24.90', imageSrc: '/shopify/v2run.png', buttonId: 'btn-v2run' },
                  ]}
                  scroller={{ top: 110 }}
                />
              </WidgetDemoState>

              <WidgetDemoState id="state-cart" overlay metaId="meta-cart" metaGap={12}>
                <CartWidget
                  id="cart-widget"
                  items={[
                    { id: 'cart-item-metcon', name: 'XY Metcon 64', price: '$16.00', imageSrc: '/shopify/airmax.png' },
                  ]}
                  total="$16.00"
                  payment={{ label: 'Pay using', brand: 'Visa', last4: '2683' }}
                  checkoutId="btn-checkout"
                />
              </WidgetDemoState>

              <WidgetDemoState id="state-success" overlay metaId="meta-success" metaGap={12}>
                <OrderSuccessWidget
                  id="success-widget"
                  subtitle="25th March, 2026 at 3:00 PM"
                />
              </WidgetDemoState>
            </div>
          </div>
        </div>
      </MessagesStack>
      <WidgetInput />

      {/* Sheet overlays + product detail sheets — siblings of MessagesStack so they overlay everything below the header. The overlay runs alongside the single product sheet. */}
      <SheetOverlay id="sheet-overlay-1" />
      <ProductSheet
        id="sheet-metcon"
        title="XY Metcon 64"
        size="36"
        color="White on red"
        total="$16.00"
        buttonId="btn-add-metcon"
      />

      {/* Single cursor for the entire demo — sits at chat-card level so its
          offsetParent is ChatCard, letting waypoints resolve targets across
          every state and sheet. z-index above sheet (20) and overlay (15). */}
      <DemoCursor id="cursor" />
      {historyOpen && <WidgetHistory onClose={() => setHistoryOpen(false)} />}
    </ChatCard>
    </div>
    {minimized && (
      <button type="button" className={styles.launcher} aria-label="Open chat" onClick={() => window.location.reload()}>
        <ChatbaseMark />
      </button>
    )}
    </div>
  );
}
