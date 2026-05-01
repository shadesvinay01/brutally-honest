'use client';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();
  
  return (
    <nav style={{ 
      padding: '20px 0', 
      borderBottom: '4px solid #000',
      background: 'var(--bg-base)',
      position: 'fixed',
      top: '41px',
      left: 0,
      right: 0,
      zIndex: 99,
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" className="logo-group" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="logo-icon-container" style={{ width: '48px', height: '48px', overflow: 'hidden', padding: '0' }}>
            <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="brutal-logo-img" />
          </div>
          <span style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase', color: 'white', letterSpacing: '-0.02em' }}>
            BRUTALLY<span style={{ color: 'var(--acid-green)' }}>HONEST</span>
          </span>
        </a>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontFamily: 'var(--font-bricolage)', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <a href="/#feed" className="glitch-hover">EXPLORE</a>
          <a href="/roulette" className="glitch-hover" style={{ color: 'var(--acid-green)' }}>🎰 ROULETTE</a>
          <a href="/battle" className="glitch-hover" style={{ color: 'var(--hot-pink)' }}>⚔️ BATTLE</a>
          <a href="/swipe" className="glitch-hover" style={{ color: 'var(--cyan)' }}>🃏 SWIPE</a>
          <a href="/leaderboard" className="glitch-hover">HALL OF SHAME</a>
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <a href="/profile" style={{ background: 'var(--hot-pink)', color: '#fff', border: '2px solid #000', padding: '4px 10px', fontSize: '0.7rem', textDecoration: 'none' }}>
                {session.user.name.toUpperCase()}
              </a>
              <button onClick={() => signOut()} className="btn-brutal" style={{ padding: '6px 12px', fontSize: '0.75rem', background: '#000', color: '#fff', border: '2px solid #fff' }}>LOGOUT</button>
            </div>
          ) : (
            <a href="/login" className="btn-brutal btn-pink" style={{ padding: '6px 12px', fontSize: '0.75rem', border: '2px solid #000', boxShadow: '2px 2px 0px #000' }}>SIGN IN</a>
          )}
        </div>
      </div>
    </nav>
  );
}
