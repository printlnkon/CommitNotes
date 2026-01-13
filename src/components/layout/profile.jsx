import Logout from "@/components/auth/logout";
import Header from "@/components/layout/header";
import Navigation from "@/components/layout/navigation";
import LoadingState from "@/components/common/loading-state";
import { useEffect, useState } from "react";

export default function Profile({ onLogout }) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

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

        {loading && <LoadingState />}
        <div className="px-4 md:px-4 lg:px-5 items-center flex gap-2">
          <Logout onLogout={onLogout} />
        </div>
      </section>
    </main>
  );
}
