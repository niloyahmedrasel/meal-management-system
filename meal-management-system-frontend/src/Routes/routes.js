import { createBrowserRouter, } from "react-router-dom";
import Login from "../Login&Register/Login";
import MainLayout from "../Layout/MainLayout";
import Signup from "../Login&Register/Signup";
import UserHome from "../generalUser/UserHome";
import AdminHome from "../admin/AdminHome";
import PrivateRoute from "../components/privateRoute";
import Unauthorized from "../components/Unauthorized";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <Login />
          },
          {
            path: 'signup',
            element: <Signup />
          },
          {
            path: 'user',
            element: <PrivateRoute allowedRoles={['user']} />,
            children: [
              { path: 'home', element: <UserHome /> }
            ]
          },
          {
            path: 'admin',
            element: <PrivateRoute allowedRoles={['admin']} />,
            children: [
              { path: 'home', element: <AdminHome /> }
            ]
          },
          {
            path: 'unauthorized',
            element: <Unauthorized />
          }
        ]
      }
]);

export default router;
