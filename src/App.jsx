import './App.css'
import TodoList from './components/TodoList.jsx'
import {  BrowserRouter } from 'react-router-dom' 
import { Routes, Route} from 'react-router'

function App() {

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App