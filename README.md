# PrimeTrade - Task Management System

A full-stack task management application built with React, Node.js, Express, and MySQL. This application provides a modern, responsive interface for managing tasks with user authentication and authorization.

## 🚀 Features

- **User Authentication**: Secure login and signup with JWT-based authentication
- **Task Management**: Create, read, update, and delete tasks
- **User Profiles**: Personalized user profiles and settings
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Dark Mode**: Theme switching support
- **Protected Routes**: Secure routes requiring authentication
- **Real-time Updates**: Efficient state management with React Query

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable component library
- **React Router** - Client-side routing
- **React Query** - Server state management
- **React Hook Form** - Form validation
- **Zod** - Schema validation
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **Sequelize** - ORM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or Bun package manager
- MySQL (v8.0 or higher)

## 🔧 Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/primetrade.git
cd primetrade
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5001
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=primetrade_db
DB_PORT=3306

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d
```

### 3. Frontend Setup

```bash
cd ../client
npm install
# or if using Bun
bun install
```

Create a `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:5001/api
```

### 4. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE primetrade_db;
```

The application will automatically create tables when you start the server.

## 🚀 Running the Application

### Start Backend Server
```bash
cd server
npm run dev
```
The server will run on `http://localhost:5001`

### Start Frontend Development Server
```bash
cd client
npm run dev
```
The frontend will run on `http://localhost:8080`

## 📁 Project Structure

```
primetrade/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts (Auth, Theme)
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   └── services/      # API services
│   ├── public/            # Static assets
│   └── package.json
│
├── server/                # Backend application
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   └── server.js         # Entry point
│
├── Postman_Collection.json  # API documentation
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🧪 Testing

Import the `Postman_Collection.json` file into Postman to test all API endpoints.

## 📦 Building for Production

### Build Frontend
```bash
cd client
npm run build
```
The production-ready files will be in the `client/dist` directory.

### Run Backend in Production
```bash
cd server
npm start
```

## 🔒 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5001)
- `NODE_ENV` - Environment (development/production)
- `DB_HOST` - MySQL host
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT
- `JWT_EXPIRES_IN` - Token expiration time

### Frontend (.env)
- `VITE_API_URL` - Backend API URL
