import { useSelector, useDispatch } from 'react-redux';
import { setSelectedList, addList, addTag } from '../features/todos/todosSlice';
import { useState } from 'react';

const taskFilters = [
  { label: 'Upcoming', icon: '»' },
  { label: 'Today', icon: '▦' },
  { label: 'Calendar', icon: '📅' },
  { label: 'Sticky Wall', icon: '🗒️' },
];

export default function Sidebar() {
  const dispatch = useDispatch();
  const lists = useSelector(state => state.todos.lists);
  const tags = useSelector(state => state.todos.tags);
  const selectedList = useSelector(state => state.todos.selectedList);
  const tasks = useSelector(state => state.todos.tasks);
  const [newList, setNewList] = useState('');
  const [newTag, setNewTag] = useState('');

  const today = new Date().toISOString().slice(0, 10);
  const todayCount = tasks.filter(t => t.dueDate === today).length;
  const calendarCount = tasks.filter(t => t.dueDate).length;
  const listCount = list => tasks.filter(t => t.list === list).length;

  return (
    <aside className="w-64 bg-gray-50 p-6 flex flex-col border-r border-gray-200">
      <input
        className="mb-4 px-3 py-2 rounded bg-gray-100 border border-gray-200 focus:outline-none"
        placeholder="Search"
      />
      <div className="mb-6">
        <div className="text-xs text-gray-400 mb-2">TASKS</div>
        {taskFilters.map(f => (
          <div
            key={f.label}
            className={`flex items-center px-2 py-1 rounded cursor-pointer mb-1 ${selectedList === f.label ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
            onClick={() => dispatch(setSelectedList(f.label))}
          >
            <span className="mr-2 text-lg">{f.icon}</span> {f.label}
            {f.label === 'Today' && (
              <span className="ml-auto text-xs bg-gray-200 rounded px-2">{todayCount}</span>
            )}
            {f.label === 'Calendar' && (
              <span className="ml-auto text-xs bg-gray-200 rounded px-2">{calendarCount}</span>
            )}
          </div>
        ))}
      </div>
      <div className="mb-6">
        <div className="text-xs text-gray-400 mb-2">LISTS</div>
        {lists.map(list => (
          <div
            key={list}
            className={`flex items-center px-2 py-1 rounded cursor-pointer mb-1 ${selectedList === list ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
            onClick={() => dispatch(setSelectedList(list))}
          >
            <span className={`w-2 h-2 rounded-full mr-2 ${list === 'Personal' ? 'bg-red-400' : list === 'Work' ? 'bg-blue-400' : 'bg-yellow-400'}`}></span>
            {list}
            <span className="ml-auto text-xs bg-gray-200 rounded px-2">{listCount(list)}</span>
          </div>
        ))}
        <form
          onSubmit={e => {
            e.preventDefault();
            if (newList.trim()) {
              dispatch(addList(newList.trim()));
              setNewList('');
            }
          }}
          className="flex items-center mt-2"
        >
          <button type="submit" className="text-lg mr-2">+</button>
          <input
            className="flex-1 px-2 py-1 rounded bg-gray-100 border border-gray-200 text-xs"
            placeholder="Add New List"
            value={newList}
            onChange={e => setNewList(e.target.value)}
          />
        </form>
      </div>
      <div className="mb-6">
        <div className="text-xs text-gray-400 mb-2">TAGS</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map(tag => (
            <span key={tag} className="bg-gray-200 text-xs px-3 py-1 rounded">{tag}</span>
          ))}
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            if (newTag.trim()) {
              dispatch(addTag(newTag.trim()));
              setNewTag('');
            }
          }}
          className="flex items-center"
        >
          <button type="submit" className="text-lg mr-2">+</button>
          <input
            className="flex-1 px-2 py-1 rounded bg-gray-100 border border-gray-200 text-xs"
            placeholder="Add Tag"
            value={newTag}
            onChange={e => setNewTag(e.target.value)}
          />
        </form>
      </div>
      <div className="mt-auto flex flex-col gap-2 text-gray-400 text-sm">
        <button className="text-left hover:text-gray-700">Settings</button>
        <button className="text-left hover:text-gray-700">Sign out</button>
      </div>
    </aside>
  );
} 