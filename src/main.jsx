import { StrictMode } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Overview from './routes/Overview.jsx';
import DetailView from './routes/DetailView.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Overview />
      },
      {
        path: "/:id",
        element: <DetailView />
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
