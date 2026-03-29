import { useState, useEffect, useRef } from "react";

const STATS = [
  { value: "14Cr+", label: "Demat accounts in India" },
  { value: "30s", label: "Signal refresh cycle" },
  { value: "4", label: "Case-ready AI modules" },
  { value: "NSE", label: "Market-first focus" },
];

const FEATURES = [
  {
    tag: "OPPORTUNITY RADAR",
    title: "Signal-first alerts",
    body: "Continuously monitor filings, bulk/block deals, management commentary shifts, and regulatory changes to surface opportunities before the crowd.",
    metric: "Daily alpha feed",
  },
  {
    tag: "CHART PATTERN AI",
    title: "Technical patterns with context",
    body: "Detect breakouts, reversals, and divergences across the NSE universe with plain-English reasoning and historical back-tested hit rates.",
    metric: "Pattern confidence",
  },
  {
    tag: "MARKET CHAT",
    title: "Portfolio-aware Q&A",
    body: "Ask market questions and get source-cited, multi-step answers grounded in your holdings, watchlist, and risk posture.",
    metric: "Cited responses",
  },
];

const CASE_TRACKS = [
  "Opportunity Radar — signal finder over filings + flow + commentary",
  "Chart Pattern Intelligence — real-time breakout/reversal detection",
  "Market ChatGPT (rebuilt better) — deeper, portfolio-aware analysis",
  "AI Market Video Engine — auto-generated daily visual market briefings",
];

function TriangleMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animId: number;
    let w: number = canvas.offsetWidth;
    let h: number = canvas.offsetHeight;

    function resize() {
      w = canvas!.width = canvas!.offsetWidth;
      h = canvas!.height = canvas!.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const COUNT = 22;
    const nodes = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
    }));

    function nearestTwo(i: number) {
      const src = nodes[i];
      return nodes
        .map((n, j) => ({ j, d: j === i ? Infinity : Math.hypot(n.x - src.x, n.y - src.y) }))
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
        .map(x => x.j);
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      const drawn = new Set();

      nodes.forEach((n, i) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        const [a, b] = nearestTwo(i);
        const key = [i, a, b].sort().join("-");
        if (drawn.has(key)) return;
        drawn.add(key);

        const na = nodes[a], nb = nodes[b];

        ctx!.beginPath();
        ctx!.moveTo(n.x, n.y);
        ctx!.lineTo(na.x, na.y);
        ctx!.lineTo(nb.x, nb.y);
        ctx!.closePath();
        ctx!.fillStyle = "rgba(9, 65, 202, 0.045)";
        ctx!.fill();

        [[n, na], [na, nb], [nb, n]].forEach(([p, q]) => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          const alpha = Math.max(0, 0.2 - dist / 1600);
          ctx!.beginPath();
          ctx!.moveTo(p.x, p.y);
          ctx!.lineTo(q.x, q.y);
          ctx!.strokeStyle = `rgba(30, 151, 242, ${alpha})`;
          ctx!.lineWidth = 0.8;
          ctx!.stroke();
        });

        [n, na, nb].forEach(p => {
          ctx!.beginPath();
          ctx!.arc(p.x, p.y, 1.8, 0, Math.PI * 2);
          ctx!.fillStyle = "rgba(196, 199, 242, 0.4)";
          ctx!.fill();
        });
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

function AnimatedNumber({ target }: { target: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const isFloat = target.includes(".");
      const num = parseFloat(target.replace(/[^0-9.]/g, ""));
      const prefix = target.match(/^\D*/)?.[0] || "";
      const suffix = target.match(/\D+$/)?.[0] || "";
      let start: number | null = null;
      function step(ts: number) {
        if (!start) start = ts;
        const p = Math.min((ts - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const cur = eased * num;
        setDisplay(isFloat ? prefix + cur.toFixed(1) + suffix : prefix + Math.floor(cur).toLocaleString() + suffix);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      observer.disconnect();
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}</span>;
}

export default function LandingPage({ onNavigate }: { onNavigate?: (screen: string) => void }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{
      background: "#03030d",
      color: "#c4c7f2",
      fontFamily: "'Syne', sans-serif",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Syne:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <nav style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrollY > 40 ? "rgba(3,3,13,0.95)" : "transparent",
        borderBottom: scrollY > 40 ? "1px solid rgba(9,65,202,0.25)" : "none",
        backdropFilter: scrollY > 40 ? "blur(12px)" : "none",
        transition: "all 0.35s",
        padding: "0 56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "68px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/src/assets/fi.png" alt="Fintech logo" style={{ width: "36px", height: "36px", objectFit: "contain" }} />
          <span style={{ fontFamily: "'Marcellus', serif", fontSize: "20px", color: "#c4c7f2", letterSpacing: "0.04em" }}>
            Fintech
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "36px" }}>
          <button
            onClick={() => onNavigate?.("auth")}
            style={{
              background: "#091eca",
              color: "#c4c7f2",
              border: "none",
              padding: "9px 22px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "0.04em",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.target as HTMLButtonElement).style.background = "#1e97f2"}
            onMouseLeave={e => (e.target as HTMLButtonElement).style.background = "#091eca"}
          >
            Login
          </button>
        </div>
      </nav>

      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <TriangleMesh />

        <div style={{
          position: "absolute", top: "25%", right: "10%",
          width: "520px", height: "520px",
          background: "radial-gradient(circle, rgba(9,65,202,0.1) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "15%", left: "3%",
          width: "280px", height: "280px",
          background: "radial-gradient(circle, rgba(30,151,242,0.06) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 2, padding: "140px 80px 80px", maxWidth: "860px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(9,65,202,0.1)",
            border: "1px solid rgba(9,65,202,0.3)",
            borderRadius: "20px",
            padding: "5px 14px",
            marginBottom: "36px",
          }}>
            <div style={{ width: "6px", height: "6px", background: "#1e97f2", borderRadius: "50%", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: "11px", color: "#1e97f2", letterSpacing: "0.12em", fontWeight: 600 }}>
              AI FOR THE INDIAN INVESTOR
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Marcellus', serif",
            fontSize: "clamp(56px, 8vw, 108px)",
            lineHeight: "1.0",
            color: "#c4c7f2",
            marginBottom: "10px",
            fontWeight: 400,
          }}>
            Data becomes
          </h1>
          <h1 style={{
            fontFamily: "'Marcellus', serif",
            fontSize: "clamp(56px, 8vw, 108px)",
            lineHeight: "1.0",
            marginBottom: "36px",
            fontWeight: 400,
            background: "linear-gradient(90deg, #1e97f2, #091eca)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            decisions.
          </h1>

          <p style={{
            fontSize: "16px",
            color: "rgba(196,199,242,0.5)",
            lineHeight: 1.8,
            maxWidth: "480px",
            marginBottom: "52px",
            fontWeight: 400,
          }}>
            India has massive retail participation, but decisions still run on noise. We turn filings, price action, and flows into actionable, explainable market intelligence.
          </p>

          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <button
              onClick={() => onNavigate?.("discover")}
              style={{
                background: "#091eca",
                color: "#c4c7f2",
                border: "none",
                padding: "14px 34px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'Syne', sans-serif",
                letterSpacing: "0.04em",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#1e97f2"; (e.target as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "#091eca"; (e.target as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              Launch intelligence →
            </button>
            <button
              onClick={() => onNavigate?.("dashboard")}
              style={{
              background: "transparent",
              color: "rgba(196,199,242,0.5)",
              border: "1px solid rgba(9,65,202,0.3)",
              padding: "14px 28px",
              borderRadius: "8px",
              fontSize: "14px",
              cursor: "pointer",
              fontFamily: "'Syne', sans-serif",
              letterSpacing: "0.04em",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = "#1e97f2"; (e.target as HTMLButtonElement).style.color = "#c4c7f2"; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = "rgba(9,65,202,0.3)"; (e.target as HTMLButtonElement).style.color = "rgba(196,199,242,0.5)"; }}
            >
              View case fit
            </button>
          </div>
        </div>
      </section>

      <section style={{ padding: "60px 80px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "rgba(9,65,202,0.2)",
          border: "1px solid rgba(9,65,202,0.2)",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: "#03030d",
              padding: "36px 28px",
              textAlign: "center",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#06091a"}
              onMouseLeave={e => e.currentTarget.style.background = "#03030d"}
            >
              <div style={{
                fontFamily: "'Marcellus', serif",
                fontSize: "48px",
                color: "#c4c7f2",
                lineHeight: 1,
                marginBottom: "8px",
              }}>
                <AnimatedNumber target={s.value} />
              </div>
              <div style={{
                fontSize: "11px",
                color: "rgba(196,199,242,0.3)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "60px 80px 100px" }}>
        <div style={{ marginBottom: "56px" }}>
          <div style={{
            fontSize: "11px", color: "#1e97f2",
            letterSpacing: "0.2em", fontWeight: 600, marginBottom: "16px",
          }}>
            PLATFORM INTELLIGENCE
          </div>
          <h2 style={{
            fontFamily: "'Marcellus', serif",
            fontSize: "clamp(36px, 4vw, 56px)",
            color: "#c4c7f2",
            fontWeight: 400,
            lineHeight: 1.1,
          }}>
            What we may build (case-aligned)
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(9,65,202,0.2)" }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: "#03030d",
              padding: "40px 36px",
              transition: "background 0.2s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = "#06091a"}
              onMouseLeave={e => e.currentTarget.style.background = "#03030d"}
            >
              <div style={{
                fontSize: "10px", color: "rgba(196,199,242,0.25)",
                letterSpacing: "0.2em", fontWeight: 600, marginBottom: "20px",
              }}>
                {String(i + 1).padStart(2, "0")} — {f.tag}
              </div>
              <h3 style={{
                fontFamily: "'Marcellus', serif",
                fontSize: "28px", color: "#c4c7f2",
                fontWeight: 400, marginBottom: "16px", lineHeight: 1.2,
              }}>
                {f.title}
              </h3>
              <p style={{
                fontSize: "14px", color: "rgba(196,199,242,0.4)",
                lineHeight: 1.8, marginBottom: "28px",
              }}>
                {f.body}
              </p>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(30,151,242,0.06)",
                border: "1px solid rgba(30,151,242,0.2)",
                borderRadius: "4px", padding: "4px 10px",
              }}>
                <div style={{ width: "5px", height: "5px", background: "#1e97f2", borderRadius: "50%" }} />
                <span style={{ fontSize: "11px", color: "#1e97f2", fontWeight: 600, letterSpacing: "0.06em" }}>
                  {f.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 80px 90px" }}>
        <div style={{
          border: "1px solid rgba(9,65,202,0.25)",
          background: "#06091a",
          borderRadius: "14px",
          padding: "30px 34px",
        }}>
          <div style={{ fontSize: "11px", color: "#1e97f2", letterSpacing: "0.18em", fontWeight: 600, marginBottom: "18px" }}>
            CASE #6 FIT
          </div>
          <ul style={{ margin: 0, paddingLeft: "20px", display: "grid", gap: "12px" }}>
            {CASE_TRACKS.map(item => (
              <li key={item} style={{ color: "rgba(196,199,242,0.65)", lineHeight: 1.6, fontSize: "15px" }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section style={{
        margin: "0 80px 100px",
        background: "linear-gradient(135deg, #06091a 0%, #030a1f 100%)",
        border: "1px solid rgba(9,65,202,0.25)",
        borderRadius: "16px",
        padding: "80px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(9,65,202,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "11px", color: "#1e97f2", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "20px" }}>
            JOIN THE NETWORK
          </div>
          <h2 style={{
            fontFamily: "'Marcellus', serif",
            fontSize: "clamp(40px, 5vw, 68px)",
            color: "#c4c7f2", fontWeight: 400, lineHeight: 1.1, marginBottom: "20px",
          }}>
            Ready to build the investor intelligence layer?
          </h2>
          <p style={{
            color: "rgba(196,199,242,0.4)", fontSize: "15px",
            maxWidth: "400px", margin: "0 auto 44px", lineHeight: 1.75,
          }}>
            Start with Opportunity Radar and Chart Pattern Intelligence, then layer portfolio-aware Market Chat for real investment decisions.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
            <button
              onClick={() => onNavigate?.("discover")}
              style={{
                background: "#091eca", color: "#c4c7f2", border: "none",
                padding: "14px 36px", borderRadius: "8px", fontSize: "14px",
                fontWeight: 600, cursor: "pointer", fontFamily: "'Syne', sans-serif",
                letterSpacing: "0.04em", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = "#1e97f2"; (e.target as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = "#091eca"; (e.target as HTMLButtonElement).style.transform = "translateY(0)"; }}
            >
              Start demo
            </button>
            <button
              onClick={() => onNavigate?.("dashboard")}
              style={{
                background: "transparent", color: "rgba(196,199,242,0.5)",
                border: "1px solid rgba(9,65,202,0.3)", padding: "14px 36px",
                borderRadius: "8px", fontSize: "14px", cursor: "pointer",
                fontFamily: "'Syne', sans-serif", letterSpacing: "0.04em", transition: "all 0.2s",
              }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.borderColor = "#1e97f2"; (e.target as HTMLButtonElement).style.color = "#c4c7f2"; }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.borderColor = "rgba(9,65,202,0.3)"; (e.target as HTMLButtonElement).style.color = "rgba(196,199,242,0.5)"; }}
            >
              Open dashboard
            </button>
          </div>
        </div>
      </section>

      <footer style={{
        borderTop: "1px solid rgba(9,65,202,0.2)",
        padding: "28px 80px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img src="/src/assets/fi.png" alt="Fintech logo" style={{ width: "24px", height: "24px", objectFit: "contain", opacity: 0.4 }} />
          <span style={{ fontFamily: "'Marcellus', serif", fontSize: "16px", color: "rgba(196,199,242,0.3)" }}>Fintech</span>
        </div>
        <span style={{ fontSize: "12px", color: "rgba(196,199,242,0.2)", letterSpacing: "0.08em", fontWeight: 600 }}>
          © 2025 · 25F3002634
        </span>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy", "Terms", "Contact"].map(l => (
            <span key={l} style={{ fontSize: "12px", color: "rgba(196,199,242,0.25)", cursor: "pointer", transition: "color 0.2s", fontWeight: 500 }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "rgba(196,199,242,0.7)"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(196,199,242,0.25)"}
            >{l}</span>
          ))}
        </div>
      </footer>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </div>
  );
}
