import React from "react";
import "../styles/comment.css";

import replyImg from "../images/icon-reply.svg";
import { Avatar } from "./Avatar";
import { Button } from "./Button";

import { useForm } from "react-hook-form";
import { useRenderCounter } from "../hooks/useRenderCounter";

const ReplyButton = (props) => {
  return (
    <button>
      <img stc={replyImg} alt="r"></img> Reply
    </button>
  );
};

const Header = (props) => {
  const { user, date } = props;
  return (
    <div className="header">
      <div className="info-wrapper">
        <Avatar img={user.image} />
        <div className="username">{user.username}</div>
        <div className="date-created-at">{date}</div>
      </div>
      <ReplyButton />
    </div>
  );
};

// const Content = (props) => {
//   const { data } = props;
//   console.log(props);
//   return <div className="content">{data.content}</div>;
// };

const ScorePanel = (props) => {
  const { score } = props;
  return (
    <div className="score-panel">
      <button>+</button>
      {score}
      <button>- </button>
    </div>
  );
};

function CommentPanel(props) {
  const { data } = props;
  return (
    <div className="comment-container">
      <ScorePanel score={data.score} />
      <div className="main-continer-container">
        <Header user={data.user} date={data.createdAt}></Header>
        <div className="content">{data.content}</div>
      </div>
    </div>
  );
}

export function CommentElement(props) {
  const { data } = props;
  return (
    <div className="field">
      <CommentPanel data={data} />
      <ul>
        {data.replies.map((item) => (
          <li key={item.id}>
            <CommentPanel data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

const Input = (props) => {
  return (
    <textarea
      {...props.register}
      className="input"
      placeholder="Comment"
    ></textarea>
  );
};

export function CommentForm(props) {
  const { handleData, target } = props;
  const { register, handleSubmit } = useForm();
  const { render } = useRenderCounter("CommentForm");

  const onSubmit = (data) => {
    console.log(data);
    if (!!handleData) {
      handleData(data);
    }
  };

  const { user } = props;
  return (
    <form className="form-section" onSubmit={handleSubmit(onSubmit)}>
      <Avatar img={user.image} />
      <Input register={register("commentText")} />
      <Button lable="SEND" />
    </form>
  );
}
