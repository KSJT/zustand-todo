import React, { useState } from "react";
import "./Column.css";
import Task from "./Task";
import { useStore } from "../store/store";
import { shallow } from "zustand/shallow";
import classNames from "classnames";

function Column({ state }) {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);

  const tasks = useStore(
    (store) => store.tasks.filter((task) => task.state === state),
    shallow
  );
  const addTodo = useStore((store) => store.addTodo);
  const setDraggedTodo = useStore((store) => store.setDraggedTodo);
  const draggedTodo = useStore((store) => store.draggedTodo);
  const moveTodo = useStore((store) => store.moveTodo);

  // const tasks = useStore((store) =>
  //   store.tasks.filter((tasks) => tasks.state === state)
  // );
  // tasks 가 변할 때만 이 컴포넌트는 re-render 된다.
  // filter 는 항상 새로운 배열을(always create a new instance of an array) 만든다. ->
  // 내용이 바뀌지 않더라도 re-render 를 유발한다.
  // const filtered = useMemo(() => tasks.filter((tasks) => tasks.state === state), [tasks, state]);
  //
  // * compare logic: every render 에 함수가 돌아가기 때문에 비교 함수가 너무 복잡하면 성능 이슈가 생길 수 있음
  // (prev, next) => {
  //   const longest = prev.length > next.length ? prev.length : next.length;
  //   for (let i = 0; i < longest; i++) {
  //     if (!prev[i] || !next[i]) return false;
  //     if (prev[i] !== next[i]) return false;
  //   }
  //   return true;
  // };

  const handleAddTodo = (text, state) => {
    addTodo(text, state);
    setOpen(false);
    setText("");
  };

  return (
    <div
      className={classNames("column", { drop: drop })}
      onDragOver={(event) => {
        event.preventDefault();
        setDrop(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setDrop(false);
      }}
      onDrop={(event) => {
        moveTodo(draggedTodo, state);
        setDraggedTodo(null);
        setDrop(false);
      }}
    >
      <div className="top-title">
        <p>{state}</p>
        <button onClick={() => setOpen(true)} className="add">
          add
        </button>
      </div>

      {tasks.map((task) => (
        <Task key={task.id} state={state} id={task.id} title={task.title} />
      ))}
      {open && (
        <div className="modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setOpen(false)}>
              X
            </button>
            <input
              type="text"
              value={text}
              onChange={(event) => setText(event.target.value)}
            />
            <button onClick={() => handleAddTodo(text, state)}>add</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Column;
