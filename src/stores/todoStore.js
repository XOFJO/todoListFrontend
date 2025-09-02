import { create } from "zustand";
import todoItems from "../components/todoItems.json";
import axios from "axios";



axios.defaults.baseURL = 'http://localhost:8080';

axios.interceptors.response.use(
  response => response,
  error => {
    alert("请求出错: " + (error.message));
    return Promise.reject(error);
  }
);

export const useTodoStore = create((set, get) => ({
  todoData: todoItems,
  isFilter: false,
  currentInput: "",

  fetchTodoData: async (page = 1, size = 5) => {
    try {
      const response = await axios.get(`/api/v1/todos?page=${page}&size=${size}`);
      set({ todoData: response.data });
    } catch (error) {
      console.error("Error fetching todo data:", error);
    }
  },

  toggleFilter: () => set((state) => ({ isFilter: !state.isFilter })),

  onUpdateTodoData: (newData) => set((state) => ({ todoData: newData })),

  onUpdateCurrentInput: (newInput) =>
    set(() => ({ currentInput: newInput })),
}));
