import { CustomPreviewStyle } from "@/components/markdown/custom-preview-style";
import MarkdownPreview from "@uiw/react-markdown-preview/nohighlight";

export default function TextAreaMarkdownPreview({ value }) {
  return (
    <>
      <MarkdownPreview
        source={value}
        style={{
          color: "black",
          fontSize: "inherit",
          background: "transparent",
        }}
        components={CustomPreviewStyle}
      />
    </>
  );
}
