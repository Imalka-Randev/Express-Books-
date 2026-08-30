# Express Books 📚

A modern, full-stack E-Commerce and Library Management Platform built with the MERN stack. Designed with a strong emphasis on **UI/UX polish**, **Enterprise-Grade Security**, and **Component Modularity**.

## ✨ Core Features & Specialties

### 🛡️ Security & Data Integrity (Backend)
- **Robust Authentication:** Implemented secure JWT-based authentication using **HTTP-only cookies** for refresh tokens, mitigating XSS attacks, paired with short-lived memory access tokens.
- **Data Validation & Sanitization:** Enforced strict schema validation using **Zod** (validating requests before they hit controllers) and robust **Mongoose** models.
- **API Protection:** Integrated **Helmet.js** for HTTP header security, restricted **CORS** configurations, and **Express Rate Limit** to prevent brute-force and DDoS attacks.
- **Secure Data Handling:** Utilizes **bcrypt** for cryptographic password hashing.

### 🎨 UI/UX & Frontend Architecture (Frontend)
- **State-of-the-Art Design:** Fluid animations (fade-in, transform perspectives), responsive grid layouts, and an elegant **Dark/Light Mode** system natively powered by **Tailwind CSS v4**.
- **Predictable State Management:** Uses **Redux Toolkit (RTK)** paired with async thunks to maintain global application states (Library, Cart, Auth) asynchronously without UI blocking.
- **Advanced Form Handling:** Custom payment hooks (e.g., `usePaymentForm`) encapsulate complex logic for auto-formatting, strict regex-based input filtering, and validation (preventing numbers in names, filtering CVV, validating expiry dates dynamically).
- **Internationalization (i18n):** Built-in multilingual support for English & Sinhala using `i18next`.
- **Component Modularity:** High code reusability focusing on DRY principles (e.g., decoupled `BookCard`, `RentExtensionPayment`, `CartModal`).
- **Axios Interceptors:** Centralized API client automatically handles token injection and silent token refreshes on 401 Unauthorized responses.

## 🛠️ Technology Stack

**Frontend:**
- **Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4, PostCSS
- **State & Routing:** Redux Toolkit, React Router v7
- **Tools:** Axios, i18next, Lucide React

**Backend:**
- **Core:** Node.js, Express 5, TypeScript
- **Database:** MongoDB, Mongoose
- **Security & Validation:** Zod, jsonwebtoken, Bcrypt, Helmet, Express-Rate-Limit
- **Testing:** Jest, Supertest, MongoDB-Memory-Server

## 🚀 Future Improvements Roadmap
1. **Microservices Migration:** Break down the monolithic Node.js backend into independent microservices (e.g., Auth Service, Checkout Service, Library Service) for better horizontal scaling.
2. **Real-time Notifications:** Implement WebSockets (Socket.io) or Server-Sent Events (SSE) for instant checkout confirmations and rent expiry warnings.
3. **Payment Gateway Integration:** Transition from the current robust simulated payment flow to a real-world provider like Stripe or PayPal SDK.
4. **Caching Layer:** Introduce Redis to cache frequent database queries (like popular books on the home page) to drastically reduce MongoDB read load and improve TTFB (Time to First Byte).
5. **Advanced CI/CD:** Set up GitHub Actions for automated unit testing, linting, and zero-downtime deployment pipelines to AWS or Vercel.

---

## 📦 Quick Start

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
