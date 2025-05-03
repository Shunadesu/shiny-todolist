# To-Do List & Calendar App

A modern productivity app built with **React**, **Redux Toolkit**, **TailwindCSS**, and **Vite**.

## ✨ Features

- Sidebar with task filters, lists, and tags
- Add, edit, delete tasks with due date, start/end time, subtasks, tags
- Calendar view (day mode) with 24-hour scrollable timeline
- Tasks appear in both list and calendar, always in sync
- Data is saved to your browser's **localStorage** (auto-persistent)
- Responsive, clean UI with TailwindCSS

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd todolist
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📝 Usage

- **Add Task:** Use the form in the center to add a task. You can set date, start hour, end hour.
- **View Calendar:** Click "Calendar" in the sidebar to see all tasks by hour (scrollable 24h).
- **Edit/Delete:** Click a task to edit details or delete.
- **Lists/Tags:** Organize tasks by lists and tags. Add new lists/tags in the sidebar.
- **Data Persistence:** All your data is saved in your browser (localStorage).

## 🛠️ Built With

- [React](https://react.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)

## 📦 Project Structure

```
src/
  components/      # Sidebar, TaskList, TaskDetails, CalendarView
  features/todos/  # Redux slice for todos
  app/             # Redux store
  App.jsx          # Main layout
  main.jsx         # Entry point
```

## 📄 License

MIT

---

**Author:** Your Name
