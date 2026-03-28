# KSoft Lyrics Search (Next.js)

This mini project uses the KSoft lyrics API endpoint:

- `https://api.ksoft.si/lyrics/search`

## 1) Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## 2) Add your API key

Create `.env.local` in the project root:

```bash
KSOFT_API_KEY=your_api_key_here
```

`KSOFT_API_KEY` is only read on the server by `app/api/lyrics/search/route.ts`, so it is not exposed to the browser.

## 3) How it works

- Frontend UI is in `app/page.tsx`
- Server route is in `app/api/lyrics/search/route.ts`
- The frontend calls `/api/lyrics/search?q=...&limit=...&text_only=true|false`
- The server route forwards the request to KSoft with the `Authorization` header

## 4) Assignment checklist mapping

- Next.js project initialized ✅
- API key stored in `.env.local` ✅
- Data fetched from API via server-side code ✅
- Results displayed in custom components/UI ✅
