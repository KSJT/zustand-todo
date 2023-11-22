import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
  draggedTodo: null,
  tasks: [],

  addTodo: (title, state) =>
    set((store) => ({
      tasks: [...store.tasks, { id: crypto.randomUUID(), title, state }],
    })),

  deleteTodo: (id) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.id !== id),
    })),

  setDraggedTodo: (id) => set({ draggedTodo: id }),

  moveTodo: (id, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.id === id ? { ...task, state: state } : task
      ),
    })),
});

export const useStore = create(persist(devtools(store), { name: "todo" }));
