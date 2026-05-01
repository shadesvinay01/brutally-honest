'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { productsData } from '../../data';

const SWIPE_RESULT_MESSAGES = {
  left: ['ROASTED!', 'EXPOSED!', 'GUILTY!', 'TRASH!'],
  right: ['SPARED... FOR NOW', 'FINE, THEY PASS', 'ACCEPTABLE... BARELY', 'YOU\'RE TOO NICE'],
};

export default function SwipePage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null); // 'left' = roast, 'right' = pass
  const [history, setHistory] = useState([]);
  const [done, setDone] = useState(false);
  const [animating, setAnimating] = useState(false);

  const product = productsData[index];

  const swipe = (dir) => {
    if (animating || done) return;
    setAnimating(true);
    setSwipeDir(dir);
    const msg = SWIPE_RESULT_MESSAGES[dir][Math.floor(Math.random() * 4)];
    
    setTimeout(() => {
      setHistory(h => [...h, { product, dir, msg }]);
      setSwipeDir(null);
      setAnimating(false);
      if (index + 1 >= productsData.length) {
        setDone(true);
      } else {
        setIndex(i => i + 1);
      }
    }, 500);
  };

  const roastCount = history.filter(h => h.dir === 'left').length;
  const passCount = history.filter(h => h.dir === 'right').length;

  const getRoastPersonality = () => {
    const pct = (roastCount / history.length) * 100;
    if (pct > 80) return { label: 'SERIAL CRITIC', emoji: '💀', desc: 'You have zero tolerance for mediocrity. We respect it.' };
    if (pct > 60) return { label: 'HARSH JUDGE', emoji: '😤', desc: 'High standards. Possibly unemployable at any startup.' };
    if (pct > 40) return { label: 'BALANCED CYNIC', emoji: '🤔', desc: 'Fair but still brutal. Perfect reviewer energy.' };
    return { label: 'TOO FORGIVING', emoji: '🥺', desc: 'You\'re the type who leaves 5 stars even when the food is bad.' };
  };

  if (done) {
    const personality = getRoastPersonality();
    return (
      <main style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingBottom: '100px' }}>
        <div style={{ background: '#000', padding: '80px 0 60px', borderBottom: '4px solid var(--acid-green)', textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'var(--font-bricolage)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', textTransform: 'uppercase', color: 'var(--acid-green)' }}>
            RESULTS ARE IN
          </h1>
        </div>
        <div className="container" style={{ marginTop: '60px', maxWidth: '700px', margin: '60px auto', textAlign: 'center' }}>
          <div style={{ background: 'var(--acid-green)', border: '6px solid #000', boxShadow: '12px 12px 0px #000', padding: '48px', marginBottom: '40px', animation: 'bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
            <div style={{ fontSize: '5rem' }}>{personality.emoji}</div>
            <h2 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '3rem', marginTop: '16px', lineHeight: 1 }}>
              YOU ARE A {personality.label}
            </h2>
            <p style={{ fontWeight: 800, fontSize: '1.2rem', marginTop: '16px' }}>{personality.desc}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '32px' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '4rem', fontWeight: 900, color: 'var(--hot-pink)' }}>{roastCount}</div>
                <div style={{ fontWeight: 900, textTransform: 'uppercase' }}>ROASTED 💀</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '4rem', fontWeight: 900 }}>{passCount}</div>
                <div style={{ fontWeight: 900, textTransform: 'uppercase' }}>PASSED ✅</div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => { setIndex(0); setHistory([]); setDone(false); }} className="btn-brutal btn-pink" style={{ fontSize: '1.2rem', border: '4px solid #000' }}>
              PLAY AGAIN 🔄
            </button>
            <a href={`https://twitter.com/intent/tweet?text=I%20just%20played%20Roast%20or%20Pass%20on%20BrutallyHonest.%20I%20am%20a%20${encodeURIComponent(personality.label)}%20%20${personality.emoji}%20Roasted%20${roastCount}%2F${productsData.length}%20products.`} target="_blank" className="btn-brutal" style={{ fontSize: '1.2rem' }}>
              SHARE 🐦
            </a>
          </div>
        </div>
        <style>{`@keyframes bounceIn { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }`}</style>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingBottom: '100px' }}>
      <div style={{ background: '#000', padding: '60px 0 40px', borderBottom: '4px solid var(--acid-green)', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'var(--cyan)', color: '#000', fontFamily: 'var(--font-bricolage)', fontSize: '0.8rem', fontWeight: 900, padding: '6px 16px', border: '3px solid #000', marginBottom: '16px', textTransform: 'uppercase' }}>🃏 CARD GAME</div>
        <h1 style={{ fontFamily: 'var(--font-bricolage)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', textTransform: 'uppercase', lineHeight: 0.9, color: '#fff' }}>
          ROAST OR PASS
        </h1>
        <p style={{ color: '#aaa', fontWeight: 700, marginTop: '12px', textTransform: 'uppercase' }}>
          Swipe left to roast. Swipe right to spare. No in-between.
        </p>
        <div style={{ color: '#555', fontWeight: 700, fontSize: '0.9rem', marginTop: '8px' }}>
          {index + 1} / {productsData.length}
        </div>
        <div style={{ width: '200px', height: '6px', background: '#222', border: '2px solid #333', margin: '16px auto 0' }}>
          <div style={{ height: '100%', background: 'var(--acid-green)', width: `${((index) / productsData.length) * 100}%`, transition: 'width 0.3s' }}></div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
        {/* Score */}
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ background: 'var(--hot-pink)', border: '3px solid #000', padding: '8px 20px', fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: '1.2rem' }}>💀 {roastCount}</div>
          <div style={{ background: 'var(--acid-green)', border: '3px solid #000', padding: '8px 20px', fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: '1.2rem' }}>✅ {passCount}</div>
        </div>

        {/* Card */}
        <div style={{
          width: '360px',
          maxWidth: '85vw',
          background: product.color,
          border: '6px solid #000',
          boxShadow: swipeDir === 'left' ? '-20px 4px 0px var(--hot-pink)' : swipeDir === 'right' ? '20px 4px 0px var(--acid-green)' : '10px 10px 0px #000',
          padding: '40px 32px',
          transform: swipeDir === 'left' ? 'rotate(-10deg) translateX(-40px)' : swipeDir === 'right' ? 'rotate(10deg) translateX(40px)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          opacity: animating ? 0.7 : 1,
          textAlign: 'center',
        }}>
          <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '6rem', fontWeight: 900, lineHeight: 1, color: '#000' }}>{product.logo}</div>
          <h2 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '2.5rem', marginBottom: '8px', color: '#000' }}>{product.name}</h2>
          <div style={{ background: '#000', color: product.color, display: 'inline-block', padding: '4px 12px', fontWeight: 900, fontSize: '0.8rem', marginBottom: '16px', textTransform: 'uppercase' }}>
            {product.category} · PAIN: {product.painScore}
          </div>
          <p style={{ fontWeight: 800, fontSize: '1.1rem', color: '#000', fontStyle: 'italic', lineHeight: 1.5 }}>
            "{product.roast}"
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '24px' }}>
          <button onClick={() => swipe('left')} disabled={animating} style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--hot-pink)', border: '5px solid #000', boxShadow: '6px 6px 0px #000', fontSize: '2.5rem', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-bricolage)' }}>
            💀
          </button>
          <button onClick={() => swipe('right')} disabled={animating} style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--acid-green)', border: '5px solid #000', boxShadow: '6px 6px 0px #000', fontSize: '2.5rem', cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'var(--font-bricolage)' }}>
            ✅
          </button>
        </div>
        <div style={{ display: 'flex', gap: '80px', color: '#555', fontWeight: 900, fontSize: '0.9rem', textTransform: 'uppercase' }}>
          <span>💀 ROAST</span>
          <span>✅ PASS</span>
        </div>
      </div>
    </main>
  );
}
