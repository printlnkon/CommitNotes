import { Spinner } from "@/components/ui/spinner";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-0">
      <div className="flex flex-col items-center">
        <Spinner />
        <span className="mt-4 text-lg font-medium text-accent-foreground">
          {text}
        </span>
      </div>
    </div>
  );
}
