import { useDispatch } from 'react-redux';
import { toggleTodo, deleteTodo } from '../features/todos/todosSlice';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between bg-white p-2 rounded shadow mb-2">
      <div
        className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
        onClick={() => dispatch(toggleTodo(todo.id))}
      >
        {todo.text}
      </div>
      <button
        className="ml-2 text-red-500"
        onClick={() => dispatch(deleteTodo(todo.id))}
      >
        Delete
      </button>
    </div>
  );
} 