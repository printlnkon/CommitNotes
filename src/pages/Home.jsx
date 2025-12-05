import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { homeAPI } from "@/api/home";
import { formatFullDate } from "@/utils/formatDate";
import Header from "@/components/header";
import Loader from "@/components/loader";
import Navigation from "@/components/navigation";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch all notes using homeAPI
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);

      const { data, error } = await homeAPI.getNotes();

      if (error) {
        setError(error.message);
      } else {
        setNotes(data || []);
      }
      setLoading(false);
    };

    fetchNotes();
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
        <h1 className="text-xl md:text-2xl font-bold p-4 md:p-6">Home</h1>

        {loading && <Loader />}
        {error && <p className="text-destructive">Error: {error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
          {notes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <CardHeader>
                  <CardTitle className="text-xl font-bold mb-2">
                    {note.title}
                    <div className="text-sm font-normal">
                      {formatFullDate(note.created_at)}
                    </div>
                  </CardTitle>
                  <CardDescription className="font-semibold text-accent-foreground">
                    {note.content}
                  </CardDescription>
                </CardHeader>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
