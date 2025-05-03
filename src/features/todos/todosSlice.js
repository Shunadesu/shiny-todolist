import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  lists: ['Personal', 'Work', 'List 1'],
  tags: ['Tag 1', 'Tag 2'],
  selectedTaskId: null,
  selectedList: 'Today',
  viewMode: 'day',
  selectedDate: new Date().toISOString().slice(0, 10), // 'YYYY-MM-DD'
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTask: {
      reducer(state, action) {
        state.tasks.push(action.payload);
      },
      prepare({ text, dueDate, startTime, endTime }) {
        return {
          payload: {
            id: nanoid(),
            text,
            description: '',
            list: 'Personal',
            dueDate: dueDate || '',
            startTime: startTime || '',
            endTime: endTime || '',
            tags: [],
            subtasks: [],
            completed: false,
          },
        };
      },
    },
    selectTask(state, action) {
      state.selectedTaskId = action.payload;
    },
    setSelectedList(state, action) {
      state.selectedList = action.payload;
    },
    setViewMode(state, action) {
      state.viewMode = action.payload;
    },
    setSelectedDate(state, action) {
      state.selectedDate = action.payload;
    },
    addList(state, action) {
      if (!state.lists.includes(action.payload)) {
        state.lists.push(action.payload);
      }
    },
    addTag(state, action) {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload);
      }
    },
    updateTask(state, action) {
      const { id, updates } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        Object.assign(task, updates);
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
      if (state.selectedTaskId === action.payload) state.selectedTaskId = null;
    },
    toggleTask(state, action) {
      const task = state.tasks.find(t => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    addSubtask(state, action) {
      const { taskId, text } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.subtasks.push({ id: nanoid(), text, completed: false });
      }
    },
    toggleSubtask(state, action) {
      const { taskId, subtaskId } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        const subtask = task.subtasks.find(st => st.id === subtaskId);
        if (subtask) subtask.completed = !subtask.completed;
      }
    },
    deleteSubtask(state, action) {
      const { taskId, subtaskId } = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task) {
        task.subtasks = task.subtasks.filter(st => st.id !== subtaskId);
      }
    },
  },
});

export const {
  addTask, selectTask, setSelectedList, setViewMode, setSelectedDate, addList, addTag, updateTask, deleteTask, toggleTask,
  addSubtask, toggleSubtask, deleteSubtask
} = todosSlice.actions;
export default todosSlice.reducer; 