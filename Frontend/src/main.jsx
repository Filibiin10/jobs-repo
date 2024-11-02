import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';
import Signup from './pages/Signup.jsx';
import { JobProvider } from './JopContext.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element : <App/>
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  // Add more routes as needed...
  {
    path: '*',
    element: <NotFound />, // Catch-all route for 404
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <JobProvider >
    <RouterProvider router={router} />
    </JobProvider>
  </StrictMode>,
)
