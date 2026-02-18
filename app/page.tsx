export default function Home() {
  return (
    <main style={{ maxWidth: 980, margin: "50px auto", padding: 16 }}>
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontSize: 22, fontWeight: 800 }}>JobHelper</div>
        <nav style={{ display: "flex", gap: 14 }}>
          <a href="/candidates">Candidates</a>
          <a href="/jobs">Jobs</a>
          <a href="/auth">Sign in</a>
          <a href="/me">My profile</a>
        </nav>
      </header>

      <section style={{ marginTop: 40 }}>
        <h1 style={{ fontSize: 44, lineHeight: 1.05, margin: "0 0 10px", fontWeight: 900 }}>
          A faster way for jobless people to get hired.
        </h1>
        <p style={{ fontSize: 18, opacity: 0.85, maxWidth: 720 }}>
          Candidates post a simple profile (skills + availability). Employers browse and post jobs.
          Built to be quick, clear, and beginner-friendly.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
          <a href="/candidates" style={btnPrimary}>Browse candidates</a>
          <a href="/jobs" style={btnGhost}>Browse jobs</a>
          <a href="/me" style={btnGhost}>Create your profile</a>
        </div>
      </section>

      <section style={{ marginTop: 42, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        <Card title="For candidates" text="Create a profile in 3 minutes. Show skills, location, and availability." />
        <Card title="For employers" text="Post a job and browse people who are available now." />
        <Card title="Fair & simple" text="No complicated CV formatting required. Skills-first approach." />
      </section>
    </main>
  );
}

const btnPrimary: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  background: "black",
  color: "white",
  textDecoration: "none",
  fontWeight: 700,
};

const btnGhost: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1px solid #ddd",
  color: "black",
  textDecoration: "none",
  fontWeight: 700,
};

function Card({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
      <div style={{ fontWeight: 800, marginBottom: 6 }}>{title}</div>
      <div style={{ opacity: 0.85 }}>{text}</div>
    </div>
  );
}
