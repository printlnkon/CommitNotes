import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export default function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center justify-centermin-h-screen">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  // if user is authenticated, go to dashboard
  if (user && location.pathname !== "/confirm-email") {
    return <Navigate to="/home" replace />;
  }

  // else render children outlet
  return <Outlet />;
}
