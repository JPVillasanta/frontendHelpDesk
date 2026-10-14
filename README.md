**Vercel**: [https://frontend-help-desk-one.vercel.app/](https://frontend-help-desk-one.vercel.app/)

# Helpdesk Ticket Management System

React + Vite SPA frontend for a Laravel REST API. The exam login is client-side only (`itadmin` / `helpdesk123`) as required by the brief. Ticket data is stored by Laravel in the configured database.

## Local setup

1. Install Git, Node.js, PHP, and Composer.
2. Clone the frontend and backend repositories.
3. In the backend: `composer install`, copy `.env.example` to `.env`, configure a database, then run `php artisan key:generate`, `php artisan migrate`, and `php artisan serve`.
4. In this frontend: copy `.env.example` to `.env`, set `VITE_API_URL=http://127.0.0.1:8000`, run `npm install`, then `npm run dev`.
5. Open the Vite URL. Sign in with `itadmin` / `helpdesk123`.

## API

The frontend calls `GET/POST /api/v1/tickets` and `GET/PUT/DELETE /api/v1/tickets/{id}`. Configure `VITE_API_URL` to the backend origin without `/api/v1`.

The login is intentionally client-side for this lab requirement. It is not suitable as production authentication. Do not commit `.env` files.
