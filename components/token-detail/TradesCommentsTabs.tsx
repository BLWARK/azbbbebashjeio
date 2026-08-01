'use client';

import React, { useState } from 'react';
import { MOCK_TRADES, MOCK_COMMENTS, formatTokenAmount } from '@/lib/mock-data';

type ActiveTab = 'trades' | 'comments';

// ── Trade Row ─────────────────────────────────────────────────────
function TradeRow({ trade }: { trade: (typeof MOCK_TRADES)[0] }) {
  const isBuy = trade.type === 'buy';
  return (
    <div
      className="grid items-center px-4 py-2.5"
      style={{
        gridTemplateColumns: '60px 1fr 1fr 1fr 80px',
        gap: 8,
        borderBottom: '1px solid #1F262A',
      }}
    >
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded text-center"
        style={{
          background: isBuy ? 'rgba(34,224,200,0.1)' : 'rgba(255,92,77,0.1)',
          color: isBuy ? '#22E0C8' : '#FF5C4D',
          border: `1px solid ${isBuy ? 'rgba(34,224,200,0.25)' : 'rgba(255,92,77,0.25)'}`,
        }}
      >
        {isBuy ? 'BUY' : 'SELL'}
      </span>
      <span
        className="text-xs tabular-nums"
        style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
      >
        {trade.trader}
      </span>
      <span
        className="text-xs tabular-nums"
        style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}
      >
        {formatTokenAmount(trade.tokenAmount)}
      </span>
      <span
        className="text-xs tabular-nums"
        style={{ color: isBuy ? '#22E0C8' : '#FF5C4D', fontFamily: 'var(--font-mono)' }}
      >
        {trade.bnbAmount} BNB
      </span>
      <span
        className="text-xs text-right"
        style={{ color: '#647079', fontFamily: 'var(--font-mono)' }}
      >
        {trade.time}
      </span>
    </div>
  );
}

// ── Comment Row ───────────────────────────────────────────────────
function CommentRow({ comment }: { comment: (typeof MOCK_COMMENTS)[0] }) {
  const [liked, setLiked] = useState(false);
  const initials = comment.author.slice(2, 4).toUpperCase();

  return (
    <div
      className="flex gap-3 px-4 py-3"
      style={{ borderBottom: '1px solid #1F262A' }}
    >
      {/* Author avatar */}
      <div
        className="flex items-center justify-center flex-shrink-0 text-xs font-bold rounded-lg"
        style={{
          width: 32,
          height: 32,
          background: 'linear-gradient(135deg, #22E0C8, #3E7BF0)',
          color: '#050708',
        }}
      >
        {initials}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-semibold"
            style={{ color: '#E8EEF0', fontFamily: 'var(--font-mono)' }}
          >
            {comment.author}
          </span>
          <span className="text-xs" style={{ color: '#647079' }}>
            {comment.time}
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: '#E8EEF0' }}>
          {comment.content}
        </p>
        <button
          onClick={() => setLiked((v) => !v)}
          className="flex items-center gap-1 self-start text-xs transition-colors duration-150"
          style={{ color: liked ? '#22E0C8' : '#647079' }}
          aria-pressed={liked}
        >
          <span>{liked ? '❤️' : '🤍'}</span>
          <span>{comment.likes + (liked ? 1 : 0)}</span>
        </button>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
export default function TradesCommentsTabs() {
  const [active, setActive] = useState<ActiveTab>('trades');
  const [newComment, setNewComment] = useState('');

  return (
    <div
      className="flex flex-col"
      style={{
        background: '#0E1113',
        border: '1px solid #1F262A',
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 12,
      }}
    >
      {/* Tab header */}
      <div
        className="flex"
        style={{ borderBottom: '1px solid #1F262A' }}
      >
        {(['trades', 'comments'] as ActiveTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className="az-tab capitalize"
            style={{ padding: '10px 20px' }}
            aria-selected={active === tab}
            id={`detail-tab-${tab}`}
          >
            {tab === 'trades' ? '📊 Trades' : '💬 Comments'}
          </button>
        ))}
      </div>

      {/* Trades view */}
      {active === 'trades' && (
        <div>
          {/* Column headers */}
          <div
            className="grid px-4 py-2"
            style={{
              gridTemplateColumns: '60px 1fr 1fr 1fr 80px',
              gap: 8,
              borderBottom: '1px solid #1F262A',
              background: '#151A1D',
            }}
          >
            {['TYPE', 'TRADER', 'TOKENS', 'BNB', 'TIME'].map((h) => (
              <span
                key={h}
                className="text-[10px] font-semibold uppercase tracking-wider"
                style={{ color: '#647079' }}
              >
                {h}
              </span>
            ))}
          </div>
          {MOCK_TRADES.map((trade) => (
            <TradeRow key={trade.id} trade={trade} />
          ))}
        </div>
      )}

      {/* Comments view */}
      {active === 'comments' && (
        <div>
          {/* Comment input */}
          <div
            className="flex gap-3 p-4"
            style={{ borderBottom: '1px solid #1F262A' }}
          >
            <div
              className="flex items-center justify-center flex-shrink-0 text-xs font-bold rounded-lg"
              style={{
                width: 32,
                height: 32,
                background: 'rgba(34,224,200,0.1)',
                border: '1px solid rgba(34,224,200,0.2)',
                color: '#22E0C8',
              }}
            >
              ?
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg text-xs outline-none"
                style={{
                  background: '#151A1D',
                  border: '1px solid #1F262A',
                  color: '#E8EEF0',
                  caretColor: '#22E0C8',
                }}
                aria-label="Add a comment"
              />
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-opacity duration-150 hover:opacity-80"
                style={{
                  background: 'linear-gradient(120deg, #22E0C8, #3E7BF0)',
                  color: '#050708',
                }}
                onClick={() => setNewComment('')}
                aria-label="Post comment"
              >
                Post
              </button>
            </div>
          </div>

          {MOCK_COMMENTS.map((comment) => (
            <CommentRow key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
