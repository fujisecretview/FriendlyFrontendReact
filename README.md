# ✅ Todo App

A production-minded Todo application built as a deep dive into **Feature-Sliced Design**, React patterns, and frontend architecture decisions.

> This isn't just a Todo app — it's a sandbox for learning *why* things are done, not just *how*.

---

## 🧱 Architecture: Feature-Sliced Design (FSD)

The project follows [FSD](https://feature-sliced.design/) — a methodology that organizes code by **business domain and responsibility**, not by technical type.

```
src/
├── app/          # App initialization, providers, global styles
├── pages/        # Page-level compositions (route entry points)
├── widgets/      # Self-contained UI blocks (e.g. TodoList)
├── features/     # User interactions (e.g. addTodo, toggleTodo)
├── entities/     # Business objects and their models (e.g. Todo)
└── shared/       # Reusable primitives: UI kit, lib utils, API
```

**Why FSD over a classic `components/hooks/utils` structure?**

Classic structures break down as projects grow — you end up with a `components/` folder of 40 files with no clear ownership. FSD forces you to ask *"who owns this code?"* at every step. The cost is more upfront thinking; the payoff is a codebase where adding a feature doesn't require touching 6 unrelated folders.

---

## ⚙️ Key Technical Decisions

### Split Context: Data vs Actions

State is exposed through **two separate contexts** — one for data, one for dispatch.

```jsx
// TodoDataContext — read-only: todos array, loading, error
const TodoDataContext = createContext(null);

// TodoActionsContext — dispatch functions only
const TodoActionsContext = createContext(null);
```

**Why split them?**

If you put everything into a single `{ todos, dispatch }` context, a component that only needs `dispatch` (e.g. an "Add" button) will re-render every time the `todos` array changes — because the context object is recreated on every state update. Splitting ensures each component subscribes **only to what it actually uses**. This isn't premature optimization — it's the correct ownership model for shared state.

---

### Reducer Without Redux

All mutation logic lives in a single `useReducer` — no third-party libraries.

```js
function todosReducer(state, action) {
  switch (action.type) {
    case 'ADD':    return [...state, action.payload];
    case 'TOGGLE': return state.map(t => t.id === action.id ? { ...t, done: !t.done } : t);
    case 'DELETE': return state.filter(t => t.id !== action.id);
    default:       throw new Error(`Unknown action: ${action.type}`);
  }
}
```

**Why `useReducer` instead of multiple `useState` calls?**

When the next state depends on the previous state *and* on the type of action, `useReducer` wins. It centralizes transition logic: instead of hunting through the codebase to find where `todos` gets mutated, you always know — only inside the reducer. Redux solves exactly the same problem, but adds infrastructure (store, middleware, devtools). That infrastructure isn't needed here.

---

### Custom Routing Without Libraries

The router is built on `window.location.pathname` and the browser's `popstate` event.

```js
function Router({ routes }) {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigate = (to) => {
    window.history.pushState(null, '', to);
    setPath(to);
  };

  const match = routes.find(r => r.path === path);
  return match ? <match.component navigate={navigate} /> : <NotFound />;
}
```

**Why not React Router?**

React Router solves problems this app doesn't have: nested routes, lazy loading, data loaders. For a SPA with 2–3 pages, it's pure overhead. More importantly — the browser's History API (`pushState` + `popstate`) is *all* routing ever is. Every library is a wrapper around those two things.

---

### Optimistic UI

Mutations (add, toggle, delete) update the UI **before** the server responds.

**Why:** Perceived performance is real performance. A 200ms API delay feels instant when the UI reacts immediately. If the server fails, we roll back. This pattern forces explicit handling of error states — which is a feature, not a burden.

### `useCallback` and Stale Closures

Callbacks passed to child components are memoized with `useCallback`.

**Why:** Without memoization, every parent re-render creates a new function reference, causing unnecessary child re-renders. More importantly, understanding *stale closures* — where a callback captures an outdated variable from a previous render — is what separates developers who debug by intuition from those who debug by understanding.

### `Promise.all` for Parallel Requests

When multiple async operations are independent, they run in parallel.

**Why:** Sequential `await` chains serialize operations that don't depend on each other. `Promise.all` cuts total wait time to the duration of the *slowest* request, not the *sum* of all. The tradeoff: one failure rejects the whole batch — which is the right default for atomic operations.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start the app
npm run dev
```

---

## 🛠 Stack

| Tool | Role |
|------|------|
| React | UI layer |
| FSD | Architectural methodology |
| CSS Modules | Scoped, collision-free styles |
| `useReducer` | State management — no Redux |
| History API | Routing — no React Router |
| Split Context | Performance-aware state distribution |

---

## 📚 What I Learned

- How FSD separates concerns by **domain** rather than **technical type**
- Why **stale closures** are the most common source of subtle bugs in React
- The difference between *optimistic UI* as a pattern vs. *ignoring errors*
- When `Promise.all` is correct and when it's dangerous
- Why split Context prevents invisible re-renders and who pays the cost if you don't
- That Redux is `useReducer` + conventions — not magic
- That React Router is `pushState` + `popstate` — not magic either
