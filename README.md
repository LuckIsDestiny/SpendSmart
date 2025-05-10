# SpendSmart - Personal Finance Management Application

SpendSmart is a modern, user-friendly personal finance management application that helps users track their expenses, manage budgets, set savings goals, and make informed financial decisions.

## Features

### 1. Dashboard
- Overview of financial health
- Quick access to key metrics
- Visual representation of spending patterns
- Monthly income and expense trends

### 2. Accounts Management
- Track multiple bank accounts
- Monitor account balances
- View transaction history
- Account-wise analytics

### 3. Budget Management
- Create and manage budgets by category
- Set monthly/weekly spending limits
- Track budget utilization
- Visual progress indicators
- Export budget reports to PDF

### 4. Savings Goals
- Set and track savings goals
- Monitor progress with visual indicators
- Set target dates and amounts
- Track contributions
- Support for multiple savings goals

### 5. Financial Schemes
- Browse government and private financial schemes
- Filter schemes by category (Savings, Education, Housing, Insurance)
- View eligibility criteria
- Direct links to scheme applications
- Search functionality

### 6. Reports & Analytics
- Detailed spending analysis
- Category-wise expense breakdown
- Income vs. expense trends
- Customizable date ranges
- Export reports to PDF

### 7. AI Advisor
- Personalized financial recommendations
- Smart spending insights
- Budget optimization suggestions
- Savings opportunities

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- Recharts (for data visualization)
- Framer Motion (for animations)

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/SpendSmart.git
cd SpendSmart
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd SpendSmart-Frontend
npm install

# Install backend dependencies
cd ../SpendSmart-Backend
npm install
```

3. Set up environment variables:
```bash
# Frontend (.env)
REACT_APP_API_URL=http://localhost:5000
REACT_APP_AUTH_TOKEN=your_auth_token

# Backend (.env)
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Start the development servers:
```bash
# Start backend server
cd SpendSmart-Backend
npm run dev

# Start frontend server
cd SpendSmart-Frontend
npm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
SpendSmart/
├── SpendSmart-Frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── api/
│   └── public/
└── SpendSmart-Backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── services/
    └── config/
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the component library
- Recharts for data visualization
- Framer Motion for animations
- All contributors who have helped shape this project

## Contact

Your Name - your.email@example.com
Project Link: [https://github.com/yourusername/SpendSmart](https://github.com/yourusername/SpendSmart) 