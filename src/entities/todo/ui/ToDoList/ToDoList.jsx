import ToDoItem from '../ToDoItem/ToDoItem';
import { memo, useContext } from 'react';
import { DataProviderContext } from '@/entities/todo/model/DataProviderContext';
import { AnimatePresence, motion } from 'framer-motion';

const TodoList = ({ styles }) => {
  const { tasks, filteredTasks } = useContext(DataProviderContext);

  // if (!hasTasks) {
  //   return <div className={styles.emptyMessage}>No tasks yet :)</div>;
  // }
  //
  // if (hasTasks && isEmptyFilteredTasks) {
  //   return <div className={styles.emptyMessage}>Error tasks 404 not found</div>;
  // }

  // Я могу деструктурировать tasks на id, key, title и isDone в current value

  // Так же я могу пойти еще дальше и захуярить спред таска

  return (
    <motion.ul className={styles.list}>
      <AnimatePresence>
        {(filteredTasks ?? tasks).map((task) => (
          <ToDoItem key={task.id} {...task} />
        ))}
      </AnimatePresence>

      {tasks.length === 0 && (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.emptyMessage}
        >
          No tasks yet :)
        </motion.div>
      )}

      {tasks.length > 0 && filteredTasks?.length === 0 && (
        <motion.div
          key="notfound"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.emptyMessage}
        >
          Task not found
        </motion.div>
      )}
    </motion.ul>
  );
};

export default memo(TodoList);
