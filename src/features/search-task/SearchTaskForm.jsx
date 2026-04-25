import Field from '@/shared/ui/Field/';
import { useContext, useState } from 'react';
import { ActionProviderContext } from '@/entities/todo/model/ActionProviderContext';

const SearchTaskForm = ({ styles }) => {
  const { searchQuery, setSearchQuery } = useContext(ActionProviderContext);

  // каксательно onInput: в стрелку передается функция onSearchInput которая в свою очередь в аргумент берет варится event.target.value

  return (
    <>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Field
          className={styles.field}
          label="Search task"
          id="search-task"
          type="search"
          value={searchQuery}
          onInput={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </>
  );
};

export default SearchTaskForm;
