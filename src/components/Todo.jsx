import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import ToDoList from "./ToDoList";
import {useEffect, useState} from "react";

const Todo = () => {

  const list = [{id: 'task-1', title: 'Трахать сук', isDone: false},
    {id: 'task-2', title: 'Пить сок', isDone: true}
  ];

  // Тут хранятся таски и начальное значение

  const [tasks, setTasks] = useState([{id: 'task-1', title: 'Трахать сук', isDone: false},
    {id: 'task-2', title: 'Пить сок', isDone: true}
  ]);

  // Тут хранится таски которые добавит пользователь

  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Логика работы дочерних компонентов прописывается в родительском

  // В функции addTask с начала проверка на пустые строки и длинну, далее мы генерим айдишник и тут есть ньюанс в ввиде того что если в старом браузере нету crypto то сработает точно Date.now

  const addTask = () => {
    setTasks(
      [...tasks, newTaskTitle]
    );
  }

  const deleteTask = (TaskId) => {
    console.log(`Task removed with id ${TaskId}`);
  }


  const deleteAllTasks = () => {
    console.log('Удалены все задачи!')
  }

  const toogleTaskComplete = (taskId, isDone) => {
    console.log(`Задача ${taskId} ${isDone ? 'Выполнена' : 'Соси писун'}`)
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