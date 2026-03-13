import { useEffect, useRef, useState } from 'react'

/* ─── CUSTOM CURSOR ─────────────────────────────────────────── */
function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0
    const move = (e) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', move)

    let raf
    const animate = () => {
      if (dot.current) {
        dot.current.style.left = mx + 'px'
        dot.current.style.top = my + 'px'
      }
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ring.current) {
        ring.current.style.left = rx + 'px'
        ring.current.style.top = ry + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const addHover = () => ring.current?.classList.add('hovering')
    const rmHover = () => ring.current?.classList.remove('hovering')
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', rmHover)
    })

    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  )
}

/* ─── SCROLL REVEAL HOOK ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children')
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  })
}

/* ─── NAV ────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      padding: '0 5vw',
      height: '70px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(5,5,8,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      <a href="#" style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.2rem', color: 'var(--white)', textDecoration: 'none', letterSpacing: '0.02em' }}>
        Digital<span style={{ color: 'var(--orange)' }}>With</span>Chirag
      </a>
      <div className="nav-links">
        {['Program', 'About', 'Results'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{ color: 'var(--muted)', fontSize: '0.88rem', textDecoration: 'none', letterSpacing: '0.05em', fontWeight: 500, transition: 'color 0.2s' }}
            onMouseEnter={e => e.target.style.color = 'var(--white)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}>
            {l}
          </a>
        ))}
        <a href="https://www.instagram.com/digitalwithchiragofficial" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', fontSize: '1.1rem', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = '#E1306C'}
          onMouseLeave={e => e.target.style.color = 'var(--muted)'} title="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="https://www.facebook.com/share/18MMTKLM7r/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', fontSize: '1.1rem', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = '#1877F2'}
          onMouseLeave={e => e.target.style.color = 'var(--muted)'} title="Facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="https://wa.me/919311048234" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#25D366', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.04em', transition: 'box-shadow 0.2s, transform 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 20px rgba(37,211,102,0.4)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          WhatsApp
        </a>
      </div>
    </nav>
  )
}

/* ─── MARQUEE ────────────────────────────────────────────────── */
function Marquee() {
  const items = ['Google Ads', 'Meta Ads', 'Performance Marketing', 'AI Tools', 'Campaign Strategy', 'Media Planning', 'YouTube Ads', 'Funnel Strategy', 'Data & Analytics', 'Agency Training']
  const all = [...items, ...items]
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '0.8rem 0', background: 'var(--surface)' }}>
      <div style={{ display: 'flex', animation: 'marquee 22s linear infinite', width: 'max-content' }}>
        {all.map((item, i) => (
          <span key={i} style={{ whiteSpace: 'nowrap', padding: '0 2.5rem', fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: i % 2 === 0 ? 'var(--muted)' : 'var(--orange)' }}>
            {item} {i % 2 === 0 ? '◆' : '◇'}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setCount(c => c < 12 ? c + 1 : 12), 80)
    return () => clearInterval(t)
  }, [])

  return (
    <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5vw', paddingTop: '70px', position: 'relative', overflow: 'hidden' }}>
      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '20%', right: '10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,92,26,0.12) 0%, transparent 70%)', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,166,35,0.07) 0%, transparent 70%)', pointerEvents: 'none', animation: 'float 10s ease-in-out infinite 2s' }} />

      {/* Grid lines */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255,92,26,0.1)', border: '1px solid rgba(255,92,26,0.3)', borderRadius: '100px', padding: '0.4rem 1rem', marginBottom: '2rem', animation: 'float 6s ease-in-out infinite' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--orange)', display: 'inline-block', boxShadow: '0 0 8px var(--orange)' }} />
          <span style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)' }}>India's Most Practical Digital Marketing Training</span>
        </div>

        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(3.5rem, 7vw, 7.5rem)', lineHeight: 0.9, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ display: 'block', animation: 'slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>LEARN</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ display: 'block', color: 'var(--orange)', animation: 'slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both', textShadow: '0 0 80px rgba(255,92,26,0.4)' }}>DIGITAL</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span style={{ display: 'block', animation: 'slideUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both' }}>MARKETING</span>
          </div>
        </h1>

        <div className="hero-main-grid">
          <div>
            <p style={{ fontSize: '1.1rem', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '2.5rem', animation: 'fadeIn 1s ease 0.6s both' }}>
              Train with <strong style={{ color: 'var(--white)', fontWeight: 600 }}>Chirag Atreja</strong> — a digital agency professional with <strong style={{ color: 'var(--orange)' }}>{count}+ years</strong> of real campaign experience — and gain practical skills that companies actually hire for.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', animation: 'fadeIn 1s ease 0.8s both' }}>
              <a href="#contact" style={{ background: 'var(--orange)', color: 'white', padding: '0.9rem 2rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.06em', textTransform: 'uppercase', boxShadow: '0 0 40px var(--orange-glow)', transition: 'transform 0.2s, box-shadow 0.2s', display: 'inline-block' }}
                onMouseEnter={e => { e.target.style.transform = 'translateY(-3px)'; e.target.style.boxShadow = '0 8px 50px var(--orange-glow)' }}
                onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 40px var(--orange-glow)' }}>
                Start Learning →
              </a>
              <a href="#contact" style={{ background: 'transparent', color: 'var(--white)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.9rem 2rem', borderRadius: '6px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', transition: 'border-color 0.2s, background 0.2s', display: 'inline-block' }}
                onMouseEnter={e => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
                onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.background = 'transparent' }}>
                Free Consultation
              </a>
            </div>
          </div>

          <div className="hero-badge-grid" style={{ animation: 'fadeIn 1s ease 0.5s both' }}>
            {[
              { icon: '📅', title: '4 Months', sub: 'Course + Internship' },
              { icon: '🎯', title: 'Live Classes', sub: 'Real-time learning' },
              { icon: '💼', title: '100%', sub: 'Job Assistance' },
              { icon: '🤖', title: 'AI Tools', sub: 'Included in curriculum' },
            ].map((s, i) => (
              <div key={i} data-hover style={{
                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.4rem',
                transition: 'border-color 0.3s, transform 0.3s, box-shadow 0.3s',
                animationDelay: `${i * 0.1}s`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,92,26,0.4)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 20px 40px rgba(255,92,26,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.icon}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', color: 'var(--white)' }}>{s.title}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.2rem' }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
/* ─── FOUNDER CAROUSEL ───────────────────────────────────────── */
function FounderCarousel() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const timerRef = useRef(null)

  const slides = [
    {
      image: '/chirag-1.jpg',
      quote: 'I didn\'t just study digital marketing — I lived it inside the world\'s top agencies for over a decade.',
      tag: '12+ Years of Real Agency Experience',
    },
    {
      image: '/chirag-2.jpg',
      quote: 'Every campaign I teach, I\'ve actually run. Every tool I show you, I\'ve used on real client budgets.',
      tag: 'Trained by Global Networks — Publicis, WPP, Havas',
    },
    {
      image: '/chirag-3.jpg',
      quote: 'DigitalWithChirag exists because the industry needed training that actually prepares you for the real thing.',
      tag: 'Founder, DigitalWithChirag',
    },
  ]

  const goTo = (index) => {
    if (animating) return
    setAnimating(true)
    setCurrent(index)
    setTimeout(() => setAnimating(false), 500)
  }

  const next = () => goTo((current + 1) % slides.length)
  const prev = () => goTo((current - 1 + slides.length) % slides.length)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % 3)
    }, 3000)
    return () => clearInterval(timerRef.current)
  }, [])

  return (
    <section style={{ background: 'var(--bg)', padding: 'clamp(4rem, 8vw, 7rem) 5vw', overflow: 'hidden' }}>
      <style>{`
        .founder-img {
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .founder-img.loaded {
          opacity: 1;
          transform: scale(1);
        }
        .founder-text-in {
          animation: founderTextIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes founderTextIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Label */}
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', display: 'block', marginBottom: '0.8rem' }}>Meet Your Mentor</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 0.95 }}>
            The face behind<br /><span style={{ color: 'var(--orange)' }}>DigitalWithChirag</span>
          </h2>
        </div>

        {/* Slide */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '3rem', alignItems: 'center', borderRadius: '20px', background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>

          {/* Image */}
          <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', minHeight: '340px' }}>
            {slides.map((s, i) => (
              <img
                key={i}
                src={s.image}
                alt={`Chirag Atreja ${i + 1}`}
                className={`founder-img${i === current ? ' loaded' : ''}`}
                style={{
                  position: 'absolute', inset: 0, width: '100%', height: '100%',
                  objectFit: 'cover', objectPosition: 'top center',
                  pointerEvents: 'none',
                }}
              />
            ))}
            {/* Gradient overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, var(--surface))', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,8,0.5) 0%, transparent 40%)', pointerEvents: 'none' }} />
          </div>

          {/* Text */}
          <div style={{ padding: 'clamp(1.5rem, 4vw, 3rem)', paddingLeft: '0' }} className="founder-text-in" key={current}>
            <div style={{ display: 'inline-block', background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)', borderRadius: '100px', padding: '0.35rem 1rem', marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--orange)' }}>
                {slides[current].tag}
              </span>
            </div>

            <blockquote style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(1.3rem, 2.5vw, 2rem)', lineHeight: 1.3, color: 'var(--white)', marginBottom: '2.5rem', borderLeft: '3px solid var(--orange)', paddingLeft: '1.2rem' }}>
              "{slides[current].quote}"
            </blockquote>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--orange)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', flexShrink: 0 }}>C</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--white)' }}>Chirag Atreja</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--orange)', fontWeight: 600 }}>Digital Marketing Expert · 12+ Years</div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button onClick={prev} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--white)', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, background 0.2s', flexShrink: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.background = 'rgba(255,193,7,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg)' }}>
                ←
              </button>

              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                {slides.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '100px', background: i === current ? 'var(--orange)' : 'rgba(255,255,255,0.2)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all 0.3s ease' }} />
                ))}
              </div>

              <button onClick={next} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--white)', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 0.2s, background 0.2s', flexShrink: 0 }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--orange)'; e.currentTarget.style.background = 'rgba(255,193,7,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg)' }}>
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FOR WHOM ───────────────────────────────────────────────── */
function ForWhom() {
  return (
    <section id="program" style={{ padding: '8rem 5vw', background: 'var(--surface)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', display: 'block', marginBottom: '1rem' }}>Who Is This For</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 0.95 }}>
            Digital Marketing is<br /><span style={{ color: 'var(--orange)' }}>everywhere. Are you?</span>
          </h2>
        </div>
        <style>{`
          @keyframes cardGlow {
            0%, 100% { box-shadow: 0 0 20px rgba(255,193,7,0); }
            50% { box-shadow: 0 0 40px rgba(255,193,7,0.15); }
          }
          .for-card {
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 2.5rem;
            position: relative;
            overflow: hidden;
            transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.4s;
            cursor: default;
            opacity: 0;
            transform: translateY(40px);
          }
          .for-card.card-visible {
            opacity: 1;
            transform: translateY(0);
          }
          .for-card:hover {
            transform: translateY(-10px) scale(1.02);
            animation: cardGlow 2s ease-in-out infinite;
          }
          .for-card .card-icon {
            font-size: 2.5rem;
            margin-bottom: 1.5rem;
            display: inline-block;
            transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
          }
          .for-card:hover .card-icon {
            transform: scale(1.3) rotate(-8deg);
          }
          .card-shine {
            position: absolute;
            top: -50%;
            left: -60%;
            width: 40%;
            height: 200%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
            transform: skewX(-15deg);
            transition: left 0.6s ease;
            pointer-events: none;
          }
          .for-card:hover .card-shine {
            left: 120%;
          }
          .card-top-line {
            position: absolute;
            top: 0; left: 0; right: 0;
            height: 2px;
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.4s ease;
          }
          .for-card:hover .card-top-line {
            transform: scaleX(1);
          }
          .card-number {
            position: absolute;
            bottom: 1.2rem;
            right: 1.5rem;
            font-size: 4rem;
            font-weight: 900;
            color: rgba(255,255,255,0.03);
            font-family: var(--font-display);
            line-height: 1;
            transition: color 0.3s;
          }
          .for-card:hover .card-number {
            color: rgba(255,193,7,0.07);
          }
        `}</style>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}
          ref={el => {
            if (!el) return
            const cards = el.querySelectorAll('.for-card')
            const obs = new IntersectionObserver((entries) => {
              entries.forEach(e => {
                if (e.isIntersecting) {
                  const idx = [...cards].indexOf(e.target)
                  setTimeout(() => e.target.classList.add('card-visible'), idx * 150)
                }
              })
            }, { threshold: 0.15 })
            cards.forEach(c => obs.observe(c))
          }}>
          {[
            { icon: '🎓', label: 'Students & Freshers', desc: 'Kickstart your career with job-ready digital marketing skills that top companies actually hire for.', color: '#FFC107' },
            { icon: '💼', label: 'Working Professionals', desc: 'Upskill, switch roles, or get promoted with real performance marketing expertise.', color: '#4facfe' },
            { icon: '🏢', label: 'Business Owners', desc: 'Run your own Google & Meta campaigns confidently — no agency dependency, full control.', color: '#a78bfa' },
          ].map((c, i) => (
            <div key={i} className="for-card"
              onMouseEnter={e => { e.currentTarget.style.borderColor = c.color + '66' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}>
              <div className="card-shine" />
              <div className="card-top-line" style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }} />
              <div className="card-number">{String(i + 1).padStart(2, '0')}</div>
              <div className="card-icon">{c.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.8rem', color: 'var(--white)' }}>{c.label}</h3>
              <p style={{ color: 'var(--muted)', lineHeight: 1.7, fontSize: '0.95rem' }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── CURRICULUM ─────────────────────────────────────────────── */
function Curriculum() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)

  const tracks = [
    {
      label: '🎓 Career Track',
      items: [
        'Job-Ready Performance Marketing Skills',
        'AI Tools for Digital Marketers',
        'Google Ads — Search, Display, YouTube, PMax',
        'Meta Ads — Facebook & Instagram',
        'Media Planning & Budget Allocation',
        'Audience Research & Funnel Strategy',
        'Campaign Structure & Optimization',
        'Performance Reporting & Data Interpretation',
      ]
    },
    {
      label: '💼 Business Track',
      items: [
        'Setting Up Business Ad Accounts (Google & Meta)',
        'Set Up & Run Your Own Ad Campaigns',
        'AI Tools for Image and Video Editing',
        'Shopping Campaigns Setup',
        'Ad Creatives & Messaging Strategy',
        'Retargeting & Customer Nurturing',
        'Scaling Profitable Campaigns',
      ]
    }
  ]

  const switchTab = (i) => {
    setActive(i)
    setAnimKey(k => k + 1)
  }

  return (
    <section style={{ padding: 'clamp(4rem, 8vw, 8rem) 5vw', background: 'var(--bg)' }}>
      <style>{`
        @keyframes itemIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .curr-item { animation: itemIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '3rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', display: 'block', marginBottom: '1rem' }}>Curriculum</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 0.95 }}>
            What you'll<br /><span style={{ color: 'var(--orange)' }}>master</span>
          </h2>
        </div>

        <div className="reveal" style={{ display: 'flex', gap: '0.8rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {tracks.map((t, i) => (
            <button key={i} onClick={() => switchTab(i)} style={{
              background: active === i ? 'var(--orange)' : 'var(--surface)',
              color: active === i ? 'white' : 'var(--muted)',
              border: `1px solid ${active === i ? 'var(--orange)' : 'var(--border)'}`,
              padding: '0.6rem 1.5rem', borderRadius: '8px',
              fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '0.88rem',
              cursor: 'pointer', letterSpacing: '0.03em',
              transition: 'all 0.25s',
              boxShadow: active === i ? '0 0 30px var(--orange-glow)' : 'none',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        <div key={animKey} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: '1rem' }}>
          {tracks[active].items.map((item, i) => (
            <div key={i} className="curr-item" data-hover style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px',
              padding: '1.1rem 1.4rem',
              transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
              animationDelay: `${i * 0.06}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,92,26,0.4)'; e.currentTarget.style.transform = 'translateX(6px)'; e.currentTarget.style.boxShadow = '-4px 0 20px rgba(255,92,26,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; e.currentTarget.style.boxShadow = 'none' }}>
              <span style={{ color: 'var(--orange)', fontSize: '0.78rem', fontWeight: 900, flexShrink: 0, minWidth: '24px' }}>0{i + 1}</span>
              <span style={{ fontSize: '0.95rem', color: 'var(--white)', fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── COMPARISON ─────────────────────────────────────────────── */
function Comparison() {
  const rows = [
    ['Training Style', '✓ Practical, hands-on live training', 'Mostly theory-based'],
    ['Content', '✓ Live platform + new-age tools', 'Recorded / outdated modules'],
    ['Trainer', '✓ 12+ years real agency experience', 'Limited agency exposure'],
    ['Curriculum', '✓ Industry-aligned, always updated', 'Generic syllabus'],
    ['Campaigns', '✓ Real campaign breakdowns', 'Limited real exposure'],
    ['Career Support', '✓ Structured job prep & interview training', 'Empty placement promises'],
  ]

  return (
    <section id="results" style={{ padding: 'clamp(4rem, 8vw, 8rem) 5vw', background: 'var(--surface)' }}>
      <style>{`
        .comp-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 1.6rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          overflow: hidden;
          transition: border-color 0.3s, transform 0.3s;
        }
        .comp-card:hover {
          border-color: rgba(255,193,7,0.3);
          transform: translateY(-3px);
        }
        .comp-label {
          grid-column: 1 / -1;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 1.2rem;
          padding-bottom: 0.8rem;
          border-bottom: 1px solid var(--border);
        }
        .comp-us {
          padding: 1rem 1.2rem;
          background: rgba(255,193,7,0.06);
          border-radius: 10px 0 0 10px;
          border: 1px solid rgba(255,193,7,0.15);
        }
        .comp-them {
          padding: 1rem 1.2rem;
          background: rgba(255,255,255,0.02);
          border-radius: 0 10px 10px 0;
          border: 1px solid var(--border);
          border-left: none;
        }
        .comp-col-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }
        .comp-col-text {
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.5;
        }
        .comp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 440px), 1fr));
          gap: 1rem;
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '3.5rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', display: 'block', marginBottom: '1rem' }}>Why Choose Us</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 0.95 }}>
            What makes us<br /><span style={{ color: 'var(--orange)' }}>different</span>
          </h2>
        </div>

        {/* Column headers */}
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0', maxWidth: '440px', marginBottom: '1rem', marginLeft: 'auto', marginRight: '0' }}>
          <div style={{ textAlign: 'center', padding: '0.5rem', fontSize: '0.72rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--orange)' }}>DigitalWithChirag</div>
          <div style={{ textAlign: 'center', padding: '0.5rem', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>Others</div>
        </div>

        <div className="comp-grid reveal">
          {rows.map(([label, us, them], i) => (
            <div key={i} className="comp-card">
              <div className="comp-label">{label}</div>
              <div className="comp-us">
                <div className="comp-col-label" style={{ color: 'var(--orange)' }}>✦ Us</div>
                <div className="comp-col-text" style={{ color: '#ffcf60' }}>{us.replace('✓ ', '')}</div>
              </div>
              <div className="comp-them">
                <div className="comp-col-label" style={{ color: 'rgba(240,237,232,0.3)' }}>✗ Others</div>
                <div className="comp-col-text" style={{ color: 'rgba(240,237,232,0.3)' }}>{them}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
       

/* ─── OUTCOMES ───────────────────────────────────────────────── */
function Outcomes() {
  const outcomes = [
    { icon: '🚀', text: 'Launch and optimize live ad campaigns confidently' },
    { icon: '💡', text: 'Crack digital marketing interviews' },
    { icon: '📁', text: 'Build a professional marketing portfolio' },
    { icon: '📊', text: 'Plan budgets like an agency professional' },
    { icon: '📈', text: 'Scale campaigns using data' },
    { icon: '🏪', text: 'Run your own business ads independently' },
  ]
  return (
    <section style={{ padding: '8rem 5vw', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', display: 'block', marginBottom: '1rem' }}>After Completing This Program</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.2rem, 4vw, 4rem)', lineHeight: 0.95 }}>
            You will be<br /><span style={{ color: 'var(--orange)' }}>unstoppable</span>
          </h2>
        </div>
        <div className="stagger-children" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.2rem' }}>
          {outcomes.map((o, i) => (
            <div key={i} data-hover style={{
              display: 'flex', alignItems: 'center', gap: '1.2rem',
              padding: '1.5rem', background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)',
              transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(255,92,26,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,92,26,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'var(--border)' }}>
              <span style={{ fontSize: '1.8rem', flexShrink: 0 }}>{o.icon}</span>
              <span style={{ fontSize: '0.97rem', fontWeight: 500, color: 'var(--white)', lineHeight: 1.5 }}>{o.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── ABOUT ──────────────────────────────────────────────────── */
function About() {
  const agencies = ['Publicis', 'WPP', 'Havas', 'Omnicom', 'IPG']
  return (
    <section id="about" style={{ padding: '8rem 5vw', background: 'var(--surface)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%)', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,92,26,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="about-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Avatar side */}
        <div className="reveal-left">
          <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
            {/* Spinning ring */}
            <div style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', border: '1px dashed rgba(255,92,26,0.2)', animation: 'spin-slow 20s linear infinite' }} />
            <div style={{ position: 'absolute', inset: '-40px', borderRadius: '50%', border: '1px dashed rgba(255,92,26,0.1)', animation: 'spin-slow 30s linear infinite reverse' }} />

            <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px', aspectRatio: '1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 0%, rgba(255,92,26,0.1), transparent 60%)' }} />
              <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>👨‍💼</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--white)' }}>Chirag Atreja</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--orange)', fontWeight: 600, marginTop: '0.3rem' }}>Digital Marketing Expert</div>
              {/* Pulse rings */}
              <div style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', width: '8px', height: '8px' }}>
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--orange)', animation: 'pulse-ring 2s ease-out infinite' }} />
                <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--orange)' }} />
              </div>
            </div>

            {/* Floating badge */}
            <div style={{ position: 'absolute', bottom: '-15px', right: '-15px', background: 'var(--orange)', borderRadius: '12px', padding: '0.8rem 1.2rem', boxShadow: '0 10px 40px var(--orange-glow)', animation: 'float 4s ease-in-out infinite' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', lineHeight: 1 }}>12+</div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Years Exp.</div>
            </div>
          </div>
        </div>

        {/* Text side */}
        <div className="reveal-right">
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', display: 'block', marginBottom: '1rem' }}>About Chirag</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', lineHeight: 0.95, marginBottom: '2rem' }}>
            Real agency.<br /><span style={{ color: 'var(--orange)' }}>Real results.</span>
          </h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.2rem' }}>
            With over 12 years of hands-on experience in digital marketing, Chirag has worked with global agency networks managing high-impact campaigns for leading brands across industries.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '2rem' }}>
            Over the years, he has also helped startups set up their digital presence and launch scalable marketing campaigns from the ground up.
          </p>
          <blockquote style={{ borderLeft: '3px solid var(--orange)', paddingLeft: '1.5rem', marginBottom: '2.5rem', fontStyle: 'italic', color: 'rgba(240,237,232,0.75)', fontSize: '1.05rem', lineHeight: 1.7 }}>
            "After years of working inside top global agencies, I realized most courses don't prepare students for real client expectations. DigitalWithChirag was built to change that."
          </blockquote>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>Agency Networks Worked With</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {agencies.map(a => (
                <span key={a} data-hover style={{
                  background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '6px',
                  padding: '0.4rem 0.9rem', fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.06em',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                  onMouseEnter={e => { e.target.style.borderColor = 'var(--orange)'; e.target.style.color = 'var(--orange)' }}
                  onMouseLeave={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.color = 'var(--white)' }}>
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── CTA ────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section id="contact" style={{ padding: '10rem 5vw', background: 'var(--bg)', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,92,26,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

      <div className="reveal" style={{ position: 'relative' }}>
        <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--orange)', display: 'block', marginBottom: '1.5rem' }}>Ready to Transform Your Career?</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(3rem, 6vw, 7rem)', lineHeight: 0.9, marginBottom: '2rem' }}>
          START YOUR<br /><span style={{ color: 'var(--orange)', textShadow: '0 0 120px rgba(255,92,26,0.5)' }}>JOURNEY</span><br />TODAY
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem' }}>
          Join DigitalWithChirag and build the skills that top companies actually hire for.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:hello@digitalwithchirag.com" style={{
            background: 'var(--orange)', color: 'white', padding: '1.1rem 2.5rem', borderRadius: '8px',
            textDecoration: 'none', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.06em', textTransform: 'uppercase',
            boxShadow: '0 0 60px var(--orange-glow)', display: 'inline-block', transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-4px) scale(1.02)'; e.target.style.boxShadow = '0 20px 80px var(--orange-glow)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0) scale(1)'; e.target.style.boxShadow = '0 0 60px var(--orange-glow)' }}>
            Enroll Now →
          </a>
          <a href="mailto:hello@digitalwithchirag.com" style={{
            background: 'transparent', color: 'var(--white)', border: '1px solid rgba(255,255,255,0.2)',
            padding: '1.1rem 2.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem',
            display: 'inline-block', transition: 'border-color 0.2s, background 0.2s',
          }}
            onMouseEnter={e => { e.target.style.borderColor = 'rgba(255,255,255,0.5)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
            onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.background = 'transparent' }}>
            Book Free Consultation
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: '#030305', borderTop: '1px solid var(--border)', padding: '2.5rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1rem', color: 'var(--muted)' }}>
        Digital<span style={{ color: 'var(--orange)' }}>With</span>Chirag
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a href="https://www.instagram.com/digitalwithchiragofficial" target="_blank" rel="noreferrer" style={{ color: 'rgba(240,237,232,0.35)', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#E1306C'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,232,0.35)'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a href="https://www.facebook.com/share/18MMTKLM7r/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={{ color: 'rgba(240,237,232,0.35)', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#1877F2'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,232,0.35)'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
        </a>
        <a href="https://wa.me/919311048234" target="_blank" rel="noreferrer" style={{ color: 'rgba(240,237,232,0.35)', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#25D366'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,237,232,0.35)'}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
      <span style={{ fontSize: '0.82rem', color: 'rgba(240,237,232,0.25)' }}>
        © 2025 DigitalWithChirag. All rights reserved.
      </span>
    </footer>
  )
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function App() {
  useReveal()
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <Marquee />
      <FounderCarousel />
      <ForWhom />
      <Curriculum />
      <Comparison />
      <Outcomes />
      <About />
      <CTA />
      <Footer />
    </>
  )
}
