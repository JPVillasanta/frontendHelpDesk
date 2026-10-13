# React ProductDesk Client
React 19 + Vite client for the Laravel Product API.
## Local run
1. From this folder run `npm install` (this installs React Router and updates the lockfile).
2. Create `.env` with `VITE_API_URL=http://127.0.0.1:8000`.
3. Start Laravel backend, then run `npm run dev`. Open http://localhost:5173.
Login uses backend-issued bearer token. Demo local accounts: admin@example.com / ChangeMe123! and user@example.com / ChangeMe123!.
## Features
Login/logout, protected routes, role-based admin screen, product search/list/detail/create/edit/delete, admin stats/user list/product deletion, confirmation dialogs, validation/network errors and loading states.
## Render Static Site
Build command: `npm install && npm run build`; publish directory: `dist`. Set `VITE_API_URL` to the deployed backend origin (without /api/v1). Include `public/_redirects` for SPA route fallback. In the backend Render service, set CORS_ALLOWED_ORIGINS to this frontend URL. Redeploy after changing Vite environment variables because they are baked into the build.
