import { useEffect, useState } from 'react'
import { getAllPosts, urlFor } from '../lib/sanity'

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
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export default function BlogList({ onNavigate }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getAllPosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const categories = ['all', ...new Set(posts.map(p => p.category).filter(Boolean))]
  const filtered = filter === 'all' ? posts : posts.filter(p => p.category === filter)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '70px' }}>
      <style>{`
        .blog-hero {
          padding: 5rem 5vw 3rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 1.8rem;
          padding: 0 5vw 6rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .blog-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s;
        }
        .blog-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,92,26,0.35);
          box-shadow: 0 20px 60px rgba(255,92,26,0.1);
        }
        .blog-card-img {
          width: 100%;
          aspect-ratio: 16/9;
          object-fit: cover;
          background: var(--surface2);
          display: block;
        }
        .blog-card-img-placeholder {
          width: 100%;
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, var(--surface2), rgba(255,92,26,0.08));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
        }
        .blog-card-body {
          padding: 1.4rem;
        }
        .blog-cat-badge {
          display: inline-block;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border-radius: 100px;
          padding: 0.2rem 0.65rem;
          margin-bottom: 0.8rem;
        }
        .blog-card-title {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.15rem;
          color: var(--white);
          line-height: 1.35;
          margin-bottom: 0.7rem;
          transition: color 0.2s;
        }
        .blog-card:hover .blog-card-title {
          color: var(--orange);
        }
        .blog-card-excerpt {
          font-size: 0.88rem;
          color: rgba(240,237,232,0.55);
          line-height: 1.65;
          margin-bottom: 1.2rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: rgba(240,237,232,0.35);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 1rem;
        }
        .filter-bar {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
          padding: 0 5vw 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        .filter-btn {
          background: var(--surface);
          border: 1px solid var(--border);
          color: rgba(240,237,232,0.55);
          padding: 0.4rem 1rem;
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: all 0.2s;
          font-family: var(--font-body);
        }
        .filter-btn:hover, .filter-btn.active {
          background: var(--orange);
          border-color: var(--orange);
          color: white;
          box-shadow: 0 0 20px var(--orange-glow);
        }
        .empty-state {
          text-align: center;
          padding: 5rem 1rem;
          color: rgba(240,237,232,0.3);
        }
        .skeleton {
          background: linear-gradient(90deg, var(--surface) 25%, var(--surface2) 50%, var(--surface) 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
          border-radius: 8px;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 600px) {
          .blog-grid { grid-template-columns: 1fr; gap: 1.2rem; }
        }
      `}</style>

      {/* Hero */}
      <div className="blog-hero">
        <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', display: 'block', marginBottom: '1rem' }}>
          Insights & Strategies
        </span>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.5rem, 5vw, 5rem)', lineHeight: 0.92, marginBottom: '1.2rem' }}>
          The Digital<br /><span style={{ color: 'var(--orange)' }}>Marketing Blog</span>
        </h1>
        <p style={{ color: 'rgba(240,237,232,0.55)', fontSize: '1rem', maxWidth: '500px', lineHeight: 1.7 }}>
          Real strategies, campaign breakdowns, and industry insights — straight from 12+ years of agency experience.
        </p>
      </div>

      {/* Filter bar */}
      {!loading && posts.length > 0 && (
        <div className="filter-bar">
          {categories.map(cat => (
            <button key={cat} className={`filter-btn${filter === cat ? ' active' : ''}`} onClick={() => setFilter(cat)}>
              {cat === 'all' ? 'All Posts' : categoryLabels[cat] || cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      <div className="blog-grid">
        {loading ? (
          // Skeleton cards
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', overflow: 'hidden' }}>
              <div className="skeleton" style={{ width: '100%', aspectRatio: '16/9' }} />
              <div style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div className="skeleton" style={{ height: '14px', width: '80px' }} />
                <div className="skeleton" style={{ height: '20px', width: '90%' }} />
                <div className="skeleton" style={{ height: '14px', width: '100%' }} />
                <div className="skeleton" style={{ height: '14px', width: '70%' }} />
              </div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1/-1' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✍️</div>
            <p style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'rgba(240,237,232,0.5)' }}>No posts yet.</p>
            <p style={{ fontSize: '0.88rem' }}>Check back soon — content is coming!</p>
          </div>
        ) : (
          filtered.map((post, i) => {
            const catColor = categoryColors[post.category] || 'var(--orange)'
            return (
              <div key={post._id} className="blog-card"
                style={{ animationDelay: `${i * 0.07}s` }}
                onClick={() => onNavigate('post', post.slug.current)}>
                {post.coverImage
                  ? <img className="blog-card-img" src={urlFor(post.coverImage).width(680).height(382).url()} alt={post.title} />
                  : <div className="blog-card-img-placeholder">📝</div>
                }
                <div className="blog-card-body">
                  {post.category && (
                    <span className="blog-cat-badge" style={{ background: catColor + '18', border: `1px solid ${catColor}44`, color: catColor }}>
                      {categoryLabels[post.category] || post.category}
                    </span>
                  )}
                  <div className="blog-card-title">{post.title}</div>
                  {post.excerpt && <div className="blog-card-excerpt">{post.excerpt}</div>}
                  <div className="blog-card-meta">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span style={{ color: 'var(--orange)', fontWeight: 700, fontSize: '0.8rem' }}>Read →</span>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}