import ToDoItem from "./ToDoItem";

const TodoList = (props) => {
  const {
    tasks = [],
  } = props

  const hasTasks = true

  if (!hasTasks) {
    return (
      <div className="todo__empty-message"></div>
    )
  }

  // Я могу деструктурировать tasks на id, key, title и isDone в current value

  // Так же я могу пойти еще дальше и захуярить спред таска

  return (
    <ul className="todo__list">
      {tasks.map((task) => (
        <ToDoItem
          className="todo__item"
          key={task.id}
          id={task.id}
          title={task.title}
          isDone={task.isDone}
        />
      ))}
    </ul>
  )
}

export default TodoList;
