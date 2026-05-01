'use client';
import { useState, useEffect } from 'react';

export default function CommentSection({ roastId, initialComments = [] }) {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [voted, setVoted] = useState({});

  useEffect(() => {
    // Fetch comments for this specific roast
    fetch(`/api/comments?roastId=${encodeURIComponent(roastId)}`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setComments(data);
      })
      .catch(err => console.error('Failed to fetch comments', err));
  }, [roastId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim() || loading) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roastId, text: newComment, author: name })
      });
      const comment = await res.json();
      setComments(c => [{ ...comment, isNew: true }, ...c]);
      setSubmitted(true);
      setNewComment('');
      setName('');
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error('Failed to post comment', err);
    } finally {
      setLoading(false);
    }
  };

  const upvote = async (id) => {
    if (voted[id]) return;
    setVoted(v => ({ ...v, [id]: true }));
    setComments(c => c.map(cm => cm.id === id ? { ...cm, upvotes: cm.upvotes + 1 } : cm));
    
    try {
      await fetch('/api/comments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
    } catch (err) {
      console.error('Failed to upvote', err);
    }
  };

  return (
    <div style={{ marginTop: '60px' }}>
      <h2 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '2rem', textTransform: 'uppercase', marginBottom: '32px', color: '#000' }}>
        💬 HUMAN ROASTS ({comments.length})
      </h2>

      {/* Submit Form */}
      <form onSubmit={handleSubmit} style={{ background: submitted ? 'var(--acid-green)' : '#fff', border: '4px solid #000', boxShadow: '6px 6px 0px #000', padding: '28px', marginBottom: '32px', transition: 'background 0.3s' }}>
        {submitted ? (
          <div style={{ textAlign: 'center', fontFamily: 'var(--font-bricolage)', fontSize: '1.5rem', fontWeight: 900, textTransform: 'uppercase' }}>
            🔥 YOUR ROAST IS IN. THE PEOPLE WILL JUDGE.
          </div>
        ) : (
          <>
            <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.2rem', fontWeight: 900, marginBottom: '16px', textTransform: 'uppercase' }}>
              ADD YOUR ROAST:
            </div>
            <input
              type="text"
              placeholder="YOUR NAME"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ width: '100%', padding: '12px', border: '3px solid #000', fontWeight: 700, fontSize: '1rem', marginBottom: '12px', fontFamily: 'var(--font-space)' }}
            />
            <textarea
              placeholder="Add your brutally honest take... (280 chars max)"
              value={newComment}
              onChange={e => setNewComment(e.target.value.slice(0, 280))}
              maxLength={280}
              style={{ width: '100%', minHeight: '80px', padding: '12px', border: '3px solid #000', fontWeight: 700, fontSize: '1rem', fontFamily: 'var(--font-space)', resize: 'vertical', marginBottom: '8px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: newComment.length > 250 ? 'red' : '#666' }}>{newComment.length}/280</span>
              <button type="submit" disabled={loading} className="btn-brutal btn-pink" style={{ border: '3px solid #000', padding: '10px 24px', fontSize: '1rem', opacity: loading ? 0.5 : 1 }}>
                {loading ? 'POSTING...' : 'DROP THE ROAST 🔥'}
              </button>
            </div>
          </>
        )}
      </form>

      {/* Comment List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {comments.map(c => (
          <div
            key={c.id}
            style={{ background: c.isNew ? 'var(--cyan)' : '#fff', border: '4px solid #000', boxShadow: '4px 4px 0px #000', padding: '24px', animation: c.isNew ? 'bounceIn 0.4s ease' : 'none', transition: 'background 0.3s' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', background: '#000', color: 'var(--acid-green)', border: '3px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: '1.3rem', flexShrink: 0 }}>
                  {c.author?.[0]?.toUpperCase() || 'A'}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: '1.1rem' }}>{c.author}</div>
                  {c.badge && <div style={{ background: '#000', color: 'var(--acid-green)', fontSize: '0.65rem', fontWeight: 900, padding: '2px 8px', display: 'inline-block' }}>{c.badge}</div>}
                </div>
              </div>
              <span style={{ color: '#999', fontSize: '0.85rem', fontWeight: 700 }}>{new Date(c.createdAt).toLocaleDateString()}</span>
            </div>
            <p style={{ fontWeight: 700, fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '16px' }}>{c.text}</p>
            <button
              onClick={() => upvote(c.id)}
              style={{ background: voted[c.id] ? '#000' : 'transparent', color: voted[c.id] ? '#fff' : '#000', border: '3px solid #000', padding: '6px 16px', fontFamily: 'var(--font-bricolage)', fontWeight: 900, fontSize: '0.9rem', cursor: voted[c.id] ? 'default' : 'pointer', transition: 'all 0.15s' }}
            >
              💀 {c.upvotes} {voted[c.id] ? '· VOTED' : '· BRUTAL'}
            </button>
          </div>
        ))}
      </div>
      <style>{`@keyframes bounceIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }`}</style>
    </div>
  );
}
