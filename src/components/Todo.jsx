import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import ToDoList from "./ToDoList";
import {useEffect, useState} from "react";

const Todo = () => {


  // Тут хранятся таски и начальное значение

  const [tasks, setTasks] = useState([{
    id: 'task-1',
    title: 'Трахать сук',
    isDone: false
  },
    {id: 'task-2', title: 'Пить сок', isDone: true}
  ]);

  // Тут хранится таски которые добавит пользователь

  const [newTaskTitle, setNewTaskTitle] = useState('');

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


  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>

      <AddTaskForm
        addTask={addTask}
        newTaskTitle={newTaskTitle}
        setNewTaskTitle={setNewTaskTitle}
      />

      <SearchTaskForm onSearchInput={filterTasks} />

      <ToDoInfo
        total={tasks.length}
        done={tasks.filter(({isDone}) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />

      <ToDoList
        tasks={tasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toogleTaskComplete}
      />
    </div>
  )
}

export default Todo