# ALAIA Surf Coach — Headless CMS

Site vitrine et CMS headless pour un coach de surf basé en Nouvelle-Zélande. Le coach gère ses contenus, créneaux de cours et comptes utilisateurs depuis un panneau d'administration. Les visiteurs peuvent contacter le coach et demander un surf trip sur mesure.

## Stack

| Élément | Technologie |
|---|---|
| Backend | Node.js / Express 5 (ESM) |
| Base de données | MySQL avec mysql2/promise |
| Validation | Zod |
| Authentification | JWT + Argon2 |
| Fichiers | Multer + Cloudinary |
| Emails | Nodemailer + Brevo SMTP |
| Frontend | Next.js 15 / TypeScript / Tailwind CSS |
| Composants UI | shadcn/ui |

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

### Prérequis

- Node.js 18+
- MySQL
- Yarn

### Base de données

Créer une base de données MySQL et importer le fichier `backend/db.sql`.

### Backend

```bash
cd backend
yarn install
cp .env.example .env
# Renseigner les variables dans .env
yarn dev
```

Le backend démarre sur `http://localhost:3000`.

### Frontend

```bash
cd frontend
yarn install
cp .env.example .env.local
# Renseigner les variables dans .env.local
yarn dev
```

Le frontend démarre sur `http://localhost:3001`.

## Variables d'environnement

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `DB_HOST` | Hôte MySQL |
| `DB_USER` | Utilisateur MySQL |
| `DB_PASSWORD` | Mot de passe MySQL |
| `DB_NAME` | Nom de la base de données |
| `PORT` | Port du serveur (défaut : 3000) |
| `JWT_SECRET` | Clé secrète pour signer les tokens JWT |
| `JWT_EXPIRES_IN` | Durée de validité du token (ex: `7d`) |
| `BREVO_SMTP_HOST` | Hôte SMTP Brevo |
| `BREVO_SMTP_PORT` | Port SMTP Brevo |
| `BREVO_SMTP_USER` | Identifiant SMTP Brevo |
| `BREVO_SMTP_PASS` | Mot de passe SMTP Brevo |
| `SMTP_FROM` | Adresse expéditeur des emails |
| `CONTACT_EMAIL` | Adresse de réception des messages du formulaire |
| `CLOUDINARY_CLOUD_NAME` | Nom du cloud Cloudinary |
| `CLOUDINARY_API_KEY` | Clé API Cloudinary |
| `CLOUDINARY_API_SECRET` | Secret API Cloudinary |
| `CLIENT_URL` | URL du frontend (pour CORS) |

### Frontend (`frontend/.env.local`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL de l'API backend |
| `NEXT_PUBLIC_SITE_URL` | URL du frontend |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Nom du cloud Cloudinary |

## Fonctionnalités

### Public
- Pages CMS : accueil, à propos, surf en Nouvelle-Zélande, FAQ, mentions légales
- Calendrier des créneaux de cours disponibles
- Formulaire de contact, de réservation et de demande de surf trip (email-only)

### Administration
- Authentification JWT avec cookie HttpOnly
- Gestion du contenu de toutes les pages publiques
- Gestion des créneaux de cours
- Gestion des médias (upload Cloudinary)
- Gestion des comptes utilisateurs (invitation par email)
