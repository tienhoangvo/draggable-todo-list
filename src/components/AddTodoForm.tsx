import { ReactEventHandler, useState } from "react"
import Button from "./Button"
import { Todo } from "./TodoList"

export type AddTodoFormProps = {
  onAddTodo: (todoName : Todo['name']) => void
}

const AddTodoForm = ({ onAddTodo } : AddTodoFormProps) => {
  const [todoName, setTodoName] = useState('')

  const changeHandler:ReactEventHandler<HTMLInputElement> = event => {
    setTodoName(event.currentTarget.value)
  }

  const formSumbmitHandler: ReactEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    if (!todoName) return
    onAddTodo(todoName)
    setTodoName('')
  }

  return (
    <form onSubmit={formSumbmitHandler}>
      <fieldset>
        <legend>+ New todo</legend>
    
        <input type="text" value={todoName} onChange={changeHandler} />
        <Button type="submit" >Add</Button>
      </fieldset>
    </form>
  )
}

export default AddTodoForm