"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Job = {
  id: number;
  employer_id: string;
  title: string;
  location: string | null;
  type: string | null;
  description: string | null;
  created_at: string;
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("full_time");
  const [description, setDescription] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  async function load() {
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    setJobs((data as Job[]) ?? []);
  }

  useEffect(() => { load(); }, []);

  async function postJob() {
    setMsg(null);
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth.user?.id;
    if (!uid) { setMsg("Please sign in first."); return; }

    const { error } = await supabase.from("jobs").insert({
      employer_id: uid,
      title,
      location,
      type,
      description,
    });

    if (error) { setMsg(error.message); return; }

    setTitle(""); setLocation(""); setType("full_time"); setDescription("");
    setMsg("Posted!");
    load();
  }

  return (
    <main style={{ maxWidth: 980, margin: "50px auto", padding: 16 }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <a href="/" style={{ textDecoration: "none", fontWeight: 900 }}>JobHelper</a>
        <nav style={{ display: "flex", gap: 14 }}>
          <a href="/candidates">Candidates</a>
          <a href="/auth">Sign in</a>
          <a href="/me">My profile</a>
        </nav>
      </header>

      <h1 style={{ marginTop: 18 }}>Jobs</h1>

      <section style={{ marginTop: 14, border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
        <div style={{ fontWeight: 900, marginBottom: 10 }}>Post a job (MVP)</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <input style={input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job title" />
          <input style={input} value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        </div>

        <div style={{ marginTop: 12 }}>
          <select style={input} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="full_time">Full-time</option>
            <option value="part_time">Part-time</option>
            <option value="temporary">Temporary</option>
            <option value="gig">Gig</option>
          </select>
        </div>

        <textarea style={{ ...input, marginTop: 12, minHeight: 90 }} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the work, pay range, and contact method…" />

        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <button style={btnPrimary} onClick={postJob}>Post</button>
          <a style={btnGhostLink} href="/auth">Sign in</a>
        </div>

        {msg && <p style={{ marginTop: 10, opacity: 0.85 }}>{msg}</p>}
      </section>

      <section style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {jobs.map((j) => (
          <div key={j.id} style={{ border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 900 }}>{j.title}</div>
            <div style={{ opacity: 0.8 }}>{j.location ?? "Location not set"} • {j.type ?? "full_time"}</div>
            {j.description && <div style={{ marginTop: 10 }}>{j.description}</div>}
          </div>
        ))}
      </section>
    </main>
  );
}

const input: React.CSSProperties = { width: "100%", padding: 12, borderRadius: 12, border: "1px solid #ddd" };
const btnPrimary: React.CSSProperties = { padding: "12px 14px", borderRadius: 12, background: "black", color: "white", border: "none", fontWeight: 900 };
const btnGhostLink: React.CSSProperties = { padding: "12px 14px", borderRadius: 12, background: "white", border: "1px solid #ddd", fontWeight: 900, textDecoration: "none", color: "black" };
