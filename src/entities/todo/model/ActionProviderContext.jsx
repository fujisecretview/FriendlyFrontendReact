import { createContext, useEffect } from 'react';
import useTasks from '@/entities/todo/model/useTasks';
import useIncompleteTaskScroll from '@/entities/todo/model/useIncompleteTaskScroll';

export const ActionProviderContext = createContext({});

export const ActionProvider = (props) => {
  const { children } = props;

  const {
    deleteTask,
    deleteAllTasks,
    toogleTaskComplete,

    setSearchQuery,
    searchQuery,

    newTaskInputRef,
    addTask,
    tasks,
  } = props;

  const { firstIncompleteTaskRef, firstIncompleteTaskId } =
    useIncompleteTaskScroll(tasks);

  // А тут я смотрю есть ли данные в локалке и если да то вывожу их на екран

  // useEffect(() => {
  //   console.log('Компонент Todo смонтирован, загружаем данные из хранилища')
  //   const savedTasks = localStorage.getItem('tasks');
  //   if (savedTasks) {
  //     setTasks(JSON.parse(savedTasks));
  //   }
  // }, [])

  return (
    <ActionProviderContext.Provider
      value={{
        deleteTask,
        deleteAllTasks,
        toogleTaskComplete,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        searchQuery,
        setSearchQuery,

        newTaskInputRef,
        addTask,
      }}
    >
      {children}
    </ActionProviderContext.Provider>
  );
};
