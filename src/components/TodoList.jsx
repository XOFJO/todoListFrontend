import { TodoItem } from "./todoItem";
import { useTodoStore } from "../stores/todoStore.js";
import { useSearchParams } from "react-router";
import styles from "./todoList.module.css";
import { useEffect } from "react";

export default function TodoList() {
  const {
    todoData,
    isFilter,
    toggleFilter,
    currentInput,
    onUpdateCurrentInput,
    currentPage,
    totalPages,
    fetchTodoData,
    deleteCompletedTodos,
    addTodo,
    toggleTodo,
  } = useTodoStore();

  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page")) || 1;
  const size = parseInt(searchParams.get("size")) || 5;

  useEffect(() => {
    fetchTodoData(page, size);
  }, [page, size, fetchTodoData]);

  const updateSearchParams = (newPage, newSize = size) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    params.set("size", newSize);
    setSearchParams(params);
  };

  const handleGoToPage = (targetPage) => {
    updateSearchParams(targetPage);
  };

  const filteredItems = isFilter
    ? todoData.filter((item) => !item.completed)
    : todoData;

  const handleItemToggle = async (todoId) => {
    await toggleTodo(todoId);
  };

  const handleAddTodo = async () => {
    if (currentInput.trim() === "") {
      return;
    } else {
      await addTodo(currentInput);
    }
  };

  const handleClearFinished = async () => {
    await deleteCompletedTodos();
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Sally Ride 的 Todo 清单</h1>

      <div className={styles.statsContainer}>
        <label className={styles.statsLabel}>总数: {todoData.length}</label>

        <label className={styles.statsIncomplete}>
          未完成：{" "}
          {todoData.reduce((prev, item) => {
            return item.completed ? prev : prev + 1;
          }, 0)}
        </label>

        <label className={styles.statsCompleted}>
          已完成：{" "}
          {todoData.reduce((prev, item) => {
            return !item.completed ? prev : prev + 1;
          }, 0)}
        </label>
      </div>

      <label className={styles.filterLabel}>
        <input
          type="checkbox"
          onChange={() => {
            toggleFilter(!isFilter);
          }}
          className={styles.filterCheckbox}
        />
        过滤已完成的事项
      </label>

      <div className={styles.inputContainer}>
        <input
          type="text"
          value={currentInput}
          onChange={(e) => {
            onUpdateCurrentInput(e.target.value);
          }}
          className={styles.textInput}
          placeholder="输入新任务..."
        />
        <button onClick={handleAddTodo} className={styles.addButton}>
          添加
        </button>
      </div>

      <ul className={styles.todoList}>
        {filteredItems.map((item, index) => (
          <TodoItem
            key={index}
            title={item.title}
            completed={item.completed}
            onToggle={() => handleItemToggle(item.id)}
          />
        ))}
      </ul>

      <div className={styles.clearButtonContainer}>
        <button onClick={handleClearFinished} className={styles.clearButton}>
          清空已完成
          {todoData.reduce((prev, item) => {
            return item.completed ? prev + 1 : prev;
          }, 0)}
        </button>
      </div>

      <div className={styles.paginationContainer}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handleGoToPage(index + 1)}
            className={`${styles.paginationButton} ${
              currentPage === index + 1 ? styles.activePage : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
