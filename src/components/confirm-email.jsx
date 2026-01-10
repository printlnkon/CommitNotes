import { Button } from "@/components/ui/button";
import { BadgeCheckIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function ConfirmEmail() {
  return (
    <div className="w-full">
      <main>
        <section>
          <div className="flex flex-col items-center gap-2">
            <BadgeCheckIcon size="96" className="text-chart-2" />
            <h1 className="text-2xl">Congratulations!</h1>
            <h2 className="text-sm">Your email has already been confirmed</h2>
          </div>
        </section>
        <section className="flex justify-center mt-2 space-y-1">
          <Button className="w-full cursor-pointer">
            <Link to="/login">Login</Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
