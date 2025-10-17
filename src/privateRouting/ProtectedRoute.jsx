import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem("token");
      setToken(newToken);
      if (!newToken) navigate("/login");
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
    }, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [navigate]);

  if (!token) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
