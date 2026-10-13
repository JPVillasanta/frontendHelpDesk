# ProductDesk React Client

React + Vite single-page client for the Laravel JSON API. Authentication uses short-lived bearer tokens issued by the API; role and product ownership are enforced by the backend.

## Local run

1. Start the Laravel API at `http://127.0.0.1:8000`.
2. Copy `.env.example` to `.env` and set `VITE_API_URL=http://127.0.0.1:8000`.
3. Run `npm install`, then `npm run dev` and open the Vite URL.
4. For a production build, run `npm run build`.

Demo-only local accounts: `admin@example.com` and `user@example.com`, password `ChangeMe123!`. Do not seed these credentials into a public database.

## Source layout

- `components/common`: layout, navigation, login fields, loading, confirmation, pagination
- `components/user`: product card, list, and form
- `components/admin`: stats and user/product tables
- `pages/user` and `pages/admin`: route-level screens
- `context` and `hooks`: authentication and role helpers
- `services`: API transport and feature-specific API calls

## Render Static Site

Build command: `npm install && npm run build`; publish directory: `dist`. Set `VITE_API_URL` to the deployed backend origin without `/api/v1`. Keep `public/_redirects` so direct SPA routes work. Set the backend `CORS_ALLOWED_ORIGINS` to the exact deployed frontend URL. Vite environment variables are embedded at build time, so rebuild after changing them.
