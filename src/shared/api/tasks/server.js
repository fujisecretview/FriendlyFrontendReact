const URL = 'http://localhost:3001/tasks';
const headers = {
  'Content-Type': 'application/json',
};

const serverAPI = {
  getAll: () => {
    return fetch(URL).then((response) => response.json());
  },

  getTaskById: (id) => {
    return fetch(URL + '/' + id).then((response) => response.json());
  },
  setInitialTasks: async (initialTasks) => {
    const data = await serverAPI.getAll();

    if (data.length === 0) {
      await Promise.all(initialTasks.map((task) => serverAPI.add(task)));
      return initialTasks;
    }
    return data;
  },
  add: async (task) => {
    const response = await fetch(URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(task),
    });
    return response.json();
  },
  delete: (id) => {
    return fetch(`${URL}/${id}`, {
      method: 'DELETE',
    }).then((response) => response.json());
  },
  deleteAll: (tasks) => {
    return Promise.all(tasks.map((tasks) => serverAPI.delete(tasks.id)));
  },
  toogleComplete: (id, isDone) => {
    return fetch(`${URL}/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ isDone }),
    });
  },
};

export default serverAPI;
