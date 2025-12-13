import { saveAs } from "file-saver";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function DownloadButton({ content, fileName = "note.txt" }) {
    
  const handleDownloadNote = () => {
    const file = new Blob([content], { type: "text/plain;charset=utf-8" });
    saveAs(file, fileName);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="cursor-pointer"
          onClick={handleDownloadNote}
        >
          <Download />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Download note</TooltipContent>
    </Tooltip>
  );
}
