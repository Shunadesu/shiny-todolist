import { useSelector, useDispatch } from 'react-redux';
import { setViewMode, setSelectedDate } from '../features/todos/todosSlice';

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function addDays(dateStr, days) {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export default function CalendarView() {
  const dispatch = useDispatch();
  const { tasks, selectedDate, viewMode } = useSelector(state => state.todos);

  // Filter tasks for the selected date
  const events = tasks.filter(t => t.dueDate === selectedDate);
  const hours = Array.from({ length: 24 }, (_, i) => i); // 0h to 23h

  return (
    <div className="flex-1 p-10 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{formatDate(selectedDate)}</h1>
        <button className="border px-4 py-2 rounded">Add Event</button>
      </div>
      <div className="flex gap-2 mb-4">
        {['day', 'week', 'month'].map(mode => (
          <button
            key={mode}
            className={`px-3 py-1 rounded ${viewMode === mode ? 'bg-gray-200 font-semibold' : ''}`}
            onClick={() => dispatch(setViewMode(mode))}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button
            className="px-2 py-1 rounded border"
            onClick={() => dispatch(setSelectedDate(addDays(selectedDate, -1)))}
          >
            &lt;
          </button>
          <button
            className="px-2 py-1 rounded border"
            onClick={() => dispatch(setSelectedDate(addDays(selectedDate, 1)))}
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto max-h-[80vh] pr-2 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {hours.map(hour => (
          <div key={hour} className="flex items-center mb-2 relative min-h-[32px]">
            <div className="w-20 text-right pr-4 text-gray-400 text-xs">
              {hour < 10 ? `0${hour}` : hour}:00
            </div>
            <div className="flex-1 relative min-h-[32px]">
              {events
                .filter(e => parseInt(e.startTime) <= hour && parseInt(e.endTime) > hour)
                .map(e => (
                  <div
                    key={e.id}
                    className={`absolute left-0 right-0 px-4 py-1 rounded text-sm ${e.list === 'Work' ? 'bg-blue-100' : e.list === 'Personal' ? 'bg-red-100' : 'bg-yellow-100'}`}
                  >
                    {e.text}
                  </div>
                ))}
              <div className="border-b border-gray-200 absolute left-0 right-0 top-1/2" />
            </div>
          </div>
        ))}
      </div>
      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
} 