export default function AboutPage() {
  return (
    <main style={{ maxWidth: 900, margin: "50px auto", padding: 16 }}>
      <a href="/" style={{ textDecoration: "none" }}>← JobHelper</a>

      <h1 style={{ marginTop: 14, fontSize: 42 }}>About JobHelper</h1>

      <p style={{ fontSize: 18 }}>
        JobHelper started in Greece from a simple frustration:
        unemployment keeps rising, and people without experience
        often don’t know where to begin.
      </p>

      <p>
        I’m a young person in Greece watching friends and families
        struggle to find work. I wanted to build something simple
        that helps jobless people connect with employers faster.
      </p>
    </main>
  );
}

