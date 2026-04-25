import { memo, useContext, useMemo } from 'react';
import { DataProviderContext } from '@/entities/todo/model/DataProviderContext';
import { ActionProviderContext } from '@/entities/todo/model/ActionProviderContext';

const ToDoInfo = ({ styles }) => {
  const { tasks } = useContext(DataProviderContext);
  const { deleteAllTasks } = useContext(ActionProviderContext);

  const total = tasks.length;
  const hasTasks = total > 0;
  const done = useMemo(() => {
    return tasks.filter(({ isDone }) => isDone).length;
  }, [tasks]);

  return (
    <>
      <div className={styles.info}>
        <div className={styles.totalTasks}>
          Done {done} from {total}
        </div>
        {hasTasks && (
          <button
            className={styles.deleteAllButton}
            type="button"
            onClick={() => deleteAllTasks(tasks)}
          >
            Delete all
          </button>
        )}
      </div>
    </>
  );
};

export default memo(ToDoInfo);
