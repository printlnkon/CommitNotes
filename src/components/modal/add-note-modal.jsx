import { useState } from "react";
import { addNoteAPI } from "@/api/addNote";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ListPlus, LoaderCircle } from "lucide-react";
import TextAreaQuillEditor from "@/components/text-area-mdeditor";

function getTitleError(titleText) {
  const trimmedTitle = titleText.trim();
  if (trimmedTitle.length > 100) return "Title must be at most 100 characters.";
  return "";
}

function getNoteError(noteText) {
  const trimmedNote = noteText.trim();
  if (trimmedNote.length < 3) return "Note is required.";
  if (trimmedNote.length > 5000) return "Note must be at most 5000 characters.";
  return "";
}

export default function AddNoteModal({ onNoteAdded }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({
    title: "",
    note: "",
  });

  const handleAddNote = async (e) => {
    e.preventDefault();

    const titleError = getTitleError(note.title);
    const noteError = getNoteError(note.note);

    if (titleError || noteError) {
      toast.error(titleError || noteError);
      return;
    }

    setIsLoading(true);

    // set default title if empty
    const noteToSave = {
      ...note,
      title: note.title.trim() === "" ? "Untitled" : note.title.trim(),
      note: note.note.trim(),
    };

    const { data, error } = await addNoteAPI.addNote(noteToSave);

    if (error) {
      toast.error("Error adding note.", error);
      setIsLoading(false);
    } else {
      toast.success("Note added successfully.", data);
      resetForm();
      setIsLoading(false);
      setOpen(false);
      // refresh notes list
      if (onNoteAdded) {
        // onNoteAdded prop passed from home.jsx
        onNoteAdded();
      }
    }
  };

  const isAddNoteDisabled = isLoading || !note.note;

  const resetForm = () => {
    setNote({ title: "", note: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" title="Add new note">
          <ListPlus />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs sm:max-w-xs md:max-w-lg lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle>New Note</DialogTitle>
          <DialogDescription>
            Add a new note to your notes list.
          </DialogDescription>
        </DialogHeader>

        {/* title and note form */}
        <form onSubmit={handleAddNote}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
              <div className="text-xs flex justify-between">
                {getTitleError(note.title) && (
                  <div className="text-xs text-destructive">
                    {getTitleError(note.title)}
                  </div>
                )}
                {note.title.length}/100 characters
              </div>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="note">
                Note <span className="text-destructive">*</span>{" "}
              </Label>
              <TextAreaQuillEditor
                id="note"
                name="note"
                value={note.note}
                onChange={(value) => setNote({ ...note, note: value || "" })}
              />
              <div className="text-xs flex justify-between">
                {open && note.note.length > 0 && getNoteError(note.note) && (
                  <div className="text-xs text-destructive">
                    {getNoteError(note.note)}
                  </div>
                )}
                {note.note.length}/5000 characters
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={resetForm}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isAddNoteDisabled}
            >
              <>
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Adding note...
                  </>
                ) : (
                  "Add Note"
                )}
              </>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
