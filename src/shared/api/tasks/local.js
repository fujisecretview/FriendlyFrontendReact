const STORAGE_KEY = 'tasks';

// будет читать из localStorage, если пуст то пустой массив
const read = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch (e) {
    return [];
  }
};

const write = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

const localAPI = {
  getAll: () => {
    return read();
  },

  // Question: Зачем оператор нулевого слияния и null

  getTaskById: (id) => {
    return read().find((e) => e.id === id) ?? null;
  },

  setInitialTasks: async (initialTasks) => {
    const data = read();
    if (data.length === 0) {
      write(initialTasks);
      return initialTasks;
    }
    return data;
  },

  add: async (task) => {
    const data = read();
    const newTask = {
      ...task,
      id: crypto.randomUUID() ?? Date.now().toString(),
    };
    write([...data, newTask]);

    return newTask;
  },

  delete: async (id) => {
    const tasks = read().filter((e) => e.id !== id);
    write(tasks);
  },

  deleteAll: async () => {
    write([]);
  },

  toogleComplete: async (id, isDone) => {
    const tasks = read().map((e) => {
      if (e.id === id) {
        return { ...e, isDone: !isDone };
      }
      return e;
    });

    write(tasks);
  },
};

export default localAPI;
