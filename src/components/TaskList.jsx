import { useSelector, useDispatch } from 'react-redux';
import { addTask, selectTask } from '../features/todos/todosSlice';
import { useState } from 'react';

function getFilteredTasks(tasks, selectedList) {
  if (selectedList === 'Today') {
    const today = new Date().toISOString().slice(0, 10);
    return tasks.filter(t => t.dueDate === today);
  }
  if (['Upcoming', 'Calendar', 'Sticky Wall'].includes(selectedList)) {
    return tasks;
  }
  // Otherwise, filter by list
  return tasks.filter(t => t.list === selectedList);
}

export default function TaskList() {
  const dispatch = useDispatch();
  const { tasks, selectedList, selectedTaskId } = useSelector(state => state.todos);
  const [newTask, setNewTask] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const filteredTasks = getFilteredTasks(tasks, selectedList);

  return (
    <section className="w-[350px] border-r border-gray-200 flex flex-col">
      <div className="flex items-center px-6 py-4 border-b border-gray-100">
        <h2 className="text-2xl font-bold flex-1">{selectedList}</h2>
        <span className="bg-gray-100 rounded px-2 py-1 text-lg">{filteredTasks.length}</span>
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (newTask.trim()) {
            dispatch(addTask({ text: newTask.trim(), dueDate, startTime, endTime }));
            setNewTask('');
            setDueDate('');
            setStartTime('');
            setEndTime('');
          }
        }}
        className="flex flex-col gap-2 px-6 py-3 border-b border-gray-100"
      >
        <div className="flex items-center">
          <button type="submit" className="text-xl mr-2 text-gray-400">+</button>
          <input
            className="flex-1 px-3 py-2 rounded bg-gray-100 border border-gray-200 text-sm"
            placeholder="Add New Task"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <input
            type="date"
            className="px-2 py-1 rounded border border-gray-200 text-xs"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            placeholder="Due date"
          />
          <input
            type="number"
            min="0"
            max="23"
            className="px-2 py-1 rounded border border-gray-200 text-xs w-20"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            placeholder="Start hour"
          />
          <input
            type="number"
            min="1"
            max="24"
            className="px-2 py-1 rounded border border-gray-200 text-xs w-20"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            placeholder="End hour"
          />
        </div>
      </form>
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className={`flex items-center px-4 py-2 rounded cursor-pointer mb-1 hover:bg-gray-50 border ${selectedTaskId === task.id ? 'border-yellow-400 bg-yellow-50' : 'border-transparent'}`}
            onClick={() => dispatch(selectTask(task.id))}
          >
            <input type="checkbox" checked={task.completed} readOnly className="mr-3" />
            <div className="flex-1">
              <div className="font-medium">{task.text}</div>
              <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                {task.dueDate && <span>📅 {task.dueDate}</span>}
                {task.startTime && <span>🕒 {task.startTime}:00</span>}
                {task.endTime && <span>- {task.endTime}:00</span>}
                {task.subtasks && task.subtasks.length > 0 && (
                  <span>{task.subtasks.length} Subtasks</span>
                )}
                {task.list && <span className="flex items-center"><span className={`w-2 h-2 rounded-full mr-1 ${task.list === 'Personal' ? 'bg-red-400' : task.list === 'Work' ? 'bg-blue-400' : 'bg-yellow-400'}`}></span>{task.list}</span>}
                {task.tags && task.tags.map(tag => (
                  <span key={tag} className="bg-gray-200 text-gray-500 px-2 rounded">{tag}</span>
                ))}
              </div>
            </div>
            <span className="ml-2 text-gray-300">›</span>
          </div>
        ))}
      </div>
    </section>
  );
} 