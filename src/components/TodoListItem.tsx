import { DragEventHandler, FormEventHandler, MouseEventHandler, ReactEventHandler, useState } from "react";
import ListItem from "./ListItem";
import type { Todo } from "./TodoList";

export type TodoListItemProps = {
  item: Todo;
  onCheck: (id: string) => void;
  onSwap: (id1: Todo["id"], id2: Todo["id"]) => void;
  onUpdate: (todoId: Todo['id'],todoName: Todo['name']) => void;
  onDelete: (todoId: Todo['id']) => void;
};

const TodoListItem = ({ item, onCheck, onSwap, onUpdate, onDelete }: TodoListItemProps) => {
  const changeHandler: ReactEventHandler<HTMLInputElement> = (event) => {
    console.log(event);
    onCheck(item.id);
  };

  const [contentEditable, setContentEditable] = useState(false)

  const dragStartHandler: DragEventHandler<HTMLLIElement> = (event) => {
    event.dataTransfer.setData("text/plain", item.id);
    event.currentTarget.style.opacity = '0.2'
    event.currentTarget.style.borderColor = 'red'
  };

  const dragEndHandler: DragEventHandler<HTMLLIElement> = (event) => {
    event.currentTarget.style.opacity = '1'
    event.currentTarget.style.borderColor = 'black'
  };

  const dragEnterHandler: DragEventHandler<HTMLLIElement> = (event) => {
    event.currentTarget.style.borderColor = 'red'
    event.currentTarget.style.translate = '0 -5%'
  
  };

  const dragLeaveHandler: DragEventHandler<HTMLLIElement> = (event) => {
    event.currentTarget.style.borderColor = 'black'
    event.currentTarget.style.translate = '0 0%'
  };

  const dragOverHandler: DragEventHandler<HTMLLIElement> = (event) => {
    event.preventDefault();
  };

  const dropHandler: DragEventHandler<HTMLLIElement> = (event) => {
    event.currentTarget.style.borderColor = 'black'
    event.preventDefault();
    const data = event.dataTransfer.getData("text/plain");
    if (data === item.id) return
    onSwap(data, item.id);
  };

  const doubleClickHandler: MouseEventHandler<HTMLSpanElement> = event => {
    setContentEditable(true)
  }

  const nameChangeHandler: FormEventHandler<HTMLSpanElement> = event => {
    const value = event.currentTarget.innerHTML
    setContentEditable(false)
    onUpdate(item.id, value)
  }

  const deleteClickHandler: ReactEventHandler<HTMLButtonElement> = () => {
    onDelete(item.id)
  }

  return (
    <ListItem
      style={{
        cursor: "move",
        padding: "8px 16px",
        border:  "2px solid black",
        marginBlockStart: "10px",
        userSelect: "none",
        transition: 'all 200ms ease',
        listStyle: "none",
        backgroundColor: "lightgrey"
      }}
      draggable
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}

      onDragOver={dragOverHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDrop={dropHandler}
    >
      <input type="checkbox" checked={item.checked} onChange={changeHandler} />
      {item.checked ? <mark dangerouslySetInnerHTML={{__html: item.name}}/> : <span contentEditable={contentEditable} suppressContentEditableWarning style={{ outline: "none "}} onDoubleClick={doubleClickHandler} onBlur={nameChangeHandler} dangerouslySetInnerHTML={{__html: item.name}}/>}
      <button onClick={deleteClickHandler}>❌</button>
    </ListItem>
  );
};

export default TodoListItem;
