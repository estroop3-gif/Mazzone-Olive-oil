# 🫒 Mazzone Olive Oil — Digital Platform

> Dal cuore della Sicilia, alla tua tavola.

Modern e-commerce platform for Mazzone Olive Oil. Built as a pitch mockup to demonstrate
what an elevated digital presence looks like for an authentic Sicilian olive oil brand.

## Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS → Vercel
- **Backend**: FastAPI (Python) → Railway/Fly.io
- **Database**: Supabase (PostgreSQL + Auth + Storage)
- **Payments**: Stripe (one-time + subscriptions)
- **Email**: Resend

## Getting Started

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # fill in your keys
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local  # fill in your keys
npm run dev
```

### Database
1. Create a Supabase project
2. Run migrations in order: `supabase/migrations/001_initial_schema.sql`, then `002_rls_policies.sql`
3. Optionally run `supabase/seed.sql` for demo data

## Project Structure

```
mazzone-olive-oil/
├── frontend/           # Next.js 14 (Vercel)
│   ├── src/
│   │   ├── app/        # App Router pages
│   │   ├── components/ # React components
│   │   ├── lib/        # Utilities, API client
│   │   └── types/      # TypeScript types
│   └── public/         # Static assets
├── backend/            # FastAPI
│   └── app/
│       ├── routers/    # API routes
│       ├── models/     # Pydantic schemas
│       └── config.py   # Environment config
├── supabase/           # Database
│   ├── migrations/     # SQL migrations
│   └── seed.sql        # Demo data
└── docs/               # Brand & pitch docs
```

## Features

- [x] Product catalog with tasting notes
- [x] Shopping cart & Stripe checkout
- [x] Customer accounts (Supabase Auth)
- [x] Olive Oil Club (subscriptions)
- [x] Recipe & culture blog
- [x] Inventory management
- [x] Newsletter signup
- [x] Mobile-responsive luxury design
- [x] SEO optimized (Next.js SSR)
- [x] Italian/English bilingual copy
