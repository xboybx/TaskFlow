# Frontend Developer Intern Assessment

This repository contains the solution for the Frontend Developer Intern assessment. It is a full-stack application featuring a modern, responsive frontend and a robust backend.

##  Project Overview

The application is a Task Management Dashboard built with modern web technologies. It focuses on delivering a premium user experience with smooth animations, glassmorphism effects, and a responsive design.

### Key Features
- **Modern UI/UX**: Built with a custom design system using Tailwind CSS and glassmorphism aesthetics.
- **Authentication**: Secure user signup and login functionality.
- **Dashboard**: Interactive dashboard with data visualization using Recharts.
- **Task Management**: Create, update, and manage tasks.
- **Animations**: Smooth page transitions and micro-interactions using Framer Motion.
- **Responsive Design**: Fully optimized for all device sizes.

##  Tech Stack

### Frontend
- **Framework**: React + Vite
- **Styling**: Tailwind CSS + Tailwind Animate
- **UI Components**: Radix UI (via shadcn/ui)
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **State/Data Fetching**: TanStack Query
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

##  Project Structure

```
frontend-project/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Application route pages
│   │   ├── hooks/      # Custom React hooks
│   │   └── lib/        # Utilities and helpers
│   └── ...
├── backend/            # Express backend API
│   ├── src/
│   │   ├── controllers/# Route controllers
│   │   ├── models/     # Mongoose models
│   │   └── routes/     # API routes
│   └── ...
└── README.md           # This file
```

##  Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed locally or a MongoDB Atlas connection string.

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=7d
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will be available at `http://localhost:8080`.

##  Usage

1. **Sign Up**: Create a new account from the Signup page.
2. **Login**: Log in with your credentials.
3. **Dashboard**: View your task statistics and activity.
4. **Manage Tasks**: Add new tasks, mark them as complete, or delete them.

##  Design Decisions

- **Glassmorphism**: Used to give a modern, depth-rich feel to the application cards and sidebar.
- **Component Library**: Leveraged Radix UI primitives for accessible and robust interactive components while styling them with utility-first Tailwind CSS.
- **Performance**: Vite ensures instant HMR, while React Query handles server state caching and synchronization efficiently.
