import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import ToDoList from "./ToDoList";
import {useEffect, useState, useRef,} from "react";

const Todo = () => {


  const initialTasks = [{
    id: 'task-1',
    title: 'Трахать сук',
    isDone: false
  },
    {
      id: 'task-2',
      title: 'Пить сок',
      isDone: true
    },
  ]

  // Тут хранится таски которые добавит пользователь

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  // Тут хранятся таски и начальное значение

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      return JSON.parse(savedTasks)
    }

    return initialTasks
  })

  // тут я буду сохранять в локалку
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
  })



  const newTaskInputRef = useRef(null);



  // Логика работы дочерних компонентов прописывается в родительском

  // В функции addTask с начала проверка на пустые строки и длинну, далее мы генерим айдишник и тут есть ньюанс в ввиде того что если в старом браузере нету crypto то сработает точно Date.now

  const addTask = () => {
    if (newTaskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.UUID ?? Date.now().toString(),
        title: newTaskTitle,
        isDone: false
      }
      setTasks(
        [...tasks, newTask]
      )
      setNewTaskTitle('');
      setSearchQuery('');
      newTaskInputRef.current.focus();
    }
  }

  // реакт сам перерисовывает если видит что масив изменился, так же метод фильтер возвращает новый массив по этому тут остается иммутабельность

  const deleteTask = (taskId) => {
    setTasks(
      tasks.filter(task => task.id !== taskId)
    );
  }


  const deleteAllTasks = () => {
    const isConfirmed = confirm('Wana delete all tasks?')

    if (isConfirmed) {
      localStorage.removeItem('tasks')
      setTasks(
        []
      )
    }
  }

  const toogleTaskComplete = (taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {...task, isDone};
        }
        return task;
      })
    );
  }

  const filterTasks = (query) => {
    console.log(`Поиск: ${query}`);
  }

  // Вывожу поиск по title

  const clearSearchQuery = searchQuery.trim().toLowerCase()
  const filteredTasks = clearSearchQuery.length > 0
    ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
    : null

  // А тут я смотрю есть ли данные в локалке и если да то вывожу их на екран

  // useEffect(() => {
  //   console.log('Компонент Todo смонтирован, загружаем данные из хранилища')
  //   const savedTasks = localStorage.getItem('tasks');
  //   if (savedTasks) {
  //     setTasks(JSON.parse(savedTasks));
  //   }
  // }, [])




  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>

      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
        newTaskInputRef={newTaskInputRef}
      />

      <SearchTaskForm
        onSearchInput={filterTasks}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <ToDoInfo
        total={tasks.length}
        done={tasks.filter(({isDone}) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />

      <ToDoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toogleTaskComplete}
        filteredTasks={filteredTasks}
      />
    </div>
  )
}

export default Todo