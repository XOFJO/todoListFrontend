import { useState } from 'react'
import './App.css'
import TodoList from './components/TodoList.jsx'
import {  BrowserRouter } from 'react-router-dom' 
import { Routes, Route} from 'react-router'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App