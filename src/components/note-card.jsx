import { useState } from "react";
import { formatFullDate } from "@/utils/formatDate";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import EditNoteModal from "@/components/edit-note-modal";

export default function NoteCard({ note, onNoteEdited }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // check if content is long enough to need a "read more" button
  const isNoteTruncated = note.note.length > 100;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{note.title}</CardTitle>
        <CardDescription className="text-xs font-normal">
          {formatFullDate(note.created_at)}
        </CardDescription>
      </CardHeader>
      {/* content */}
      <CardContent>
        <div className="text-sm font-medium text-foreground flex justify-between">
          {/* expanded view */}
          {isExpanded ? (
            <ScrollArea className="h-60 w-full rounded-md border p-3">
              <div className="whitespace-pre-wrap break-all">{note.note}</div>
            </ScrollArea>
          ) : (
            // collapsed view
            <div
              className={`whitespace-pre-wrap break-all ${
                isNoteTruncated ? "line-clamp-3" : ""
              }`}
            >
              {note.note}
            </div>
          )}

          {/* button appears if text > 100 characters */}
          {isNoteTruncated && (
            <Button
              variant="link"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 h-auto font-normal text-chart-5 hover:text-chart-5/60 mt-2"
            >
              {isExpanded ? "Show less" : "Read more"}
            </Button>
          )}
          <ButtonGroup>
            <EditNoteModal noteToEdit={note} onNoteEdited={onNoteEdited} />
            {/* <EditNoteModal onNoteEdited={onNoteEdited} /> */}
          </ButtonGroup>
        </div>
      </CardContent>
    </Card>
  );
}
