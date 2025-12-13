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
import { ButtonGroup } from "@/components/ui/button-group";
import DownloadButton from "@/components/download-button";
import EditNoteModal from "@/components/modal/edit-note-modal";
import DeleteNoteModal from "@/components/modal/delete-note-modal";
import ArchiveNoteModal from "@/components/modal/archive-note-modal";
import RestoreNoteModal from "@/components/modal/restore-note-modal";
import TextAreaMarkdownPreview from "@/components/markdown/text-area-markdown-preview";

export default function NoteCard({
  note,
  isArchived,
  onNoteEdited,
  onNoteArchived,
  onNoteRestore,
  onNoteDelete,
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // check if content is long enough to need a "read more" button
  const isNoteTruncated = note.note.length > 100;

  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{note.title}</CardTitle>
        <CardDescription className="text-xs font-normal">
          {formatFullDate(note.created_at)}
        </CardDescription>
      </CardHeader>
      {/* content */}
      <CardContent className="flex flex-col flex-1">
        <div className="flex-1 flex flex-col">
          <div className="text-sm font-medium text-foreground flex-1">
            {/* expanded view */}
            {isExpanded ? (
              <ScrollArea className="h-[200px] w-full rounded-md border p-3">
                <div className="relative w-full break-all whitespace-pre-wrap [&_pre]:break-normal [&_pre]:whitespace-pre [&_pre]:overflow-x-auto">
                  <TextAreaMarkdownPreview value={note.note} />
                </div>
              </ScrollArea>
            ) : (
              // collapsed view
              <div
                className={`relative w-full break-all whitespace-pre-wrap [&_pre]:break-normal [&_pre]:whitespace-pre [&_pre]:overflow-x-auto ${
                  isNoteTruncated ? "h-[72px] overflow-hidden" : ""
                }`}
              >
                <TextAreaMarkdownPreview value={note.note} />
                {isNoteTruncated && (
                  <div className="absolute bottom-0 left-0 w-full h-8 bg-linear-to-t from-background to-transparent pointer-events-none" />
                )}
              </div>
            )}
          </div>
          {/* button appears if text > 100 characters */}
          {isNoteTruncated && (
            <Button
              variant="link"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex justify-start p-0 h-auto font-normal text-chart-5 hover:text-chart-5/60 mt-2"
            >
              {isExpanded ? "Show less" : "Read more"}
            </Button>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <ButtonGroup>
            {!isArchived ? (
              <>
                <DownloadButton
                  content={note.note}
                  fileName={`${note.title}.txt`}
                />
                <EditNoteModal noteToEdit={note} onNoteEdited={onNoteEdited} />
                <ArchiveNoteModal
                  noteToArchive={note}
                  onNoteArchived={onNoteArchived}
                />
              </>
            ) : (
              <>
                <RestoreNoteModal
                  noteToRestore={note}
                  onNoteRestore={onNoteRestore}
                />
                <DeleteNoteModal
                  noteToDelete={note}
                  onNoteDelete={onNoteDelete}
                />
              </>
            )}
          </ButtonGroup>
        </div>
      </CardContent>
    </Card>
  );
}
