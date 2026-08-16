# Express Books Frontend

Modern, highly-responsive web application for Express Books built with Vite, React, and TypeScript.

## Tech Stack
- **Build Tool**: Vite
- **UI Library**: React (v19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4) with Custom Glassmorphism UI
- **State Management**: Redux Toolkit
- **Routing**: React Router (v7)
- **Internationalization (i18n)**: `i18next` & `react-i18next`
- **Icons**: Lucide React & Material Symbols

## Features
- ⚡️ Lightning fast Hot Module Replacement (HMR)
- 🎨 Modern UI with dynamic themes (Dark/Light mode support)
- 🌍 Multi-language support (English, Tamil, Sinhala) with seamless switching
- 🔐 Secure JWT-based authentication flows
- 📱 Fully mobile-responsive layouts

## Prerequisites
- Node.js (v18+)

## Getting Started

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in the `frontend/` root directory to link to the backend API:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build locally**
   ```bash
   npm run preview
   ```

## Linting
To check for code quality and TypeScript strictness:
```bash
npm run lint
```
