'use client';
import { useState, useEffect, useRef } from 'react';

export function useCountUp(target, duration = 2000, delay = 200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return count;
}

export function PainMeter({ score, color, label }) {
  const [filled, setFilled] = useState(false);
  const count = useCountUp(score, 1800, 400);

  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 400);
    return () => clearTimeout(t);
  }, []);

  const getLabel = (s) => {
    if (s >= 85) return '💀 CATASTROPHIC';
    if (s >= 70) return '🔥 BRUTAL';
    if (s >= 50) return '😬 ROUGH';
    if (s >= 30) return '🤔 MEH';
    return '✅ DECENT';
  };

  return (
    <div style={{
      background: '#111',
      border: `4px solid ${color}`,
      boxShadow: `6px 6px 0px ${color}`,
      padding: '28px 36px',
      textAlign: 'center',
      minWidth: '160px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Animated fill background */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: `${filled ? score : 0}%`,
        background: color,
        opacity: 0.12,
        transition: 'height 1.8s cubic-bezier(0.22, 1, 0.36, 1)',
      }} />

      <div style={{
        fontFamily: 'var(--font-bricolage)',
        fontSize: '4.5rem',
        fontWeight: 900,
        color: color,
        lineHeight: 1,
        position: 'relative',
        zIndex: 1,
        transition: 'transform 0.1s',
      }}>
        {count}
      </div>
      <div style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', color: '#fff', marginTop: '6px', position: 'relative', zIndex: 1 }}>
        {label}
      </div>
      <div style={{ fontSize: '0.75rem', marginTop: '6px', color: color, fontWeight: 900, position: 'relative', zIndex: 1 }}>
        {getLabel(score)}
      </div>

      {/* Animated gauge bar */}
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', marginTop: '12px', position: 'relative', zIndex: 1 }}>
        <div style={{
          height: '100%',
          background: color,
          width: filled ? `${score}%` : '0%',
          transition: 'width 2s cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: `0 0 8px ${color}`,
        }} />
      </div>
    </div>
  );
}
