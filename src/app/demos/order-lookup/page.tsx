'use client';

import { useState } from 'react';
import { BotMessage, ChatCard, MessagesStack, UserMessage } from '@/components';
import { useTimeline } from '@/hooks/useTimeline';
import { ChatbaseMark } from '../shopify-widget/WidgetIcons';
import { WidgetHeader, WidgetHistory, WidgetInput, WidgetMetaRow } from '../shopify-widget/WidgetChrome';
import { OrderStatusCard } from './OrderStatusCard';
import { timeline } from './timeline';
import shellStyles from '../shopify-widget/page.module.css';
import styles from './page.module.css';

export default function OrderLookupDemo() {
  useTimeline(timeline);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);

  return (
    <div className={shellStyles.frame}>
      <div className={minimized ? shellStyles.minimized : undefined}>
        <ChatCard scale={1} ariaLabel="Order lookup chat demo">
          <WidgetHeader
            onHistory={() => setHistoryOpen(true)}
            onNewChat={() => window.location.reload()}
            onMinimize={() => setMinimized(true)}
          />
          <MessagesStack>
            <div className={styles.flow}>
              <UserMessage id="lookup-user" style={{ marginTop: 0, marginBottom: 0 }}>
                Where is my order #84213?
              </UserMessage>
              <div>
                <BotMessage
                  id="lookup-bot"
                  lines={['Your package is in transit and will arrive in 2 days.']}
                />
                <div className={styles.cardSlot}>
                  <OrderStatusCard />
                  <WidgetMetaRow id="lookup-meta" positioned={false} gap={12} />
                </div>
              </div>
            </div>
          </MessagesStack>
          <WidgetInput />
          {historyOpen && (
            <WidgetHistory
              title="Order lookup"
              preview="AI Agent: Your package is in transit"
              onClose={() => setHistoryOpen(false)}
            />
          )}
        </ChatCard>
      </div>
      {minimized && (
        <button
          type="button"
          className={shellStyles.launcher}
          aria-label="Open chat"
          onClick={() => window.location.reload()}
        >
          <ChatbaseMark />
        </button>
      )}
    </div>
  );
}
