import Field from "./Field";
import Button from "./Button";

const AddTaskForm = (props) => {

  const {
    addTask
  } = props

  return (
    <>
      <form className="todo__form">
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