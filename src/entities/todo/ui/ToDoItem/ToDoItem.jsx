import { memo, useContext, Fragment } from 'react';
import { ActionProviderContext } from '@/entities/todo/';
import RouterLink from '@/shared/ui/RouterLink/';
import styles from './TodoItem.module.scss';
import { motion } from 'framer-motion';

const ToDoItem = (props) => {
  const { className = '', id, title, isDone } = props;

  const {
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    deleteTask,
    toogleTaskComplete,
    searchQuery,
  } = useContext(ActionProviderContext);

  const showMarkedTask = (title, searchQuery) => {
    if (!searchQuery) return title;
    const regEx = new RegExp(`(${searchQuery})`, 'i');

    // split title in searchQuery that we gona mark up
    const parts = title.split(regEx); // homework => if split on ho result will be => '' mework
    return parts.map((part, index) => {
      return (
        <Fragment key={index}>
          {index % 2 === 1 ? <mark>{part}</mark> : part}
        </Fragment>
      );
    });
  };

  const collapseVariants = {
    initial: { height: 0, opacity: 0 },
    animate: { height: 'auto', opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  return (
    <>
      <motion.li
        key={id}
        variants={collapseVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{
          duration: 0.2,
          ease: [0.32, 0, 0.67, 0],
        }}
        style={{
          overflow: 'hidden',
          transformOrigin: 'top center',
        }}
        className={`${styles.todoItem} ${className}`}
        ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
      >
        <input
          className={styles.todoItemCheckbox}
          id={id}
          type="checkbox"
          checked={isDone}
          readOnly
          onChange={(event) => toogleTaskComplete(id, event.target.checked)}
        />
        <label
          className={`${styles.todoItemLabel} visually-hidden`}
          htmlFor={id}
        >
          <span>{title}</span>
        </label>
        <RouterLink
          className={
            isDone ? `${styles.todoItemLinkIsDone}` : `${styles.todoItemLink}`
          }
          to={`tasks/${id}`}
          aria-label="Task detail page"
        >
          <span>{showMarkedTask(title, searchQuery)}</span>
        </RouterLink>
        <button
          className={styles.todoItemDeleteButton}
          aria-label="Delete"
          title="Delete"
          onClick={() => deleteTask(id)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 5L5 15M5 5L15 15"
              stroke="#757575"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </motion.li>
    </>
  );
};

export default memo(ToDoItem);
