# Emmy Saint: Public Portfolio

The public website. It shows published projects and sends contact form messages to the CRM.

- Projects come from the shared Supabase database (published rows only).
- Contact form submissions are saved as leads and appear in the CRM app.
- Projects you edit in the admin app appear here within about 60 seconds.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev
```

## Environment variables

| Name | Where to find it | Browser-visible |
|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Supabase > Project Settings > API | Yes (safe) |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Same page, "anon public" key | Yes (safe) |
| SUPABASE_SERVICE_ROLE_KEY | Same page, "service_role" key | No, never share |

## Deploy on Vercel

Import this folder as its own GitHub repository (or subfolder project), add the three variables, and deploy.
