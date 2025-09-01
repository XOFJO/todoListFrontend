import { create } from "zustand";

import todoItems from '../components/todoItems.json';


export const useTodoStore = create((set, get) => ({
  todoData: todoItems,
  isFilter: false,


  toggleFilter: () => set((state) => ({ isFilter: !state.isFilter })),



  onUpdateTodoData: (newData) =>
    set((state) => ({ todoData: [...state.todoData, newData] })),

}));
