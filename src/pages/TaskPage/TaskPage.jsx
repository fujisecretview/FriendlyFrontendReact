import { useEffect, useState } from 'react';
import tasksAPI from '@/shared/api/tasks';

const TaskPage = (props) => {
  const { params } = props;
  const taskId = params.id;

  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await tasksAPI.getTaskById(taskId);
        setTask(data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (!task) return;

    const prev = document.title;
    document.title = `Task ${task.title} ${task.isDone ? 'Is complete' : 'Is not complete'}`;
    return () => {
      document.title = prev;
    };
  }, [task]);

  if (isLoading) {
    return (
      <div>
        <h1> Loading</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1> Task not found</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.isDone ? 'Task is complete' : 'Task is not complete'}</p>
    </div>
  );
};

export default TaskPage;
