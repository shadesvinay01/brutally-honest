'use client';
import { useState } from 'react';

export default function NewsletterModal() {
  const [email, setEmail] = useState('');
  const [dismissed, setDismissed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (dismissed) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => setDismissed(true), 2000);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '32px',
      right: '32px',
      zIndex: 9999,
      width: '340px',
      background: 'var(--acid-green)',
      border: '4px solid #000',
      boxShadow: '8px 8px 0px #000',
      padding: '28px',
      animation: 'slideUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    }}>
      {!submitted ? (
        <>
          <button
            onClick={() => setDismissed(true)}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: '#000',
              color: '#fff',
              border: 'none',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              fontWeight: 900,
              fontSize: '1rem',
            }}
          >✕</button>

          <div style={{ fontSize: '2rem', marginBottom: '4px' }}>💌</div>
          <h3 style={{
            fontFamily: 'var(--font-bricolage)',
            fontSize: '1.4rem',
            marginBottom: '8px',
            lineHeight: 1,
          }}>
            THE WEEKLY ROAST
          </h3>
          <p style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '20px' }}>
            5 most brutal roasts every week. No fluff. No sponsorships.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="email"
              placeholder="YOUR@EMAIL.COM"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                padding: '12px',
                border: '3px solid #000',
                fontWeight: 800,
                fontSize: '1rem',
                background: '#fff',
                fontFamily: 'var(--font-space)',
              }}
            />
            <button type="submit" className="btn-brutal btn-pink" style={{ width: '100%', border: '3px solid #000' }}>
              SEND ME THE PAIN 💀
            </button>
          </form>
          <p style={{ fontSize: '0.75rem', marginTop: '12px', fontWeight: 700 }}>
            No spam. Unsubscribe anytime. We hate spam more than bad UX.
          </p>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ fontSize: '3rem' }}>🔥</div>
          <h3 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.5rem' }}>YOU'RE IN!</h3>
          <p style={{ fontWeight: 700 }}>Brace yourself for weekly truth.</p>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
