import React, { useState } from "react";
import "../styles/comment.css";

import replyImg from "../images/icon-reply.svg";
import { Avatar } from "./Avatar";
import { Button } from "./Button";

import { useRenderCounter } from "../hooks/useRenderCounter";

import { useForm, useController } from "react-hook-form";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = (props) => {
  const { name, control, defaultValue = "" } = props;
  const {
    field: { ref, onChange, value },
  } = useController({
    name,
    control,
    defaultValue,
    rules: { required: false },
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // event.preventDefault();
      // field.onChange(event.target.innerHTML);
    }
  };

  return (
    <ReactQuill
      ref={ref}
      onChange={onChange}
      value={value}
      modules={{
        toolbar: false,
      }}
      id="input"
    />
  );
};

// const Editor = (props) => {
//   const { name, control, defaultValue = "" } = props;
//   const {
//     field: { ref, onChange, value },
//   } = useController({
//     name,
//     control,
//     defaultValue,
//     rules: { required: false },
//   });

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       // event.preventDefault();
//       // field.onChange(event.target.innerHTML);
//     }
//   };

//   return (
//     <div
//       contentEditable="true"
//       ref={ref}
//       onChange={onChange}
//       dangerouslySetInnerHTML={{ __html: value }}
//       // onChange={handleChange}
//       // onKeyPress={handleKeyPress}
//       // placeholder={props.placeholder}

//       className="input"
//     ></div>
//   );
// };

const CommentForm = (props) => {
  const { buttonLable, handleData } = props;
  const { control, handleSubmit, reset } = useForm();
  const { render } = useRenderCounter("CommentForm");

  const onSubmit = (data) => {
    data.content = data.content.replace(/(<([^>]+)>)/gi, "");
    if (!!handleData) {
      handleData(data);
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <QuillEditor placeholder="Comment" control={control} name="content" />
      <Button lable={buttonLable} />
    </form>
  );
};

export function CommentFormPanel(props) {
  const { handleData } = props;

  const { user } = props;
  if (!user) return;
  return (
    <div className="form-panel">
      <Avatar img={user.image} />
      <CommentForm buttonLable="send" handleData={handleData} />
    </div>
  );
}
