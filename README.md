# SpendSmart - Personal Finance Management Application

SpendSmart is a modern, user-friendly personal finance management application that helps users track their expenses, manage budgets, set savings goals, and make informed financial decisions. The application is built with a microservices architecture to ensure scalability and maintainability.

## Features

### 1. Dashboard
- Real-time overview of financial health
- Quick access to key metrics and KPIs
- Interactive charts for spending patterns
- Monthly income and expense trends
- Budget vs. actual spending comparison

### 2. Accounts Management
- Track multiple bank accounts and credit cards
- Real-time balance monitoring
- Detailed transaction history
- Account-wise analytics and insights
- Transaction categorization
- Export transaction history

### 3. Budget Management
- Create and manage budgets by category
- Set monthly/weekly spending limits
- Track budget utilization with visual indicators
- Budget alerts and notifications
- Export budget reports to PDF
- Budget vs. actual comparison charts

### 4. Savings Goals
- Set and track multiple savings goals
- Progress tracking with visual indicators
- Flexible target dates and amounts
- Contribution tracking and history
- Goal completion notifications
- Export savings reports

### 5. Financial Schemes
- Browse government and private financial schemes
- Category-based filtering (Savings, Education, Housing, Insurance)
- Detailed eligibility criteria
- Direct application links
- Advanced search functionality
- Scheme comparison tools

### 6. Reports & Analytics
- Comprehensive spending analysis
- Category-wise expense breakdown
- Income vs. expense trends
- Customizable date ranges
- Export reports to PDF
- Interactive charts and graphs

### 7. AI Advisor
- Personalized financial recommendations
- Smart spending insights
- Budget optimization suggestions
- Savings opportunities
- Financial goal recommendations
- Market trend analysis

## Tech Stack

### Frontend
- React.js 18.x
- Material-UI (MUI) 5.x
- React Router 6.x
- Recharts 2.x (for data visualization)
- Framer Motion 10.x (for animations)
- Axios (for API calls)
- React Query (for data fetching)
- React Hook Form (for form handling)

### Backend
- Node.js 18.x
- Express.js 4.x
- MongoDB 6.x
- JWT Authentication
- Microservices Architecture:
  - Auth Service (Port: 3001)
  - Manual Transactions Service (Port: 3005)
  - Budget Savings Service (Port: 3003)
  - AI Advisor Service (Port: 3004)
  - API Gateway (Port: 9090)
  - MongoDB (Port: 27017)
  - Ollama LLM Service (Port: 11434)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm (v8 or higher) or yarn (v1.22 or higher)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/LuckIsDestiny/SpendSmart.git
cd SpendSmart
```

2. Install frontend dependencies:
```bash
cd SpendSmart-Frontend
npm install
```
<!-- 
3. Set up environment variables:

Backend Services:

Auth Service (.env):
```env
PORT=3001
MONGODB_URI=mongodb://mongo:27017/spendsmart_auth
JWT_SECRET=supersecretkey123456789
```

Manual Transactions Service (.env):
```env
PORT=3005
MONGODB_URI=mongodb://mongo:27017/spendsmart_expense
JWT_SECRET=supersecretkey123456789
EXCHANGE_RATE_API_KEY=your_exchange_rate_api_key
```

Budget Savings Service (.env):
```env
PORT=3003
MONGODB_URI=mongodb://mongo:27017/spendsmart_budget
JWT_SECRET=supersecretkey123456789
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_email_password
AUTH_SERVICE_URL=http://auth-service:3001
MANUAL_TRANSACTIONS_SERVICE_URL=http://manual-transactions-service:3005
```

AI Advisor Service (.env):
```env
PORT=3004
JWT_SECRET=supersecretkey123456789
AUTH_SERVICE_URL=http://auth-service:3001
MODEL_NAME=llama3.2
MODEL_PROVIDER=ollama
OLLAMA_HOST=http://ai-llm:11434
```

API Gateway (.env):
```env
JWT_SECRET=supersecretkey123456789
AUTH_SERVICE_URL=http://auth-service:3001
MANUAL_TRANSACTIONS_SERVICE_URL=http://manual-transactions-service:3005
BUDGET_SAVINGS_SERVICE_URL=http://budget-savings-service:3003
AI_ADVISOR_SERVICE_URL=http://ai-advisor-service:3004
``` -->

3. Start the application:

Using Docker Compose (recommended):
```bash
# Start all backend services and frontend
cd SpendSmart-Backend
docker compose up

# In a new terminal, start the frontend (if not using Docker)
cd SpendSmart-Frontend
npm start
```

Or start services individually (without Docker):
```bash
# Install backend dependencies for each service
cd SpendSmart-Backend/auth-service && npm install
cd ../manual-transactions-service && npm install
cd ../budget-savings-service && npm install
cd ../ai-advisor-service && npm install
cd ../api-gateway && npm install

# Start backend services
cd SpendSmart-Backend
npm run dev

# Start frontend server (in a new terminal)
cd SpendSmart-Frontend
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- API Gateway: `http://localhost:9090`
- API Documentation: `http://localhost:9876`
- MongoDB: `mongodb://localhost:27017`
- Ollama LLM: `http://localhost:11434`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
