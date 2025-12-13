import MDEditor, { commands } from "@uiw/react-md-editor";

export default function TextAreaMarkdownEditor({ value, onChange }) {
  return (
    <>
      <MDEditor
        required
        autoFocus={true}
        value={value}
        autoFocusEnd={true}
        onChange={onChange}
        data-color-mode="light"
        commands={[ 
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

          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.checkedListCommand,
        ]}
        textareaProps={{
          placeholder: "Note",
          maxLength: 5000,
        }}
      />
    </>
  );
}
