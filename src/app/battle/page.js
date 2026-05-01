'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Battle() {
  const router = useRouter();
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [battling, setBattling] = useState(false);
  const [result, setResult] = useState(null);
  const [votes, setVotes] = useState({ p1: 142, p2: 89 });
  const [voted, setVoted] = useState(null);

  const featured = [
    { a: 'notion.so', b: 'clickup.com', label: 'PRODUCTIVITY DEATH MATCH' },
    { a: 'figma.com', b: 'webflow.com', label: 'DESIGN TOOL CAGE FIGHT' },
    { a: 'hubspot.com', b: 'monday.com', label: 'ENTERPRISE CRINGE BATTLE' },
  ];

  const startBattle = async (url1, url2) => {
    if (!url1 || !url2) return;
    setBattling(true);
    setResult(null);
    setVoted(null);

    const [r1, r2] = await Promise.all([
      fetch('/api/roast', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url1 }) }).then(r => r.json()),
      fetch('/api/roast', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url: url2 }) }).then(r => r.json()),
    ]);
    setResult({ r1, r2 });
    setVotes({ p1: Math.floor(Math.random() * 200) + 50, p2: Math.floor(Math.random() * 200) + 50 });
    setBattling(false);
  };

  const vote = (side) => {
    if (voted) return;
    setVotes(v => ({ ...v, [side]: v[side] + 1 }));
    setVoted(side);
  };

  const totalVotes = votes.p1 + votes.p2;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingBottom: '100px' }}>
      <div style={{ background: '#000', padding: '60px 0 40px', borderBottom: '4px solid var(--acid-green)', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: 'var(--hot-pink)', color: '#fff', fontFamily: 'var(--font-bricolage)', fontSize: '0.8rem', fontWeight: 900, padding: '6px 16px', border: '3px solid #fff', marginBottom: '20px', textTransform: 'uppercase' }}>⚔️ BATTLE MODE</div>
        <h1 style={{ fontFamily: 'var(--font-bricolage)', fontSize: 'clamp(2rem, 8vw, 5rem)', textTransform: 'uppercase', lineHeight: 0.9, color: '#fff' }}>
          ROAST BATTLE
        </h1>
      </div>

      <div className="container" style={{ marginTop: '40px' }}>
        <div style={{ background: '#fff', border: '4px solid #000', boxShadow: '8px 8px 0px #000', padding: '24px', marginBottom: '40px', maxWidth: '800px', margin: '0 auto 40px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input value={p1} onChange={e => setP1(e.target.value)} placeholder="notion.so" style={{ padding: '16px', border: '4px solid #000', fontSize: '1.1rem', fontWeight: 800 }} />
            <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.5rem', fontWeight: 900, textAlign: 'center', color: 'var(--hot-pink)' }}>VS</div>
            <input value={p2} onChange={e => setP2(e.target.value)} placeholder="clickup.com" style={{ padding: '16px', border: '4px solid #000', fontSize: '1.1rem', fontWeight: 800 }} />
            <button onClick={() => startBattle(p1, p2)} disabled={battling || !p1 || !p2} className="btn-brutal" style={{ width: '100%', fontSize: '1.2rem', padding: '16px', background: battling ? '#333' : 'var(--acid-green)' }}>
              {battling ? '⚔️ BATTLING...' : '⚔️ START BATTLE'}
            </button>
          </div>
        </div>

        {result && !battling && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            {[ {r: result.r1, key: 'p1', color: 'var(--hot-pink)'}, {r: result.r2, key: 'p2', color: 'var(--acid-green)'} ].map((f, i) => (
              <div key={f.key} style={{ background: '#fff', border: `4px solid ${voted === f.key ? f.color : '#000'}`, boxShadow: `8px 8px 0px ${voted === f.key ? f.color : '#000'}`, padding: '24px', width: '100%', maxWidth: '500px' }}>
                <h3 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.8rem', marginBottom: '8px' }}>{f.r.productName}</h3>
                <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--hot-pink)' }}>{f.r.painScore}</div>
                <p style={{ fontWeight: 700, fontStyle: 'italic', margin: '16px 0' }}>"{f.r.roastLines?.[0]}"</p>
                <button onClick={() => vote(f.key)} disabled={!!voted} className="btn-brutal" style={{ width: '100%', background: f.color, color: f.key === 'p1' ? '#fff' : '#000' }}>
                  {voted === f.key ? '✓ VOTED' : '💀 WORSE'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
