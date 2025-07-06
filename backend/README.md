

### README.md

```markdown
# Erthaloka DAO Backend

A production-ready backend for the Erthaloka DAO regenerative ecosystem governance platform.

## Features

- 🔐 Secure JWT authentication with refresh tokens
- 👥 Role-based access control (Users, Admins)
- 💰 Virtual coin wallet system
- 🗳️ Proposal creation and voting
- 📈 Staking system with rewards
- 🏦 Treasury management
- 📚 Learning platform with rewards
- 🤝 Community pools
- 🛡️ Rate limiting and security measures
- 📊 PostgreSQL database with proper indexing
- 🚀 Docker support for deployment

## Quick Start

1. Clone the repository
2. Copy `.env.example` to `.env` and configure
3. Install dependencies: `npm install`
4. Run migrations: `npm run migrate`
5. Seed database: `npm run seed`
6. Start development server: `npm run dev`

## API Documentation

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/refresh` - Refresh access token

### Wallet
- `GET /api/v1/wallet` - Get wallet info
- `GET /api/v1/wallet/transactions` - Get transaction history
- `POST /api/v1/wallet/topup` - Add coins to wallet
- `POST /api/v1/wallet/send` - Send coins to another user

### Proposals
- `GET /api/v1/proposals` - List proposals
- `POST /api/v1/proposals` - Create proposal
- `GET /api/v1/proposals/:id` - Get proposal details
- `POST /api/v1/proposals/:id/vote` - Vote on proposal
- `POST /api/v1/proposals/:id/invest` - Invest in proposal

### Staking
- `GET /api/v1/staking/status` - Get staking status
- `POST /api/v1/staking/start` - Stake coins
- `POST /api/v1/staking/end` - Unstake coins

### Learning
- `GET /api/v1/learn/courses` - List courses
- `POST /api/v1/learn/courses/:id/start` - Start course
- `PUT /api/v1/learn/courses/:id/progress` - Update progress

### Pools
- `GET /api/v1/pools` - List pools
- `POST /api/v1/pools/:id/join` - Join pool
- `POST /api/v1/pools/:id/leave` - Leave pool

### Admin (Requires admin role)
- `GET /api/v1/admin/users` - List users
- `PUT /api/v1/admin/users/:id` - Update user
- `DELETE /api/v1/admin/users/:id` - Delete user
- `POST /api/v1/admin/proposals/:id/approve` - Approve proposal
- `POST /api/v1/admin/proposals/:id/reject` - Reject proposal
- `GET /api/v1/admin/treasury` - Get treasury info
- `PUT /api/v1/admin/treasury` - Update treasury
- `GET /api/v1/admin/settings` - Get settings
- `PUT /api/v1/admin/settings` - Update settings

## Deployment

### Using Docker
```bash
docker-compose up -d
```

### Manual Deployment (Railway/Render)
1. Set environment variables
2. Deploy using platform CLI or web interface
3. Run migrations after deployment

## Security

- Passwords hashed with bcrypt (12 rounds)
- JWT tokens with short expiry
- Rate limiting on sensitive endpoints
- Input validation on all endpoints
- SQL injection prevention
- CORS configured
- Helmet.js for security headers

## License

MIT
```