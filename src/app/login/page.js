'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push('/');
    } else {
      alert('Login failed. Try anything, it is mock for now!');
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}>
      <div style={{ background: '#fff', border: '4px solid #000', boxShadow: '12px 12px 0px #000', padding: '48px', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '2.5rem', textTransform: 'uppercase', marginBottom: '24px', lineHeight: 0.9 }}>
          JOIN THE <span style={{ color: 'var(--hot-pink)' }}>SAVAGE</span> CLUB
        </h1>
        <p style={{ fontWeight: 700, marginBottom: '32px', color: '#666' }}>Sign in to save your roasts and track your savagery.</p>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: 900, fontSize: '0.8rem', marginBottom: '8px', textTransform: 'uppercase' }}>EMAIL ADDRESS</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="savage@roast.me" 
              style={{ width: '100%', padding: '16px', border: '3px solid #000', fontWeight: 700 }} 
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: 900, fontSize: '0.8rem', marginBottom: '8px', textTransform: 'uppercase' }}>PASSWORD</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••" 
              style={{ width: '100%', padding: '16px', border: '3px solid #000', fontWeight: 700 }} 
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-brutal btn-pink" style={{ width: '100%', padding: '16px', fontSize: '1.1rem', marginTop: '12px' }}>
            {loading ? 'VERIFYING SAVAGERY...' : 'SIGN IN 💀'}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ flex: 1, height: '2px', background: '#eee' }}></div>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#aaa' }}>OR SOCIAL LOGIN</span>
            <div style={{ flex: 1, height: '2px', background: '#eee' }}></div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ flex: 1, padding: '12px', border: '3px solid #000', fontWeight: 900, background: '#fff' }}>GOOGLE</button>
            <button style={{ flex: 1, padding: '12px', border: '3px solid #000', fontWeight: 900, background: '#fff' }}>GITHUB</button>
          </div>
        </div>
      </div>
    </main>
  );
}
