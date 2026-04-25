import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useReducer,
} from 'react';
import tasksAPI from '@/shared/api/tasks';

// Reducer, contains all ui-logic
const TasksReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, action.task];

    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.id);

    case 'TOOGLE_TASK':
      return state.map((task) => {
        if (task.id === action.taskId) {
          return { ...task, isDone: !task.isDone };
        }
        return task;
      });

    case 'PATCH_TASK':
      return state.map((task) => {
        if (task.id === action.oldTaskId) {
          return { ...task, id: action.newTaskId };
        }
        return task;
      });

    case 'SET_ALL':
      return Array.isArray(action.tasks) ? action.tasks : state;

    case 'DELETE_ALL_TASKS':
      return [];
  }
};

// initial tasks вынесены за пределы хука так как используются один раз
const initialTasks = [{ id: 'task-1', title: 'Try todo list', isDone: false }];

const useTasks = () => {
  // состояние с массивом тасок
  const [tasks, dispatch] = useReducer(TasksReducer, []);

  const [searchQuery, setSearchQuery] = useState('');

  // ref для фокусировки в поле создания таски
  const newTaskInputRef = useRef(null);

  // ref для снапшота
  const tasksRef = useRef([]);

  // хук для сетапа начальных тасок при первом рендере. Если есть на сервере то сетаем респонс или сетаем начальные таски
  useEffect(() => {
    newTaskInputRef.current.focus();

    const setInitalTasks = async () => {
      // setTasks(await tasksAPI.setInitialTasks(initialTasks));
      const data = await tasksAPI.setInitialTasks(initialTasks);
      dispatch({
        type: 'SET_ALL',
        tasks: data,
      });
    };
    setInitalTasks();
  }, []);

  // поддерживаем актуальные таски из ref с постоянным монитором через deps tasks
  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  // Добавление таски, optimistic UI logic.
  const addTask = useCallback(async (clearedTask, callbackAfterAdding) => {
    // const optimisticNewTask = {
    //   id: crypto.randomUUID(),
    //   title: clearedTask,
    //   isDone: false,
    // };

    // dispatch({
    //   type: 'ADD_TASK',
    //   task: optimisticNewTask,
    // });
    const newTask = {
      title: clearedTask,
      isDone: false,
    };

    // // снимок старого состояния тасок для optimistic UI
    const snapshot = tasksRef.current;

    callbackAfterAdding();

    try {
      const addedTask = await tasksAPI.add(newTask);
      dispatch({
        type: 'ADD_TASK',
        task: addedTask,
      });
    } catch (error) {
      dispatch({
        type: 'SET_ALL',
        tasks: snapshot,
      });
    }

    newTaskInputRef.current.focus();
  }, []);

  // Удаление таски, optimistic UI logic
  const deleteTask = useCallback(async (taskId) => {
    const snapshot = tasksRef.current;
    dispatch({
      type: 'DELETE_TASK',
      id: taskId,
    });
    try {
      await tasksAPI.delete(taskId);
    } catch (error) {
      dispatch({
        type: 'SET_ALL',
        tasks: snapshot,
      });
    }
  }, []);

  // Удаление всех тасок, optimistic UI logic
  const deleteAllTasks = useCallback(async () => {
    const isConfirmed = confirm('Wana delete all tasks?');

    if (isConfirmed) {
      const snapshot = tasksRef.current;

      // const getTasks = await fetch('http://localhost:3001/tasks')
      // const parsedData = await getTasks.json()
      dispatch({ type: 'DELETE_ALL_TASKS' });

      try {
        await tasksAPI.deleteAll(snapshot);
      } catch (error) {
        dispatch({ type: 'SET_ALL', tasks: snapshot });
      }
    }
  }, []);

  // Переключатель для поля isDone
  const toogleTaskComplete = useCallback(async (taskId, isDone) => {
    const snapshot = tasksRef.current;

    dispatch({
      type: 'TOOGLE_TASK',
      taskId: taskId,
    });

    try {
      await tasksAPI.toogleComplete(taskId, isDone);
    } catch (error) {
      dispatch({
        type: 'SET_ALL',
        tasks: snapshot,
      });
    }
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery?.trim().toLowerCase();
    if (clearSearchQuery?.length === 0) return null;

    return tasks.filter(({ title }) =>
      title.toLowerCase().includes(clearSearchQuery),
    );
  }, [tasks, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,

    tasks,
    filteredTasks,
    deleteTask,
    deleteAllTasks,
    toogleTaskComplete,
    newTaskInputRef,
    addTask,
  };
};

export default useTasks;
