import { useCallback, useEffect, useState } from "react";
import { archiveNoteAPI } from "@/api/archiveNote";
import { ArrowLeftToLine } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/header.jsx";
import NoteCard from "@/components/note-card";
import EmptyState from "@/components/empty-state";
import ErrorState from "@/components/error-state";
import Navigation from "@/components/navigation.jsx";
import LoadingState from "@/components/loading-state";

export default function ArchivedNotes() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchArchivedNotes = useCallback(async () => {
    // fetch archived notes
    const { data, error } = await archiveNoteAPI.getArchivedNotes();
    if (error) {
      setError(error.message);
    } else {
      setNotes(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchArchivedNotes();
    };
    fetchData();
  }, [fetchArchivedNotes]);

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
        <h1 className="text-xl md:text-2xl font-bold p-4 md:p-6 flex items-center gap-2">
          <Link to="/" title="Back to Home">
            <ArrowLeftToLine className="inline h-8 w-8" />
          </Link>
          <span>Archived Notes</span>
        </h1>

        {loading && <LoadingState />}
        {error && <ErrorState title={error} message={error} />}
        {!loading && !error && notes.length === 0 && (
          <EmptyState
            title="No archived notes"
            message="You have not archived any notes yet."
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} readOnly />
          ))}
        </div>
      </section>
    </main>
  );
}
