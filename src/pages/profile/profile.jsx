import { useState } from "react";
import { toast } from "sonner";
import { logoutAPI } from "@/api/logout";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import Header from "@/components/header.jsx";
import Navigation from "@/components/navigation.jsx";

export default function Profile() {
  const [loading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    const { error } = await logoutAPI.logoutUser();

    if (error) {
      toast.error("Error logging out.");
      setIsLoading(false);
    } else {
      toast.success("Logged out successfully.");
    }
    setIsLoading(true);
  };

  return (
    <main>
      <header className="header">
        <nav>
          <div className="flex justify-between gap-4">
            <Header />
            <Navigation />
          </div>
        </nav>
      </header>

      <section className="px-4 md:px-8 lg:px-12">
        <h1 className="text-xl md:text-2xl font-bold p-4 md:p-6">Profile</h1>

        <Button onClick={handleLogout} disabled={loading}>
          {loading ? (
            <>
              <LoaderCircle className="animation-spin" />
            </>
          ) : (
            "Logout"
          )}
        </Button>
      </section>
    </main>
  );
}
