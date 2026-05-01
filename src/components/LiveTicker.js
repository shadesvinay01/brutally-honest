'use client';
import { useEffect, useState } from 'react';

const liveEvents = [
  { url: 'notion.so', score: 76, label: 'Got Destroyed' },
  { url: 'monday.com', score: 61, label: 'Found Guilty' },
  { url: 'linear.app', score: 94, label: 'Survived (barely)' },
  { url: 'figma.com', score: 88, label: 'Roasted' },
  { url: 'webflow.com', score: 79, label: 'Exposed' },
  { url: 'airtable.com', score: 58, label: 'Destroyed' },
  { url: 'clickup.com', score: 44, label: 'Obliterated' },
  { url: 'intercom.com', score: 71, label: 'Put on Blast' },
  { url: 'hubspot.com', score: 55, label: 'Cancelled' },
];

export default function LiveTicker() {
  const [events, setEvents] = useState(liveEvents);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % events.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [events.length]);

  const item = events[current];

  return (
    <div style={{
      background: '#000',
      borderBottom: '4px solid var(--acid-green)',
      padding: '10px 0',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      overflow: 'hidden',
    }}>
      {/* LIVE Badge */}
      <div style={{
        background: 'var(--hot-pink)',
        color: '#fff',
        fontFamily: 'var(--font-bricolage)',
        fontWeight: 900,
        fontSize: '0.7rem',
        padding: '4px 12px',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginLeft: '16px',
        flexShrink: 0,
        border: '2px solid #fff',
      }}>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#fff',
          animation: 'pulse 1s infinite',
          display: 'inline-block',
        }}></span>
        LIVE
      </div>

      {/* Event Text */}
      <div
        key={current}
        style={{
          fontFamily: 'var(--font-bricolage)',
          fontWeight: 800,
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          animation: 'slideIn 0.4s ease',
          whiteSpace: 'nowrap',
        }}
      >
        🔥 <span style={{ color: 'var(--acid-green)' }}>{item.url}</span> just {item.label} — Pain Score:{' '}
        <span style={{ color: item.score < 60 ? 'var(--hot-pink)' : item.score > 85 ? 'var(--cyan)' : '#fff' }}>
          {item.score}
        </span>
      </div>

      {/* Scroll hint */}
      <div style={{
        marginLeft: 'auto',
        paddingRight: '16px',
        color: '#555',
        fontWeight: 700,
        fontSize: '0.75rem',
        flexShrink: 0,
      }}>
        {current + 1}/{events.length}
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
      `}</style>
    </div>
  );
}
