# ALAIA Surf Coach: Headless CMS

Showcase website and headless CMS for a surf coach based in New Zealand. The coach manages content, lesson slots, and user accounts from an admin panel. Visitors can contact the coach and request a custom surf trip.

## Stack

| Layer | Technology |
|---|---|
| Backend | Node.js / Express 5 (ESM) |
| Database | MySQL with mysql2/promise |
| Validation | Zod |
| Authentication | JWT + Argon2 |
| File storage | Multer + Cloudinary |
| Emails | Nodemailer + Brevo SMTP |
| Frontend | Next.js 15 / TypeScript / Tailwind CSS |
| UI components | shadcn/ui |

## Structure

```
simple-headless-cms/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── config/
│   │   └── utils/
│   ├── db.sql
│   └── .env.example
└── frontend/
    ├── app/
    │   ├── (public)/
    │   ├── (admin)/
    │   └── (auth)/
    ├── components/
    └── .env.example
```

## Installation

### Prerequisites

- Node.js 18+
- MySQL
- Yarn

### Database

Create a MySQL database and import `backend/db.sql`.

### Backend

```bash
cd backend
yarn install
cp .env.example .env
# Fill in the variables in .env
yarn dev
```

The backend starts on `http://localhost:3000`.

### Frontend

```bash
cd frontend
yarn install
cp .env.example .env.local
# Fill in the variables in .env.local
yarn dev
```

The frontend starts on `http://localhost:3001`.

## Environment variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `DB_HOST` | MySQL host |
| `DB_USER` | MySQL user |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `PORT` | Server port (default: 3000) |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | Token validity duration (e.g. `7d`) |
| `BREVO_SMTP_HOST` | Brevo SMTP host |
| `BREVO_SMTP_PORT` | Brevo SMTP port |
| `BREVO_SMTP_USER` | Brevo SMTP username |
| `BREVO_SMTP_PASS` | Brevo SMTP password |
| `SMTP_FROM` | Sender email address |
| `CONTACT_EMAIL` | Recipient address for contact form submissions |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `CLIENT_URL` | Frontend URL (for CORS) |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API URL |
| `NEXT_PUBLIC_SITE_URL` | Frontend URL |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |

## Features

### Public
- CMS pages: home, about, surf in New Zealand, FAQ, legal
- Available lesson slot calendar
- Contact, booking, and surf trip request forms (email-only)

### Admin
- JWT authentication with HttpOnly cookie
- Content management for all public pages
- Lesson slot management
- Media management (Cloudinary upload)
- User account management (email invitation)
