import ToDoItem from "./ToDoItem";

const TodoList = () => {
  const hasTasks = true
  if (!hasTasks) {
    return (
      <div className="todo__empty-message"></div>
    )
  }

  return (
    <ul className="todo__list">
      <ToDoItem
        className='todo__item'
        id="task-1"
        title='Безответно любить'
        isDone={false}
      />
      <ToDoItem
        className='todo__item'
        id="task-1"
        title='Лоботомия'
        isDone
      />
    </ul>
  )
}

export default TodoList;
