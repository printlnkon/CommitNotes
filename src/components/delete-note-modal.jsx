import { useState } from "react";
import { deleteNoteAPI } from "@/api/deleteNote";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash2 } from "lucide-react";

export default function ArchiveNoteModal({ onNoteDelete, noteToDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDeleteNote = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!noteToDelete?.id) {
      toast.error("No note selected to delete.");
      setIsLoading(false);
      return;
    }

    const { data, error } = await deleteNoteAPI.deleteNote({
      id: noteToDelete.id,
    });

    if (error) {
      toast.error("Error deleteing note.", error);
      setIsLoading(false);
    } else {
      toast.success("Note deleted successfully.", data);
      setIsLoading(false);
      setOpen(false);
      if (onNoteDelete) {
        // onNoteDelete prop passed from note-card.jsx (parent component)
        onNoteDelete();
      }
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="cursor-pointer"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete note</p>
          </TooltipContent>
        </Tooltip>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Confirmation
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this note? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            className="cursor-pointer"
            onClick={handleDeleteNote}
            disabled={isLoading}
          >
            <>
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Deleting note...
                </>
              ) : (
                "Delete"
              )}
            </>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
