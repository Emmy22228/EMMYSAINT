# Emmy Saint: Three Connected Apps

Three separate apps, one shared database.

```
            ┌──────────────────────────┐
            │  Supabase (one project)  │
            │  projects, leads, notes, │
            │  admin_users, storage    │
            └──────────────────────────┘
               ▲         ▲          ▲
               │         │          │
   reads projects   manages projects  manages leads
               │         │          │
   ┌───────────┴──┐ ┌────┴─────┐ ┌──┴───────┐
   │  portfolio   │ │  admin   │ │   crm    │
   │  (public)    │ │ projects │ │  leads   │
   └──────────────┘ └──────────┘ └──────────┘
          ▲
          │ visitors send the contact form → saved as a lead
```

| App | Folder | Who uses it | Does |
|---|---|---|---|
| Portfolio | `portfolio/` | Visitors | Shows published projects. Contact form creates leads. |
| Admin | `admin/` | You | Adds, edits, publishes, deletes projects and uploads images |
| CRM | `crm/` | You | Reviews leads, sets status and follow-ups, adds private notes |

## How they connect

1. **Same database.** All three use the same Supabase URL and keys.
2. **Contact form → CRM.** The portfolio's contact form saves each message as a row in `leads`. It appears in the CRM immediately.
3. **Admin → Portfolio.** Projects you publish in the admin appear on the portfolio within about 60 seconds.
4. **Same login list.** Admin and CRM both check the `admin_users` table. Add your user there once and you can sign in to both. Each app keeps its own login session, so you sign in separately on each address.

## Setup order

1. **Database** (once): In Supabase, open SQL Editor and run, in this order:
   - `supabase/schema.sql` on a fresh project. If you already ran the older single-app schema, run `supabase/migrate-v1-to-v2.sql` instead.
   - `supabase/storage.sql`
   - `supabase/seed.sql` (optional)
2. **Admin account** (once): In Supabase > Authentication > Users, add your user. Then run:
   ```sql
   insert into public.admin_users (user_id) values ('YOUR-USER-ID');
   ```
3. **Each app**: Copy `.env.example` to `.env.local`, fill in the values, then run `npm install` and `npm run dev`. Local ports:
   - Portfolio: http://localhost:3000
   - Admin: `npm run dev -- -p 3002`
   - CRM: `npm run dev -- -p 3001`
4. **Deploy** each folder as its own Vercel project. Set each app's environment variables, and set the `*_URL` variables to the deployed addresses so the apps can link to each other.

## Environment variables by app

| Variable | Portfolio | Admin | CRM |
|---|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL | yes | yes | yes |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | yes | yes | yes |
| SUPABASE_SERVICE_ROLE_KEY | yes (server only) | no | no |
| NEXT_PUBLIC_CRM_URL | no | yes | no |
| NEXT_PUBLIC_ADMIN_URL | no | no | yes |
| NEXT_PUBLIC_SITE_URL | yes | yes | yes |

Only the portfolio needs the service role key, and only to save contact form messages. Keep it out of the admin and CRM apps.

## Known limits

- Project changes can take up to about 60 seconds to show on the portfolio.
- Contact form spam protection uses a hidden field. Add a CAPTCHA later if spam appears.
- Profile text and social links are still in `portfolio/src/data/content.ts`. Managing them from the admin is a later step.
- Nothing has been run or tested yet. Run `npm run build` in each folder and send me any errors.
