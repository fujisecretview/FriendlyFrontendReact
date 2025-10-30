import Field from "./Field";
import Button from "./Button";

const AddTaskForm = (props) => {

  const {
    addTask
  } = props

  // Браузер при отправке формы перезагружает страницу чтобы этого избежать делаем свой onSubmit c preventDefault чтобы страница не перезагружалась


  const onSubmit = (e) => {
    e.preventDefault();
    addTask()
  }

  return (
    <>
      <form
        className="todo__form"
        onSubmit={onSubmit}
      >
        <Field
          className="todo__field"
          label="New task title"
          id="new-task"
        />
        <Button
          type="submit"
          onClick={addTask}
        >
          Add
        </Button>
      </form>
    </>
  )
}

export default AddTaskForm