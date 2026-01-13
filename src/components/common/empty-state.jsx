import { FileText } from "lucide-react";

export default function EmptyState({ title = "", message = "" }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
      <div className="rounded-full bg-muted p-6 mb-2">
        <FileText className="h-12 w-12 text-muted-foreground" />
      </div>

      <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>

      <p className="text-sm text-muted-foreground mb-4 max-w-md">{message}</p>
    </div>
  );
}
