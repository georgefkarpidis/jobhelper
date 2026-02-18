"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

type Profile = {
  id: string;
  role: "candidate" | "employer";
  name: string | null;
  location: string | null;
  headline: string | null;
  bio: string | null;
  skills: string[] | null;
  availability: string | null;
};

export default function CandidatesPage() {
  const [rows, setRows] = useState<Profile[]>([]);
  const [q, setQ] = useState("");
  const [avail, setAvail] = useState("any");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "candidate")
        .order("updated_at", { ascending: false });

      setRows((data as Profile[]) ?? []);
    })();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((p) => {
      const hay = `${p.name ?? ""} ${p.location ?? ""} ${p.headline ?? ""} ${(p.skills ?? []).join(" ")} ${p.bio ?? ""}`.toLowerCase();
      const okQ = hay.includes(q.toLowerCase());
      const okA = avail === "any" ? true : (p.availability ?? "") === avail;
      return okQ && okA;
    });
  }, [rows, q, avail]);

  return (
    <main style={{ maxWidth: 980, margin: "50px auto", padding: 16 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <a href="/" style={{ textDecoration: "none", fontWeight: 900 }}>JobHelper</a>
        <nav style={{ display: "flex", gap: 14 }}>
          <a href="/jobs">Jobs</a>
          <a href="/auth">Sign in</a>
          <a href="/me">My profile</a>
        </nav>
      </header>

      <h1 style={{ marginTop: 18 }}>Candidates</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 12, marginTop: 12 }}>
        <input
          style={input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search skills, location, name…"
        />
        <select style={input} value={avail} onChange={(e) => setAvail(e.target.value)}>
          <option value="any">Any availability</option>
          <option value="immediate">Immediate</option>
          <option value="2_weeks">In 2 weeks</option>
          <option value="1_month">In 1 month</option>
        </select>
      </div>

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {filtered.map((p) => (
          <div key={p.id} style={{ border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 900 }}>{p.name ?? "Unnamed candidate"}</div>
                <div style={{ opacity: 0.8 }}>
                  {p.location ?? "Location not set"} • {p.availability ?? "immediate"}
                </div>
              </div>
              <a href="/auth" style={pill}>Contact (MVP)</a>
            </div>

            {p.headline && <div style={{ marginTop: 10, fontWeight: 800 }}>{p.headline}</div>}
            {p.bio && <div style={{ marginTop: 8, opacity: 0.9 }}>{p.bio}</div>}

            {p.skills?.length ? (
              <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.skills.map((s) => (
                  <span key={s} style={tag}>{s}</span>
                ))}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}

const input: React.CSSProperties = { width: "100%", padding: 12, borderRadius: 12, border: "1px solid #ddd" };
const tag: React.CSSProperties = { fontSize: 12, padding: "6px 10px", borderRadius: 999, border: "1px solid #e5e5e5" };
const pill: React.CSSProperties = { fontSize: 13, padding: "8px 10px", borderRadius: 999, border: "1px solid #ddd", textDecoration: "none", color: "black", fontWeight: 800 };
