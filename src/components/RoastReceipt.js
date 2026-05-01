'use client';

export default function RoastReceipt({ data }) {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const receiptId = Math.random().toString(36).substring(2, 8).toUpperCase();

  const share = () => {
    const text = `🧾 BRUTALLYHONEST ROAST RECEIPT\n\n${data.productName} scored ${data.painScore}/100 pain\n\n"${data.roastHeadline}"\n\nGet your roast receipt:`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const ReceiptRow = ({ label, value, highlight }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px dashed #ccc', fontFamily: 'monospace', fontSize: '0.9rem' }}>
      <span style={{ fontWeight: 700 }}>{label}</span>
      <span style={{ fontWeight: 900, color: highlight || '#000' }}>{value}</span>
    </div>
  );

  return (
    <div style={{ margin: '40px 0' }}>
      <h2 style={{ fontFamily: 'var(--font-bricolage)', fontSize: '2rem', textTransform: 'uppercase', marginBottom: '24px', color: '#000' }}>
        🧾 YOUR ROAST RECEIPT
      </h2>

      <div style={{
        background: '#fff',
        border: '4px solid #000',
        boxShadow: '8px 8px 0px #000',
        padding: '32px',
        maxWidth: '480px',
        position: 'relative',
        fontFamily: 'monospace',
      }}>
        {/* Receipt Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '3px solid #000', paddingBottom: '20px' }}>
          <div style={{ fontFamily: 'var(--font-bricolage)', fontSize: '1.8rem', fontWeight: 900, letterSpacing: '0.1em' }}>BRUTALLYHONEST</div>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#666', marginTop: '4px' }}>NO FEELINGS SPARED™</div>
          <div style={{ fontSize: '0.75rem', color: '#999', marginTop: '8px' }}>
            {dateStr} {timeStr} · RECEIPT #{receiptId}
          </div>
        </div>

        {/* Items */}
        <div style={{ marginBottom: '24px' }}>
          <ReceiptRow label={`${data.productName} (1x)`} value={data.url || ''} />
          <ReceiptRow label="PAIN SCORE" value={`${data.painScore}/100`} highlight={data.painScore > 70 ? '#ff3366' : '#000'} />
          <ReceiptRow label="TRUTH SCORE" value={`${data.truthScore}/100`} />
          <ReceiptRow label="HYPE GAP" value={`${data.hypeGap}%`} highlight={data.hypeGap > 25 ? '#ff3366' : '#000'} />
          <ReceiptRow label="UX QUALITY TAX" value={`+${Math.round(data.painScore * 0.3)}`} highlight="#ff3366" />
          <ReceiptRow label="MARKETING BS SURCHARGE" value={`+${data.hypeGap}`} highlight="#ff3366" />
        </div>

        <div style={{ borderTop: '3px double #000', paddingTop: '16px', marginBottom: '16px' }}>
          <ReceiptRow label="VERDICT" value={data.tag || 'CERTIFIED MID'} highlight="var(--hot-pink)" />
          <div style={{ fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 700, marginTop: '16px', fontStyle: 'italic', color: '#333' }}>
            NOTE: "{data.roastHeadline}"
          </div>
        </div>

        {/* Footer */}
        <div style={{ borderTop: '3px solid #000', paddingTop: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#666', lineHeight: 1.6 }}>
            THANK YOU FOR BEING HONEST<br />
            COME BACK WHEN YOUR COMPETITOR MESSES UP<br />
            <strong>brutallyhonest.app</strong>
          </div>
          <div style={{ marginTop: '16px', fontSize: '1.5rem', letterSpacing: '0.5rem' }}>* * * * *</div>
        </div>
      </div>

      <button onClick={share} className="btn-brutal" style={{ marginTop: '16px', fontSize: '1rem' }}>
        🐦 SHARE YOUR RECEIPT
      </button>
    </div>
  );
}
