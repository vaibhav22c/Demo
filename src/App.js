import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/route.tsx';
import { UserProvider } from './context/provider.tsx';

function App() {

  return (
    <>
      <div className="App">
        {/* user provider for login user deatail and we can get user data in every component */}
        <UserProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </UserProvider>
      </div>
    </>
  );
}

export default App;
