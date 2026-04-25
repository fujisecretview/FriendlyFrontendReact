import { createContext, useMemo, useEffect } from 'react';

export const DataProviderContext = createContext({});

export const DataProvider = (props) => {
  const { children } = props;

  const { tasks, filteredTasks } = props;

  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
    }),
    [tasks, filteredTasks],
  );

  return (
    <DataProviderContext.Provider value={value}>
      {children}
    </DataProviderContext.Provider>
  );
};
