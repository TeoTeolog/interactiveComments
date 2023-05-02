import React from "react";
import "../styles/comment.css";

export function Avatar(props) {
  const { img } = props;
  return (
    <div className="avatar">
      <img
        src={img.png}
        alt={!!img.png ? img.png.toString().split("/")[-1] : "ava"}
      />
    </div>
  );
}
