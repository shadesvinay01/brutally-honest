'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [history, setHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
    if (session?.user) {
      // Fetch user specific data
      fetch(`/api/user`)
        .then(r => r.json())
        .then(data => {
          setUserData(data.user);
          setHistory(data.history);
        })
        .catch(err => console.error('Failed to fetch user data', err));
    }
  }, [session, status]);

  if (status === 'loading' || !userData) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-bricolage)', fontSize: '2rem' }}>LOADING SAVAGERY...</div>;
  }

  const getSavageLevel = (score) => {
    if (score > 1000) return { name: 'ROAST OVERLORD', color: 'var(--hot-pink)', icon: '👑' };
    if (score > 500) return { name: 'SAVAGE CRITIC', color: 'var(--acid-green)', icon: '🔥' };
    if (score > 100) return { name: 'BRUTAL ROAST-MASTER', color: 'var(--cyan)', icon: '💀' };
    return { name: 'NOOB INSULTER', color: '#aaa', icon: '👶' };
  };

  const level = getSavageLevel(userData.savageScore);

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingBottom: '100px' }}>
      <div style={{ background: '#000', padding: '80px 0 60px', borderBottom: '4px solid var(--acid-green)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ width: '120px', height: '120px', background: level.color, border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', boxShadow: '8px 8px 0px #000' }}>
              {userData.name?.[0]?.toUpperCase() || 'S'}
            </div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '3.5rem', color: '#fff', lineHeight: 1 }}>{userData.name}</h1>
              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <span style={{ background: level.color, color: '#000', padding: '4px 12px', fontWeight: 900, fontSize: '0.8rem', border: '2px solid #fff' }}>
                  {level.icon} {level.name}
                </span>
                <span style={{ background: '#333', color: '#fff', padding: '4px 12px', fontWeight: 900, fontSize: '0.8rem', border: '2px solid #fff' }}>
                  🔥 {userData.streak} DAY STREAK
                </span>
              </div>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '4rem', color: 'var(--acid-green)', lineHeight: 1 }}>{userData.savageScore}</div>
              <div style={{ color: '#aaa', fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase' }}>TOTAL SAVAGE SCORE</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '60px' }}>
        <h2 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '2.5rem', marginBottom: '32px' }}>ROAST HISTORY</h2>
        
        {history.length === 0 ? (
          <div style={{ background: '#fff', border: '4px solid #000', padding: '40px', textAlign: 'center' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 800 }}>YOU HAVEN'T ROASTED ANYONE YET. GET SAVAGE.</p>
            <a href="/" className="btn-brutal btn-pink" style={{ marginTop: '20px', display: 'inline-block' }}>START ROASTING 💀</a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {history.map(item => (
              <div 
                key={item.id} 
                className="brutal-card" 
                style={{ background: '#fff', padding: '24px', cursor: 'pointer' }}
                onClick={() => router.push(`/roast?url=${encodeURIComponent(item.url)}`)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                   <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.3rem', fontWeight: 900 }}>{item.productName}</div>
                   <div style={{ background: 'var(--acid-green)', color: '#000', padding: '4px 8px', fontSize: '0.7rem', fontWeight: 900 }}>💀 {item.painScore}</div>
                </div>
                <p style={{ fontStyle: 'italic', fontSize: '0.9rem', fontWeight: 700, color: '#444' }}>"{item.roastHeadline}"</p>
                <div style={{ marginTop: '20px', fontSize: '0.75rem', fontWeight: 900, color: '#aaa' }}>{new Date(item.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
