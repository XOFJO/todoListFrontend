import React from 'react'
import styles from './TodoList.module.css';





export function TodoItem({ title, completed, onToggle }) {
  const itemClassName = `${styles.item} ${completed ? styles.checked : ''}`;
  return (
    <li className={itemClassName}>
      <label>
        <input type="checkbox" checked={completed} onChange={onToggle}/>
        {title} {completed && "✅"}
      </label>
    </li>
  );
}
