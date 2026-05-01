'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { productsData } from '../../data';

const WHEEL_COLORS = ['var(--acid-green)', 'var(--hot-pink)', 'var(--cyan)', '#fff', 'var(--acid-green)', 'var(--hot-pink)'];

export default function Roulette() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);
  const [spinDeg, setSpinDeg] = useState(0);
  const [totalSpins, setTotalSpins] = useState(0);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    const winner = productsData[Math.floor(Math.random() * productsData.length)];
    const extra = 1440 + Math.random() * 360; // at least 4 full rotations
    const newDeg = spinDeg + extra;
    setSpinDeg(newDeg);
    setTotalSpins(t => t + 1);

    setTimeout(() => {
      setSpinning(false);
      setResult(winner);
    }, 3000);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ background: '#000', padding: '80px 0 60px', borderBottom: '4px solid var(--acid-green)', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'var(--hot-pink)', color: '#fff', fontFamily: 'var(--font-bricolage)', fontSize: '0.8rem', fontWeight: 900, padding: '6px 16px', border: '3px solid #fff', marginBottom: '20px', textTransform: 'uppercase' }}>🎰 GAME MODE</div>
        <h1 style={{ fontFamily: 'var(--font-bricolage)', fontSize: 'clamp(3rem, 8vw, 6rem)', textTransform: 'uppercase', lineHeight: 0.9, color: 'var(--acid-green)', textShadow: '6px 6px 0px var(--hot-pink)' }}>
          ROAST<br/>ROULETTE
        </h1>
        <p style={{ color: '#aaa', fontWeight: 700, marginTop: '20px', textTransform: 'uppercase' }}>
          Spin. Land on a product. Get roasted. Repeat.
        </p>
        <div style={{ color: '#555', fontWeight: 700, fontSize: '0.9rem', marginTop: '8px' }}>
          {totalSpins} spins today
        </div>
      </div>

      <div className="container" style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
        {/* Wheel Visual */}
        <div style={{ position: 'relative', width: '320px', height: '320px' }}>
          {/* Pointer */}
          <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, fontSize: '2.5rem' }}>👆</div>

          {/* Wheel */}
          <div style={{
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            border: '6px solid #000',
            boxShadow: '8px 8px 0px #000',
            background: `conic-gradient(${productsData.map((p, i) => `${WHEEL_COLORS[i % WHEEL_COLORS.length]} ${(i / productsData.length) * 360}deg ${((i + 1) / productsData.length) * 360}deg`).join(', ')})`,
            transform: `rotate(${spinDeg}deg)`,
            transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {productsData.map((p, i) => {
              const angle = ((i + 0.5) / productsData.length) * 360;
              return (
                <div key={p.id} style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0',
                  transform: `rotate(${angle}deg) translateY(-140px) translateX(-10px)`,
                  fontFamily: 'var(--font-bricolage)',
                  fontWeight: 900,
                  fontSize: '1rem',
                  color: '#000',
                  whiteSpace: 'nowrap',
                }}>{p.logo}</div>
              );
            })}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '60px', height: '60px', borderRadius: '50%', background: '#000', border: '4px solid var(--acid-green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>💀</div>
          </div>
        </div>

        {/* Spin Button */}
        <button onClick={spin} disabled={spinning} className="btn-brutal" style={{ fontSize: '2rem', padding: '24px 64px', background: spinning ? '#333' : 'var(--acid-green)', cursor: spinning ? 'not-allowed' : 'pointer', transform: 'none', transition: 'all 0.2s' }}>
          {spinning ? '🌀 SPINNING...' : '🎰 SPIN THE WHEEL'}
        </button>

        {/* Result */}
        {result && !spinning && (
          <div style={{ width: '100%', maxWidth: '600px', background: result.color, border: '6px solid #000', boxShadow: '12px 12px 0px #000', padding: '40px', textAlign: 'center', animation: 'bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '5rem', fontWeight: 900, lineHeight: 1 }}>
              {result.logo}
            </div>
            <h2 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '3rem', marginBottom: '8px' }}>{result.name}</h2>
            <div style={{ background: '#000', color: result.color, display: 'inline-block', padding: '4px 12px', fontWeight: 900, marginBottom: '20px', textTransform: 'uppercase' }}>
              PAIN SCORE: {result.painScore}
            </div>
            <p style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '32px', fontStyle: 'italic' }}>
              "{result.roast}"
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`/roast?url=https://${result.url}`} className="btn-brutal" style={{ fontSize: '1rem' }}>
                FULL ROAST 🔥
              </a>
              <button onClick={spin} className="btn-brutal btn-pink" style={{ fontSize: '1rem', border: '4px solid #000' }}>
                SPIN AGAIN 🎰
              </button>
            </div>
          </div>
        )}

        {/* All Products */}
        <div style={{ width: '100%', maxWidth: '600px', marginTop: '20px' }}>
          <h3 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.5rem', textAlign: 'center', marginBottom: '20px', textTransform: 'uppercase' }}>POTENTIAL VICTIMS</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
            {productsData.map(p => (
              <div key={p.id} style={{ background: p.color, border: '3px solid #000', padding: '8px 16px', fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: '1rem', color: '#000' }}>
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounceIn {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </main>
  );
}
