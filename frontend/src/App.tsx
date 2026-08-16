import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <div className="font-body-md">
        <Routes>
          {/* This means if the user goes to localhost:5173/login, show the Login page */}
          <Route path="/login" element={<Login />} />
          
          {/* If they go to /signup, show the Signup page */}
          <Route path="/signup" element={<Signup />} />
          
          {/* For now, if they go to the root URL, we will redirect them to Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;