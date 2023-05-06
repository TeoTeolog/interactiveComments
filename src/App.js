import "./styles/App.css";

import { CommentList } from "./components/CommentElement";
import { CommentFormPanel } from "./components/CommentForm";
import { useData } from "./hooks/useData";
import { useEffect } from "react";
import { useRenderCounter } from "./hooks/useRenderCounter";

function App() {
  const { render } = useRenderCounter("App");
  const dataFromFile = require("./data.json");
  const { data, getData, error, updateData } = useData(
    "myStore",
    {},
    dataFromFile
  );

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log("ERROR:", error);
  }, [error]);

  return (
    <div className="App">
      <CommentList currentUser={data.currentUser} comments={data.comments} />
      <CommentFormPanel user={data.currentUser} handleData={updateData} />
    </div>
  );
}

export default App;
