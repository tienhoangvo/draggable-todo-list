import { useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoFilter, { TodoSortBy, TodoSortOrder } from "./components/TodoFilter";
import TodoList, { Todo } from "./components/TodoList";
import TodoListItem from "./components/TodoListItem";
import { swap } from './utils'

function App() {
  const [items, setItems] = useState(todos);
  const [sortBy, setSortBy] = useState<TodoSortBy>(null)
  const [searchTerm, setSearchTerm] = useState<Todo['name']>('')
  const [order, setOrder] = useState<TodoSortOrder>('asc')
  const [filterDone, setFilterDone] = useState<Todo['checked'] | null>(null)

  let filteredItems = items.filter((todo) => searchTerm ? !todo.name.includes(searchTerm) : filterDone !== null ? todo.checked === filterDone : true)

  if (sortBy) {
    filteredItems = filteredItems.sort((a, z) => {
      if (sortBy === "checked") {
        return order === "asc" ? Number(a.checked) - Number(z.checked) : Number(z.checked) - Number(a.checked)
      }

      return order === "asc" ? a.name.localeCompare(z.name) : z.name.localeCompare(a.name)
    })
  }

  const toggleTodo = (id: Todo['id']) => {
    setItems((items) => items.map((item) => item.id === id ? {...item, checked: !item.checked } : item))
  }

  const swapTodos = (id1: Todo['id'], id2: Todo['id']) => {
    setItems((items) => {
      const clonedItems = [...items]
      const index1 = clonedItems.findIndex((item) => item.id === id1)
      const index2 = clonedItems.findIndex((item) => item.id === id2)
      return swap(clonedItems, index1, index2)
    })
  }

  const addTodo = (todoName: Todo['name']) => {
    setItems((items) => [...items, { id: `${items.length + 1}`, name: todoName, checked: false }])
  }

  const updateTodo = (todoId: Todo['id'], todoName: Todo['name']) => {
    setItems((items) => items.map((item) => item.id === todoId ? {...item, name: todoName } : item))
  }

  const sort = (sortBy: TodoSortBy, order: TodoSortOrder) => {
    setSortBy(sortBy)
    setOrder(order)
  }

  const done = (done: Todo['checked'] | null) => {
    setFilterDone(done)
  }


  return (
    <div className="App" style={{ width: "min(500px, 100vw)", marginInline: "auto", padding: "16px"}}>
      <TodoFilter searchTerm={searchTerm} sortBy={sortBy} order={order} onSearch={setSearchTerm} onSort={sort} onDone={done} done={filterDone} />
      <TodoList items={filteredItems} renderItem={(item) => <TodoListItem item={item} onCheck={toggleTodo} onSwap={swapTodos} onUpdate={updateTodo}/>}/>
      <AddTodoForm onAddTodo={addTodo} />
    </div>
  );
}

export default App;

const todos: Todo[] = [
  { 
    id: '0',
    name: 'Do the shopping',
    checked: true
  },
  { 
    id: '1',
    name: 'Clean up the room',
    checked: false
  },
  { 
    id: '2',
    name: 'Take a walk',
    checked: false
  },
  { 
    id: '3',
    name: 'Learn English',
    checked: false
  },
  { 
    id: '4',
    name: 'Watch an episode of Friends',
    checked: true
  },
]
