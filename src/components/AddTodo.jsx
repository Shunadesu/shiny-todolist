import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todosSlice';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4">
      <input
        className="flex-1 border rounded-l px-3 py-2"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task"
      />
      <button className="bg-blue-500 text-white px-4 rounded-r" type="submit">
        Add
      </button>
    </form>
  );
} 