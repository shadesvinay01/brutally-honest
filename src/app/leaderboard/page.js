const leaderboardData = [
  { rank: 1, name: 'Notion', url: 'notion.so', category: 'Productivity', painScore: 94, roastCount: 1842, logo: 'N', tag: 'CERTIFIED TRASH', color: '#FF00FF' },
  { rank: 2, name: 'Monday.com', url: 'monday.com', category: 'Project Mgmt', painScore: 91, roastCount: 1239, logo: 'M', tag: 'OVERHYPED', color: '#00FFFF' },
  { rank: 3, name: 'ClickUp', url: 'clickup.com', category: 'Productivity', painScore: 89, roastCount: 987, logo: 'C', tag: 'FEATURE BLOAT', color: '#CCFF00' },
  { rank: 4, name: 'Airtable', url: 'airtable.com', category: 'Database', painScore: 82, roastCount: 756, logo: 'A', tag: 'CONFUSING AF', color: '#FF00FF' },
  { rank: 5, name: 'HubSpot', url: 'hubspot.com', category: 'CRM', painScore: 79, roastCount: 634, logo: 'H', tag: 'ENTERPRISE TRAP', color: '#00FFFF' },
  { rank: 6, name: 'Webflow', url: 'webflow.com', category: 'No-Code', painScore: 75, roastCount: 543, logo: 'W', tag: 'STEEP CURVE', color: '#CCFF00' },
  { rank: 7, name: 'Intercom', url: 'intercom.com', category: 'Support', painScore: 71, roastCount: 412, logo: 'I', tag: 'COSTLY MID', color: '#FF00FF' },
  { rank: 8, name: 'Figma', url: 'figma.com', category: 'Design', painScore: 44, roastCount: 289, logo: 'F', tag: 'ACTUALLY DECENT', color: '#00FFFF' },
];

export default function Leaderboard() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-base)', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{
        background: '#000',
        padding: '80px 0 60px',
        borderBottom: '4px solid var(--acid-green)',
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block',
          background: 'var(--hot-pink)',
          color: '#fff',
          fontFamily: 'var(--font-bricolage)',
          fontSize: '0.8rem',
          fontWeight: 900,
          padding: '6px 16px',
          border: '3px solid #000',
          marginBottom: '20px',
          textTransform: 'uppercase',
        }}>🔴 UPDATED WEEKLY</div>

        <h1 style={{
          fontFamily: 'var(--font-bricolage)',
          fontSize: 'clamp(3rem, 10vw, 7rem)',
          textTransform: 'uppercase',
          lineHeight: 0.9,
          color: 'var(--acid-green)',
          textShadow: '6px 6px 0px var(--hot-pink)',
        }}>
          WALL OF SHAME
        </h1>
        <p style={{ color: '#aaa', fontWeight: 700, marginTop: '20px', fontSize: '1.1rem', textTransform: 'uppercase' }}>
          The most brutally roasted products on the internet.
        </p>
      </div>

      {/* Leaderboard Table */}
      <div className="container" style={{ marginTop: '60px' }}>
        {/* Top 3 podium */}
        {/* Top 3 podium */}
        <div className="podium-stack" style={{ display: 'flex', flexDirection: 'column', gap: '40px', marginBottom: '60px' }}>
          {/* 1st place - Top of stack on mobile */}
          <div style={{ order: 1 }}>
            <div style={{
              background: 'var(--acid-green)',
              border: '4px solid #000',
              boxShadow: '8px 8px 0px #000',
              padding: '32px 24px',
              textAlign: 'center',
              position: 'relative',
              maxWidth: '500px',
              margin: '0 auto'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#000',
                color: 'var(--acid-green)',
                fontFamily: 'var(--font-bricolage)',
                fontWeight: 900,
                fontSize: '0.8rem',
                padding: '4px 16px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap'
              }}>👑 #1 MOST ROASTED</div>
              <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏆</div>
              <div style={{
                width: '72px',
                height: '72px',
                background: '#000',
                border: '3px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.2rem',
                fontWeight: 900,
                margin: '0 auto 12px',
                fontFamily: 'var(--font-bricolage)',
                color: 'var(--acid-green)',
              }}>{leaderboardData[0].logo}</div>
              <h3 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '2rem' }}>{leaderboardData[0].name}</h3>
              <div style={{ background: '#000', color: 'var(--hot-pink)', padding: '4px 10px', fontSize: '0.7rem', fontWeight: 900, marginTop: '8px', display: 'inline-block' }}>
                {leaderboardData[0].tag}
              </div>
              <div style={{ fontSize: '3.5rem', fontWeight: 900, fontFamily: 'var(--font-bricolage)', color: '#000', marginTop: '12px' }}>
                {leaderboardData[0].painScore}
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 900 }}>PAIN SCORE</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', order: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            {/* 2nd place */}
            <div style={{ flex: '1', minWidth: '240px' }}>
              <div style={{
                background: '#fff',
                border: '4px solid #000',
                boxShadow: '6px 6px 0px #000',
                padding: '24px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🥈</div>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#aaa',
                  border: '3px solid #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 900,
                  margin: '0 auto 12px',
                  fontFamily: 'var(--font-bricolage)',
                }}>{leaderboardData[1].logo}</div>
                <h3 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.5rem' }}>{leaderboardData[1].name}</h3>
                <div style={{ background: '#000', color: '#fff', padding: '4px 10px', fontSize: '0.7rem', fontWeight: 900, marginTop: '8px', display: 'inline-block' }}>
                  {leaderboardData[1].tag}
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-bricolage)', color: 'var(--hot-pink)', marginTop: '12px' }}>
                  {leaderboardData[1].painScore}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#666' }}>PAIN SCORE</div>
              </div>
            </div>

            {/* 3rd place */}
            <div style={{ flex: '1', minWidth: '240px' }}>
              <div style={{
                background: '#fff',
                border: '4px solid #000',
                boxShadow: '6px 6px 0px #000',
                padding: '24px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🥉</div>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: '#c97d4e',
                  border: '3px solid #000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 900,
                  margin: '0 auto 12px',
                  fontFamily: 'var(--font-bricolage)',
                  color: '#fff',
                }}>{leaderboardData[2].logo}</div>
                <h3 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.5rem' }}>{leaderboardData[2].name}</h3>
                <div style={{ background: '#000', color: '#fff', padding: '4px 10px', fontSize: '0.7rem', fontWeight: 900, marginTop: '8px', display: 'inline-block' }}>
                  {leaderboardData[2].tag}
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, fontFamily: 'var(--font-bricolage)', color: 'var(--hot-pink)', marginTop: '12px' }}>
                  {leaderboardData[2].painScore}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#666' }}>PAIN SCORE</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {leaderboardData.slice(3).map((item, i) => (
            <div
              key={item.rank}
              className="brutal-card"
              style={{
                background: '#fff',
                padding: '20px 28px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                transition: 'all 0.2s',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize: '2rem',
                fontWeight: 900,
                color: '#ccc',
                minWidth: '50px',
              }}>#{item.rank}</div>

              <div style={{
                width: '48px',
                height: '48px',
                background: item.color,
                border: '3px solid #000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-bricolage)',
                fontSize: '1.5rem',
                fontWeight: 900,
                color: '#000',
                flexShrink: 0,
              }}>{item.logo}</div>

              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.3rem', fontWeight: 900 }}>{item.name}</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#666' }}>{item.url} · {item.category}</div>
              </div>

              <div style={{
                background: '#000',
                color: item.color,
                padding: '4px 12px',
                fontSize: '0.75rem',
                fontWeight: 900,
                textTransform: 'uppercase',
              }}>{item.tag}</div>

              <div style={{ textAlign: 'right', minWidth: '80px' }}>
                <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '2rem', fontWeight: 900, color: 'var(--hot-pink)', lineHeight: 1 }}>{item.painScore}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#666' }}>PAIN SCORE</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '80px' }}>
          <h2 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '3rem', marginBottom: '24px' }}>
            THINK YOUR COMPETITOR DESERVES TO BE HERE?
          </h2>
          <a href="/" className="btn-brutal" style={{ fontSize: '1.4rem', padding: '20px 48px' }}>
            ROAST THEM NOW 💀
          </a>
        </div>
      </div>
    </main>
  );
}
