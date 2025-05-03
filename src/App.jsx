import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import CalendarView from './components/CalendarView';
import { useSelector } from 'react-redux';

function App() {
  const selectedList = useSelector(state => state.todos.selectedList);
  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl flex w-[80vw] h-[80vh] overflow-y-auto">
        <Sidebar />
        {selectedList === 'Calendar' ? (
          <CalendarView />
        ) : (
          <>
            <TaskList />
            <TaskDetails />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
