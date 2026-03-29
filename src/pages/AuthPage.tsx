import { useState, type CSSProperties } from "react";

type Role = "startup" | "investor";

export default function AuthPage({
  onAuthSuccess,
}: {
  onAuthSuccess: (data: { role: Role; name: string; email: string }) => void;
}) {
  const [role, setRole] = useState<Role>("startup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill all fields.");
      return;
    }
    setError("");
    onAuthSuccess({ role, name: name.trim(), email: email.trim() });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#03030d",
        color: "#c4c7f2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Syne', sans-serif",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#06091a",
          border: "1px solid rgba(9,65,202,0.25)",
          borderRadius: "16px",
          padding: "28px",
        }}
      >
        <h1 style={{ margin: 0, fontFamily: "'Marcellus', serif", fontWeight: 400, marginBottom: "8px" }}>
          Sign in
        </h1>
        <p style={{ marginTop: 0, marginBottom: "20px", color: "rgba(196,199,242,0.5)" }}>
          Choose your role to enter the right dashboard.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "16px" }}>
          {["startup", "investor"].map((r) => (
            <button
              key={r}
              onClick={() => setRole(r as Role)}
              style={{
                background: role === r ? "rgba(9,65,202,0.25)" : "rgba(196,199,242,0.04)",
                border: role === r ? "1px solid rgba(30,151,242,0.6)" : "1px solid rgba(196,199,242,0.12)",
                color: "#c4c7f2",
                borderRadius: "8px",
                padding: "10px",
                cursor: "pointer",
                textTransform: "capitalize",
                fontWeight: 600,
              }}
            >
              {r}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gap: "10px" }}>
          <input
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        {error && <p style={{ color: "#ff8c8c", fontSize: "13px", marginTop: "10px" }}>{error}</p>}

        <button
          onClick={submit}
          style={{
            width: "100%",
            marginTop: "14px",
            background: "#091eca",
            border: "none",
            color: "#c4c7f2",
            padding: "12px",
            borderRadius: "8px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

const inputStyle: CSSProperties = {
  background: "rgba(196,199,242,0.04)",
  border: "1px solid rgba(196,199,242,0.14)",
  borderRadius: "8px",
  color: "#c4c7f2",
  padding: "12px",
  outline: "none",
};
