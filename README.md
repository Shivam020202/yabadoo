# Yabadoo Project

A full-stack application with Node.js/MongoDB backend and React frontend.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally)
- npm

## Project Structure

```
project-root/
├── backend/     # Node.js API server
├── frontend/    # React application
└── README.md
```

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the `/backend` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/yabadoo
JWT_SECRET=your_jwt_secret_key_change_this_in_production
ADMIN_PASSWORD=password123
ADMIN_EMAIL=admin@yabadoo.com
NODE_ENV=development
```

### 3. Setup Database

Ensure MongoDB is running locally:

```bash
# Start MongoDB service (varies by OS)
# macOS (with Homebrew):
brew services start mongodb/brew/mongodb-community

# Ubuntu/Debian:
sudo systemctl start mongod

# Windows: Start MongoDB service from Services panel
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm start
```

Server runs on: http://localhost:5000

**Terminal 2 - Frontend:**

```bash
cd frontend
npm start
```

Frontend runs on: http://localhost:3000

### Production Build

```bash
# Build frontend for production
cd frontend
npm run build

# Serve frontend from backend (if configured)
cd ../backend
npm run start:prod
```

## Default Admin Access

- Email: admin@yabadoo.com
- Password: password123

## Troubleshooting

- **MongoDB Connection Error**: Ensure MongoDB is running and accessible at `mongodb://localhost:27017`
- **Port Already in Use**: Change PORT in `.env` or kill existing processes
- **npm install fails**: Try `npm cache clean --force` then reinstall

## Scripts

**Backend:**

- `npm start` - Start development server

**Frontend:**

- `npm start` - Start development server
- `npm run build` - Create production build
- `npm test` - Run tests
