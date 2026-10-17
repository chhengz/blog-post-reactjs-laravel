import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import {
  Home, AboutPage, DashboardPage, NotFoundPage,
  Blog, Create, EditPost, PostDetails,
  ProfilePage
 } from './pages'


// Auth
import AuthLayout from "./layout/AuthLayout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

export default function App() {
  const { user } = useContext(AppContext);

  const routers = createBrowserRouter([
    { path: "/dashboard", element: ( <ProtectedRoute> <DashboardPage /> </ProtectedRoute> ), },
    { path: "/", errorElement: <NotFoundPage />, element: <AppLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/home", element: <Home /> },
        { path: "/about", element: <AboutPage /> },
        { path: "/blog", element: <Blog /> },
        { path: "/blog/create", element: ( <ProtectedRoute> <Create /> </ProtectedRoute> ), },
        { path: "/blog/post/:id", element: <PostDetails /> },
        { path: "/blog/post/:id/edit", element: ( <ProtectedRoute> <EditPost /> </ProtectedRoute> ), },
        { path: "/profile/:username", element: ( <ProtectedRoute> <ProfilePage /> </ProtectedRoute> ) },
        { path: "/auth/login", element: user ? <Navigate to="/" replace /> : <Login />, },
        { path: "/auth/register", element: user ? <Navigate to="/" replace /> : <Register />, },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}
