# Express Books

A full-stack MERN application connecting a global community of readers to share stories, discover new worlds, and instantly access a curated collection of E-Books and Audiobooks.

## Project Structure

This is a monorepo containing both the frontend client and the backend API server.

- [`/frontend`](./frontend/) - React + Vite + TypeScript web application.
- [`/backend`](./backend/) - Node.js + Express + TypeScript REST API.

Please see the respective `README.md` files in the `/frontend` and `/backend` directories for detailed documentation, technology stacks, and testing information.

## Quick Start

To get the entire application running locally on your machine, you will need two terminal windows.

### 1. Start the Backend API

```bash
cd backend
npm install
# Ensure you create a .env file with PORT, MONGO_URI, and JWT_SECRET
npm run dev
```

### 2. Start the Frontend Client

```bash
cd frontend
npm install
# Ensure you create a .env file with VITE_API_URL=http://localhost:5000/api
npm run dev
```
