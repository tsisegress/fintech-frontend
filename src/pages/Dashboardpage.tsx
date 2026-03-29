import { useState, useEffect, useRef } from "react";

const CONNECTED = [
  { id: 1, name: "Priya Mehta", firm: "Nexus Venture Partners", avatar: "PM", color: "#091eca", score: 97, status: "responded", stage: "In conversation", ticket: "$2M", date: "Today" },
  { id: 2, name: "Karan Bajaj", firm: "Matrix Partners India", avatar: "KB", color: "#030f30", score: 88, status: "pending", stage: "Request sent", ticket: "$3M", date: "Yesterday" },
  { id: 3, name: "Rahul Khanna", firm: "Trifecta Capital", avatar: "RK", color: "#032c7c", score: 91, status: "responded", stage: "Due diligence", ticket: "$5M", date: "2d ago" },
  { id: 4, name: "Anisha Singh", firm: "IvyCap Ventures", avatar: "AS", color: "#1e97f2", score: 84, status: "pending", stage: "Request sent", ticket: "$500K", date: "3d ago" },
];

const ACTIVITY = [
  { icon: "◆", color: "#1e97f2", text: "Priya Mehta viewed your pitch deck", time: "2h ago" },
  { icon: "◈", color: "#091eca", text: "New match: Sequoia India (score 93)", time: "4h ago" },
  { icon: "◇", color: "rgba(196,199,242,0.3)", text: "Karan Bajaj accepted your connection", time: "Yesterday" },
  { icon: "◆", color: "#1e97f2", text: "Rahul Khanna requested financials", time: "2d ago" },
  { icon: "◈", color: "#091eca", text: "8 new investors matched this week", time: "3d ago" },
];

const CHART_DATA = [
  { label: "Mon", matches: 4, views: 12 },
  { label: "Tue", matches: 7, views: 18 },
  { label: "Wed", matches: 5, views: 14 },
  { label: "Thu", matches: 11, views: 26 },
  { label: "Fri", matches: 9, views: 22 },
  { label: "Sat", matches: 6, views: 16 },
  { label: "Sun", matches: 13, views: 31 },
];

const STATS = [
  { label: "Match score", value: "94", unit: "%", delta: "+2.1%", up: true },
  { label: "Profile views", value: "312", unit: "", delta: "+18%", up: true },
  { label: "Connections", value: "4", unit: "", delta: "+1", up: true },
  { label: "In pipeline", value: "$10.5", unit: "M", delta: "target raise", up: null },
];

function MiniBarChart() {
  const maxVal = Math.max(...CHART_DATA.map(d => d.views));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "80px" }}>
      {CHART_DATA.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
          <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", justifyContent: "flex-end", height: "64px" }}>
            <div style={{
              width: "100%", borderRadius: "3px 3px 0 0",
              height: `${(d.views / maxVal) * 56}px`,
              background: "rgba(9,65,202,0.5)",
              transition: "height 0.6s ease",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: `${(d.matches / d.views) * 100}%`,
                background: "#1e97f2",
                borderRadius: "3px 3px 0 0",
              }} />
            </div>
          </div>
          <span style={{ fontSize: "9px", color: "rgba(196,199,242,0.25)", fontWeight: 600, letterSpacing: "0.06em" }}>{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function ScoreArc({ value }: { value: number }) {
  const size = 120;
  const r = 48;
  const circ = Math.PI * r;
  const fill = (value / 100) * circ;
  return (
    <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
      <path d={`M 12 60 A 48 48 0 0 1 108 60`} fill="none" stroke="rgba(196,199,242,0.06)" strokeWidth="8" strokeLinecap="round" />
      <path
        d={`M 12 60 A 48 48 0 0 1 108 60`}
        fill="none"
        stroke="url(#arcGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${fill} ${circ}`}
      />
      <defs>
        <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#091eca" />
          <stop offset="100%" stopColor="#1e97f2" />
        </linearGradient>
      </defs>
      <text x={size / 2} y={52} textAnchor="middle" fill="#c4c7f2" fontSize="22" fontWeight="700" fontFamily="Syne, sans-serif">{value}</text>
      <text x={size / 2} y={68} textAnchor="middle" fill="rgba(196,199,242,0.3)" fontSize="10" fontWeight="600" fontFamily="Syne, sans-serif">AI SCORE</text>
    </svg>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: any = {
    responded: { bg: "rgba(30,151,242,0.1)", border: "rgba(30,151,242,0.3)", color: "#1e97f2", label: "Responded" },
    pending: { bg: "rgba(196,199,242,0.04)", border: "rgba(196,199,242,0.1)", color: "rgba(196,199,242,0.35)", label: "Pending" },
  }[status];
  return (
    <span style={{
      background: config.bg, border: `1px solid ${config.border}`,
      color: config.color, borderRadius: "5px", padding: "3px 9px",
      fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
    }}>
      {config.label}
    </span>
  );
}

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "#06091a",
      border: "1px solid rgba(9,65,202,0.2)",
      borderRadius: "14px",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHeader({ label, action }: { label: string; action?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
      <span style={{ fontSize: "11px", color: "rgba(196,199,242,0.3)", fontWeight: 700, letterSpacing: "0.14em" }}>{label}</span>
      {action && <span style={{ fontSize: "11px", color: "#1e97f2", fontWeight: 600, cursor: "pointer", letterSpacing: "0.06em" }}>{action}</span>}
    </div>
  );
}

export default function DashboardPage({ onNavigate, userData }: { onNavigate?: (screen: string) => void; userData?: any }) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100);
  }, []);

  const navItems = [
    { id: "dashboard", icon: "▦", label: "Dashboard" },
    { id: "discover", icon: "◈", label: "Discover" },
    { id: "pipeline", icon: "◇", label: "Pipeline" },
    { id: "profile", icon: "○", label: "Profile" },
  ];

  return (
    <div style={{
      background: "#03030d",
      color: "#c4c7f2",
      fontFamily: "'Syne', sans-serif",
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "220px 1fr",
      gridTemplateRows: "64px 1fr",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Syne:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <nav style={{
        gridColumn: "1 / -1",
        background: "rgba(3,3,13,0.97)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(9,65,202,0.2)",
        padding: "0 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div onClick={() => onNavigate?.("landing")} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <img src="/src/assets/fi.png" alt="logo" style={{ width: "34px", height: "34px", objectFit: "contain" }} />
          <span style={{ fontFamily: "'Marcellus', serif", fontSize: "18px", color: "#c4c7f2" }}>Fintech</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => {
              setActiveNav(item.id);
              if (item.id === "discover") onNavigate?.("discover");
            }} style={{
              background: activeNav === item.id ? "rgba(9,65,202,0.2)" : "transparent",
              border: activeNav === item.id ? "1px solid rgba(9,65,202,0.4)" : "1px solid transparent",
              color: activeNav === item.id ? "#c4c7f2" : "rgba(196,199,242,0.35)",
              padding: "7px 16px", borderRadius: "7px",
              fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em",
              cursor: "pointer", fontFamily: "'Syne', sans-serif", transition: "all 0.15s",
              display: "flex", alignItems: "center", gap: "7px",
            }}>
              <span style={{ fontSize: "10px" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => onNavigate?.("logout")}
            style={{
              background: "transparent",
              border: "1px solid rgba(196,199,242,0.2)",
              color: "rgba(196,199,242,0.65)",
              borderRadius: "6px",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.04em",
              padding: "7px 10px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
          <div style={{
            position: "relative", cursor: "pointer",
            width: "32px", height: "32px",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "16px", color: "rgba(196,199,242,0.3)" }}>◌</span>
            <div style={{
              position: "absolute", top: "4px", right: "4px",
              width: "8px", height: "8px", background: "#1e97f2", borderRadius: "50%",
              border: "2px solid #03030d",
            }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "9px", cursor: "pointer" }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "9px",
              background: "linear-gradient(135deg, #091eca, #1e97f2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Marcellus', serif", fontSize: "14px", color: "#fff",
            }}>
              {userData?.name?.[0] || "A"}
            </div>
            <div>
              <div style={{ fontSize: "12px", color: "#c4c7f2", fontWeight: 600 }}>{userData?.name || "Arjun Sharma"}</div>
              <div style={{ fontSize: "10px", color: "rgba(196,199,242,0.3)", textTransform: "capitalize" }}>{userData?.role || "Founder"}</div>
            </div>
          </div>
        </div>
      </nav>

      <div style={{ gridColumn: "1 / -1", padding: "32px 36px", overflowY: "auto" }}>

        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ fontFamily: "'Marcellus', serif", fontSize: "28px", color: "#c4c7f2", fontWeight: 400, marginBottom: "4px" }}>
            Good morning, {(userData?.name || "Arjun").split(" ")[0]}
          </h1>
          <p style={{ fontSize: "13px", color: "rgba(196,199,242,0.35)" }}>
            Your fundraise is moving — 2 investors responded this week.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "24px" }}>
          {STATS.map((s, i) => (
            <Card key={i} style={{ padding: "20px 22px" }}>
              <div style={{ fontSize: "10px", color: "rgba(196,199,242,0.25)", fontWeight: 700, letterSpacing: "0.14em", marginBottom: "10px" }}>
                {s.label.toUpperCase()}
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", marginBottom: "6px" }}>
                <span style={{
                  fontFamily: "'Marcellus', serif", fontSize: "36px", color: "#c4c7f2",
                  lineHeight: 1,
                  opacity: animated ? 1 : 0,
                  transform: animated ? "translateY(0)" : "translateY(8px)",
                  transition: `all 0.5s ease ${i * 0.08}s`,
                }}>
                  {s.value}
                </span>
                <span style={{ fontSize: "16px", color: "rgba(196,199,242,0.4)", marginBottom: "4px" }}>{s.unit}</span>
              </div>
              <div style={{
                fontSize: "11px", fontWeight: 600,
                color: s.up === true ? "#1e97f2" : s.up === false ? "rgba(196,199,242,0.3)" : "rgba(196,199,242,0.3)",
                letterSpacing: "0.04em",
              }}>
                {s.up === true ? "↑ " : s.up === false ? "↓ " : ""}{s.delta}
              </div>
            </Card>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 340px", gap: "14px", marginBottom: "24px" }}>

          <Card style={{ padding: "24px" }}>
            <SectionHeader label="WEEKLY ACTIVITY" action="Details" />
            <MiniBarChart />
            <div style={{ display: "flex", gap: "16px", marginTop: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", background: "#1e97f2", borderRadius: "2px" }} />
                <span style={{ fontSize: "10px", color: "rgba(196,199,242,0.3)", fontWeight: 600 }}>Matches</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", background: "rgba(9,65,202,0.5)", borderRadius: "2px" }} />
                <span style={{ fontSize: "10px", color: "rgba(196,199,242,0.3)", fontWeight: 600 }}>Profile views</span>
              </div>
            </div>
          </Card>

          <Card style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <SectionHeader label="AI MATCH SCORE" />
            <ScoreArc value={94} />
            <p style={{ fontSize: "12px", color: "rgba(196,199,242,0.35)", textAlign: "center", lineHeight: 1.7, marginTop: "8px", maxWidth: "200px" }}>
              Top 6% of all founder profiles in Fintech this week
            </p>
            <button
              onClick={() => onNavigate?.("discover")}
              style={{
                marginTop: "16px", background: "rgba(9,65,202,0.15)",
                border: "1px solid rgba(9,65,202,0.3)", borderRadius: "7px",
                padding: "8px 20px", color: "#1e97f2",
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em",
                cursor: "pointer", fontFamily: "'Syne', sans-serif", transition: "all 0.2s",
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.background = "rgba(9,65,202,0.25)"}
              onMouseLeave={e => (e.target as HTMLElement).style.background = "rgba(9,65,202,0.15)"}
            >
              Find more matches →
            </button>
          </Card>

          <Card style={{ padding: "24px" }}>
            <SectionHeader label="RECENT ACTIVITY" />
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "12px", color: a.color, marginTop: "1px", flexShrink: 0 }}>{a.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", color: "rgba(196,199,242,0.6)", lineHeight: 1.5 }}>{a.text}</div>
                    <div style={{ fontSize: "10px", color: "rgba(196,199,242,0.2)", marginTop: "2px", fontWeight: 600 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card style={{ padding: "24px" }}>
          <SectionHeader label="INVESTOR PIPELINE" action="View all" />
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 100px", gap: "0" }}>
            {["Investor", "Firm", "Stage", "Ticket", "Match", "Status"].map(h => (
              <div key={h} style={{
                fontSize: "10px", color: "rgba(196,199,242,0.2)", fontWeight: 700,
                letterSpacing: "0.12em", padding: "0 0 14px",
                borderBottom: "1px solid rgba(9,65,202,0.15)",
              }}>
                {h}
              </div>
            ))}

            {CONNECTED.map((inv, i) => (
              <>
                <div key={`${inv.id}-a`} style={{
                  padding: "16px 0", borderBottom: "1px solid rgba(9,65,202,0.08)",
                  display: "flex", alignItems: "center", gap: "12px",
                }}>
                  <div style={{
                    width: "36px", height: "36px", borderRadius: "9px", flexShrink: 0,
                    background: `linear-gradient(135deg, ${inv.color}, #1e97f2)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Marcellus', serif", fontSize: "13px", color: "#fff",
                  }}>
                    {inv.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", color: "#c4c7f2", fontWeight: 600 }}>{inv.name}</div>
                    <div style={{ fontSize: "10px", color: "rgba(196,199,242,0.25)", marginTop: "1px" }}>{inv.date}</div>
                  </div>
                </div>
                <div key={`${inv.id}-b`} style={{ padding: "16px 0", borderBottom: "1px solid rgba(9,65,202,0.08)", display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "rgba(196,199,242,0.45)" }}>{inv.firm}</span>
                </div>
                <div key={`${inv.id}-c`} style={{ padding: "16px 0", borderBottom: "1px solid rgba(9,65,202,0.08)", display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "12px", color: "rgba(196,199,242,0.45)" }}>{inv.stage}</span>
                </div>
                <div key={`${inv.id}-d`} style={{ padding: "16px 0", borderBottom: "1px solid rgba(9,65,202,0.08)", display: "flex", alignItems: "center" }}>
                  <span style={{ fontSize: "13px", color: "#c4c7f2", fontWeight: 600 }}>{inv.ticket}</span>
                </div>
                <div key={`${inv.id}-e`} style={{ padding: "16px 0", borderBottom: "1px solid rgba(9,65,202,0.08)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ height: "4px", flex: 1, background: "rgba(196,199,242,0.06)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${inv.score}%`, background: "#1e97f2", borderRadius: "2px" }} />
                  </div>
                  <span style={{ fontSize: "11px", color: "#1e97f2", fontWeight: 700, minWidth: "24px" }}>{inv.score}</span>
                </div>
                <div key={`${inv.id}-f`} style={{ padding: "16px 0", borderBottom: "1px solid rgba(9,65,202,0.08)", display: "flex", alignItems: "center" }}>
                  <StatusBadge status={inv.status} />
                </div>
              </>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}
