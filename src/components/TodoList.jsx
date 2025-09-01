import { TodoItem } from "./todoItem";
import { useTodoStore } from "../stores/todoStore.js";
import styles from "./todoList.module.css";

export default function TodoList() {
  const {
    todoData,
    onUpdateTodoData,
    isFilter,
    toggleFilter,
    currentInput,
    onUpdateCurrentInput,
  } = useTodoStore();
  const filteredItems = isFilter
    ? todoData.filter((item) => !item.completed)
    : todoData;

  const handleItemToggle = (todoId) => {
    onUpdateTodoData(
      todoData.map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  const handleAddTodo = () => {
    if (currentInput.trim() === "") {
      return;
    } else {
      onUpdateTodoData([
        ...todoData,
        { id: Date.now(), title: currentInput, completed: false },
      ]);
    }
  };

  const handleClearFinished = () => {
    onUpdateTodoData(todoData.filter((item) => !item.completed));
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
        <button 
          onClick={handleAddTodo}
          className={styles.addButton}
        >
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
        <button 
          onClick={handleClearFinished}
          className={styles.clearButton}
        >
          清空已完成
          {todoData.reduce((prev, item) => {
            return item.completed ? prev + 1 : prev;
          }, 0)}
        </button>
      </div>
    </section>
  );
}
