# Emmy Saint: Admin (Projects)

Private app for managing portfolio projects. Only accounts listed in `admin_users` can sign in.

## What it does

- Add, edit, publish, unpublish and delete projects
- Upload cover images (JPG, PNG or WebP, up to 5 MB)
- Links to the CRM and the public site

Projects you save here appear on the public portfolio within about 60 seconds.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev                  # runs on http://localhost:3000
```

If the portfolio also runs locally on port 3000, start this app on another port:
`npm run dev -- -p 3002`, and update `NEXT_PUBLIC_SITE_URL` to match.

## Environment variables

| Name | Purpose |
|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Shared Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Shared anon key (safe for the browser) |
| NEXT_PUBLIC_CRM_URL | Address of the deployed CRM app |
| NEXT_PUBLIC_SITE_URL | Address of the deployed portfolio |

This app does not need the service role key.

## Deploy on Vercel

Create a separate Vercel project for this folder, add the four variables, and deploy.
