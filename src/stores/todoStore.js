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

  deleteCompletedTodos: async () => {
    try {
      const { todoData } = get();
      const completedTodos = todoData.filter(todo => todo.completed);
      
      for (const todo of completedTodos) {
        await axios.delete(`http://localhost:8080/api/todos/${todo.id}`);
      }
      
      set((state) => ({
        todoData: state.todoData.filter(todo => !todo.completed)
      }));
      
      console.log("Deleted completed todos successfully");
    } catch (error) {
      console.error("Error deleting completed todos:", error);
    }
  },

  addTodo: async (title) => {
    try {
      const response = await axios.post('http://localhost:8080/api/todos', {
        title: title,
        completed: false
      });
      
      const newTodo = response.data;
      
      set((state) => ({
        todoData: [...state.todoData, newTodo],
        currentInput: ""
      }));
      
      console.log("Added new todo successfully:", newTodo);
    } catch (error) {
      console.error("Error adding new todo:", error);
    }
  },

  toggleTodo: async (todoId) => {
    try {
      const { todoData } = get();
      const todoToUpdate = todoData.find(todo => todo.id === todoId);
      
      if (!todoToUpdate) {
        console.error("Todo not found with id:", todoId);
        return;
      }
      
      const response = await axios.put(`http://localhost:8080/api/todos/${todoId}`, {
        ...todoToUpdate,
        completed: !todoToUpdate.completed
      });
      
      const updatedTodo = response.data;
      
      set((state) => ({
        todoData: state.todoData.map(todo =>
          todo.id === todoId ? updatedTodo : todo
        )
      }));
      
      console.log("Toggled todo successfully:", updatedTodo);
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  },
}));
