'use client';

import { useEffect, useState } from 'react';
import { BotMessage, ChatCard, DemoCursor, MessagesStack, UserMessage } from '@/components';
import { useTimeline } from '@/hooks/useTimeline';
import { ChatbaseMark } from '../shopify-widget/WidgetIcons';
import { WidgetHeader, WidgetHistory, WidgetInput, WidgetMetaRow } from '../shopify-widget/WidgetChrome';
import { ConfirmCard, OptionsCard, ReplacementSuccessCard, SelectItemCard, products, type ReplacementItem } from './ReplacementCards';
import { timeline } from './timeline';
import shellStyles from '../shopify-widget/page.module.css';
import styles from './page.module.css';

export default function ReplacementOrderDemo() {
  useTimeline(timeline);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [manualStage, setManualStage] = useState<'select' | 'options' | 'confirm' | 'success' | null>(null);
  const [selectedItem, setSelectedItem] = useState<ReplacementItem>('hoodie');
  const [replacementSize, setReplacementSize] = useState('L');

  useEffect(() => {
    const stages = ['select', 'options', 'confirm', 'success']
      .map(name => document.getElementById(`replacement-stage-${name}`))
      .filter((element): element is HTMLElement => element !== null);
    if (manualStage) {
      stages.forEach(element => element.style.removeProperty('pointer-events'));
      return;
    }
    const syncPointerEvents = () => {
      stages.forEach(element => {
        const card = element.querySelector<HTMLElement>('[id$="-card"]');
        const stageVisible = Number.parseFloat(getComputedStyle(element).opacity) > 0.5;
        const cardVisible = card && Number.parseFloat(getComputedStyle(card).opacity) > 0.5;
        element.style.pointerEvents = stageVisible && cardVisible ? 'auto' : 'none';
      });
    };
    syncPointerEvents();
    const interval = window.setInterval(syncPointerEvents, 80);
    return () => {
      window.clearInterval(interval);
      stages.forEach(element => element.style.removeProperty('pointer-events'));
    };
  }, [manualStage]);

  const selectItem = (item: ReplacementItem) => {
    setSelectedItem(item);
    setReplacementSize(products[item].defaultSize);
    setManualStage('select');
  };
  const downloadReturnLabel = () => {
    const product = products[selectedItem];
    const label = `DEMO RETURN LABEL\nOrder: #84213\nReplacement: #R1932\nItem: ${product.name}, ${product.color}, Size ${product.receivedSize}\n\nThis is a demo label and cannot be used for shipping.\n`;
    const url = URL.createObjectURL(new Blob([label], { type: 'text/plain' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'replacement-R1932-return-label.txt';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <div className={shellStyles.frame}>
      <div className={[minimized ? shellStyles.minimized : '', manualStage ? styles.manual : ''].filter(Boolean).join(' ')} data-manual-stage={manualStage ?? undefined}>
        <ChatCard scale={1} ariaLabel="Replacement order chat demo">
          <WidgetHeader
            onHistory={() => setHistoryOpen(true)}
            onNewChat={() => window.location.reload()}
            onMinimize={() => setMinimized(true)}
          />
          <MessagesStack>
            <div id="replacement-scroll" className={styles.flow}>
              <UserMessage id="replacement-user" style={{ marginTop: 0, marginBottom: 0 }}>
                My order #84213 arrived in the wrong size.
              </UserMessage>
              <div>
                <div className={styles.stageArea}>
                  <div id="replacement-stage-select" className={styles.stage}>
                    <BotMessage
                      id="replacement-bot-select"
                      lines={['I can help with the wrong size. Which item needs', 'replacing?']}
                    />
                    <div className={styles.cardSlot}><SelectItemCard selected={selectedItem} onSelect={selectItem} onContinue={() => setManualStage('options')} /></div>
                    <WidgetMetaRow id="replacement-meta-select" positioned={false} gap={12} />
                  </div>
                  <div id="replacement-stage-options" className={`${styles.stage} ${styles.hiddenStage}`}>
                    <BotMessage
                      id="replacement-bot-options"
                      lines={['What size should I send as the replacement?']}
                    />
                    <div className={styles.cardSlot}><OptionsCard item={selectedItem} size={replacementSize} onSizeChange={value => { setReplacementSize(value); setManualStage('options'); }} onBack={() => setManualStage('select')} onContinue={() => setManualStage('confirm')} /></div>
                    <WidgetMetaRow id="replacement-meta-options" positioned={false} gap={12} />
                  </div>
                  <div id="replacement-stage-confirm" className={`${styles.stage} ${styles.hiddenStage}`}>
                    <BotMessage
                      id="replacement-bot-confirm"
                      lines={['Please confirm the replacement details.']}
                    />
                    <div className={styles.cardSlot}><ConfirmCard item={selectedItem} size={replacementSize} onCancel={() => setManualStage('options')} onConfirm={() => setManualStage('success')} /></div>
                    <WidgetMetaRow id="replacement-meta-confirm" positioned={false} gap={12} />
                  </div>
                  <div id="replacement-stage-success" className={`${styles.stage} ${styles.hiddenStage}`}>
                    <BotMessage
                      id="replacement-bot-success"
                      lines={['Done! Your replacement order is created.']}
                    />
                    <div className={styles.cardSlot}><ReplacementSuccessCard item={selectedItem} size={replacementSize} onDownload={downloadReturnLabel} /></div>
                    <WidgetMetaRow id="replacement-meta-success" positioned={false} gap={12} />
                  </div>
                </div>
              </div>
            </div>
          </MessagesStack>
          <WidgetInput />
          <DemoCursor id="replacement-cursor" />
          {historyOpen && (
            <WidgetHistory
              title="Replacement order"
              preview="AI Agent: Replacement #R1932 created"
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
