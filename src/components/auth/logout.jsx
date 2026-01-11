import { toast } from "sonner";
import { useState } from "react";
import { logoutAPI } from "@/api/logout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await logoutAPI.logoutUser();

    setIsLoading(true);

    if (error) {
      toast.error("Error logging out.");
      setIsLoading(false);
    } else {
      toast.success("Logged out successfully.", {
        duration: 1200,
      });
      navigate("/login");
    }
  };

  return (
    <>
      <Button
        onClick={handleLogout}
        className="cursor-pointer"
        disabled={loading}
      >
        Logout
      </Button>
    </>
  );
}
