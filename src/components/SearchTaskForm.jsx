import Field from "./Field";

const SearchTaskForm = (props) => {

  const {
    searchQuery,
    setSearchQuery,
  } = props

  // каксательно onInput: в стрелку передается функция onSearchInput которая в свою очередь в аргумент берет варится event.target.value

  return (
    <>
      <form
        className="todo__form"
        onSubmit={(e) => e.preventDefault()}
      >

        <Field
          className="todo__field"
          label="Search task"
          id="search-task"
          type="search"
          value={searchQuery}
          onInput={(event) => setSearchQuery(event.target.value)}
        />
      </form>
    </>
  )
}

export default SearchTaskForm