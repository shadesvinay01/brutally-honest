export default function Footer() {
  return (
    <footer style={{ 
      borderTop: '4px solid #000', 
      padding: '60px 0', 
      background: '#000',
      marginTop: 'auto',
      color: '#fff'
    }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
        <div>
          <div className="logo-group" style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div className="logo-icon-container" style={{ width: '44px', height: '44px', overflow: 'hidden', padding: '0' }}>
              <img src="/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="brutal-logo-img" />
            </div>
            BRUTALLY<span style={{ color: 'var(--acid-green)' }}>HONEST</span>
          </div>
          <p style={{ color: '#aaa', fontSize: '0.95rem', fontWeight: 600 }}>
            No feelings spared. No PR fluff. Just truth.
          </p>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <a href="#" style={{ background: 'var(--acid-green)', color: '#000', border: '3px solid var(--acid-green)', padding: '8px 12px', fontWeight: 900 }}>TW</a>
            <a href="#" style={{ background: 'var(--hot-pink)', color: '#fff', border: '3px solid var(--hot-pink)', padding: '8px 12px', fontWeight: 900 }}>DC</a>
          </div>
        </div>
        
        <div>
          <h4 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--acid-green)' }}>Platform</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="/#feed" style={{ color: '#aaa', fontWeight: 700 }}>Hall of Shame</a></li>
            <li><a href="/leaderboard" style={{ color: '#aaa', fontWeight: 700 }}>Leaderboard</a></li>
            <li><a href="/login" style={{ color: '#aaa', fontWeight: 700 }}>Sign In</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.2rem', textTransform: 'uppercase', marginBottom: '16px', color: 'var(--acid-green)' }}>Community</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="#" style={{ color: '#aaa', fontWeight: 700 }}>Discord Server</a></li>
            <li><a href="#" style={{ color: '#aaa', fontWeight: 700 }}>Twitter / X</a></li>
            <li><a href="#" style={{ color: '#aaa', fontWeight: 700 }}>Weekly Roast Newsletter</a></li>
          </ul>
        </div>
      </div>
      <div className="container" style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #222', textAlign: 'center', color: '#555', fontWeight: 700 }}>
        © {new Date().getFullYear()} BrutallyHonest. No feelings spared.
      </div>
    </footer>
  );
}
