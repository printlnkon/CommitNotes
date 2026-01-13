import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { BadgeCheckIcon, BadgeX } from "lucide-react";

export default function ConfirmEmail() {
  // for development or production mode, uncomment the code below
  const { user, loading } = useAuth();
  
  // to access for pure development mode, uncomment the code below
  // const user = { email: "test@example.com" };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-xl font-semibold">Confirming your email...</h1>
      </div>
    );
  }

  if (user) {
    return (
      <>
        <main>
          {/* display */}
          <div className="flex flex-col items-center justify-center gap-2">
            <section className="flex flex-col items-center space-y-2">
              <BadgeCheckIcon size={96} className="text-chart-2" />
              <h1 className="text-3xl font-bold">Congratulations!</h1>
              <h2 className="text-sm text-muted-foreground">
                Your email has been confirmed and you are now logged in.
              </h2>
            </section>
            {/* button */}
            <section className="flex justify-center mt-2">
              <Link to="/home">
                <Button className="cursor-pointer">Go to Home</Button>
              </Link>
            </section>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <main>
        {/* error display */}
        <div className="flex flex-col items-center justify-center gap-2">
          <section className="flex flex-col items-center space-y-2">
            <BadgeX size={96} className="text-destructive" />
            <h1 className="text-2xl font-bold">Something went wrong!</h1>
            <h2 className="text-sm text-muted-foreground">
              If this issue persists, try logging in.
            </h2>
          </section>
        </div>
        {/* button */}
        <section className="flex justify-center mt-4">
          <Link to="/login">
            <Button className="cursor-pointer">Login</Button>
          </Link>
        </section>
      </main>
    </>
  );
}
