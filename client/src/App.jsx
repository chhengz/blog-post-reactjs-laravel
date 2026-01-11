import { createBrowserRouter, RouterProvider, Navigate } from "react-router";
import { useContext } from "react";
import { AppContext } from "./contexts/AppContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import AppLayout from "./layout/AppLayout";
import Home from "./pages/Home/Home";
import AboutPage from "./pages/About/AboutPage";
import { DashboardPage } from "./pages/Features/Dashboard/DBPage";
import { NotFoundPage } from "./pages/404";

// Blog post
import Blog from "./pages/Blog/Blog";
import Create from "./pages/Blog/Post/Create";
import EditPost from "./pages/Blog/Post/EditPost";
import { PostDetails } from "./pages/Blog/Post/PostDetails";

// Auth
import AuthLayout from "./layout/AuthLayout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ProfilePage from "./pages/Features/User/Profile/ProfilePage";

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

// import { createBrowserRouter, RouterProvider } from "react-router";
// import { useContext } from "react";
// import { AppContext } from "./contexts/AppContext";

// import AppLayout from "./layout/AppLayout";

// import Home from "./pages/Home/Home";
// import AboutPage from "./pages/About/AboutPage";
// import { DashboardPage } from "./pages/Features/Dashboard/DBPage";
// import { NotFoundPage } from "./pages/404";

// // Blog post
// import Blog from "./pages/Blog/Blog";
// import Create from "./pages/Blog/Post/Create";
// import EditPost from "./pages/Blog/Post/EditPost";
// import { PostDetails } from "./pages/Blog/Post/PostDetails";

// // Auth
// import AuthLayout from "./layout/AuthLayout";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// export default function App() {

//   const { user } = useContext(AppContext);

//   const routers = createBrowserRouter( [
//     { path: "/", errorElement: <NotFoundPage />, element: <AppLayout />, children: [
//       { index: true, element: <Home />},
//       { path: "/home", element: <Home />},
//       { path: "/about", element: <AboutPage />},
//       { path: "/blog", element: <Blog /> },
//       { path: "/blog/create", element: user ? <Create /> : <Login />},
//       { path: "/blog/post/:id", element: <PostDetails />},
//       { path: "/blog/post/:id/edit", element: <EditPost />},
//       { path: '/auth/login', element: user ? <Home/> : <Login />},
//       { path: '/auth/register', element: user ? <Home/> : <Register />}
//     ]},

//     // Auth Layout
//     // { path: "/auth", element: <AuthLayout />, children: [
//     //   {}
//     // ]},
//     // Dashboard
//     { path: '/dashboard', element: user ? <DashboardPage /> : <Login /> }
//   ])

//   return <RouterProvider router={routers} />
// }