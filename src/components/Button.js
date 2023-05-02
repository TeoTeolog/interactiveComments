import React from "react";

import "../styles/comment.css";

export function Button(props) {
  const { lable, click } = props;

  return (
    <button onClick={click} type="submit" className="main-button">
      {lable}
    </button>
  );
}
