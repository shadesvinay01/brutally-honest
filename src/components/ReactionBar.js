'use client';
import { useState, useEffect, useRef } from 'react';

const REACTIONS = [
  { emoji: '💀', label: 'Brutal', key: 'brutal' },
  { emoji: '🤡', label: 'Deserved', key: 'deserved' },
  { emoji: '🔥', label: 'Accurate', key: 'accurate' },
  { emoji: '😬', label: 'Truth', key: 'truth' },
  { emoji: '🛡️', label: 'Disagree', key: 'disagree' },
];

function Particle({ x, y, color, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      left: x,
      top: y,
      pointerEvents: 'none',
      zIndex: 99999,
      fontSize: '1.2rem',
      animation: 'confettiFly 1s ease-out forwards',
    }}>
      {color}
    </div>
  );
}

export default function ReactionBar({ roastId }) {
  const [counts, setCounts] = useState({ brutal: 0, deserved: 0, accurate: 0, truth: 0, disagree: 0 });
  const [voted, setVoted] = useState(null);
  const [particles, setParticles] = useState([]);
  const buttonRefs = useRef({});

  useEffect(() => {
    const saved = localStorage.getItem(`voted_${roastId}`);
    if (saved) setVoted(saved);

    fetch(`/api/reactions?roastId=${encodeURIComponent(roastId)}`)
      .then(r => r.json())
      .then(data => {
        setCounts(prev => ({ ...prev, ...data }));
      })
      .catch(err => console.error('Failed to fetch reactions', err));
  }, [roastId]);

  const handleReact = async (key) => {
    if (voted) return;
    
    setCounts(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
    setVoted(key);
    localStorage.setItem(`voted_${roastId}`, key);
    
    // Spawn confetti logic...
    const btn = buttonRefs.current[key];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const emojis = ['💀', '🔥', '✨', '⚡', '💥', '🎉'];
      const newParticles = Array.from({ length: 8 }).map(() => ({
        id: Math.random(),
        x: cx + (Math.random() - 0.5) * 80,
        y: cy + (Math.random() - 0.5) * 80,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }));
      setParticles(p => [...p, ...newParticles]);
    }

    try {
      await fetch('/api/reactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roastId, type: key })
      });
    } catch (err) {
      console.error('Failed to post reaction', err);
    }
  };

  const removeParticle = (id) => setParticles(p => p.filter(x => x.id !== id));

  return (
    <div style={{ margin: '40px 0' }}>
      {particles.map(p => (
        <Particle key={p.id} x={p.x} y={p.y} color={p.emoji} onDone={() => removeParticle(p.id)} />
      ))}

      <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', marginBottom: '16px', color: '#000' }}>
        COMMUNITY VERDICT:
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {REACTIONS.map(r => (
          <button
            key={r.key}
            ref={el => buttonRefs.current[r.key] = el}
            onClick={() => handleReact(r.key)}
            style={{
              background: voted === r.key ? '#000' : '#fff',
              color: voted === r.key ? '#fff' : '#000',
              border: '3px solid #000',
              boxShadow: voted === r.key ? '0 0 0 #000' : '4px 4px 0px #000',
              borderRadius: '8px',
              padding: '12px 20px',
              cursor: voted ? 'default' : 'pointer',
              fontFamily: 'var(--font-bricolage)',
              fontWeight: 800,
              fontSize: '1.1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.15s ease',
              transform: voted === r.key ? 'translate(4px, 4px)' : 'none',
              minWidth: '80px',
              opacity: voted && voted !== r.key ? 0.5 : 1,
            }}
          >
            <span style={{ fontSize: '1.8rem' }}>{r.emoji}</span>
            <span style={{ fontSize: '1.4rem' }}>{counts[r.key] || 0}</span>
            <span style={{ fontSize: '0.7rem' }}>{r.label}</span>
          </button>
        ))}
      </div>
      
      <style>{`
        @keyframes confettiFly {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% { opacity: 0; transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 100 + 50}px, -${Math.random() * 150 + 80}px) scale(0.3) rotate(${Math.random() * 360}deg); }
        }
      `}</style>
    </div>
  );
}
