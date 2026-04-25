import Todo from '@/widgets/Todo/Todo';
import useTasks from '@/entities/todo/model/useTasks';
import { useEffect } from 'react';

import { ActionProvider, DataProvider } from '@/entities/todo';

const TasksPage = () => {
  const {
    deleteTask,
    deleteAllTasks,
    toogleTaskComplete,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,

    tasks,
    filteredTasks,
  } = useTasks();

  useEffect(() => {
    document.title = 'Todo List';
  }, []);

  return (
    <DataProvider tasks={tasks} filteredTasks={filteredTasks}>
      <ActionProvider
        deleteTask={deleteTask}
        deleteAllTasks={deleteAllTasks}
        toogleTaskComplete={toogleTaskComplete}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        firstIncompleteTaskId={firstIncompleteTaskId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        newTaskInputRef={newTaskInputRef}
        addTask={addTask}
        tasks={tasks}
      >
        <Todo />
      </ActionProvider>
    </DataProvider>
  );
};

export default TasksPage;
