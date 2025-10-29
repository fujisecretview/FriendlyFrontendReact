import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import ToDoInfo from "./ToDoInfo";
import ToDoList from "./ToDoList";
import {useState} from "react";

const Todo = () => {

  const list = [{id: 'task-1', title: 'Трахать сук', isDone: false},
    {id: 'task-2', title: 'Пить сок', isDone: false}
  ];

  const [tasks, setTasks] = useState(list);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const addTask = () => {
    console.log('Task added');
  }


  const tempTasks = [
    {id: 'task-1', title: 'Трахать сук', isDone: false},
    {id: 'task-2', title: 'Пить сок', isDone: true}
  ]


  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
      />
      <SearchTaskForm />
      <ToDoInfo
        total={tempTasks.length}
        done={tempTasks.filter(({isDone}) => isDone).length}
      />
      <ToDoList tasks={tempTasks} />
    </div>
  )
}

export default Todo