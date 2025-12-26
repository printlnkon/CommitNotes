import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user && !loading) {
        toast.error("You don't have permission to access this page.");
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoaderCircle className="animate-spin" />
      </div>
    );
  }

  // if user is not authenticated, go back to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // else render children outlet
  return <Outlet />;
}
