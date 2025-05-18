# SpendSmart

A comprehensive personal finance management application that helps users track expenses, manage budgets, and get AI-powered financial advice.

## Features

- User Authentication and Authorization
- Manual Transaction Management
- Budget Planning and Tracking
- Savings Goals
- AI-Powered Financial Advisor
- Interactive Dashboards and Reports

## Prerequisites

- Docker
- Docker Compose
- Node.js (for local development)

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd SpendSmart
```

2. Start all services using Docker Compose:
```bash
docker-compose up
```

This will start all the following services:
- Frontend (React) - http://localhost:3000
- API Gateway - http://localhost:9090
- Auth Service - http://localhost:3001
- Manual Transactions Service - http://localhost:3005
- Budget Savings Service - http://localhost:3003
- AI Advisor Service - http://localhost:3004
- MongoDB - localhost:27017
- AI LLM (Ollama) - http://localhost:11434

## Development

The application is containerized using Docker Compose. The frontend is configured for development with hot reloading enabled.

### Frontend Development
- The frontend runs on port 3000
- Hot reloading is enabled
- API requests are proxied to the API Gateway
- Source code is mounted as a volume for live updates

### Backend Services
- All backend services are containerized
- MongoDB is used as the primary database
- Services communicate through the internal Docker network
- API Gateway handles routing and authentication

## Environment Variables

The following environment variables are configured in docker-compose.yml:

### Frontend
- `REACT_APP_API_URL`: API Gateway URL
- `WDS_SOCKET_PORT`: WebSocket port for hot reloading

### Backend Services
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication
- `SMTP_*`: Email configuration for notifications
- `EXCHANGE_RATE_API_KEY`: API key for currency conversion

## Stopping the Application

To stop all services:
```bash
docker-compose down
```

To stop and remove all data (including MongoDB data):
```bash
docker-compose down -v
```

## Project Structure

```
SpendSmart/
├── docker-compose.yml
├── SpendSmart-Backend/
│   ├── auth-service/
│   ├── manual-transactions-service/
│   ├── budget-savings-service/
│   ├── api-gateway/
│   └── ai-advisor-service/
└── SpendSmart-Frontend/
    ├── Dockerfile
    └── src/
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
