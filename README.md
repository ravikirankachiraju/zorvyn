# 💰 Zorvyn Finance Dashboard Task

A modern, high-performance financial management dashboard designed to provide users with deep insights into their spending habits.

It features real-time data filtering, interactive analytics, and role-based access control for a seamless financial tracking experience.

---

## Tech Stack

- Frontend Framework: React (Vite)
- Styling: Tailwind CSS v4
- Icons: Lucide React
- Charts: Recharts (Area & Pie Charts)
- Data Export: SheetJS (XLSX)
- State Management: React Context API
- Persistence: Browser LocalStorage

---

## ✨ Key Features

### 🧠 Unified Dashboard Engine

- Real-time calculation of:
  - Net Balance
  - Total Income
  - Total Expenses

- Dynamic insights based on highest expenditure category

- Efficiency score:
  - "Budget Burned" percentage tracker

---

### 💳 Advanced Transaction Management

- Multi-level sorting:
  - Newest First
  - High to Low
  - Low to High
  - Deterministic tie-breaking using unique IDs

- Live filtering:
  - Search across descriptions and categories

- Transaction entry:
  - Modal-based form
  - Automatic date stamping

---

### 🔐 Role-Based Access Control (RBAC)

- Admin Mode:
  - Add transactions
  - Export reports to Excel

- Viewer Mode:
  - Read-only access
  - Restricted Add and Export functionality

---

### 🎨 UI/UX Features

- Single Page Navigation:
  - Dashboard
  - Accounts
  - Reports

- Smooth transitions:
  - CSS animations (Framer Motion inspired)

---

### 💾 Data Persistence (LocalStorage)

- Automatic synchronization of transactions

- State recovery using `zorvyn_data`

- Offline-first experience with instant updates

---

### 📊 Interactive Data Visualizations

- Balance Flow (Area Chart):
  - 7-day balance trend
  - Smooth monotone curves

- Spending Split (Pie Chart):
  - Category-wise expense breakdown
  - Custom colors and tooltips

---

## ⚙️ Setup & Installation

### 📌 Prerequisites

- Node.js (v18 or higher)
- npm

---

### 📥 Clone the Repository

```bash
git clone https://github.com/ravikirankachiraju/zorvyn.git
cd zorvyn
```

---

### 📦 Install Dependencies

```bash
npm install
```

---

### ▶️ Run Development Server

```bash
npm run dev
```
```
application will be available at http://localhost:5173
```
