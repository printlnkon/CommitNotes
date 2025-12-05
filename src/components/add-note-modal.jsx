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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ListPlus } from "lucide-react";

export default function AddNoteModal({ onNoteAdded }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const handleAddNote = async (e) => {
    e.preventDefault();

    const { data, error } = await addNoteAPI.addNote(note);

    if (error) {
      console.error("Error adding note:", error);
    } else {
      console.log("Note added successfully:", data);
      // reset form
      resetForm();
      //   close dialog
      setOpen(false);
      // refresh notes list
      if (onNoteAdded) {
        onNoteAdded();
      }
    }
  };

  const resetForm = () => {
    setNote({ title: "", content: "" });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <ListPlus />
          Add Note
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs sm:max-w-xs md:max-w-lg lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>
            Add a new note to your notes list.
          </DialogDescription>
        </DialogHeader>

        {/* title and content form */}
        <form onSubmit={handleAddNote}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="My note"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                maxLength={5000}
                placeholder="Type your note here."
                className="min-h-24 max-h-48 resize-y"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
              <div className="text-xs text-start">
                {note.content.length}/5000 characters
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
            <Button type="submit" className="cursor-pointer">
              Add Note
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
