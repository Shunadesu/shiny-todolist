import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateTask, deleteTask } from '../features/todos/todosSlice';

export default function TaskDetails() {
  const dispatch = useDispatch();
  const { tasks, selectedTaskId, lists } = useSelector(state => state.todos);
  const task = tasks.find(t => t.id === selectedTaskId);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState(task || {});
  const [newSubtask, setNewSubtask] = useState('');
  const [newTag, setNewTag] = useState('');

  // Update form state when task changes
  React.useEffect(() => {
    setForm(task || {});
    setEdit(false);
    setNewSubtask('');
    setNewTag('');
  }, [task]);

  if (!task) {
    return <section className="flex-1 p-8 flex flex-col items-center justify-center text-gray-400">Select a task</section>;
  }

  const handleSave = () => {
    dispatch(updateTask({ id: task.id, updates: form }));
    setEdit(false);
  };

  return (
    <section className="flex-1 p-8 flex flex-col">
      <div className="flex items-center mb-4">
        <input
          className="text-xl font-bold flex-1 bg-transparent border-b border-gray-200 focus:outline-none mb-2"
          value={form.text || ''}
          onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
          disabled={!edit}
        />
      </div>
      <textarea
        className="w-full bg-gray-50 border border-gray-200 rounded p-2 mb-4 resize-none"
        rows={3}
        placeholder="Description"
        value={form.description || ''}
        onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
        disabled={!edit}
      />
      <div className="flex gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-400 mb-1">List</div>
          <select
            className="border border-gray-200 rounded px-2 py-1"
            value={form.list || ''}
            onChange={e => setForm(f => ({ ...f, list: e.target.value }))}
            disabled={!edit}
          >
            {lists.map(list => (
              <option key={list} value={list}>{list}</option>
            ))}
          </select>
        </div>
        <div>
          <div className="text-xs text-gray-400 mb-1">Due date</div>
          <input
            type="date"
            className="border border-gray-200 rounded px-2 py-1"
            value={form.dueDate || ''}
            onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))}
            disabled={!edit}
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="text-xs text-gray-400 mb-1">Tags</div>
        <div className="flex flex-wrap gap-2 mb-2">
          {(form.tags || []).map(tag => (
            <span key={tag} className="bg-gray-200 text-xs px-3 py-1 rounded">{tag}</span>
          ))}
          {edit && (
            <form
              onSubmit={e => {
                e.preventDefault();
                if (newTag.trim() && !form.tags.includes(newTag.trim())) {
                  setForm(f => ({ ...f, tags: [...(f.tags || []), newTag.trim()] }));
                  setNewTag('');
                }
              }}
              className="flex items-center"
            >
              <input
                className="px-2 py-1 rounded bg-gray-100 border border-gray-200 text-xs"
                placeholder="+ Add Tag"
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
              />
            </form>
          )}
        </div>
      </div>
      <div className="mb-4">
        <div className="text-lg font-semibold mb-2">Subtasks:</div>
        <div className="flex flex-col gap-2 mb-2">
          {(form.subtasks || []).map(st => (
            <label key={st.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={st.completed}
                disabled={!edit}
                onChange={() => edit && setForm(f => ({ ...f, subtasks: f.subtasks.map(s => s.id === st.id ? { ...s, completed: !s.completed } : s) }))}
              />
              <span className={st.completed ? 'line-through text-gray-400' : ''}>{st.text}</span>
              {edit && (
                <button type="button" className="ml-2 text-red-400" onClick={() => setForm(f => ({ ...f, subtasks: f.subtasks.filter(s => s.id !== st.id) }))}>✕</button>
              )}
            </label>
          ))}
        </div>
        {edit && (
          <form
            onSubmit={e => {
              e.preventDefault();
              if (newSubtask.trim()) {
                setForm(f => ({ ...f, subtasks: [...(f.subtasks || []), { id: Date.now().toString(), text: newSubtask.trim(), completed: false }] }));
                setNewSubtask('');
              }
            }}
            className="flex items-center gap-2"
          >
            <input
              className="flex-1 px-2 py-1 rounded bg-gray-100 border border-gray-200 text-xs"
              placeholder="+ Add New Subtask"
              value={newSubtask}
              onChange={e => setNewSubtask(e.target.value)}
            />
            <button type="submit" className="text-lg">+</button>
          </form>
        )}
      </div>
      <div className="mt-auto flex gap-2">
        {edit ? (
          <>
            <button
              className="bg-gray-200 rounded px-4 py-2"
              onClick={() => setEdit(false)}
            >Cancel</button>
            <button
              className="bg-yellow-400 rounded px-4 py-2 text-white font-semibold"
              onClick={handleSave}
            >Save changes</button>
          </>
        ) : (
          <>
            <button
              className="bg-red-100 rounded px-4 py-2 text-red-500 border border-red-200"
              onClick={() => dispatch(deleteTask(task.id))}
            >Delete Task</button>
            <button
              className="bg-yellow-400 rounded px-4 py-2 text-white font-semibold"
              onClick={() => setEdit(true)}
            >Edit</button>
          </>
        )}
      </div>
    </section>
  );
} 