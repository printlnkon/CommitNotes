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

export default function NoteCard({ note }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // check if content is long enough to need a "read more" button
  const shouldTruncate = note.content.length > 120;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{note.title}</CardTitle>
        <CardDescription className="text-sm font-normal">
          {formatFullDate(note.created_at)}
        </CardDescription>
      </CardHeader>
      {/* content */}
      <CardContent>
        <div className="text-sm font-medium text-foreground">
          {/* expanded view */}
          {isExpanded ? (
            <ScrollArea className="h-60 w-full rounded-md border p-3">
              <div className="whitespace-pre-wrap break-all">
                {note.content}
              </div>
            </ScrollArea>
          ) : (
            // collapsed view
            <div
              className={`whitespace-pre-wrap break-all ${
                shouldTruncate ? "line-clamp-3" : ""
              }`}
            >
              {note.content}
            </div>
          )}

          {/* button appears if text > 120 characters */}
          {shouldTruncate && (
            <Button
              variant="link"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 h-auto font-normal text-blue-600 hover:text-blue-800 mt-2"
            >
              {isExpanded ? "Show less" : "Read more"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
