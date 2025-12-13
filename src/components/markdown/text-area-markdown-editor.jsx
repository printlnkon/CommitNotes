import MDEditor, { commands } from "@uiw/react-md-editor";

const EDITOR_COMMANDS = [
  commands.bold,
  commands.italic,
  commands.strikethrough,
  commands.heading,
  commands.divider,
  commands.quote,
  commands.code,
  commands.codeBlock,
  commands.divider,
  commands.link,
  commands.image,
  commands.divider,
  commands.orderedListCommand,
  commands.unorderedListCommand,
];

export default function TextAreaMarkdownEditor({ value, onChange }) {
  return (
    <>
      <MDEditor
        required
        autoFocus={true}
        value={value}
        autoFocusEnd={true}
        onChange={onChange}
        highlightEnable={false}
        data-color-mode="light"
        commands={EDITOR_COMMANDS}
        textareaProps={{
          placeholder: "Note",
          maxLength: 5000,
        }}
      />
    </>
  );
}
