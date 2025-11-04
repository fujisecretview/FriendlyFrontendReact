import ToDoItem from "./ToDoItem";

const TodoList = (props) => {
  const {
    tasks = [],
    onDeleteTaskButtonClick,
    onTaskCompleteChange,
    filteredTasks,
  } = props

  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

  if (!hasTasks) {
    return (
      <div className="todo__empty-message">No tasks yet :)</div>
    )
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return (
      <div className="todo__empty-message">Error tasks 404 not found</div>
    )
  }

  // Я могу деструктурировать tasks на id, key, title и isDone в current value

  // Так же я могу пойти еще дальше и захуярить спред таска

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
        <ToDoItem
          className="todo__item"
          key={task.id}
          id={task.id}
          title={task.title}
          isDone={task.isDone}
          onDeleteTaskButtonClick={onDeleteTaskButtonClick}
          onTaskCompleteChange={onTaskCompleteChange}
        />
      ))}
    </ul>
  )
}

export default TodoList;
