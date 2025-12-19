import { useState } from "react";
import { editNoteAPI } from "@/api/editNote";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Pencil } from "lucide-react";
import TextAreaMarkdownEditor from "@/components/markdown/text-area-markdown-editor";

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

export default function EditNoteModal({ onNoteEdited, noteToEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({
    id: null,
    title: "",
    note: "",
  });

  const openEditModal = (noteToEdit) => {
    setOpen(true);
    if (noteToEdit) {
      setNote({
        id: noteToEdit.id,
        title: noteToEdit.title,
        note: noteToEdit.note,
      });
    }
  };

  const handleEditNote = async (e) => {
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
      id: note.id,
      title: note.title.trim() === "" ? "Untitled" : note.title.trim(),
      note: note.note.trim(),
    };

    const { data, error } = await editNoteAPI.editNote(noteToSave);

    if (error) {
      toast.error("Error editing note.", error);
      setIsLoading(false);
    } else {
      toast.success("Note edited successfully.", data);
      resetForm();
      setIsLoading(false);
      setOpen(false);
      // edit/update note list
      if (onNoteEdited) {
        // onNoteEdited prop passed from note-card.jsx (parent component)
        onNoteEdited();
      }
    }
  };

  const isNoteUnchanged =
    note.title.trim() === (noteToEdit?.title?.trim() ?? "") &&
    note.note.trim() === (noteToEdit?.note?.trim() ?? "");

  const resetForm = () => {
    setNote({ id: null, title: "", note: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className="cursor-pointer"
            size="icon"
            onClick={() => openEditModal(noteToEdit)}
          >
            <Pencil />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit note</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="max-w-xs sm:max-w-xs md:max-w-lg lg:max-w-2xl xl:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>Make changes to your note.</DialogDescription>
        </DialogHeader>

        {/* title and note form */}
        <form onSubmit={handleEditNote}>
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
              <TextAreaMarkdownEditor
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
              disabled={isLoading || isNoteUnchanged}
            >
              <>
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Editing note...
                  </>
                ) : (
                  "Edit"
                )}
              </>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
