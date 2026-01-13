import { AlertCircle, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ErrorState({
  title = "Something went wrong",
  message = "An unexpected error occurred. Please try again.",
  variant = "destructive",
}) {
  return (
    <div className="flex items-center justify-center min-h-[300px] p-4 text-center">
      <Alert variant={variant} className="max-w-md">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle className="font-semibold">{title}</AlertTitle>
        <AlertDescription className="mt-2">{message}</AlertDescription>
      </Alert>
    </div>
  );
}
