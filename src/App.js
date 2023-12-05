import { ToastContainer } from 'react-toastify';

import TaskBoard from './Page/taskBoard/task-board.tsx';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      <ToastContainer />
      <TaskBoard />
    </>
  );
}

export default App;
