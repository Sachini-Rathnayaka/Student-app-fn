import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Student from "./components/Student";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (success) => {
    setIsAuthenticated(success);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/students" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/students" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/students"
          element={isAuthenticated ? <Student /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
