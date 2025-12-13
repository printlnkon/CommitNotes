import MDEditor from "@uiw/react-md-editor";

export default function TextAreaMDEditor({ value, onChange, ...props }) {
  return (
    <MDEditor
      required
      value={value}
      onChange={onChange}
      height={200}
      autoFocus={true}
      enableScroll={true}
      visibleDragbar={false}
      data-color-mode="light"
      textareaProps={{
        placeholder: "Note",
        maxLength: 5000,
        ...props.textareaProps,
      }}
    />
  );
}
