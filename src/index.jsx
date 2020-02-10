import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";

import TodoList from "./TodoList";

ReactDOM.render(
  <div>
    <h1>TODO LIST</h1>
    <TodoList />
  </div>,
  document.querySelector(".container")
);
