import { useCallback, useEffect, useState } from "react";
import { homeAPI } from "@/api/home";
import { Link } from "react-router-dom";
import { FileArchive } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import NoteCard from "@/components/note/note-card";
import Navigation from "@/components/layout/navigation";
import EmptyState from "@/components/common/empty-state";
import ErrorState from "@/components/common/error-state";
import LoadingState from "@/components/common/loading-state";
import AddNoteModal from "@/components/note/modal/add-note-modal";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAllNotes = useCallback(async () => {
    // fetch all active notes
    const { data, error } = await homeAPI.getNotes();
    if (error) {
      setError(error.message);
    } else {
      setNotes(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAllNotes();
    };
    fetchData();
  }, [fetchAllNotes]);

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

        {/* add note modal */}
        <div className="px-4 md:px-4 lg:px-5 items-center flex gap-2">
          <AddNoteModal onNoteAdded={fetchAllNotes} />
          <Link to="/archived-note" title="View archived notes">
            <Button className="cursor-pointer">
              <FileArchive />
              View Archived Notes
            </Button>
          </Link>
        </div>

        {/* loading state */}
        {loading && <LoadingState />}
        {/* error state */}
        {error && <ErrorState title={error} message={error}></ErrorState>}

        {/* no notes state */}
        {!loading && !error && notes.length === 0 && (
          <EmptyState
            title="No notes in Home"
            message="Start organizing your thoughts by creating your first note."
          />
        )}

        {/* note cards */}
        <div className="max-h-[65vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
            {notes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onNoteEdited={fetchAllNotes}
                onNoteArchived={fetchAllNotes}
                onNoteRestore={fetchAllNotes}
                onNoteDelete={fetchAllNotes}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
