import React from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';

import { AppProvider } from './Contexts/AppContext';
import { App } from './Components/App';
import { Home } from './Pages/Home';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { NotFound } from './Pages/404';

import './output.css';
import { Main } from './Components/Home/Main';

// process.env.URL = 'http://localhost:3000';
export const API_URL = 'https://networking-api.kairieffel.com';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // App is now a layout component for your routes
    children: [
      { path: '/', element: <Home /> },
      { path: '/:network', element: <Main /> },
      { path: '/:network/:entry', element: <Main /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
