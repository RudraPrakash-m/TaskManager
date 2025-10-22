import React from "react";
import "./index.css";
import Layout from "./Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Otp from "./pages/authentication/Otp";
import PrivateLayout from "./PrivateLayout";
import Dashboard from "./pages/private/Dashboard";
import ProtectedRoute from "./privateRouting/ProtectedRoute";
import AboutPrivate from "./pages/private/AboutPrivate";
import AddTask from "./pages/private/subpages/AddTask";
import Tasks from "./pages/private/subpages/Tasks";
import CompletedTasks from "./pages/private/subpages/CompletedTasks";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/otp",
      element: <Otp />,
    },
    {
      path: "/dashboard",
      element: <PrivateLayout />,
      children: [
        {
          path: "/dashboard",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard/about",
          element: <AboutPrivate />,
        },
        {
          path: "/dashboard/addtask",
          element: <AddTask />,
        },
        {
          path: "/dashboard/tasks",
          element: <Tasks />,
        },
        {
          path:"/dashboard/completed",
          element: <CompletedTasks/>
        }
      ],
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
};

export default App;
