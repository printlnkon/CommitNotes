export const CustomPreviewStyle = {
  // table styles
  table: ({ children }) => (
    <table style={{ color: "black", background: "white" }}>{children}</table>
  ),
  th: ({ children }) => (
    <th style={{ fontWeight: "bold", color: "black", background: "white" }}>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td style={{ color: "black", background: "white" }}>{children}</td>
  ),

  // code block style
  pre: ({ children }) => (
    <pre
      style={{ background: "lightgray", color: "black", borderRadius: "5px" }}
    >
      {children}
    </pre>
  ),

  blockquote: ({ children }) => (
    <blockquote
      style={{
        color: "black", 
        fontStyle: "italic",
      }}
    >
      {children}
    </blockquote>
  ),

  // unordered list (ul) style
  ul: ({ children, ...props }) => {
    const isChecklist = props["data-type"] === "taskList";

    if (isChecklist) {
      return (
        <ul
          style={{
            listStyleType: "none",
          }}
        >
          {children}
        </ul>
      );
    }
    // regular unordered list
    return (
      <ul
        style={{
          listStyleType: "disc",
        }}
      >
        {children}
      </ul>
    );
  },

  // ordered list (ol) style
  ol: ({ children }) => (
    <ol
      style={{
        listStyleType: "decimal",
      }}
    >
      {children}
    </ol>
  ),

  // list item (li) style
  li: ({ children }) => {
    const isChecklistItem =
      Array.isArray(children) &&
      children.length > 0 &&
      children[0]?.props?.type === "checkbox";

    if (isChecklistItem) {
      return (
        <li
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
            listStyleType: "none",
          }}
        >
          {children}
        </li>
      );
    }
    // regular list item
    return <li style={{ display: "list-item" }}>{children}</li>;
  },
};
