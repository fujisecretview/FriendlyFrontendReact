const ToDoInfo = () => {
  return (
    <>
      <div className="todo__info">
        <div className="todo__total-tasks">Total tasks: <span>0</span></div>
        <button
          className="todo__delete-all-button"
          type="button"
          onClick={() => {
            console.log('To Do List')
          }}
        >Delete all
        </button>
      </div>
    </>
  )
}

export default ToDoInfo;