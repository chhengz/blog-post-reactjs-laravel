import { useContext } from "react";
import { Navigate } from "react-router";
import { AppContext } from "../../contexts/AppContext";

export default function ProtectedRoute({ children }) {
  const { user } = useContext(AppContext);
  return user ? children : <Navigate to="/auth/login" replace />;
}