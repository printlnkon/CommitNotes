import { Spinner } from "@/components/ui/spinner";

export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center py-8">
      <span className="ml-2">
        <Spinner /> {text}
      </span>
    </div>
  );
}
