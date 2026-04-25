import TasksPage from "../pages/TasksPage/";
import TaskPage from "../pages/TaskPage/";
import Router from "./routing/Router";
import './styles'


const Hello = () => <h1>Hello</h1>


const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div> Not Found </div>
  }

  return (
    <Router routes={routes} />
  )
}

export default App
