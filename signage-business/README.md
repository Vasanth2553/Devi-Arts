# Signage Business Website

## Overview

A production-quality **Signage, Printing & Shop Branding** business website built as a monorepo with:

- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS + Framer Motion
- **Backend**: Django 5 + Django REST Framework + PostgreSQL

The website's primary goal is to **generate qualified customer enquiries** via a multi-step quote builder.

---

## Architecture

```
Frontend (Next.js :3000)
        │
        │  REST API (JSON)
        ▼
Backend (Django :8000)
        │
        ▼
   PostgreSQL DB
```

**Communication**: Frontend → Django REST API → PostgreSQL  
**File uploads**: Frontend → Django media storage (`media/`)  
**Admin**: Django Admin at `/admin/`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| Icons | Lucide React |
| Forms | React Hook Form + Zod |
| Backend | Django 5.1 |
| API | Django REST Framework 3.15 |
| Database | PostgreSQL |
| File Storage | Django media files |
| CORS | django-cors-headers |

---

## Folder Structure

```
signage-business/
│
├── frontend/                   # Next.js application
│   ├── app/                    # App Router pages & layouts
│   │   ├── (site)/             # Main site route group
│   │   │   ├── page.tsx        # Homepage
│   │   │   ├── services/       # /services + /services/[slug]
│   │   │   ├── portfolio/      # /portfolio + /portfolio/[slug]
│   │   │   ├── about/
│   │   │   ├── process/
│   │   │   ├── contact/
│   │   │   ├── quote/
│   │   │   └── faq/
│   │   ├── layout.tsx          # Root layout
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── sections/           # Homepage sections
│   │   ├── ui/                 # Reusable UI primitives
│   │   ├── quote/              # Quote builder steps
│   │   ├── portfolio/          # Portfolio components
│   │   └── services/           # Service page components
│   ├── lib/
│   │   ├── api/                # API layer (client.ts, enquiries.ts...)
│   │   ├── data/               # Static data (services.ts, portfolio.ts...)
│   │   └── utils.ts
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript type definitions
│   ├── public/                 # Static assets
│   └── .env.local              # Frontend environment variables
│
├── backend/                    # Django application
│   ├── config/                 # Django settings & URLs
│   ├── customers/              # Customer model & admin
│   ├── enquiries/              # Enquiry, UploadedFile models & API
│   ├── media/                  # Uploaded files (gitignored)
│   ├── manage.py
│   ├── requirements.txt
│   └── .env                    # Backend environment variables
│
├── README.md
└── .gitignore
```

---

## Frontend Setup

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local with your values
npm run dev
```

Frontend runs at: `http://localhost:3000`

---

## Backend Setup

### Prerequisites
- Python 3.11+
- PostgreSQL 14+

### Install & Run

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (macOS/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
python manage.py migrate

# Create superuser (for Django Admin access)
python manage.py createsuperuser

# Run development server
python manage.py runserver
```

Backend runs at: `http://localhost:8000`  
Django Admin: `http://localhost:8000/admin/`

---

## Database Setup

1. Install PostgreSQL
2. Create database:

```sql
CREATE DATABASE signage_db;
CREATE USER postgres WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE signage_db TO postgres;
```

3. Update `.env` with your credentials
4. Run `python manage.py migrate`

---

## Environment Variables

### Frontend (`frontend/.env.local`)

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Django backend URL | `http://localhost:8000` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Business WhatsApp number | `919876543210` |
| `NEXT_PUBLIC_BUSINESS_PHONE` | Business phone number | `+91 98765 43210` |
| `NEXT_PUBLIC_BUSINESS_EMAIL` | Business email | `hello@yourbusiness.com` |

### Backend (`backend/.env`)

| Variable | Description |
|----------|-------------|
| `SECRET_KEY` | Django secret key |
| `DEBUG` | `True` for development |
| `DB_NAME` | PostgreSQL database name |
| `DB_USER` | PostgreSQL username |
| `DB_PASSWORD` | PostgreSQL password |
| `DB_HOST` | PostgreSQL host |
| `DB_PORT` | PostgreSQL port |
| `ALLOWED_HOSTS` | Comma-separated allowed hosts |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend origins |
| `MEDIA_ROOT` | Media file storage path |
| `MEDIA_URL` | Media URL prefix |
| `MAX_UPLOAD_SIZE_MB` | Max file upload size in MB |

---

## API Documentation

### Public Endpoints

#### `POST /api/enquiries/`
Submit a quote request.

**Request body:**
```json
{
  "customer_name": "Vasanth",
  "customer_phone": "+91 98765 43210",
  "customer_whatsapp": "+91 98765 43210",
  "customer_email": "vasanth@example.com",
  "customer_business_name": "Vasanth Textiles",
  "customer_business_type": "RETAIL",
  "customer_location": "Chennai",
  "service": "LED Sign Board",
  "sign_type": "Front Lit",
  "material": "Acrylic",
  "lighting": "LED Front Lit",
  "width": 6,
  "height": 2,
  "unit": "FEET",
  "quantity": 1,
  "installation_required": true,
  "message": "Need for new shop opening"
}
```

**Response:**
```json
{
  "success": true,
  "reference_id": "QTE-2026-000001",
  "enquiry_id": 1,
  "message": "Your quote request has been received..."
}
```

#### `POST /api/enquiries/upload/`
Upload a file (logo/design) for an enquiry.

**Form Data:**
- `enquiry_id`: integer
- `file`: file (JPG, PNG, PDF, SVG, AI, CDR)

---

### Admin Endpoints (requires Django staff authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/admin/enquiries/` | List all enquiries |
| `GET` | `/api/admin/enquiries/{id}/` | Get enquiry detail |
| `PATCH` | `/api/admin/enquiries/{id}/` | Update enquiry status |
| `GET` | `/api/admin/customers/` | List all customers |

---

## Production Deployment

### Frontend (Vercel / Static Host)
```bash
cd frontend
npm run build
```

### Backend (Gunicorn + Nginx)
```bash
cd backend
source venv/bin/activate
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

Key production checklist:
- [ ] Set `DEBUG=False`
- [ ] Use strong `SECRET_KEY`
- [ ] Configure PostgreSQL with production credentials
- [ ] Set `ALLOWED_HOSTS` to your domain
- [ ] Set `CORS_ALLOWED_ORIGINS` to your frontend domain
- [ ] Configure media file serving (Nginx or S3)
- [ ] Enable HTTPS
- [ ] Run `python manage.py collectstatic`

---

## Development Phases

- [x] **Phase 1** — Project Foundation (current)
- [ ] **Phase 2** — Design System
- [ ] **Phase 3** — Homepage
- [ ] **Phase 4** — Service Pages
- [ ] **Phase 5** — Portfolio
- [ ] **Phase 6** — Sign Customizer
- [ ] **Phase 7** — Quote Builder
- [ ] **Phase 8** — Django Backend
- [ ] **Phase 9** — Frontend ↔ Backend Integration
- [ ] **Phase 10** — Django Admin
- [ ] **Phase 11** — SEO & Performance
- [ ] **Phase 12** — Production

---

## Troubleshooting

### `psycopg2` install fails
Install build dependencies:
```bash
# Ubuntu/Debian
sudo apt-get install python3-dev libpq-dev

# macOS
brew install postgresql
```

Or use `psycopg2-binary` (already in requirements.txt for dev).

### CORS errors in browser
Ensure `CORS_ALLOWED_ORIGINS` in backend `.env` includes your frontend URL exactly (including `http://` and port).

### Media files not serving
In development, `DEBUG=True` must be set and `django.conf.urls.static` is used automatically.

---

*This is a quotation-driven business website — there is no shopping cart or payment processing.*
