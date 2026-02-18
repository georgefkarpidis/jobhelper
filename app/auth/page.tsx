"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function signUp() {
    setLoading(true); setMsg(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    setMsg(error ? error.message : "Signed up! Now sign in.");
  }

  async function signIn() {
    setLoading(true); setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    setMsg(error ? error.message : "Signed in! Go to “My profile”.");
  }

  async function signOut() {
    await supabase.auth.signOut();
    setMsg("Signed out.");
  }

  return (
    <main style={{ maxWidth: 520, margin: "50px auto", padding: 16 }}>
      <a href="/" style={{ textDecoration: "none" }}>← JobHelper</a>
      <h1 style={{ marginTop: 14 }}>Sign in</h1>

      <label style={label}>Email</label>
      <input style={input} value={email} onChange={(e) => setEmail(e.target.value)} />

      <label style={label}>Password</label>
      <input style={input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
        <button style={btnPrimary} disabled={loading} onClick={signIn}>Sign in</button>
        <button style={btnGhost} disabled={loading} onClick={signUp}>Create account</button>
        <button style={btnGhost} onClick={signOut}>Sign out</button>
      </div>

      {msg && <p style={{ marginTop: 12, opacity: 0.85 }}>{msg}</p>}
      <p style={{ marginTop: 14, opacity: 0.75 }}>
        After signing in, go to <a href="/me">My profile</a>.
      </p>
    </main>
  );
}

const label: React.CSSProperties = { display: "block", marginTop: 12, fontWeight: 700 };
const input: React.CSSProperties = { width: "100%", padding: 12, borderRadius: 12, border: "1px solid #ddd", marginTop: 6 };
const btnPrimary: React.CSSProperties = { padding: "12px 14px", borderRadius: 12, background: "black", color: "white", border: "none", fontWeight: 800 };
const btnGhost: React.CSSProperties = { padding: "12px 14px", borderRadius: 12, background: "white", border: "1px solid #ddd", fontWeight: 800 };
