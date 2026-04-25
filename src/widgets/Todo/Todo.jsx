import AddTaskForm from '@/features/add-task/';
import SearchTaskForm from '@/features/search-task/';
import ToDoInfo from '@/features/stats/';
import { ToDoList, ActionProviderContext } from '@/entities/todo';
import Button from '@/shared/ui/Button/';
import { useContext } from 'react';
import styles from './Todo.module.css';

const Todo = () => {
  const { firstIncompleteTaskRef } = useContext(ActionProviderContext);

  return (
    <div className={styles.todo}>
      <h1 className={styles.title}>To Do List</h1>
      <AddTaskForm styles={styles} />

      <SearchTaskForm styles={styles} />

      <ToDoInfo styles={styles} />

      <Button
        onClick={() =>
          firstIncompleteTaskRef?.current.scrollIntoView({ behavior: 'smooth' })
        }
      >
        Show first Incomplete Task
      </Button>

      <ToDoList styles={styles} />
    </div>
  );
};

export default Todo;
