import { useState } from "react";
import { restoreNoteAPI } from "@/api/restoreNote";
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
import { ArchiveRestore, LoaderCircle } from "lucide-react";

export default function RestoreNoteModal({ onNoteRestore, noteToRestore }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleRestoreNote = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!noteToRestore?.id) {
      toast.error("No note selected to restore.");
      setIsLoading(false);
      return;
    }

    const { data, error } = await restoreNoteAPI.restoreNote({ id: noteToRestore.id });

    if (error) {
      toast.error("Error restoring note.", error);
      setIsLoading(false);
    } else {
      toast.success("Note restored successfully.", data);
      setIsLoading(false);
      setOpen(false);
      if (onNoteRestore) {
        // onNoteRestore prop passed from note-card.jsx (parent component)
        onNoteRestore();
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
              <ArchiveRestore />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Restore note</p>
          </TooltipContent>
        </Tooltip>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Confirmation
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to restore this note?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            className="cursor-pointer"
            onClick={handleRestoreNote}
            disabled={isLoading}
          >
            <>
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Restoring note...
                </>
              ) : (
                "Restore"
              )}
            </>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
