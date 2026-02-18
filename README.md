# JobHelper (MVP)

This is a simple Next.js + Supabase MVP.

## 1) Install
```bash
npm install
```

## 2) Create `.env.local`
```bash
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

## 3) Create tables/policies in Supabase
Paste the SQL from the chat message into Supabase -> SQL Editor.

## 4) Run
```bash
npm run dev
```

Open:
- http://localhost:3000
- /auth, /me, /candidates, /jobs
