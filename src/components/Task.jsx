import React from "react";
import "./Task.css";
import classNames from "classnames";
import { useStore } from "../store/store";

function Task({ state, id, title }) {
  const deleteTodo = useStore((store) => store.deleteTodo);
  const setDraggedTodo = useStore((store) => store.setDraggedTodo);

  return (
    <>
      <div
        className="task"
        draggable
        onDragStart={() => {
          setDraggedTodo(id);
        }}
      >
        <div className="content-box">
          <p className="title">{title}</p>
          <div className="bottom-box">
            <div className="delete" onClick={() => deleteTodo(id)}>
              delete
            </div>
            <div className={classNames("state", state)}>{state}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Task;
