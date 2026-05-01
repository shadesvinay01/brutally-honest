'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ReactionBar from '../../components/ReactionBar';
import NewsletterModal from '../../components/NewsletterModal';
import CommentSection from '../../components/CommentSection';
import { PainMeter } from '../../components/PainMeter';
import RoastReceipt from '../../components/RoastReceipt';

function RoastContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get('url');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [defense, setDefense] = useState('');
  const [defenseSaved, setDefenseSaved] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [competitorUrl, setCompetitorUrl] = useState('');

  useEffect(() => {
    if (!url) return;
    const timer = setTimeout(() => setShowNewsletter(true), 20000);
    return () => clearTimeout(timer);
  }, [url]);

  useEffect(() => {
    if (!url) { router.push('/'); return; }
    fetch('/api/roast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
      .then(r => {
        if (!r.ok) throw new Error('Roast Error');
        return r.json();
      })
      .then(d => { setData(d); setLoading(false); })
      .catch(err => { 
        console.error('Roast failed:', err);
        setLoading(false); 
      });
  }, [url]);

  const shareOnTwitter = () => {
    if (!data) return;
    const text = `💀 ${data.productName} just got roasted on @BrutallyHonest\n\nPain Score: ${data.painScore}/100\n\n"${data.roastHeadline}"\n\nGet your website roasted:`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const roastCompetitor = (e) => {
    e.preventDefault();
    if (competitorUrl) router.push(`/roast?url=${encodeURIComponent(competitorUrl)}`);
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', background: 'var(--bg-base)' }}>
      <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '3rem', textTransform: 'uppercase', animation: 'pulse 1s infinite' }}>
        💀 ROASTING IN PROGRESS...
      </div>
      <div style={{ color: '#666', fontWeight: 700, textTransform: 'uppercase' }}>Loading the brutal truth about {url}</div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['ANALYZING UX...', 'CHECKING LIES...', 'MEASURING PAIN...'].map((msg, i) => (
          <div key={msg} style={{ background: '#fff', border: '3px solid #000', padding: '8px 16px', fontWeight: 900, fontSize: '0.8rem', animation: `fadeIn 0.5s ${i * 0.5}s both` }}>{msg}</div>
        ))}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}} @keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );

  if (!data) return null;

  return (
    <main style={{ background: 'var(--bg-base)', minHeight: '100vh', paddingBottom: '100px' }}>
      {showNewsletter && <NewsletterModal />}

      {/* Hero Verdict Banner */}
      <div style={{ background: '#000', padding: '60px 0', borderBottom: '4px solid var(--acid-green)', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: data.painScore > 70 ? 'var(--hot-pink)' : 'var(--acid-green)', color: data.painScore > 70 ? '#fff' : '#000', fontFamily: 'var(--font-bricolage)', fontSize: '0.8rem', fontWeight: 900, padding: '6px 16px', border: '3px solid #fff', marginBottom: '20px', textTransform: 'uppercase' }}>
          {data.tag || 'VERDICT IN'}
        </div>
        <h1 style={{ fontFamily: 'var(--font-bricolage)', fontSize: 'clamp(2rem, 6vw, 4.5rem)', textTransform: 'uppercase', color: '#fff', maxWidth: '900px', margin: '0 auto 24px', lineHeight: 1 }}>
          "{data.roastHeadline}"
        </h1>
        <div style={{ color: '#aaa', fontSize: '1rem', fontWeight: 700 }}>{data.url}</div>

        {/* Animated Pain Meters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '48px', flexWrap: 'wrap' }}>
          <PainMeter score={data.painScore} color="var(--hot-pink)" label="PAIN SCORE" />
          <PainMeter score={data.truthScore} color="var(--cyan)" label="TRUTH SCORE" />
          <PainMeter score={data.hypeGap} color="var(--acid-green)" label="HYPE GAP" />
        </div>
      </div>

      <div className="container" style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ width: '100%' }}>
          {/* The Roast Lines */}
          <div style={{ background: '#fff', border: '4px solid #000', boxShadow: '8px 8px 0px #000', padding: '24px', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.8rem', marginBottom: '24px', borderBottom: '3px solid #000', paddingBottom: '16px' }}>
              THE ROAST 🔥
            </h2>
            {data.roastLines?.map((line, i) => (
              <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '16px', padding: '16px', background: i % 2 === 0 ? '#f5f5f5' : '#fff', border: '2px solid #eee' }}>
                <span style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.5rem', flexShrink: 0 }}>{'💀🤡🔥'[i % 3]}</span>
                <p style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.4 }}>{line}</p>
              </div>
            ))}
          </div>

          {/* UX & Trust Verdicts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            <div style={{ background: 'var(--acid-green)', border: '4px solid #000', boxShadow: '6px 6px 0px #000', padding: '24px' }}>
              <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.1rem', fontWeight: 900, marginBottom: '12px' }}>UX VERDICT</div>
              <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{data.uxVerdict}</p>
            </div>
            <div style={{ background: 'var(--cyan)', border: '4px solid #000', boxShadow: '6px 6px 0px #000', padding: '24px' }}>
              <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.1rem', fontWeight: 900, marginBottom: '12px' }}>TRUST VERDICT</div>
              <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>{data.trustVerdict}</p>
            </div>
          </div>

          {/* Best vs Worst */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
            <div style={{ background: '#fff', border: '4px solid var(--hot-pink)', boxShadow: '6px 6px 0px var(--hot-pink)', padding: '24px' }}>
              <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1rem', color: 'var(--hot-pink)', fontWeight: 900, marginBottom: '8px' }}>💀 WORST THING</div>
              <p style={{ fontWeight: 800, fontSize: '1rem' }}>{data.worstFeature}</p>
            </div>
            <div style={{ background: '#fff', border: '4px solid var(--acid-green)', boxShadow: '6px 6px 0px #000', padding: '24px' }}>
              <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1rem', color: 'green', fontWeight: 900, marginBottom: '8px' }}>✅ ONLY GOOD THING</div>
              <p style={{ fontWeight: 800, fontSize: '1rem' }}>{data.bestFeature}</p>
            </div>
          </div>

          {/* Community Reactions */}
          <ReactionBar roastId={url} />

          {/* Roast Receipt */}
          <RoastReceipt data={data} />

          {/* Founder Defense Section */}
          <div style={{ background: '#111', border: '4px solid #333', padding: '32px', marginTop: '32px' }}>
            <h3 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.5rem', color: '#fff', marginBottom: '12px' }}>
              🛡️ ARE YOU THE FOUNDER?
            </h3>
            <p style={{ color: '#aaa', fontWeight: 700, marginBottom: '20px' }}>
              Think the roast is unfair? Write your defense. The community will judge.
            </p>
            {!defenseSaved ? (
              <>
                <textarea
                  value={defense}
                  onChange={e => setDefense(e.target.value)}
                  placeholder="Actually, our UX is great because..."
                  style={{ width: '100%', minHeight: '100px', background: '#222', border: '3px solid #444', color: '#fff', padding: '16px', fontFamily: 'var(--font-space)', fontSize: '1rem', fontWeight: 700, resize: 'vertical', marginBottom: '16px' }}
                />
                <button onClick={() => { if (defense) setDefenseSaved(true); }} className="btn-brutal" style={{ background: 'var(--cyan)', fontSize: '1rem' }}>
                  SUBMIT DEFENSE 🛡️
                </button>
              </>
            ) : (
              <div style={{ background: 'var(--cyan)', border: '3px solid #000', padding: '20px', fontWeight: 800 }}>
                YOUR DEFENSE HAS BEEN SUBMITTED. THE COMMUNITY WILL DECIDE.
                <div style={{ marginTop: '12px', fontStyle: 'italic' }}>"{defense}"</div>
              </div>
            )}
          </div>

          {/* Human Comments */}
          <CommentSection roastId={url} />
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#fff', border: '4px solid #000', boxShadow: '8px 8px 0px #000', padding: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.4rem', marginBottom: '20px' }}>SHARE THE PAIN</h3>
            <button onClick={shareOnTwitter} className="btn-brutal" style={{ width: '100%', background: '#000', color: '#fff', marginBottom: '12px', fontSize: '1rem' }}>
              🐦 SHARE ON TWITTER
            </button>
            <button onClick={() => { if(typeof navigator !== 'undefined') navigator.clipboard.writeText(window.location.href); }} className="btn-brutal" style={{ width: '100%', fontSize: '1rem', background: 'var(--acid-green)' }}>
              🔗 COPY LINK
            </button>
          </div>

          <div style={{ background: 'var(--hot-pink)', border: '4px solid #000', boxShadow: '8px 8px 0px #000', padding: '28px' }}>
            <h3 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.4rem', color: '#fff', marginBottom: '8px' }}>
              ROAST YOUR COMPETITOR 😈
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 700, marginBottom: '16px', fontSize: '0.9rem' }}>
              Think they deserve this more than you?
            </p>
            <form onSubmit={roastCompetitor} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="text" placeholder="competitor-url.com" value={competitorUrl} onChange={e => setCompetitorUrl(e.target.value)} style={{ padding: '12px', border: '3px solid #000', fontWeight: 800, fontSize: '1rem' }} />
              <button type="submit" className="btn-brutal" style={{ background: '#000', color: '#fff', border: '3px solid #000' }}>ROAST THEM 💀</button>
            </form>
          </div>

          <div style={{ background: 'var(--acid-green)', border: '4px solid #000', boxShadow: '8px 8px 0px #000', padding: '28px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🔄</div>
            <h3 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.2rem', marginBottom: '16px' }}>ROAST ANOTHER SITE</h3>
            <a href="/" className="btn-brutal" style={{ display: 'block', fontSize: '1rem' }}>GO BACK</a>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function RoastPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '3rem' }}>💀 LOADING...</div></div>}>
      <RoastContent />
    </Suspense>
  );
}
