import { CustomPreviewComponents } from "@/components/markdown/custom-preview-components";
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
          lineHeight: 1,
        }}
        components={CustomPreviewComponents}
      />
    </>
  );
}
