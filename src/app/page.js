'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { productsData } from '../data';
import styles from './page.module.css';

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [realProducts, setRealProducts] = useState([]);
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    fetch('/api/roasts')
      .then(r => {
        if (!r.ok) throw new Error('API Error');
        const contentType = r.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
           return [];
        }
        return r.json();
      })
      .then(data => {
        if (Array.isArray(data)) setRealProducts(data);
      })
      .catch(err => {
        console.error('Failed to fetch roasts', err);
        setRealProducts([]); // Fallback to static data
      });

    const colors = ['p-green', 'p-pink', 'p-cyan'];
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      size: `${Math.random() * 60 + 20}px`,
      colorClass: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 10 + 10}s`
    }));
    setParticles(newParticles);
  }, []);

  const [mode, setMode] = useState('self'); // 'self' or 'competitor'

  const handleRoast = (e) => {
    e.preventDefault();
    if (!url) return;
    router.push(`/roast?url=${encodeURIComponent(url)}`);
  };

  return (
    <main>
      {/* Background Particles */}
      <div className="noise-overlay"></div>
      <div className="bg-particles">
        {particles.map(p => (
          <div 
            key={p.id} 
            className={`particle ${p.colorClass}`}
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className={styles.heroWrapper}>
        <div className={`container ${styles.heroContent}`}>
          <div className={styles.titleWrapper}>
            <h1 className={`${styles.heroTitle} glitch-hover`}>BRUTALLY HONEST</h1>
          </div>
          
          <div className={styles.heroSubtitle}>
            🚀 NO FEELINGS SPARED. JUST DATA + INSULTS.
          </div>

          <div className="mobile-stack" style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="button" onClick={() => setMode('self')} className="btn-brutal" style={{ padding: '10px 24px', fontSize: '0.9rem', background: mode === 'self' ? '#fff' : 'transparent', color: mode === 'self' ? '#000' : '#fff', border: '3px solid #fff', boxShadow: mode === 'self' ? '4px 4px 0px #fff' : 'none' }}>
              💀 ROAST MY SITE
            </button>
            <button type="button" onClick={() => setMode('competitor')} className="btn-brutal" style={{ padding: '10px 24px', fontSize: '0.9rem', background: mode === 'competitor' ? 'var(--hot-pink)' : 'transparent', color: '#fff', border: '3px solid var(--hot-pink)', boxShadow: mode === 'competitor' ? '4px 4px 0px var(--hot-pink)' : 'none' }}>
              😈 ROAST MY COMPETITOR
            </button>
          </div>
          <form onSubmit={handleRoast} className={styles.searchForm} style={{ flexWrap: 'wrap', gap: '10px' }}>
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="https://your-bad-idea.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              style={{ minWidth: '200px', flex: '1' }}
            />
            <button type="submit" className="btn-brutal" style={{ fontSize: '1.2rem', padding: '16px 32px', width: '100%' }}>
              ROAST ME 💀
            </button>
          </form>
        </div>

        {/* Scrolling Marquee */}
        <div className={styles.marqueeWrapper}>
          <div className="marquee-container">
            <div className="marquee-content">
              <span>🚀 100% UNBIASED 🚀</span>
              <span>💀 YOU NEED A REDESIGN 💀</span>
              <span>📉 STOP WASTING VC MONEY 📉</span>
              <span>🤡 IS THIS A PARODY? 🤡</span>
              <span>🚀 100% UNBIASED 🚀</span>
              <span>💀 YOU NEED A REDESIGN 💀</span>
              <span>📉 STOP WASTING VC MONEY 📉</span>
              <span>🤡 IS THIS A PARODY? 🤡</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="container">
        <div className="bento-grid">
          <div className="bento-item" style={{ gridColumn: 'span 2', background: 'var(--acid-green)' }}>
            <div className="bento-tag">STEP 01</div>
            <div>
              <h4 style={{ fontSize: '2rem', lineHeight: 1 }}>01. URL DROP</h4>
              <p style={{ fontWeight: 700, marginTop: '10px' }}>Paste the link. No fluff. Just the truth.</p>
            </div>
            <div style={{ fontSize: '3.5rem', textAlign: 'right' }}>📥</div>
          </div>
          <div className="bento-item" style={{ background: 'var(--cyan)' }}>
            <div className="bento-tag">LIVE FEED</div>
            <div>
              <h4 style={{ fontSize: '1.5rem' }}>02. AI RAGE</h4>
              <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>Trained on 10M failures.</p>
            </div>
            <div style={{ fontSize: '3rem', textAlign: 'right' }}>🤖</div>
          </div>
          <div className="bento-item" style={{ background: 'var(--hot-pink)', color: '#fff' }}>
            <div className="bento-tag">SPEED</div>
            <div>
              <h4 style={{ fontSize: '1.5rem' }}>03. REALITY</h4>
              <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>3 seconds to ruin your day.</p>
            </div>
            <div style={{ fontSize: '4rem', textAlign: 'center' }}>⚡</div>
          </div>
        </div>
      </section>

      {/* Hall of Shame */}
      <section id="feed" style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', fontFamily: 'var(--font-bricolage)', textTransform: 'uppercase' }}>HALL OF SHAME</h2>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
              <span className="btn-brutal" style={{ padding: '4px 12px', fontSize: '0.8rem', background: '#000', color: '#fff' }}>COMMUNITY FEED</span>
            </div>
          </div>

          <div className={styles.stickerGrid}>
            {(realProducts.length > 0 ? realProducts : productsData).map((p, i) => (
              <div 
                key={p.id || p.url} 
                className={`brutal-card ${styles.stickerCard}`}
                style={{
                  transform: `rotate(${i % 2 === 0 ? 3 : -2}deg)`,
                  background: i % 2 === 0 ? '#fff' : 'var(--acid-green)',
                  transition: 'all 0.2s',
                  cursor: 'pointer'
                }}
                onClick={() => router.push(`/roast?url=${encodeURIComponent(p.url)}`)}
              >
                {i < 3 && <div className="stamp stamp-trash">{['TRASH', 'MID', 'CRINGE'][i]}</div>}
                
                <div className={styles.cardTop}>
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div className={styles.avatarBox} style={{ background: i%2===0 ? 'var(--cyan)' : 'var(--hot-pink)' }}>
                      {p.logo || p.productName?.[0] || '💀'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: 900 }}>{p.productName || p.name}</h3>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, opacity: 0.7 }}>{p.category}</span>
                    </div>
                  </div>
                  <div className={styles.scoreBox} style={{ background: i%2===0 ? 'var(--acid-green)' : '#000', color: i%2===0 ? '#000' : '#fff' }}>
                    💀 {p.painScore}
                  </div>
                </div>
                
                <p style={{ fontStyle: 'italic', fontWeight: 700, margin: '16px 0', fontSize: '0.95rem', lineHeight: 1.4 }}>
                  "{p.roastHeadline || p.roast}"
                </p>
                
                <div style={{ marginTop: 'auto' }}>
                  <button className="btn-brutal btn-pink" style={{ width: '100%', fontSize: '0.9rem', padding: '10px' }}>
                    VIEW SURGERY 🔪
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
