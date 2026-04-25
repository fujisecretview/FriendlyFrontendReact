### getAll

returns Promise with all tasks from server (already parsed)

**Parameters**
no Parameters needed

**Returns**
`Promise<Task[]>`, where Task:

```js
{ id: string, title: string, isDone: boolean }
```

**How to use**
```js
const tasks = await tasksAPI.getAll();
```
It returns a promise so dont forget to use right promise structure like async/await or Promise

### getTaskById
returns Promise with a requested task by id (already parsed)

**Parameters**
`id: string` - identificator of task

**Returns**
`Promise<Task>`, where Task:
```js
{ id: string, title: string, isDone: boolean }
```
**How to use**
```js
const task = await tasksAPI.getTaskById(id);
```
It returns a promise so dont forget to use right promise structure like async/await or Promise

### setInitialTasks
checking if array of tasks on server is empty and returns or initialTasks that we provided in parameters or tasks stored on server

**Parameters**
`initialTasks: Task[]` initial array of tasks 

**Returns**
`Promise<Task[]>`, where Tasks:
```js
{ id: string, title: string, isDone: boolean }
```

***How to use***
Use it in combo with useEffect with empty deps array to set it only once, when our app is rendered for the first time
```js
  useEffect(() => {
  const setInitalTasks = async () => {
    const data = await tasksAPI.setInitialTasks((initialTasks))
    setTasks(data)
  };
  setInitalTasks();
}, []);
```

### add
Add task function
***Parameters***
`task: object`
***Returns***
`Promise <Task>`
```js
{ title: string, isDone: boolean }
```
***How to use***
```js
const addTask = async (task) => {
  const response = await tasksAPI.add(task)
  setTasks([...tasks, response])
}
```

### delete 
Delete task function
***Parameters***
`taskId: string`
***Returns***
`Promise <Task>` - returns deleted task
***How to use***
```js
const deleteTask = (id) =>{
  const response = tasksAPI.deleteTask(id)
  setTasks([...tasks.filter(task => task.id !== id)])
}
```

### deleteAll
delete all tasks function 
***Parameters***
`tasks <Tasks[]>` - all tasks array tasks
***Returns***
`Promise <Tasks[]>` - empty array of tasks
***How to use***
```js
  const deleteAll = async (tasks) => {
    await tasksAPI.deleteAll(tasks);
    setTasks([]);
  }
```

### delete
Delete task function
***Parameters***
`taskId: string`
***Returns***
`Promise <Task>` - returns deleted task
***How to use***
```js
const deleteTask = (id) =>{
  const response = tasksAPI.deleteTask(id)
  setTasks([...tasks.filter(task => task.id !== id)])
}
```

### toogleTaskComplete
toogle complete of task
***Parameters***
`id: string, isDone: boolean` - id of task, state of task
***Returns***
`Promise <Task>` - processed task
***How to use***
```js
  const toogleTaskComplete = async (id, isDone) => {
    await tasksAPI.toogleComplete(id, isDone);
    setTasks(prev => prev.map((task) => {
      if(task.id === id){
       return {...task, isDone: !task.isDone}
      }
      return task
    }))
  }
```


