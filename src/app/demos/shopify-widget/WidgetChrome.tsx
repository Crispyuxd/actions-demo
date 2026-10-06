'use client';

import { useState, type CSSProperties } from 'react';
import styles from './WidgetChrome.module.css';
import {
  ArrowLeftIcon, AudioLinesIcon, ChatbaseMark, ChatBubbleAddIcon, HistoryIcon, MicIcon,
  MinimizeIcon, PaperclipIcon, ThumbsDownFilledIcon, ThumbsDownIcon,
  ThumbsUpFilledIcon, ThumbsUpIcon,
} from './WidgetIcons';

interface WidgetHeaderProps {
  title?: string;
  onHistory: () => void;
  onNewChat: () => void;
  onMinimize: () => void;
}

export function WidgetHeader({ title = 'AI Agent', onHistory, onNewChat, onMinimize }: WidgetHeaderProps) {
  return (
    <header className={styles.header}>
      <span className={styles.avatar} aria-hidden="true"><ChatbaseMark /></span>
      <h2 className={styles.headerTitle}>{title}</h2>
      <div className={styles.headerActions} aria-label="Chat controls">
        <button type="button" className={styles.headerButton} aria-label="Chat history" title="Chat history" onClick={onHistory}><HistoryIcon /></button>
        <button type="button" className={styles.headerButton} aria-label="Start new chat" title="Start new chat" onClick={onNewChat}><ChatBubbleAddIcon /></button>
        <button type="button" className={styles.headerButton} aria-label="Minimize chat" title="Minimize chat" onClick={onMinimize}><MinimizeIcon /></button>
      </div>
    </header>
  );
}

interface WidgetMetaRowProps {
  id: string;
  author?: string;
  timestamp?: string;
  gap?: number;
  positioned?: boolean;
}

type Reaction = 'like' | 'dislike' | null;

export function WidgetMetaRow({ id, author, timestamp = 'Just now', gap = 8, positioned = false }: WidgetMetaRowProps) {
  const [reaction, setReaction] = useState<Reaction>(null);
  const toggle = (value: Reaction) => setReaction(current => current === value ? null : value);

  return (
    <div id={id} className={`${styles.meta} ${positioned ? styles.positioned : ''}`} style={{ marginTop: gap }}>
      {author ? <span className={styles.author}>{author}<span className={styles.dot}>&middot;</span>{timestamp}</span> : <span>{timestamp}</span>}
      <span className={styles.divider} aria-hidden="true" />
      <button type="button" className={styles.reaction} aria-label="Give positive feedback" aria-pressed={reaction === 'like'} title="Give positive feedback" onClick={() => toggle('like')}>
        <ThumbsUpIcon className={styles.stroked} />
        <ThumbsUpFilledIcon className={styles.filled} />
      </button>
      <button type="button" className={styles.reaction} aria-label="Give negative feedback" aria-pressed={reaction === 'dislike'} title="Give negative feedback" onClick={() => toggle('dislike')}>
        <ThumbsDownIcon className={styles.stroked} />
        <ThumbsDownFilledIcon className={styles.filled} />
      </button>
    </div>
  );
}

export function WidgetInput() {
  return (
    <div className={styles.inputWrap}>
      <div className={styles.composer} aria-label="Chat input preview">
        <span className={styles.inputIcon} aria-hidden="true"><PaperclipIcon /></span>
        <span className={styles.placeholder}>Ask a question...</span>
        <span className={styles.inputIcon} aria-hidden="true"><MicIcon /></span>
        <span className={styles.voiceButton} aria-hidden="true"><AudioLinesIcon /></span>
      </div>
    </div>
  );
}

interface WidgetDemoStateProps {
  id: string;
  overlay?: boolean;
  metaId?: string;
  paddingRight?: number;
  metaGap?: number;
  children: React.ReactNode;
}

export function WidgetDemoState({ id, overlay = false, metaId, paddingRight = 32, metaGap = 12, children }: WidgetDemoStateProps) {
  const style: CSSProperties = overlay
    ? { opacity: 0, paddingRight, pointerEvents: 'none', position: 'absolute', top: 0, left: 0, right: 0 }
    : { paddingRight, pointerEvents: 'none' };
  return (
    <div id={id} style={style}>
      {children}
      {metaId && <WidgetMetaRow id={metaId} positioned gap={metaGap} />}
    </div>
  );
}

export function WidgetHistory({ onClose, title = 'Shopify order demo', preview = 'AI Agent: Show me categories on sale' }: { onClose: () => void; title?: string; preview?: string }) {
  return (
    <section className={styles.history} aria-label="Recent chats">
      <div className={styles.historyHeader}>
        <button type="button" className={styles.historyBack} aria-label="Back to chat" onClick={onClose}><ArrowLeftIcon /></button>
        <h3>Recent chats</h3>
      </div>
      <button type="button" className={styles.historyRow} onClick={onClose}>
        <span className={styles.historyRowTop}><strong>{title}</strong><small>Just now</small></span>
        <span className={styles.historyPreview}>{preview}</span>
      </button>
    </section>
  );
}
