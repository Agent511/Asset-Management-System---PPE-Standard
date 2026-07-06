# 🏢 Asset Management System (PP&E Standard)

A robust, enterprise-grade Asset Management System designed to track, audit, and manage physical assets in compliance with **Property, Plant, and Equipment (PP&E)** accounting standards (IAS 16 / US GAAP).

---

## 🚀 Key Features

*   **PP&E Lifecycle Tracking**: Monitor assets from initial acquisition, through active depreciation, to eventual disposal or retirement.
*   **Automated Depreciation Engine**: Supports Straight-Line, Double-Declining Balance, and Units of Production methods with automated monthly ledger updates.
*   **Compliance & Audit Logging**: Full historical audit trails for revaluations, impairment testing, and component-level asset modifications.
*   **Maintenance & Schedule Management**: Track maintenance costs, schedule preventive overhauls, and automatically determine whether costs should be capitalized or expensed.
*   **Secure Role-Based Access Control (RBAC)**: Distinct permissions for Asset Managers, Financial Accountants, and System Auditors.

---

## 🛠️ Tech Stack

### Frontend
*   **React** (v19) - Component-based user interface.
*   **TypeScript** - Strict type-safety across asset models and API contracts.
*   **TailwindCSS** / **Shadcn UI** - Modern, responsive dashboard design.

### Backend
*   **Node.js** & **Express.js** - RESTful API gateway handling business logic and financial calculations.
*   **TypeScript** - Shared types and compilation safety on the server side.

### Database
*   **PostgreSQL** - Relational database ensuring ACID compliance for strict financial transaction logging.
*   **Prisma ORM** / **Sequelize** - Database schema migrations and type-safe queries.

---

## 📦 Project Structure

```text
├── Asset.../
│   ├── server/                # Express.js Server
│   │   ├── src/
│   │   │   ├── controllers/    # Asset & Depreciation logic
│   │   │   ├── models/         # PostgreSQL DB Schemas (Prisma/Sequelize)
│   │   │   ├── routes/         # API Endpoints
│   │   │   └── services/       # IAS 16 Financial calculation engines
│   │   └── package.json
│   │
│   └── client/               # React Application
│       ├── src/
│       │   ├── components/     # Asset registers, charts, forms
│       │   ├── hooks/          # Custom state fetchers
│       │   ├── types/          # PP&E TypeScript interfaces
│       │   └── views/          # Dashboard, Audit, Reports pages
│       └── package.json
```

---

## ⚙️ Installation & Setup

### Prerequisites
Ensure you have the following installed locally:
*   [Node.js](https://nodejs.org) (v18.x or higher)
*   [PostgreSQL](https://postgresql.org) (v14 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com
cd Asset-Management-System---PPE-Standard
```

### 2. Configure Environment Variables
Create a `.env` file in the `apps/backend/` directory:
```env
PORT=5000
DATABASE_URL="postgresql://username:password@localhost:5432/asset_management"
FRONTEND_URL=http://localhost:5173
```

### 3. Backend Setup
Navigate to the backend directory, install dependencies, run migrations, and start the server:
```bash
cd server
npm install
npm run migrate   # Run database migrations to set up asset tables
npm run dev          # Starts server on http://localhost:5000
```

### 4. Frontend Setup
Open a new terminal, navigate to the frontend directory, install dependencies, and start the development server:
```bash
cd client
npm install
npm run dev          # Starts web app on http://localhost:5173
```

---

## 🧮 PP&E Schema Overview (PostgreSQL Core Entities)

The system relies on a highly relational data layer to ensure reporting precision. Key tables include:
*   `Assets`: Core metadata (Serial number, component grouping, location, legal owner).
*   `FinancialDetails`: Cost tracking, residual value, historical impairment flags, and useful life metrics.
*   `DepreciationSchedules`: Monthly rows tracking opening net book value (NBV), current depreciation expense, and closing NBV.
*   `AuditLogs`: Immutable tracking of user actions changing any financial field.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps to maintain strict standards:
1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git checkout origin feature/AmazingFeature`).
5. Open a Pull Request.

---

