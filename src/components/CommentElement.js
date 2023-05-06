import React, { useState } from "react";
import "../styles/comment.css";

import replyImg from "../images/icon-reply.svg";
import editImg from "../images/icon-edit.svg";
import deleteImg from "../images/icon-delete.svg";
import { Avatar } from "./Avatar";
import { CommentForm } from "./CommentForm";

const ReplyButton = (props) => {
  return (
    <button>
      <img stc={replyImg} alt="r"></img> Reply
    </button>
  );
};

const EditButton = (props) => {
  const onClick = (event) => {
    props.onClick(event);
  };

  return (
    <button onClick={onClick}>
      <img stc={editImg} alt="e"></img> Edit
    </button>
  );
};

const DeleteButton = (props) => {
  return (
    <button>
      <img stc={deleteImg} alt="d"></img> Delete
    </button>
  );
};

const Header = (props) => {
  const { user, date, curUser, editButtonHandler } = props;
  return (
    <div className="header">
      <div className="info-wrapper">
        <Avatar img={user.image} />
        <div className="username">{user.username}</div>
        {curUser.username == user.username && <span>you</span>}
        <div className="date-created-at">{date}</div>
      </div>
      {curUser.username == user.username ? (
        <>
          <EditButton onClick={editButtonHandler} />
          <DeleteButton />
        </>
      ) : (
        <ReplyButton />
      )}
    </div>
  );
};

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

function CommentPanelBase(props) {
  const { data, curUser, content, editButtonHandler } = props;
  return (
    <div className="comment-container">
      <ScorePanel score={data.score} />
      <div className="main-container">
        <Header
          curUser={curUser}
          user={data.user}
          date={data.createdAt}
          editButtonHandler={editButtonHandler}
        ></Header>
        <div className="content">{content}</div>
      </div>
    </div>
  );
}

function CommentPanelEdit(props) {
  const { data, curUser } = props;
  return (
    <CommentPanelBase
      {...props}
      content={
        <div className="edit-comment">
          <CommentForm
            user={curUser}
            content={data.content}
            buttonLable={"UPDATE"}
          />
        </div>
      }
    />
  );
}

function CommentPanelCommon(props) {
  const { data } = props;
  return <CommentPanelBase {...props} content={data.content} />;
}

function CommentPanel(props) {
  const [isEditNow, setIsEditNow] = useState(false);

  const changeEditState = (event) => {
    setIsEditNow(!isEditNow);
  };

  if (isEditNow)
    return <CommentPanelEdit {...props} editButtonHandler={changeEditState} />;
  else
    return (
      <CommentPanelCommon {...props} editButtonHandler={changeEditState} />
    );
}

function CommentElement(props) {
  const { data, curUser } = props;
  return (
    <div className="field">
      <CommentPanel curUser={curUser} data={data} />
      <ul>
        {data.replies.map((item) => (
          <li key={item.id}>
            <CommentPanel curUser={curUser} data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CommentList(props) {
  const { comments, currentUser } = props;
  if (!comments) return;
  return (
    <div className="comments-section">
      <ul>
        {comments.map((item) => (
          <li key={item.id}>
            <CommentElement curUser={currentUser} data={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
