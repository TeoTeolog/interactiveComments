import React from "react";
import "../styles/comment.css";

import replyImg from "../images/icon-reply.svg";
import editImg from "../images/icon-edit.svg";
import deleteImg from "../images/icon-delete.svg";
import { Avatar } from "./Avatar";

const ReplyButton = (props) => {
  return (
    <button>
      <img stc={replyImg} alt="r"></img> Reply
    </button>
  );
};

const EditButton = (props) => {
  return (
    <button>
      <img stc={editImg} alt="e"></img> Edit
    </button>
  );
};

const DeleteButton = (props) => {
  return (
    <button>
      <img stc={editImg} alt="d"></img> Delete
    </button>
  );
};

const Header = (props) => {
  const { user, date, curUser } = props;
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
          <EditButton />
          <DeleteButton />
        </>
      ) : (
        <ReplyButton />
      )}
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
  const { data, curUser } = props;
  return (
    <div className="comment-container">
      <ScorePanel score={data.score} />
      <div className="main-container">
        <Header
          curUser={curUser}
          user={data.user}
          date={data.createdAt}
        ></Header>
        <div className="content">{data.content}</div>
      </div>
    </div>
  );
}

export function CommentElement(props) {
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
