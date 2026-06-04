I think you want all the information consolidated into a single, clean README file. Here's the complete, ready-to-use README.md file:

```markdown
# MediConnect — Telemedicine Platform

A production-ready telemedicine platform enabling virtual visits, symptom triage, appointment booking, and clinician consultations.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Authentication Flow](#authentication-flow)
- [Database Models](#database-models)
- [Testing](#testing)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Development Roadmap](#development-roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14 · React 18 · TypeScript · Tailwind CSS |
| Backend | Node.js · Express · TypeScript |
| Database | MongoDB · Mongoose ODM |
| Authentication | JWT (Access + Refresh Tokens) |
| Payments | Stripe |
| Video Calls | Twilio Programmable Video |
| AI Chat | OpenAI GPT-4o-mini |
| Email | SendGrid |
| Deployment | Vercel (Frontend) · Railway/AWS ECS (Backend) |
| Container | Docker |
| CI/CD | GitHub Actions |

---

## Quick Start

### Prerequisites

- Node.js 20+
- MongoDB 7+ (local or Docker)
- npm or pnpm package manager

### Installation

```bash
# Clone repository
git clone https://github.com/your-org/telemedicine.git
cd telemedicine

# Install backend dependencies
cd apps/api && npm install

# Install frontend dependencies
cd ../web && npm install
```

### Environment Setup

```bash
# Copy example environment files
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Generate secure JWT secrets (64+ characters)
openssl rand -hex 64
```

### Seed Database

```bash
cd apps/api
npm run seed
```

**Default Test Accounts:**
- **Admin:** `admin@mediconnect.com` / `Admin@1234`
- **Patient:** `patient@mediconnect.com` / `Patient@1234`

The seed script creates:
- 9 medical services
- 3 clinicians
- 6 partner organizations

### Run Development Servers

```bash
# Terminal 1 - Backend (http://localhost:4000)
cd apps/api && npm run dev

# Terminal 2 - Frontend (http://localhost:3000)
cd apps/web && npm run dev
```

### Docker Setup (Alternative)

```bash
# Start all services
docker-compose up --build

# Seed database inside container
docker-compose exec api npm run seed
```

---

## Project Structure

```
telemedicine/
├── apps/
│   ├── api/                      # Express backend
│   │   ├── src/
│   │   │   ├── controllers/      # Request handlers
│   │   │   ├── middleware/       # Auth, validation, rate limiting
│   │   │   ├── models/           # Database schemas
│   │   │   ├── routes/           # API endpoints
│   │   │   ├── services/         # Business logic
│   │   │   └── index.ts
│   │   ├── scripts/              # Database seed scripts
│   │   ├── tests/                # Unit & integration tests
│   │   └── package.json
│   └── web/                      # Next.js frontend
│       ├── app/                  # App router pages
│       ├── components/           # Reusable components
│       ├── libs/                 # Utilities, hooks, services
│       └── public/               # Static assets
├── libs/
│   └── common/                   # Shared TypeScript types
├── infra/
│   ├── Dockerfile.api
│   └── Dockerfile.web
├── .github/workflows/ci.yml
├── docker-compose.yml
└── README.md
```

---

## API Reference

**Base URL:** `http://localhost:4000/api`

All protected endpoints require:
```
Authorization: Bearer <access_token>
```

### Authentication Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | None | Create new account |
| POST | `/auth/login` | None | Login and get tokens |
| POST | `/auth/refresh` | None | Rotate refresh token |
| GET | `/auth/me` | ✅ | Get current user |
| POST | `/auth/logout` | ✅ | Revoke current session |
| POST | `/auth/logout-all` | ✅ | Revoke all sessions |

**Register Request:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Secret@123"
}
```

**Login Request:**
```json
{
  "email": "jane@example.com",
  "password": "Secret@123"
}
```

**Response (both):**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGci...",
    "refreshToken": "a3f9c2...",
    "user": {
      "_id": "...",
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "patient"
    }
  }
}
```

### Services

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/services` | Public | List all active services |
| GET | `/services/:id` | Public | Get service details |
| POST | `/services` | Admin | Create new service |
| PATCH | `/services/:id` | Admin | Update service |
| DELETE | `/services/:id` | Admin | Delete service |

### Appointments

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/appointments` | ✅ | Book appointment |
| GET | `/appointments` | ✅ | List own appointments |
| GET | `/appointments/:id` | ✅ | Get appointment details |
| PATCH | `/appointments/:id` | ✅ | Cancel or update |

**Book Appointment Request:**
```json
{
  "serviceId": "605c72ef1532073d68a4f0a1",
  "preferredStart": "2026-05-03T14:00:00Z",
  "patientNotes": "Sore throat for 3 days"
}
```

### Chat

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/chat/session` | Optional | Start chat session |
| POST | `/chat/session/:id/message` | Optional | Send message |
| GET | `/chat/session/:id` | ✅ | Get full session |
| GET | `/chat/sessions` | ✅ | Patient's sessions |

### Admin Analytics

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/admin/metrics` | Admin | All platform KPIs |

**Admin Metrics Response:**
```json
{
  "success": true,
  "data": {
    "dau": 142,
    "mau": 1840,
    "bookingsToday": 38,
    "bookingsThisMonth": 764,
    "conversionRate": 12.4,
    "mrr": 4851,
    "arr": 58212,
    "totalUsers": 1840,
    "premiumUsers": 99,
    "avgConsultRating": 4.7
  }
}
```

### Health Check

```
GET /health → { "status": "ok", "env": "development", "timestamp": "2024-01-01T00:00:00.000Z" }
```

---

## Authentication Flow

```
┌─────────┐         ┌─────────┐         ┌─────────┐
│ Client  │         │   API   │         │   DB    │
└────┬────┘         └────┬────┘         └────┬────┘
     │                   │                   │
     │  POST /login      │                   │
     │──────────────────▶│                   │
     │                   │  Verify password  │
     │                   │──────────────────▶│
     │                   │                   │
     │  {access, refresh}│                   │
     │◀──────────────────│                   │
     │                   │                   │
     │  API + Bearer     │                   │
     │──────────────────▶│                   │
     │                   │  Verify JWT       │
     │                   │  Attach user      │
     │                   │                   │
     │  Response         │                   │
     │◀──────────────────│                   │
     │                   │                   │
     │  POST /refresh    │                   │
     │──────────────────▶│                   │
     │                   │  Rotate tokens    │
     │                   │──────────────────▶│
     │  {new tokens}     │                   │
     │◀──────────────────│                   │
```

### Security Properties

- **Access Tokens:** 15-minute expiry, signed with `JWT_SECRET`
- **Refresh Tokens:** 30-day JWT + bcrypt-hashed copy in database
- **Token Rotation:** Every refresh issues new pair; old token invalidated
- **Reuse Detection:** Old token usage after rotation revokes all sessions
- **Session Limit:** Maximum 5 concurrent sessions per user

---

## Database Models

### User Model
```typescript
{
  name: string,
  email: string,           // Unique, indexed
  passwordHash: string,    // bcrypt, 12 rounds
  role: 'patient' | 'premium' | 'clinician' | 'partner' | 'admin',
  phone?: string,
  dob?: string,
  address?: string,
  subscription: {
    status: 'none' | 'active' | 'cancelled' | 'past_due',
    stripeCustomerId?: string,
    stripeSubscriptionId?: string,
    currentPeriodEnd?: Date
  },
  refreshTokens: string[], // bcrypt hashes, max 5
  isEmailVerified: boolean,
  lastLoginAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Model
```typescript
{
  patientId: ObjectId,
  providerId?: ObjectId,
  serviceId: ObjectId,
  startAt: Date,
  endAt: Date,
  status: 'requested' | 'confirmed' | 'cancelled' | 'completed',
  patientNotes?: string,
  clinicianNotes?: string,
  videoUrl?: string,
  paymentIntentId?: string,
  amountPaid?: number,
  createdAt: Date
}
```

### Chat Session Model
```typescript
{
  patientId?: ObjectId,    // Optional for anonymous chats
  messages: [{
    sender: 'patient' | 'bot' | 'clinician' | 'system',
    text: string,
    timestamp: Date,
    metadata?: {
      triageOutcome?: 'self_care' | 'book_appointment' | 'urgent_care' | 'emergency',
      isDisclaimer?: boolean,
      confidence?: number
    }
  }],
  status: 'active' | 'closed' | 'escalated',
  triageOutcome?: string,
  flaggedForReview: boolean,
  isAnonymous: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Service Model
```typescript
{
  title: string,
  category: string,
  description: string,
  price: number,
  durationMin: number,
  providerIds: ObjectId[],
  tags: string[],
  isPremium: boolean,
  iconName?: string,
  isActive: boolean
}
```

---

## Testing

```bash
cd apps/api

# Run all tests
npm test

# Watch mode (development)
npm run test:watch

# Generate coverage report
npm test -- --coverage

# Run specific test file
npm test -- auth.test.ts
```

---

## Deployment

### Frontend → Vercel

```bash
cd apps/web

# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### Backend → Railway

```bash
cd apps/api

# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway up
```

### Backend → AWS ECS (Production)

```bash
# Build Docker image
docker build -f infra/Dockerfile.api -t mediconnect-api .

# Tag and push to ECR
docker tag mediconnect-api:latest <ecr-uri>:latest
aws ecr get-login-password | docker login --username AWS --password-stdin <ecr-uri>
docker push <ecr-uri>:latest

# Update ECS service
aws ecs update-service --cluster mediconnect --service api --force-new-deployment
```

---

## Environment Variables

### Backend (`apps/api/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | ✅ | development / production |
| `PORT` | ✅ | Server port (default: 4000) |
| `MONGODB_URI` | ✅ | MongoDB connection string |
| `JWT_SECRET` | ✅ | Access token secret (64+ chars) |
| `JWT_REFRESH_SECRET` | ✅ | Refresh token secret (64+ chars) |
| `FRONTEND_URL` | ✅ | CORS origin (e.g., http://localhost:3000) |
| `STRIPE_SECRET_KEY` | ❌ | Stripe API key (payments phase) |
| `STRIPE_WEBHOOK_SECRET` | ❌ | Stripe webhook secret |
| `OPENAI_API_KEY` | ❌ | OpenAI API key (chat phase) |
| `TWILIO_ACCOUNT_SID` | ❌ | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | ❌ | Twilio auth token |
| `SENDGRID_API_KEY` | ❌ | SendGrid email API key |

### Frontend (`apps/web/.env.local`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | ✅ | Backend API URL (http://localhost:4000/api) |
| `NEXT_PUBLIC_APP_URL` | ✅ | Frontend URL (http://localhost:3000) |

---

## Development Roadmap

| Phase | Features | Status |
|-------|----------|--------|
| **Phase 1** | Authentication, User models, Service catalog, Basic booking, Simple chat | ✅ Complete |
| **Phase 2** | AI symptom triage, Prompt engineering, Escalation rules, Chat history | 🚧 In Progress |
| **Phase 3** | Stripe integration, Subscriptions, Checkout flow, Webhooks | 📋 Planned |
| **Phase 4** | Twilio video calls, Room management, Recording, Video quality | 📋 Planned |
| **Phase 5** | Analytics dashboard, Admin metrics, User reports, Export features | 📋 Planned |
| **Phase 6** | Compliance (HIPAA), Audit logs, Encryption, Data retention | 📋 Planned |

---

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Ensure MongoDB is running
mongod --version
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
```

**JWT Secret Too Short**
```bash
# Generate secure secrets (64+ characters)
openssl rand -hex 64
```

**CORS Errors**
- Verify `FRONTEND_URL` in backend `.env`
- Ensure both servers are running on correct ports

**Build Errors**
```bash
# Clear Next.js cache
cd apps/web && rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json && npm install
```

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

---

## License

MIT License - For demo/MVP purposes only.

**Disclaimer:** This software is for demonstration purposes only. Obtain appropriate medical software compliance, legal review, and necessary certifications before production deployment. This platform is not a substitute for professional medical advice, diagnosis, or treatment.

---

## Support

- 📚 Documentation: `/docs` folder
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/telemedicine/issues)
- 📧 Email: `support@mediconnect.com`
- 💬 Discord: [Join our community](https://discord.gg/mediconnect)

---

## Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [MongoDB](https://www.mongodb.com/) - Database
- [OpenAI](https://openai.com/) - GPT integration
- [Twilio](https://twilio.com) - Video infrastructure
- [Stripe](https://stripe.com) - Payment processing
- [Tailwind CSS](https://tailwindcss.com) - Styling

---

## Star History

If you find this project useful, please give it a ⭐ on GitHub!
