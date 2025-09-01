import { TodoItem } from './todoItem';
import {useTodoStore} from '../stores/todoStore.js';


    
export default function TodoList() {

  const { todoData, onUpdateTodoData, isFilter, toggleFilter, currentInput, onUpdateCurrentInput } = useTodoStore();
  const filteredItems = isFilter ? todoData.filter(item => !item.completed) : todoData;

  const handleItemToggle = (todoId) => {
    onUpdateTodoData(todoData.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed};
      }
      return todo;
    }))};

  const handleAddTodo = () => {
    if (currentInput.trim() === "") {
      return;
    } else {
      onUpdateTodoData([...todoData, { id: Date.now(), title: currentInput, completed: false }]);
      
    }
  }


  const handlelClearFinished = () => {
    onUpdateTodoData(todoData.filter(item => !item.completed));
  }


  return (
    <section>
      <h1>Sally Ride 的 Todo 清单</h1>
      <label>
        <input type="checkbox" onChange={() => {toggleFilter(!isFilter)}}/>
        过滤已完成的事项

      </label>

      <div>

        <input type="text" value={currentInput} onChange={(e) => {
          onUpdateCurrentInput(e.target.value)
        }}/>
        <button onClick={handleAddTodo}>添加</button>

      </div>

      <ul>
        {filteredItems.map((item, index) => (
          <TodoItem key={index} title={item.title} completed={item.completed} onToggle={() => handleItemToggle(item.id)}/>
        ))}
      </ul>




      <div>
        <button onClick={handlelClearFinished}>清空已完成</button>
      </div>
    </section>
  );
}
