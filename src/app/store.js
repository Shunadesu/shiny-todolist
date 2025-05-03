import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/todosSlice';

// Load state từ localStorage
function loadState() {
  try {
    const serializedState = localStorage.getItem('todosState');
    if (serializedState === null) return undefined;
    return { todos: JSON.parse(serializedState) };
  } catch {
    return undefined;
  }
}

// Lưu state vào localStorage
function saveState(state) {
  try {
    const serializedState = JSON.stringify(state.todos);
    localStorage.setItem('todosState', serializedState);
  } catch {/* ignore */}
}

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export { store };