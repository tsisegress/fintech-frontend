import { type CSSProperties } from "react";

const DEALS = [
  { company: "PaySprint", score: 95, stage: "Seed", sector: "Fintech", ask: "$1.5M", note: "Strong API-first distribution and 18% MoM growth." },
  { company: "CredEdge", score: 90, stage: "Series A", sector: "Lending Infra", ask: "$4M", note: "Clear underwriting moat and improving unit economics." },
  { company: "LedgerFlow", score: 86, stage: "Pre-seed", sector: "SME SaaS", ask: "$600K", note: "Early but high founder-market fit confidence." },
];

export default function InvestorDashboardPage({ onNavigate, userData }: { onNavigate?: (screen: string) => void; userData?: any }) {
  return (
    <div style={{ minHeight: "100vh", background: "#03030d", color: "#c4c7f2", fontFamily: "'Syne', sans-serif", padding: "28px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, fontFamily: "'Marcellus', serif", fontWeight: 400 }}>Investor Dashboard</h1>
          <p style={{ marginTop: "8px", color: "rgba(196,199,242,0.5)" }}>
            Welcome {userData?.name || "Investor"}. Your dealflow is ranked by thesis fit.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => onNavigate?.("discover")} style={buttonGhost}>Discover</button>
          <button onClick={() => onNavigate?.("landing")} style={buttonPrimary}>Home</button>
        </div>
      </div>

      <div style={{ display: "grid", gap: "12px" }}>
        {DEALS.map((deal) => (
          <div key={deal.company} style={{ background: "#06091a", border: "1px solid rgba(9,65,202,0.25)", borderRadius: "12px", padding: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0, fontFamily: "'Marcellus', serif", fontWeight: 400 }}>{deal.company}</h3>
                <p style={{ margin: "6px 0 0", color: "rgba(196,199,242,0.5)", fontSize: "13px" }}>
                  {deal.stage} • {deal.sector} • Ask {deal.ask}
                </p>
              </div>
              <div style={{ fontWeight: 700, color: "#1e97f2" }}>{deal.score}% fit</div>
            </div>
            <p style={{ marginBottom: 0, marginTop: "10px", color: "rgba(196,199,242,0.65)", lineHeight: 1.6 }}>{deal.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const buttonPrimary: CSSProperties = {
  background: "#091eca",
  border: "none",
  color: "#c4c7f2",
  borderRadius: "8px",
  padding: "10px 14px",
  cursor: "pointer",
};

const buttonGhost: CSSProperties = {
  background: "transparent",
  border: "1px solid rgba(9,65,202,0.35)",
  color: "#c4c7f2",
  borderRadius: "8px",
  padding: "10px 14px",
  cursor: "pointer",
};
