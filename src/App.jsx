import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import Navbar from "./components/Navbar";
import TestQuizPage from "./pages/TestQuizPage";
import TestQuizCompletePage from "./pages/TestQuizCompletePage";
import ProfilePage from "./pages/ProfilePage";

// User harus login terlebih dahulu
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      {/* Navbar dipindah ke luar Routes */}
      <Navbar />
      
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/test-quiz"
            element={
              <ProtectedRoute>
                <TestQuizPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/test-quiz-complete"
            element={
              <ProtectedRoute>
                <TestQuizCompletePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
      </Routes>
    </Router>
  );
}

export default App;
