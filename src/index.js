import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import TutoringSession from './TutoringSession';
import MetricsPage from './MetricsPage';

// Create a router with your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <TutoringSession />, 
  },
  {
    path: "/metrics",
    element: <MetricsPage />,
  },
]);

// Get a reference to the root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the RouterProvider within your App
root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </React.StrictMode>
);

// Performance metrics (optional)
reportWebVitals();
