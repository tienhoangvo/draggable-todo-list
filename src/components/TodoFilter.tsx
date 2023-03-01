import { ChangeEventHandler, ReactEventHandler } from "react";
import Button from "./Button";
import type { Todo } from "./TodoList";

export type TodoSortBy = keyof Pick<Todo, "name" | "checked"> | null;

export type TodoSortOrder = "asc" | "desc" | null;

export type TodoFilterProps = {
  searchTerm: string;
  sortBy: TodoSortBy;
  order: TodoSortOrder;
  done: Todo["checked"] | null;
  onSearch: (term: string) => void;
  onSort: (sortBy: TodoSortBy, order: TodoSortOrder) => void;
  onDone: (done: Todo["checked"] | null) => void;
  onClear: () => void;
};

const TodoFilter = ({
  searchTerm,
  done,
  sortBy,
  order,
  onSearch,
  onSort,
  onDone,
  onClear,
}: TodoFilterProps) => {
  const searchChangeHandler: ReactEventHandler<HTMLInputElement> = (event) => {
    onSearch(event.currentTarget.value);
  };

  const doneChangeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value =
      event.currentTarget.value === "all"
        ? null
        : event.currentTarget.value === "done"
        ? true
        : false;
    onDone(value);
  };

  const sortByChangeHandler: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    onSort(
      event.currentTarget.value
        ? (event.currentTarget.value as TodoSortBy)
        : null,
      order
    );
  };

  const orderChangeHandler: ChangeEventHandler<HTMLSelectElement> = (event) => {
    onSort(sortBy, event.currentTarget.value as TodoSortOrder);
  };

  const clearHandler: ReactEventHandler<HTMLButtonElement> = () => {
    onClear();
  };

  return (
    <form>
      <fieldset>
        <legend>Filter</legend>
        <input
          type="search"
          name="searchTerm"
          value={searchTerm}
          onChange={searchChangeHandler}
        />
        <div>
          <input
            type="radio"
            name="done"
            id="all"
            checked={done === null}
            value={"all"}
            onChange={doneChangeHandler}
          />
          <label htmlFor="all">All</label>

          <input
            type="radio"
            name="done"
            id="done"
            checked={done === true}
            value={"done"}
            onChange={doneChangeHandler}
          />
          <label htmlFor="done">Done</label>

          <input
            type="radio"
            name="done"
            id="undone"
            checked={done === false}
            value={"undone"}
            onChange={doneChangeHandler}
          />
          <label htmlFor="undone">Undone</label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Sort</legend>
        <select
          name="sortBy"
          onChange={sortByChangeHandler}
          value={sortBy || ""}
        >
          <option value="" disabled hidden>
            Select field
          </option>
          <option value="name">Name</option>
          <option value="checked">Checked</option>
        </select>
        {sortBy && (
          <>
            <select name="order" onChange={orderChangeHandler}>
              <option value="asc">ASC</option>
              <option value="desc">DESC</option>
            </select>
            <Button onClick={clearHandler}>Clear</Button>
          </>
        )}
      </fieldset>
    </form>
  );
};

export default TodoFilter;
