import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import ToDoList from "./ToDoList";
import {useEffect, useState} from "react";

const Todo = () => {

  const list = [{id: 'task-1', title: 'Трахать сук', isDone: false},
    {id: 'task-2', title: 'Пить сок', isDone: false}
  ];

  const [tasks, setTasks] = useState(list);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Логика работы дочерних компонентов прописывается в родительском

  const addTask = () => {
    console.log('Task added');
  }

  const deleteTask = (TaskId) => {
    console.log(`Task removed with id ${TaskId}`);
  }


  const tempTasks = [
    {id: 'task-1', title: 'Трахать сук', isDone: false},
    {id: 'task-2', title: 'Пить сок', isDone: true}
  ]

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
      />
      <SearchTaskForm onSearchInput={filterTasks} />
      <ToDoInfo
        total={tempTasks.length}
        done={tempTasks.filter(({isDone}) => isDone).length}
        onDeleteAllButtonClick={deleteAllTasks}
      />
      <ToDoList
        tasks={tempTasks}
        onDeleteTaskButtonClick={deleteTask}
        onTaskCompleteChange={toogleTaskComplete}
      />
    </div>
  )
}

export default Todo