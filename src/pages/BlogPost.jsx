import { useEffect, useState } from 'react'
import { getPostBySlug, urlFor } from '../lib/sanity'
import { PortableText } from '@portabletext/react'

const categoryColors = {
  'google-ads': '#4facfe',
  'meta-ads': '#1877F2',
  'seo': '#a78bfa',
  'ai-tools': '#10a37f',
  'career-tips': '#FFC107',
  'campaign-strategy': '#ff5c1a',
}
const categoryLabels = {
  'google-ads': 'Google Ads',
  'meta-ads': 'Meta Ads',
  'seo': 'SEO',
  'ai-tools': 'AI Tools',
  'career-tips': 'Career Tips',
  'campaign-strategy': 'Campaign Strategy',
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}

// Custom Portable Text components matching the site's dark theme
const ptComponents = {
  block: {
    normal: ({ children }) => <p style={{ marginBottom: '1.5rem', color: 'rgba(240,237,232,0.82)', lineHeight: 1.85, fontSize: '1.05rem' }}>{children}</p>,
    h1: ({ children }) => <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: '1.2rem', marginTop: '2.5rem', color: 'var(--white)', lineHeight: 1.1 }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', marginBottom: '1rem', marginTop: '2.2rem', color: 'var(--white)', lineHeight: 1.2 }}>{children}</h2>,
    h3: ({ children }) => <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.8rem', marginTop: '1.8rem', color: 'var(--white)' }}>{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote style={{ borderLeft: '3px solid var(--orange)', paddingLeft: '1.5rem', margin: '2rem 0', fontStyle: 'italic', color: 'rgba(240,237,232,0.65)', fontSize: '1.1rem', lineHeight: 1.7 }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong style={{ color: 'var(--white)', fontWeight: 700 }}>{children}</strong>,
    em: ({ children }) => <em style={{ color: 'rgba(240,237,232,0.85)' }}>{children}</em>,
    code: ({ children }) => <code style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '0.15rem 0.4rem', fontFamily: 'monospace', fontSize: '0.9em', color: 'var(--orange)' }}>{children}</code>,
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noreferrer" style={{ color: 'var(--orange)', textDecoration: 'underline', textDecorationColor: 'rgba(255,193,7,0.4)', textUnderlineOffset: '3px' }}>
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{children}</ul>,
    number: ({ children }) => <ol style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li style={{ color: 'rgba(240,237,232,0.8)', lineHeight: 1.7, paddingLeft: '0.5rem' }}>{children}</li>,
    number: ({ children }) => <li style={{ color: 'rgba(240,237,232,0.8)', lineHeight: 1.7, paddingLeft: '0.5rem' }}>{children}</li>,
  },
  types: {
    image: ({ value }) => (
      <figure style={{ margin: '2.5rem 0' }}>
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || ''}
          style={{ width: '100%', borderRadius: '12px', display: 'block', border: '1px solid rgba(255,255,255,0.07)' }}
        />
        {value.alt && (
          <figcaption style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(240,237,232,0.35)', marginTop: '0.8rem' }}>
            {value.alt}
          </figcaption>
        )}
      </figure>
    ),
  },
}

export default function BlogPost({ slug, onNavigate }) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    getPostBySlug(slug)
      .then(data => {
        if (!data) setNotFound(true)
        else setPost(data)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid rgba(255,92,26,0.2)', borderTopColor: 'var(--orange)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p style={{ color: 'rgba(240,237,232,0.4)', fontSize: '0.88rem' }}>Loading post...</p>
      </div>
    </div>
  )

  if (notFound) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ fontSize: '4rem' }}>🔍</div>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--white)' }}>Post not found</h2>
      <button onClick={() => onNavigate('blog')} style={{ background: 'var(--orange)', color: 'white', border: 'none', padding: '0.7rem 1.5rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}>← Back to Blog</button>
    </div>
  )

  const catColor = categoryColors[post.category] || 'var(--orange)'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '70px' }}>
      <style>{`
        .post-cover {
          width: 100%;
          max-height: 480px;
          object-fit: cover;
          display: block;
        }
        .post-container {
          max-width: 760px;
          margin: 0 auto;
          padding: 3rem 5vw 6rem;
        }
        .post-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: rgba(240,237,232,0.45);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          margin-bottom: 2rem;
          transition: color 0.2s;
          font-family: var(--font-body);
        }
        .post-back-btn:hover { color: var(--orange); }
      `}</style>

      {/* Cover image */}
      {post.coverImage && (
        <img
          className="post-cover"
          src={urlFor(post.coverImage).width(1200).height(480).url()}
          alt={post.title}
        />
      )}

      <div className="post-container">
        {/* Back button */}
        <button className="post-back-btn" onClick={() => onNavigate('blog')}>
          ← Back to Blog
        </button>

        {/* Category */}
        {post.category && (
          <span style={{ display: 'inline-block', background: catColor + '18', border: `1px solid ${catColor}44`, color: catColor, fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', borderRadius: '100px', padding: '0.2rem 0.7rem', marginBottom: '1.2rem' }}>
            {categoryLabels[post.category] || post.category}
          </span>
        )}

        {/* Title */}
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3.2rem)', lineHeight: 1.05, color: 'var(--white)', marginBottom: '1.2rem' }}>
          {post.title}
        </h1>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem', paddingBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.07)', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>CA</div>
            <span style={{ fontSize: '0.85rem', color: 'rgba(240,237,232,0.65)', fontWeight: 600 }}>Chirag Atreja</span>
          </div>
          {post.publishedAt && (
            <span style={{ fontSize: '0.82rem', color: 'rgba(240,237,232,0.35)' }}>{formatDate(post.publishedAt)}</span>
          )}
        </div>

        {/* Body */}
        {post.body && <PortableText value={post.body} components={ptComponents} />}

        {/* Bottom CTA */}
        <div style={{ marginTop: '4rem', padding: '2.5rem', background: 'var(--surface)', border: '1px solid rgba(255,92,26,0.2)', borderRadius: '16px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--white)' }}>Want to learn this hands-on?</p>
          <p style={{ color: 'rgba(240,237,232,0.55)', fontSize: '0.92rem', marginBottom: '1.5rem' }}>Join DigitalWithChirag and master real digital marketing skills.</p>
          <a href="https://wa.me/919311048234" target="_blank" rel="noreferrer"
            style={{ background: 'var(--orange)', color: 'white', padding: '0.85rem 2rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.05em', display: 'inline-block', boxShadow: '0 0 30px var(--orange-glow)' }}>
            Apply for Next Batch →
          </a>
        </div>
      </div>
    </div>
  )
}