import { createBrowserRouter } from "react-router";
import Rootlayout from "../Layout/Root/Rootlayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";


export const routes = createBrowserRouter([
    {
        path: '/',
        Component: Rootlayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/login',
                Component: Login
            }
        ]
    },
   
])