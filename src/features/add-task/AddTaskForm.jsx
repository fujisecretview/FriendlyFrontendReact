import Field from '@/shared/ui/Field/';
import Button from '@/shared/ui/Button/';
import { useContext, useState, memo } from 'react';
import { ActionProviderContext } from '@/entities/todo/model/ActionProviderContext';

const AddTaskForm = ({ styles }) => {
  const { addTask, newTaskInputRef } = useContext(ActionProviderContext);

  const [error, setError] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Браузер при отправке формы перезагружает страницу чтобы этого избежать делаем свой onSubmit c preventDefault чтобы страница не перезагружалась

  // так же вызываем функцию добавления таски

  const onInput = (e) => {
    const { value } = e.target;
    const clearValue = value.trim();
    // проверка на пробелы
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0;

    setNewTaskTitle(value);
    setError(hasOnlySpaces ? 'The task cannot be empty' : '');
  };

  const clearedTask = newTaskTitle.trim();
  const isNewTaskTitleEmpty = clearedTask.length === 0;

  // useEffect(() => {
  //   const hasOnlySpaces = newTaskTitle.length > 0 && clearedTask.length === 0
  //   setError(hasOnlySpaces ? 'Task cannot be empty' : '');
  // }, [newTaskTitle]);

  // отвечает за отправку формы когда нажмем на кнопку Add
  const onSubmit = (e) => {
    e.preventDefault();

    if (!isNewTaskTitleEmpty) {
      addTask(clearedTask, () => setNewTaskTitle(''));
    }
  };

  return (
    <>
      {/*onSubmit ето submit event handler*/}

      <form className={styles.form} onSubmit={onSubmit}>
        <Field
          className={styles.field}
          label="New task title"
          id="new-task"
          error={error}
          value={newTaskTitle}
          onInput={onInput}
          ref={newTaskInputRef}
        />

        {/*!У кнопки есть тип submit соответственно на ее нажатие  будет вызван onSubmit у формы*/}
        <Button type="submit" isDisabled={isNewTaskTitleEmpty}>
          Add
        </Button>
      </form>
    </>
  );
};

export default memo(AddTaskForm);
