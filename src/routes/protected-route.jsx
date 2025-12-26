import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  // if user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // else render children inside of parent Route
  return <Outlet />;
}
