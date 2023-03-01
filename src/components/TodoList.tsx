import { Fragment } from "react"
import List from "./List"

export type Todo = {
  id: string,
  name: string,
  checked: boolean
}


export type TodoListProps = {
  items: Todo[],
  renderItem: (todo:Todo) => JSX.Element
}

const TodoList = ({ items, renderItem }: TodoListProps) => {
  return (
    <List style={{
      transition: "all 200ms ease",
      padding: "0"
    }}>
      {items.map(item => <Fragment key={item.id}>{renderItem(item)}</Fragment>)}
    </List>
  )
}

export default TodoList