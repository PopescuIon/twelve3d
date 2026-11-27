# Architecture rules
- Contact validation lives in a shared schema with regression tests so all contact forms enforce the same required fields and limits.
- Keep the unused legacy contact function disabled and never record contact details in logs; live forms use EmailJS until a validated server-side delivery service is configured.
- Public sitemap entries live in `scripts/generate-sitemap.ts` (run via `predev`/`prebuild` to write `public/sitemap.xml`) and must stay in sync with public routes in `src/App.tsx`.