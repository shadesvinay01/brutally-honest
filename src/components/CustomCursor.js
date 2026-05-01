'use client';
import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState([]);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setTrail(t => [...t.slice(-8), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    document.addEventListener('mousemove', move);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
    };
  }, []);

  return (
    <>
      {/* Trail */}
      {trail.map((t, i) => (
        <div key={t.id} style={{
          position: 'fixed',
          left: t.x - 4,
          top: t.y - 4,
          width: `${(i + 1) * 1.5}px`,
          height: `${(i + 1) * 1.5}px`,
          borderRadius: '50%',
          background: i % 3 === 0 ? 'var(--acid-green)' : i % 3 === 1 ? 'var(--hot-pink)' : 'var(--cyan)',
          opacity: (i + 1) / trail.length * 0.6,
          pointerEvents: 'none',
          zIndex: 99999,
          transition: 'opacity 0.3s',
          transform: 'translate(-50%, -50%)',
        }} />
      ))}

      {/* Main Cursor */}
      <div style={{
        position: 'fixed',
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${clicking ? 0.7 : 1}) rotate(${clicking ? -20 : 0}deg)`,
        fontSize: clicking ? '1.8rem' : '1.5rem',
        pointerEvents: 'none',
        zIndex: 100000,
        transition: 'transform 0.1s ease, font-size 0.1s ease',
        filter: clicking ? 'drop-shadow(0 0 8px var(--acid-green))' : 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}>
        💀
      </div>

      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}
