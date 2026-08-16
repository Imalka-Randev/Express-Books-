# Express Books Backend

REST API service for the Express Books platform, built with Node.js, Express, and TypeScript.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript (`tsx` for dev execution)
- **Database**: MongoDB via Mongoose
- **Authentication**: JWT & bcrypt
- **Testing**: Jest, Supertest, MongoDB Memory Server

## Prerequisites
- Node.js (v18+)
- MongoDB (Local instance or MongoDB Atlas URI)

## Getting Started

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the `backend/` root directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The server will run with hot-reloading enabled.

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Testing

The project uses `mongodb-memory-server` to mock the database during tests, so you don't need a live database to run the test suite.

To run the automated tests:
```bash
npm test
```
