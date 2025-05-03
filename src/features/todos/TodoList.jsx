import { useSelector } from 'react-redux';
import TodoItem from '../../components/TodoItem';

export default function TodoList() {
  const todos = useSelector(state => state.todos);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
} 