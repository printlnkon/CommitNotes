import { useState } from "react";
import { archiveNoteAPI } from "@/api/archiveNote";
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
import { Archive, LoaderCircle } from "lucide-react";

export default function ArchiveNoteModal({ onNoteArchived, noteToArchive }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleArchiveNote = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!noteToArchive?.id) {
      toast.error("No note selected to archive.");
      setIsLoading(false);
      return;
    }

    const { data, error } = await archiveNoteAPI.archiveNote({
      id: noteToArchive.id,
    });

    if (error) {
      toast.error("Error archiving note.", error);
      setIsLoading(false);
    } else {
      toast.success("Note archived successfully.", data);
      setIsLoading(false);
      setOpen(false);
      if (onNoteArchived) {
        // onNoteArchived prop passed from note-card.jsx (parent component)
        onNoteArchived();
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
              <Archive />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Archive note</p>
          </TooltipContent>
        </Tooltip>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Archive Note
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to archive this note? You can restore it later
            from the archived notes module.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            className="cursor-pointer"
            onClick={handleArchiveNote}
            disabled={isLoading}
          >
            <>
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Archiving note...
                </>
              ) : (
                "Archive"
              )}
            </>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
