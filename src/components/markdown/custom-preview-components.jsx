import React from "react";

export const CustomPreviewComponents = {
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

  // unordered list (ul) style
  ul: ({ children, ...props }) => {
    const isChecklist = props["data-type"] === "taskList";

    if (isChecklist) {
      return (
        <ul
          style={{
            listStyleType: "none",
            marginLeft: "1.5em",
            paddingLeft: "1.5em",
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
          marginLeft: "1.5em",
          paddingLeft: "1.5em",
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
        marginLeft: "1.5em",
        paddingLeft: "1.5em",
      }}
    >
      {children}
    </ol>
  ),

  // list item (li) style
  li: ({ children }) => {
    const isChecklistItem = Array.isArray(children) && children.length > 0 && children[0]?.props?.type === "checkbox";
    
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
