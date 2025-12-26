import Logout from "@/components/logout";
import Header from "@/components/header.jsx";
import Navigation from "@/components/navigation.jsx";

export default function Profile({ onLogout }) {
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

        <Logout onLogout={onLogout} />
      </section>
    </main>
  );
}
