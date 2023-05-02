import "./styles/App.css";

import { CommentList } from "./components/CommentElement";
import { CommentForm } from "./components/CommentForm";
import { useData } from "./hooks/useData";
import { useEffect } from "react";

function App() {
  // const data = require("./data.json");
  const { data, getData } = useData("../data.json");

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="App">
      <CommentList comments={data.comments} />
      <CommentForm user={data.currentUser} />
    </div>
  );
}

export default App;
