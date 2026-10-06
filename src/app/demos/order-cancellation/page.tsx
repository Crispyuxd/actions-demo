'use client';

import { useState } from 'react';
import { BotMessage, ChatCard, MessagesStack, OrderSuccessWidget, ThinkingTrace, UserMessage } from '@/components';
import { useTimeline } from '@/hooks/useTimeline';
import { ChatbaseMark } from '../shopify-widget/WidgetIcons';
import { WidgetHeader, WidgetHistory, WidgetInput, WidgetMetaRow } from '../shopify-widget/WidgetChrome';
import { timeline } from './timeline';
import styles from '../shopify-widget/page.module.css';

export default function OrderCancellationDemo() {
  useTimeline(timeline);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <div className={styles.frame}>
      <div className={minimized ? styles.minimized : undefined}>
        <ChatCard scale={1} ariaLabel="Order cancellation chat demo">
          <WidgetHeader
            onHistory={() => setHistoryOpen(true)}
            onNewChat={() => window.location.reload()}
            onMinimize={() => setMinimized(true)}
          />
          <MessagesStack>
            <div
              id="cancellation-scroll"
              style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'stretch', width: 366 }}
            >
              <BotMessage
                id="bot-1"
                lines={['Hi! How can I help with your order?']}
                meta={<WidgetMetaRow id="meta-0" positioned={false} gap={8} />}
              />

              <UserMessage id="user-1" style={{ marginTop: 0, marginBottom: 0 }}>
                Can you cancel order #CB-1042?
              </UserMessage>

              <BotMessage
                id="bot-2"
                trace={<ThinkingTrace id="trace-1" />}
                lines={["It hasn't shipped yet. Should I cancel it?"]}
                meta={<WidgetMetaRow id="meta-1" positioned={false} gap={8} />}
              />

              <UserMessage id="user-2" style={{ marginTop: 0, marginBottom: 0 }}>
                Yes, please cancel it.
              </UserMessage>

              <div>
                <BotMessage
                  id="bot-3"
                  trace={<ThinkingTrace id="trace-2" />}
                  lines={['All set. The cancellation went through.']}
                />
                <div id="cancellation-result" style={{ marginTop: 12, paddingRight: 32 }}>
                  <OrderSuccessWidget
                    id="cancellation-card"
                    title="Order successfully canceled"
                    subtitle="Order #CB-1042 was canceled. Confirmation is on its way."
                  />
                  <WidgetMetaRow id="meta-result" positioned={false} gap={12} />
                </div>
              </div>
            </div>
          </MessagesStack>
          <WidgetInput />
          {historyOpen && (
            <WidgetHistory
              title="Order cancellation"
              preview="AI Agent: Order #CB-1042 was canceled"
              onClose={() => setHistoryOpen(false)}
            />
          )}
        </ChatCard>
      </div>
      {minimized && (
        <button
          type="button"
          className={styles.launcher}
          aria-label="Open chat"
          onClick={() => window.location.reload()}
        >
          <ChatbaseMark />
        </button>
      )}
    </div>
  );
}
