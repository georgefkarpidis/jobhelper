"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Role = "candidate" | "employer";

export default function MePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<Role>("candidate");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [availability, setAvailability] = useState("immediate");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      const uid = data.user?.id ?? null;
      setUserId(uid);
      if (!uid) return;

      const { data: profile } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
      if (profile) {
        setRole(profile.role);
        setName(profile.name ?? "");
        setLocation(profile.location ?? "");
        setHeadline(profile.headline ?? "");
        setBio(profile.bio ?? "");
        setSkills((profile.skills ?? []).join(", "));
        setAvailability(profile.availability ?? "immediate");
      }
    })();
  }, []);

  async function save() {
    setMsg(null);
    if (!userId) { setMsg("Please sign in first."); return; }

    const skillsArr = skills
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const payload = {
      id: userId,
      role,
      name,
      location,
      headline,
      bio,
      skills: skillsArr,
      availability,
    };

    const { error } = await supabase.from("profiles").upsert(payload, { onConflict: "id" });
    setMsg(error ? error.message : "Saved!");
  }

  return (
    <main style={{ maxWidth: 720, margin: "50px auto", padding: 16 }}>
      <a href="/" style={{ textDecoration: "none" }}>← JobHelper</a>
      <h1 style={{ marginTop: 14 }}>My profile</h1>

      {!userId && (
        <p style={{ opacity: 0.8 }}>
          You’re not signed in. Go to <a href="/auth">Sign in</a>.
        </p>
      )}

      <div style={grid}>
        <div>
          <label style={label}>I am a</label>
          <select style={input} value={role} onChange={(e) => setRole(e.target.value as Role)}>
            <option value="candidate">Candidate (looking for work)</option>
            <option value="employer">Employer</option>
          </select>
        </div>

        <div>
          <label style={label}>Availability</label>
          <select style={input} value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value="immediate">Immediate</option>
            <option value="2_weeks">In 2 weeks</option>
            <option value="1_month">In 1 month</option>
          </select>
        </div>
      </div>

      <label style={label}>Name</label>
      <input style={input} value={name} onChange={(e) => setName(e.target.value)} />

      <label style={label}>Location</label>
      <input style={input} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City / area" />

      <label style={label}>Headline</label>
      <input style={input} value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g., Warehouse worker, Barista, Junior developer" />

      <label style={label}>Skills (comma separated)</label>
      <input style={input} value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., Excel, customer service, driving" />

      <label style={label}>Bio</label>
      <textarea style={{ ...input, minHeight: 110 }} value={bio} onChange={(e) => setBio(e.target.value)} />

      <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
        <button style={btnPrimary} onClick={save}>Save</button>
        <a style={btnGhostLink} href={role === "candidate" ? "/candidates" : "/jobs"}>
          View public pages
        </a>
      </div>

      {msg && <p style={{ marginTop: 12, opacity: 0.85 }}>{msg}</p>}
    </main>
  );
}

const grid: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 };
const label: React.CSSProperties = { display: "block", marginTop: 12, fontWeight: 800 };
const input: React.CSSProperties = { width: "100%", padding: 12, borderRadius: 12, border: "1px solid #ddd", marginTop: 6 };
const btnPrimary: React.CSSProperties = { padding: "12px 14px", borderRadius: 12, background: "black", color: "white", border: "none", fontWeight: 900, textDecoration: "none" };
const btnGhostLink: React.CSSProperties = { padding: "12px 14px", borderRadius: 12, background: "white", border: "1px solid #ddd", fontWeight: 900, textDecoration: "none", color: "black" };
