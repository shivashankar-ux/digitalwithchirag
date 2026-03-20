import { useEffect, useRef, useState } from "react";

/* ─── SCROLL REVEAL HOOK ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(
      ".reveal, .reveal-left, .reveal-right, .stagger-children",
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

/* ─── NAV ────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const igSvg = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
  const fbSvg = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
  const waSvg = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );

  return (
    <>
      <style>{`
        .nav-desktop { display: flex; align-items: center; gap: 2rem; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .hamburger span { display: block; width: 24px; height: 2px; background: var(--white); border-radius: 2px; transition: all 0.3s ease; }
        .hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
        .mobile-menu {
          display: none; position: fixed; top: 70px; left: 0; right: 0;
          background: rgba(5,5,8,0.97); backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding: 1.5rem 5vw 2rem; flex-direction: column; gap: 0;
          z-index: 499;
          animation: slideDown 0.3s cubic-bezier(0.16,1,0.3,1) both;
        }
        .mobile-menu.open { display: flex; }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mobile-nav-link {
          color: var(--muted); font-size: 1rem; text-decoration: none;
          font-weight: 500; padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: color 0.2s; display: block;
        }
        .mobile-nav-link:hover { color: var(--white); }
        .mobile-socials { display: flex; gap: 1.2rem; align-items: center; padding-top: 1.2rem; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, padding: "0 5vw", height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled || menuOpen ? "rgba(5,5,8,0.95)" : "transparent", backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none", borderBottom: scrolled || menuOpen ? "1px solid rgba(255,255,255,0.05)" : "none", transition: "all 0.4s ease" }}>
        <a href="#" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.2rem", color: "var(--white)", textDecoration: "none", letterSpacing: "0.02em" }}>
          Digital<span style={{ color: "var(--orange)" }}>With</span>Chirag
        </a>
        <div className="nav-desktop">
          {["Course", "About Us", "Blogs"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: "var(--muted)", fontSize: "0.88rem", textDecoration: "none", letterSpacing: "0.05em", fontWeight: 500, transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.target.style.color = "var(--white)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}>{l}</a>
          ))}
          <a href="https://www.instagram.com/digitalwithchirag_" target="_blank" rel="noreferrer" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.2s", display: "flex" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1306C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}>{igSvg}</a>
          <a href="https://www.facebook.com/share/18MMTKLM7r/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={{ color: "var(--muted)", textDecoration: "none", transition: "color 0.2s", display: "flex" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1877F2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}>{fbSvg}</a>
          <a href="https://wa.me/919311048234" target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#25D366", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", textDecoration: "none", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.04em", transition: "box-shadow 0.2s, transform 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 20px rgba(37,211,102,0.4)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
            {waSvg} Consult Now
          </a>
        </div>
        <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {["Course", "About Us", "Blogs"].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} className="mobile-nav-link" onClick={closeMenu}>{l}</a>
        ))}
        <a href="#contact" className="mobile-nav-link" onClick={closeMenu} style={{ color: "var(--orange)", fontWeight: 700 }}>Book Free Call</a>
        <div className="mobile-socials">
          <a href="https://www.instagram.com/digitalwithchirag_" target="_blank" rel="noreferrer" style={{ color: "var(--muted)", display: "flex", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1306C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}>{igSvg}</a>
          <a href="https://www.facebook.com/share/18MMTKLM7r/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={{ color: "var(--muted)", display: "flex", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1877F2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}>{fbSvg}</a>
          <a href="https://wa.me/919311048234" target="_blank" rel="noreferrer"
            style={{ display: "flex", alignItems: "center", gap: "0.4rem", background: "#25D366", color: "white", padding: "0.5rem 1rem", borderRadius: "4px", textDecoration: "none", fontWeight: 700, fontSize: "0.82rem" }}>
            {waSvg} Consult Now
          </a>
        </div>
      </div>
    </>
  );
}

/* ─── MARQUEE ────────────────────────────────────────────────── */
function Marquee() {
  const items = ["Google Ads", "Meta Ads", "Performance Marketing", "AI Tools", "Campaign Strategy", "Media Planning", "YouTube Ads", "Funnel Strategy", "Data & Analytics", "Agency Training"];
  const all = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "0.8rem 0", background: "var(--surface)" }}>
      <div style={{ display: "flex", animation: "marquee 22s linear infinite", width: "max-content" }}>
        {all.map((item, i) => (
          <span key={i} style={{ whiteSpace: "nowrap", padding: "0 2.5rem", fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: i % 2 === 0 ? "var(--muted)" : "var(--orange)" }}>
            {item} {i % 2 === 0 ? "◆" : "◇"}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCount((c) => (c < 12 ? c + 1 : 12)), 80);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 5vw", paddingTop: "70px", paddingBottom: "2rem", position: "relative", overflow: "hidden" }}>
      <style>{`
        @keyframes borderGlow {
          0%, 100% { opacity: 0.5; } 50% { opacity: 1; }
        }
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.6; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); } to { transform: rotate(360deg); }
        }
        @keyframes mentorSlideIn {
          from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmerMove {
          0% { left: -60%; } 100% { left: 120%; }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); }
        }

        /* ── Hero layout ── */
        .hero-outer {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
          align-items: center;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 1.4rem;
        }
        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        /* ── Top badge ── */
        .hero-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255,92,26,0.08);
          border: 1px solid rgba(255,92,26,0.25);
          border-radius: 100px;
          padding: 0.5rem 1.1rem;
          width: fit-content;
          animation: heroFadeUp 0.6s ease 0.1s both;
        }
        .hero-pill-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--orange);
          box-shadow: 0 0 8px var(--orange);
          flex-shrink: 0;
        }
        .hero-pill-text {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: var(--orange);
        }

        /* ── Headline ── */
        .hero-headline {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(3rem, 6vw, 5.5rem);
          line-height: 0.88;
          letter-spacing: -0.03em;
          margin: 0;
          animation: heroFadeUp 0.7s ease 0.2s both;
        }
        .hero-headline .line-orange {
          color: var(--orange);
          text-shadow: 0 0 80px rgba(255,92,26,0.35);
          display: block;
        }
        .hero-headline .line-white {
          color: var(--white);
          display: block;
        }

        /* ── USP tags (inline, compact) ── */
        .hero-usp-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          animation: heroFadeUp 0.7s ease 0.35s both;
        }
        .hero-usp-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: rgba(240,237,232,0.75);
          font-weight: 500;
        }
        .hero-usp-item::before {
          content: '';
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--orange);
          flex-shrink: 0;
        }

        /* ── CTA button ── */
        .hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--orange);
          color: white;
          padding: 0.9rem 2rem;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 700;
          font-size: 0.9rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          box-shadow: 0 0 40px var(--orange-glow);
          transition: transform 0.2s, box-shadow 0.2s;
          width: fit-content;
          animation: heroFadeUp 0.7s ease 0.5s both;
        }
        .hero-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 50px var(--orange-glow);
        }

        /* ── Mentor card — horizontal desktop, vertical mobile ── */
        .mentor-card {
          display: flex;
          flex-direction: row;
          background: rgba(10,10,16,0.95);
          border: 1px solid rgba(255,193,7,0.2);
          border-radius: 20px;
          overflow: hidden;
          animation: mentorSlideIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both;
          transition: box-shadow 0.3s, border-color 0.3s;
        }
        .mentor-card:hover {
          box-shadow: 0 24px 64px rgba(255,193,7,0.12);
          border-color: rgba(255,193,7,0.4);
        }
        /* Photo side */
        .mentor-photo-top {
          width: 160px;
          flex-shrink: 0;
          position: relative;
          overflow: hidden;
          border-radius: 0;
          min-height: 220px;
        }
        .mentor-photo-top img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 25%;
          display: block;
        }
        .mentor-photo-top::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, transparent 60%, rgba(10,10,16,0.6));
          pointer-events: none;
        }
        /* Online dot on photo */
        .online-dot {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 12px; height: 12px;
          background: #25D366;
          border-radius: 50%;
          border: 2px solid rgba(10,10,16,1);
          z-index: 2;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        /* Info side */
        .mentor-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          padding: 1.2rem 1.2rem 1.2rem 1rem;
          min-width: 0;
        }
        .mentor-name-row {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          flex-wrap: wrap;
        }
        .mentor-name {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--white);
        }
        .mentor-yrs-badge {
          background: rgba(255,193,7,0.12);
          border: 1px solid rgba(255,193,7,0.35);
          border-radius: 100px;
          padding: 0.15rem 0.6rem;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--orange);
          letter-spacing: 0.05em;
          white-space: nowrap;
        }
        .mentor-role {
          font-size: 0.68rem;
          color: rgba(240,237,232,0.35);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          margin-top: -0.2rem;
        }
        .mentor-divider {
          height: 1px;
          background: rgba(255,255,255,0.06);
        }
        .agency-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.28rem;
          align-items: center;
        }
        .agency-label {
          font-size: 0.58rem;
          color: rgba(240,237,232,0.28);
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          width: 100%;
          margin-bottom: 0.1rem;
        }
        .agency-badge {
          font-size: 0.62rem;
          font-weight: 700;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 100px;
          padding: 0.15rem 0.48rem;
          color: rgba(240,237,232,0.6);
          letter-spacing: 0.04em;
          transition: all 0.2s;
          cursor: default;
          white-space: nowrap;
        }
        .agency-badge:hover {
          background: rgba(255,193,7,0.1);
          border-color: rgba(255,193,7,0.35);
          color: var(--orange);
        }
        .campaign-stat {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--orange);
          background: rgba(255,193,7,0.07);
          border: 1px solid rgba(255,193,7,0.2);
          border-radius: 8px;
          padding: 0.28rem 0.75rem;
          width: fit-content;
        }
        .industry-tag {
          font-size: 0.62rem;
          font-weight: 600;
          background: rgba(255,92,26,0.08);
          border: 1px solid rgba(255,92,26,0.22);
          border-radius: 100px;
          padding: 0.15rem 0.48rem;
          color: rgba(240,237,232,0.75);
          transition: all 0.2s;
          white-space: nowrap;
        }
        .industry-tag:hover {
          background: rgba(255,92,26,0.18);
          color: var(--white);
        }
        /* Mobile — vertical: photo on top, info below */
        @media (max-width: 600px) {
          .mentor-card {
            flex-direction: column;
          }
          .mentor-photo-top {
            width: 100%;
            height: 260px;
          }
          .mentor-photo-top img {
            object-fit: cover;
            object-position: center center;
            transform: none;
          }
          .mentor-photo-top::after {
            background: linear-gradient(to bottom, transparent 50%, rgba(10,10,16,0.7));
          }
          .mentor-info {
            padding: 1.1rem;
            gap: 0.5rem;
          }
          .mentor-name { font-size: 1rem; }
        }
        .hero-badge-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
          animation: heroFadeUp 0.7s ease 0.3s both;
        }
        .hero-stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.2rem 1rem;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .hero-stat-card:hover {
          border-color: rgba(255,92,26,0.4);
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(255,92,26,0.1);
        }

        /* ── Mobile ── */
        @media (max-width: 768px) {
          .hero-outer {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .hero-headline { font-size: clamp(2.8rem, 10vw, 4rem); }
          .hero-right { flex-direction: column; }
          .mentor-card { max-width: 100%; }
          .avatar-img { width: 88px; height: 88px; }
          .hero-badge-grid { gap: 0.7rem; }
          .hero-stat-card { padding: 1rem 0.85rem; }
        }
      `}</style>

      {/* Background elements */}
      <div style={{ position: "absolute", top: "20%", right: "5%", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,92,26,0.1) 0%, transparent 70%)", pointerEvents: "none", animation: "float 8s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)", pointerEvents: "none", animation: "float 10s ease-in-out infinite 2s" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

      <div className="hero-outer">
        {/* ── LEFT COLUMN ── */}
        <div className="hero-left">
          {/* Top pill */}
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            <span className="hero-pill-text">Industry-Level Training · AI-Powered Skills</span>
          </div>

          {/* Big headline */}
          <h1 className="hero-headline">
            <span className="line-orange">DIGITAL</span>
            <span className="line-white">MARKETING</span>
            <span style={{ display: "block", fontSize: "clamp(1rem, 2vw, 1.6rem)", fontWeight: 600, color: "rgba(240,237,232,0.45)", letterSpacing: "0.02em", marginTop: "0.5rem", fontFamily: "var(--font-body)" }}>
              Training that gets you hired.
            </span>
          </h1>

          {/* USP points */}
          <div className="hero-usp-row">
            {[
              "Build job-ready skills companies actually hire for",
              "Run & scale your own digital marketing campaigns",
              "Learn from 12+ years of real agency experience",
            ].map((t, i) => (
              <div key={i} className="hero-usp-item">{t}</div>
            ))}
          </div>

          {/* CTA */}
          <a href="https://wa.me/919311048234" target="_blank" rel="noreferrer" className="hero-cta">
            Start Learning →
          </a>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="hero-right">
          {/* Mentor card — photo left on desktop, top on mobile */}
          <div className="mentor-card">
            <div className="mentor-photo-top">
              <img src="/chirag-2.jpg" alt="Chirag Atreja" />
              <div className="online-dot" />
            </div>
            <div className="mentor-info">
              <div className="mentor-name-row">
                <span className="mentor-name">Chirag Atreja</span>
                <span className="mentor-yrs-badge">⚡ {count}+ YRS</span>
              </div>
              <div className="mentor-role">Digital Marketing Expert</div>
              <div className="mentor-divider" />
              <div className="agency-row">
                <span className="agency-label">Worked at</span>
                {["WPP", "IPG", "Publicis", "Omnicom", "Havas"].map((a) => (
                  <span key={a} className="agency-badge">{a}</span>
                ))}
              </div>
              <span className="campaign-stat">💰 Handled ₹100 Cr+ Campaigns</span>
              <div className="mentor-divider" />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.28rem" }}>
                {["Automobile", "Telecom", "FMCG", "Ecommerce"].map((tag) => (
                  <span key={tag} className="industry-tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 4 stat cards — 2x2 */}
          <div className="hero-badge-grid">
            {[
              { icon: "📅", title: "2 +1 Months", sub: "Course + Internship" },
              { icon: "🎯", title: "Live Classes", sub: "Real-time learning" },
              { icon: "💼", title: "100%", sub: "Job Assistance" },
              { icon: "🤖", title: "AI Tools", sub: "Included in curriculum" },
            ].map((s, i) => (
              <div key={i} className="hero-stat-card">
                <div style={{ fontSize: "1.4rem", marginBottom: "0.4rem" }}>{s.icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.15rem", color: "var(--white)" }}>{s.title}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--muted)", marginTop: "0.15rem" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



/* ─── FOR WHOM ───────────────────────────────────────────────── */
function ForWhom() {
  return (
    <section id="program" style={{ padding: "5rem 5vw", background: "var(--surface)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", display: "block", marginBottom: "1rem" }}>Who Is This For</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 4rem)", lineHeight: 0.95 }}>
            Digital Marketing is<br /><span style={{ color: "var(--orange)" }}>everywhere. Are you?</span>
          </h2>
        </div>
        <style>{`
          @keyframes cardGlow { 0%, 100% { box-shadow: 0 0 20px rgba(255,193,7,0); } 50% { box-shadow: 0 0 40px rgba(255,193,7,0.15); } }
          .for-card { background: var(--bg); border: 1px solid var(--border); border-radius: 16px; padding: 2.5rem; position: relative; overflow: hidden; transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.4s; cursor: default; opacity: 0; transform: translateY(40px); }
          .for-card.card-visible { opacity: 1; transform: translateY(0); }
          .for-card:hover { transform: translateY(-10px) scale(1.02); animation: cardGlow 2s ease-in-out infinite; }
          .for-card .card-icon { font-size: 2.5rem; margin-bottom: 1.5rem; display: inline-block; transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1); }
          .for-card:hover .card-icon { transform: scale(1.3) rotate(-8deg); }
          .card-shine { position: absolute; top: -50%; left: -60%; width: 40%; height: 200%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent); transform: skewX(-15deg); transition: left 0.6s ease; pointer-events: none; }
          .for-card:hover .card-shine { left: 120%; }
          .card-top-line { position: absolute; top: 0; left: 0; right: 0; height: 2px; transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease; }
          .for-card:hover .card-top-line { transform: scaleX(1); }
          .card-number { position: absolute; bottom: 1.2rem; right: 1.5rem; font-size: 4rem; font-weight: 900; color: rgba(255,255,255,0.03); font-family: var(--font-display); line-height: 1; transition: color 0.3s; }
          .for-card:hover .card-number { color: rgba(255,193,7,0.07); }
        `}</style>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}
          ref={(el) => {
            if (!el) return;
            const cards = el.querySelectorAll(".for-card");
            const obs = new IntersectionObserver((entries) => {
              entries.forEach((e) => { if (e.isIntersecting) { const idx = [...cards].indexOf(e.target); setTimeout(() => e.target.classList.add("card-visible"), idx * 150); } });
            }, { threshold: 0.15 });
            cards.forEach((c) => obs.observe(c));
          }}>
          {[
            { color: "#FFC107", label: "Students & Freshers", desc: "Kickstart your career with job-ready digital marketing skills that top companies actually hire for.", svg: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="rgba(255,193,7,0.12)" /><path d="M24 13L36 19.5V26C36 32.075 30.627 37.725 24 39C17.373 37.725 12 32.075 12 26V19.5L24 13Z" stroke="#FFC107" strokeWidth="1.8" fill="rgba(255,193,7,0.08)" strokeLinejoin="round" /><path d="M19 25l3.5 3.5L29 22" stroke="#FFC107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>), tag: "CAREER STARTER" },
            { color: "#4facfe", label: "Working Professionals", desc: "Upskill, switch roles, or get promoted with real performance marketing expertise.", svg: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="rgba(79,172,254,0.12)" /><rect x="13" y="20" width="22" height="16" rx="3" stroke="#4facfe" strokeWidth="1.8" fill="rgba(79,172,254,0.08)" /><path d="M19 20v-3a2 2 0 012-2h6a2 2 0 012 2v3" stroke="#4facfe" strokeWidth="1.8" strokeLinecap="round" /><path d="M13 27h22" stroke="#4facfe" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2" /><circle cx="24" cy="27" r="2" fill="#4facfe" /></svg>), tag: "UPSKILL & GROW" },
            { color: "#a78bfa", label: "Business Owners", desc: "Run your own Google & Meta campaigns confidently — no agency dependency, full control.", svg: (<svg width="48" height="48" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" rx="14" fill="rgba(167,139,250,0.12)" /><path d="M16 34V24M24 34V18M32 34V27" stroke="#a78bfa" strokeWidth="2.2" strokeLinecap="round" /><circle cx="16" cy="21" r="2.5" fill="rgba(167,139,250,0.2)" stroke="#a78bfa" strokeWidth="1.5" /><circle cx="24" cy="15" r="2.5" fill="rgba(167,139,250,0.2)" stroke="#a78bfa" strokeWidth="1.5" /><circle cx="32" cy="24" r="2.5" fill="rgba(167,139,250,0.2)" stroke="#a78bfa" strokeWidth="1.5" /><path d="M18 20l4-3.5M26.2 16l4 6.5" stroke="#a78bfa" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 1.5" /></svg>), tag: "SCALE YOUR BIZ" },
          ].map((c, i) => (
            <div key={i} className="for-card"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.color + "66"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}>
              <div className="card-shine" />
              <div className="card-top-line" style={{ background: `linear-gradient(90deg, transparent, ${c.color}, transparent)` }} />
              <div className="card-number">{String(i + 1).padStart(2, "0")}</div>
              <div className="card-icon">{c.svg}</div>
              <div style={{ display: "inline-block", background: c.color + "18", border: `1px solid ${c.color}44`, borderRadius: "100px", padding: "0.2rem 0.7rem", marginBottom: "0.8rem" }}>
                <span style={{ fontSize: "0.62rem", fontWeight: 800, letterSpacing: "0.15em", color: c.color }}>{c.tag}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.3rem", marginBottom: "0.8rem", color: "var(--white)" }}>{c.label}</h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7, fontSize: "0.95rem" }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CURRICULUM ─────────────────────────────────────────────── */
function Curriculum() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const tracks = [
    { label: "🎓 Career Track", items: ["Job-Ready Performance Marketing Skills", "AI Tools for Digital Marketers", "Google Ads — Search, Display, YouTube, PMax", "Meta Ads — Facebook & Instagram", "Media Planning & Budget Allocation", "Audience Research & Funnel Strategy", "Campaign Structure & Optimization", "Performance Reporting & Data Interpretation"] },
    { label: "💼 Business Track", items: ["Setting Up Business Ad Accounts (Google & Meta)", "Set Up & Run Your Own Ad Campaigns", "AI Tools for Image and Video Editing", "Shopping Campaigns Setup", "Ad Creatives & Messaging Strategy", "Retargeting & Customer Nurturing", "Scaling Profitable Campaigns"] },
  ];
  const switchTab = (i) => { setActive(i); setAnimKey((k) => k + 1); };
  useEffect(() => {
    const t = setInterval(() => { setActive((a) => { const next = (a + 1) % tracks.length; setAnimKey((k) => k + 1); return next; }); }, 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ padding: "clamp(4rem, 8vw, 8rem) 5vw", background: "var(--bg)" }}>
      <style>{`
        @keyframes itemIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .curr-item { animation: itemIn 0.4s cubic-bezier(0.16,1,0.3,1) both; }
      `}</style>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "3rem" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", display: "block", marginBottom: "1rem" }}>Curriculum</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 4rem)", lineHeight: 0.95 }}>
            What you'll<br /><span style={{ color: "var(--orange)" }}>master</span>
          </h2>
        </div>
        <div className="reveal" style={{ display: "flex", gap: "0.8rem", marginBottom: "2.5rem", flexWrap: "wrap" }}>
          {tracks.map((t, i) => (
            <button key={i} onClick={() => switchTab(i)} style={{ background: active === i ? "var(--orange)" : "var(--surface)", color: active === i ? "white" : "var(--muted)", border: `1px solid var(--orange)`, padding: "0.6rem 1.5rem", borderRadius: "8px", fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", letterSpacing: "0.03em", transition: "all 0.25s", boxShadow: active === i ? "0 0 30px var(--orange-glow)" : "none" }}>
              {t.label}
            </button>
          ))}
        </div>
        <div key={animKey} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))", gap: "1rem" }}>
          {tracks[active].items.map((item, i) => (
            <div key={i} className="curr-item" data-hover
              style={{ display: "flex", alignItems: "center", gap: "1rem", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1.1rem 1.4rem", transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s", animationDelay: `${i * 0.06}s` }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,92,26,0.4)"; e.currentTarget.style.transform = "translateX(6px)"; e.currentTarget.style.boxShadow = "-4px 0 20px rgba(255,92,26,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}>
              <span style={{ color: "var(--orange)", fontSize: "0.78rem", fontWeight: 900, flexShrink: 0, minWidth: "24px" }}>0{i + 1}</span>
              <span style={{ fontSize: "0.95rem", color: "var(--white)", fontWeight: 500 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── TOOLS MARQUEE — real PNG logos, glowing cards ──────────── */
function ToolsMarquee() {
  const tools = [
    { name: "Google Ads",       logo: "/google-ads.png",       color: "79,136,255" },
    { name: "Meta Ads",         logo: "/meta-ads.png",         color: "0,130,251" },
    { name: "YouTube",          logo: "/youtube.png",          color: "255,0,0" },
    { name: "DV360",            logo: "/dv360.png",            color: "52,168,83" },
    { name: "Google Analytics", logo: "/google-analytics.png", color: "249,171,0" },
    { name: "ChatGPT",          logo: "/chatgpt-logo.png",     color: "255,255,255" },
    { name: "Canva",            logo: "/canva.png",            color: "100,100,255" },
    { name: "Comscore",         logo: "/comscore.png",         color: "255,140,0" },
    { name: "GWI",              logo: "/gwi.png",              color: "255,20,147" },
  ];
  const all = [...tools, ...tools];

  return (
    <section style={{ padding: "2.5rem 0", background: "var(--bg)", overflow: "hidden" }}>
      <style>{`
        .tools-track {
          display: flex;
          align-items: center;
          animation: marquee 32s linear infinite;
          width: max-content;
        }
        .tools-track:hover { animation-play-state: paused; }
        .tool-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.55rem;
          margin: 0 0.8rem;
          cursor: default;
        }
        .tool-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255,255,255,0.08);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
          padding: 10px;
          background: rgba(255,255,255,0.04);
        }
        .tool-card:hover .tool-icon-wrap {
          transform: translateY(-5px) scale(1.08);
        }
        .tool-icon-wrap img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
        }
        .tool-card-name {
          font-size: 0.6rem;
          font-weight: 700;
          color: rgba(240,237,232,0.4);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          transition: color 0.3s;
          white-space: nowrap;
        }
        .tool-card:hover .tool-card-name {
          color: rgba(240,237,232,0.85);
        }
        @media (max-width: 600px) {
          .tool-icon-wrap { width: 50px; height: 50px; border-radius: 12px; padding: 8px; }
          .tool-card-name { font-size: 0.52rem; }
          .tool-card { margin: 0 0.55rem; gap: 0.4rem; }
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: "1.8rem" }}>
        <span style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)" }}>
          Platforms & Tools You Will Master
        </span>
      </div>

      <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "1.2rem 0" }}>
        <div className="tools-track">
          {all.map((tool, i) => (
            <div key={i} className="tool-card">
              <div
                className="tool-icon-wrap"
                style={{ boxShadow: `0 4px 20px rgba(${tool.color},0.15)` }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 8px 32px rgba(${tool.color},0.4)`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = `0 4px 20px rgba(${tool.color},0.15)`; }}
              >
                <img src={tool.logo} alt={tool.name} />
              </div>
              <span className="tool-card-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── COMPARISON — Split Card, pure text, no symbols ─────────── */
function Comparison() {
  const rows = [
    ["Practical, hands-on live training", "Mostly theory-based"],
    ["Live platform with new-age AI tools", "Recorded / outdated modules"],
    ["12+ years real agency experience", "Limited agency exposure"],
    ["Industry-aligned, always updated", "Generic syllabus"],
    ["Real campaign breakdowns", "Limited real exposure"],
    ["Structured job prep & interview training", "Empty placement promises"],
  ];

  return (
    <section id="results" style={{ padding: "clamp(4rem, 8vw, 8rem) 5vw", background: "var(--surface)" }}>
      <style>{`
        .split-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .split-table thead tr th {
          padding: 1rem 1.4rem;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .split-table thead tr th:first-child {
          background: rgba(255,92,26,0.12);
          color: var(--orange);
          border-right: 1px solid var(--border);
          width: 50%;
        }
        .split-table thead tr th:last-child {
          background: rgba(255,255,255,0.03);
          color: rgba(240,237,232,0.35);
          width: 50%;
        }
        .split-row td {
          padding: 0.95rem 1.4rem;
          font-size: 0.9rem;
          font-weight: 500;
          line-height: 1.5;
          border-top: 1px solid rgba(255,255,255,0.05);
          vertical-align: middle;
        }
        .split-row td:first-child {
          color: var(--white);
          background: rgba(255,92,26,0.04);
          border-right: 1px solid var(--border);
        }
        .split-row td:last-child {
          color: rgba(240,237,232,0.3);
          background: transparent;
        }
        .split-row:hover td:first-child {
          background: rgba(255,92,26,0.09);
        }
        @media (max-width: 540px) {
          .split-table thead tr th,
          .split-row td {
            padding: 0.8rem 0.9rem;
            font-size: 0.82rem;
          }
        }
      `}</style>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "3.5rem" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", display: "block", marginBottom: "1rem" }}>Why Choose Us</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 4rem)", lineHeight: 0.95 }}>
            What makes us<br /><span style={{ color: "var(--orange)" }}>different</span>
          </h2>
        </div>

        <div className="reveal" style={{ background: "var(--bg)", borderRadius: "16px", overflow: "hidden" }}>
          <table className="split-table">
            <thead>
              <tr>
                <th>DigitalWithChirag</th>
                <th>Others</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([us, them], i) => (
                <tr key={i} className="split-row">
                  <td>{us}</td>
                  <td>{them}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─── OUTCOMES (CHANGE 5: updated content) ───────────────────── */
function Outcomes() {
  const outcomes = [
    { icon: "🚀", text: "Launch Google & Meta ad campaigns" },
    { icon: "⚙️", text: "Optimize Ad Campaigns Confidently" },
    { icon: "💡", text: "Crack digital marketing interviews" },
    { icon: "📊", text: "Plan Budgets like an agency professional" },
    { icon: "📈", text: "Create Reports and Generate Insights" },
    { icon: "🏪", text: "Run digital marketing for your business" },
  ];
  return (
    <section style={{ padding: "5rem 5vw", background: "var(--bg)" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", display: "block", marginBottom: "1rem" }}>After Completing This Program</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.2rem, 4vw, 4rem)", lineHeight: 0.95 }}>
            What You'll Be Able To<br /><span style={{ color: "var(--orange)" }}>Do After This Program</span>
          </h2>
        </div>
        <div className="stagger-children" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.2rem" }}>
          {outcomes.map((o, i) => (
            <div key={i} data-hover
              style={{ display: "flex", alignItems: "center", gap: "1.2rem", padding: "1.5rem", background: "var(--surface)", borderRadius: "12px", border: "1px solid var(--border)", transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 20px 50px rgba(255,92,26,0.1)"; e.currentTarget.style.borderColor = "rgba(255,92,26,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border)"; }}>
              <span style={{ fontSize: "1.8rem", flexShrink: 0 }}>{o.icon}</span>
              <span style={{ fontSize: "0.97rem", fontWeight: 500, color: "var(--white)", lineHeight: 1.5 }}>{o.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT (CHANGE 3: carousel placed here instead of video) ── */
function AboutCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const slides = [
    { image: "/chirag-1.jpg", quote: "I didn't just study digital marketing — I lived it inside the world's top agencies for over a decade.", tag: "12+ Years of Real Agency Experience" },
    { image: "/chirag-2.jpg", quote: "Every campaign I teach, I've actually run. Every tool I show you, I've used on real client budgets.", tag: "Trained by Global Networks — Publicis, WPP, Havas" },
    { image: "/chirag-3.jpg", quote: "DigitalWithChirag exists because the industry needed training that actually prepares you for the real thing.", tag: "Founder, DigitalWithChirag" },
  ];

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setCurrent(index);
    setTimeout(() => setAnimating(false), 500);
  };
  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % 3);
    }, 3000);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <style>{`
        .about-carousel-img {
          opacity: 0;
          transform: scale(1.04);
          transition: opacity 0.5s ease, transform 0.5s ease;
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          pointer-events: none;
        }
        .about-carousel-img.active {
          opacity: 1;
          transform: scale(1);
          z-index: 2;
        }
        .about-carousel-img.inactive {
          opacity: 0;
          z-index: 1;
        }
      `}</style>
      <div style={{ position: "relative", width: "100%", maxWidth: "320px", margin: "0 auto" }}>
        <div style={{ position: "relative", aspectRatio: "3/4", borderRadius: "32px", overflow: "hidden", border: "2px solid var(--border)", boxShadow: "0 0 60px rgba(255,193,7,0.15), 0 40px 80px rgba(0,0,0,0.5)", background: "var(--bg)" }}>
          {slides.map((s, i) => (
            <img
              key={i}
              src={s.image}
              alt={`Chirag Atreja ${i + 1}`}
              className={`about-carousel-img${i === current ? " active" : " inactive"}`}
            />
          ))}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,8,0.85) 0%, transparent 50%)", pointerEvents: "none", zIndex: 3 }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem 1.2rem 3.5rem", zIndex: 4, pointerEvents: "none" }}>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "var(--white)" }}>Chirag Atreja</div>
            <div style={{ fontSize: "0.75rem", color: "var(--orange)", fontWeight: 600, marginTop: "0.2rem" }}>{slides[current].tag}</div>
          </div>
        </div>

        {/* 12+ Years floating badge */}
        <div style={{ position: "absolute", bottom: "-15px", right: "-15px", background: "var(--orange)", borderRadius: "12px", padding: "0.8rem 1.2rem", boxShadow: "0 10px 40px var(--orange-glow)", animation: "float 4s ease-in-out infinite", zIndex: 10 }}>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", lineHeight: 1 }}>12+</div>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>Years Exp.</div>
        </div>

        {/* Carousel controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem", marginTop: "2.5rem" }}>
          <button onClick={prev} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--white)", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, background 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.background = "rgba(255,193,7,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg)"; }}>←</button>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? "24px" : "8px", height: "8px", borderRadius: "100px", background: i === current ? "var(--orange)" : "rgba(255,255,255,0.2)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s ease" }} />
            ))}
          </div>
          <button onClick={next} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--bg)", border: "1px solid var(--border)", color: "var(--white)", fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "border-color 0.2s, background 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--orange)"; e.currentTarget.style.background = "rgba(255,193,7,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg)"; }}>→</button>
        </div>
      </div>
    </div>
  );
}

function About() {
  const agencies = ["Publicis", "WPP", "Havas", "Omnicom", "IPG"];
  return (
    <section id="about" style={{ padding: "5rem 5vw", background: "var(--surface)", position: "relative", overflow: "hidden" }}>
      <style>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }
      `}</style>
      <div style={{ position: "absolute", top: "50%", right: "-10%", transform: "translateY(-50%)", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,92,26,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div className="about-grid">
        <div className="reveal-left">
          <AboutCarousel />
        </div>
        <div className="reveal-right">
          <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", display: "block", marginBottom: "1rem" }}>About Chirag</span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 3.5vw, 3.5rem)", lineHeight: 0.95, marginBottom: "2rem" }}>
            Real agency.<br /><span style={{ color: "var(--orange)" }}>Real results.</span>
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.2rem" }}>
            With over 12 years of hands-on experience in digital marketing, Chirag has worked with global agency networks managing high-impact campaigns for leading brands across industries.
          </p>
          <p style={{ color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
            Over the years, he has also helped startups set up their digital presence and launch scalable marketing campaigns from the ground up.
          </p>
          <blockquote style={{ borderLeft: "3px solid var(--orange)", paddingLeft: "1.5rem", marginBottom: "2.5rem", fontStyle: "italic", color: "rgba(240,237,232,0.75)", fontSize: "1.05rem", lineHeight: 1.7 }}>
            "After years of working inside top global agencies, I realized most courses don't prepare students for real client expectations. DigitalWithChirag was built to change that."
          </blockquote>
          <div>
            <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1rem" }}>Agency Networks Worked With</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {agencies.map((a) => (
                <span key={a} data-hover
                  style={{ background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "6px", padding: "0.4rem 0.9rem", fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.06em", transition: "border-color 0.2s, color 0.2s" }}
                  onMouseEnter={(e) => { e.target.style.borderColor = "var(--orange)"; e.target.style.color = "var(--orange)"; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--white)"; }}>
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section id="contact" style={{ padding: "6rem 5vw", background: "var(--bg)", position: "relative", overflow: "hidden", textAlign: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,92,26,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div className="reveal" style={{ position: "relative" }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--orange)", display: "block", marginBottom: "1.5rem" }}>Ready to Transform Your Career?</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(3rem, 6vw, 7rem)", lineHeight: 0.9, marginBottom: "2rem" }}>
          START YOUR<br /><span style={{ color: "var(--orange)", textShadow: "0 0 120px rgba(255,92,26,0.5)" }}>JOURNEY</span><br />TODAY
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "1.1rem", marginBottom: "3rem", maxWidth: "500px", margin: "0 auto 3rem" }}>
          Join DigitalWithChirag and build the skills that top companies actually hire for.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/919311048234" target="_blank" rel="noreferrer"
            style={{ background: "var(--orange)", color: "white", padding: "1.1rem 2.5rem", borderRadius: "8px", textDecoration: "none", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.06em", textTransform: "uppercase", boxShadow: "0 0 60px var(--orange-glow)", display: "inline-block", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => { e.target.style.transform = "translateY(-4px) scale(1.02)"; e.target.style.boxShadow = "0 20px 80px var(--orange-glow)"; }}
            onMouseLeave={(e) => { e.target.style.transform = "translateY(0) scale(1)"; e.target.style.boxShadow = "0 0 60px var(--orange-glow)"; }}>
            Apply for Next Batch →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: "#030305", borderTop: "1px solid var(--border)", padding: "2.5rem 5vw 5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
      <style>{`
        .footer-inner {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .footer-socials {
          display: flex;
          align-items: center;
          gap: 1rem;
          justify-content: center;
        }
        .footer-copy {
          font-size: 0.82rem;
          color: rgba(240,237,232,0.25);
          text-align: center;
          width: 100%;
        }
        @media (max-width: 600px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
      `}</style>
      <div className="footer-inner">
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: "var(--muted)" }}>
          Digital<span style={{ color: "var(--orange)" }}>With</span>Chirag
        </span>
        <div className="footer-socials">
          <a href="https://www.instagram.com/digitalwithchirag_" target="_blank" rel="noreferrer" style={{ color: "rgba(240,237,232,0.35)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#E1306C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,237,232,0.35)")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
          </a>
          <a href="https://www.facebook.com/share/18MMTKLM7r/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={{ color: "rgba(240,237,232,0.35)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1877F2")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,237,232,0.35)")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
          <a href="https://wa.me/9311048234" target="_blank" rel="noreferrer" style={{ color: "rgba(240,237,232,0.35)", transition: "color 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#25D366")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,237,232,0.35)")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
          </a>
        </div>
        <span className="footer-copy">© 2025 DigitalWithChirag. All rights reserved.</span>
      </div>
    </footer>
  );
}

/* ─── APP ────────────────────────────────────────────────────── */
export default function App() {
  useReveal();
  return (
    <>
      <a href="https://wa.me/919311048234" target="_blank" rel="noreferrer"
        style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 999, width: "56px", height: "56px", borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.5)", animation: "float 3s ease-in-out infinite", transition: "transform 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
      </a>
      <Nav />
      <Hero />
      <Marquee />
      <ForWhom />
      <Curriculum />
      <ToolsMarquee />
      <Comparison />
      <Outcomes />
      <About />
      <CTA />
      <Footer />
    </>
  );
}