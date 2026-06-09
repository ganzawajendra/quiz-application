import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
import Navbar from "./components/Navbar";

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
      <Routes>
        {/* Route public untuk sebelum login */}
        <Route path="/" element={<Navbar variant="public" />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Route private untuk setelah login */}
        <Route path="/" element={<Navbar variant="private" />}>
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
