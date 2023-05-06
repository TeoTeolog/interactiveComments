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
    console.log("[handleKeyPress] event:", event);
    if (event.key === "Enter") {
      console.log("[handleKeyPress] presserd ENTER: ", event);
    }
  };

  return (
    <ReactQuill
      ref={ref}
      onChange={onChange}
      value={value}
      modules={{
        toolbar: false,
        // keyboard: { bindings: { handleKeyPress } },
      }}
      placeholder={props.placeholder}
      id="input"
    />
  );
};

export const CommentForm = (props) => {
  const { buttonLable, handleData, content } = props;
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
      <QuillEditor
        placeholder="Comment"
        control={control}
        name="content"
        defaultValue={!!content && content}
      />
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
      <CommentForm buttonLable="SEND" handleData={handleData} />
    </div>
  );
}
