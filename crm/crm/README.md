# Emmy Saint: CRM (Leads)

Private app for handling enquiries that come through the portfolio contact form.

## What it does

- Lists leads, with filters by status
- Lead details: the message, the source, and contact links (email, and WhatsApp when a phone number is saved)
- Status pipeline: New, Contacted, In progress, Won, Lost, Archived
- Follow-up dates, and a dashboard count of follow-ups due
- Private notes on each lead
- Delete with a confirmation prompt

New messages from the portfolio appear here straight away, because both apps use the same database.

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in your values
npm run dev -- -p 3001       # runs on http://localhost:3001
```

## Environment variables

| Name | Purpose |
|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Shared Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Shared anon key (safe for the browser) |
| NEXT_PUBLIC_ADMIN_URL | Address of the deployed projects admin |
| NEXT_PUBLIC_SITE_URL | Address of the deployed portfolio |

This app does not need the service role key. Only admin accounts can read or change leads.

## Deploy on Vercel

Create a separate Vercel project for this folder, add the four variables, and deploy.
