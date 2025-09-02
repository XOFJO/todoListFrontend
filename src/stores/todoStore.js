import { create } from "zustand";
import todoItems from "../components/todoItems.json";
import axios from "axios";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    alert("请求出错: " + error.message);
    return Promise.reject(error);
  }
);

export const useTodoStore = create((set, get) => ({
  todoData: todoItems,
  isFilter: false,
  currentInput: "",
  currentPage: 1,
  pageSize: 5,
  totalPages: 0,
  totalElements: 0,

  fetchTodoData: async (page = 1, size = 5) => {
    try {
      // 后端这里我已经在后端设置跨域允许了，所以就没用proxy进行代理
      const response = await axios.get(`http://localhost:8080/api/todos?page=${page}&size=${size}`);
      console.log("Fetched todo data:", response.data);
      const data = response.data;
      
      set({
        todoData: data,
        currentPage: page,
        totalPages: data.length < size ? page : page + 1,
        totalElements: data.length,
      });
    } catch (error) {
      console.error("Error fetching todo data:", error);
    }
  },

  toggleFilter: () => set((state) => ({ isFilter: !state.isFilter })),

  onUpdateTodoData: (newData) => set((state) => ({ todoData: newData })),

  onUpdateCurrentInput: (newInput) => set(() => ({ currentInput: newInput })),
}));
