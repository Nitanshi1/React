import { useState } from 'react'

import './App.css'
import AddTodo from './components/addToDo'
import Todos from './components/todos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h1>Redux Tool KIT</h1>
   <AddTodo />
    <Todos />
    </>
  )
}

export default App
