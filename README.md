# Dental Plaza Sarajevo – website demo

Front-end sales demo built from the Claude Design canvas
“Dental Plaza Sarajevo – web + zakazivanje” (Main / Mobile / Admin frames).
Front-end only: no database, no auth, no e-mails. **Nothing a visitor types is sent anywhere.**

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (must pass before deploying)
npm start        # serve the production build
```

| Route        | What                                             |
| ------------ | ------------------------------------------------ |
| `/`          | Website, Bosnian (default)                       |
| `/en`        | Website, English (BS/EN toggle in the header)    |
| `/admin`     | Admin demo – appointment calendar (no login)     |
| `/en/admin`  | Admin demo in English                            |
| `/robots.txt`| `Disallow: /` (demo must not be indexed)         |

## Deploy to Vercel

1. Push this folder to a GitHub/GitLab repo (e.g. `git init && git add -A && git commit -m "Dental Plaza demo"`, then push).
2. On vercel.com → **Add New… → Project** → import the repo. Framework preset “Next.js” is detected; keep the defaults
   (build `next build`, output `.next`). No environment variables are needed.
3. Deploy and send the `*.vercel.app` link.

Or from the terminal: `npx vercel` (log in once), then `npx vercel --prod`.

The site is already non-indexable: `<meta name="robots" content="noindex, nofollow">` on every page + `robots.txt`.
Optional: Vercel → Settings → Deployment Protection if you want a password too.

## Structure

```
app/
  (bs)/layout.tsx, page.tsx, admin/page.tsx      BS root layout (<html lang="bs">)
  (en)/layout.tsx, en/page.tsx, en/admin/…       EN root layout (<html lang="en">)
  globals.css                                    Tailwind v4 theme tokens (exact design values) + component classes
  fonts/                                         Plus Jakarta Sans + Bodoni Moda (OFL), subset woff2
  robots.ts, icon.svg
components/
  home/home-page.tsx                             assembles the sections
  site/*                                         sections (server components) + small client islands
  booking/*                                      booking flow: provider (state), modal (4 steps + confirmation)
  admin/admin-calendar.tsx                       admin demo
  ui/modal.tsx                                   accessible modal on native <dialog>
lib/
  i18n/bs.ts, en.ts                              ALL user-facing strings
  mock/services.ts, doctors.ts, appointments.ts  mock data
  data/index.ts                                  data-access layer (swap for API calls later)
  time.ts                                        Europe/Sarajevo calendar helpers
public/images/                                   photos from the design (served via next/image)
```

### Adding a backend later

Every read/write goes through `lib/data/index.ts`: `getServices()`, `getDoctors()`, `getAvailableSlots()`,
`submitBookingRequest()`, `getWeekAppointments()`, `getBookingRequests()`. They are already `async` with
API-shaped inputs/outputs (`lib/types.ts`), so replacing the bodies with `fetch()` / server actions doesn't touch the UI.

### Time slots

Mon–Fri 10:00–18:00, Europe/Sarajevo, 30-minute grid; a slot is offered only if the whole service duration fits
before 18:00. Weekends are disabled. Some slots are deterministically “taken”, and the 2nd working day in the
booking window is fully booked to show the “no free slots → nearest day” state. Bookable window: tomorrow + 14 days.
