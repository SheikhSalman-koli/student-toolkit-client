import { createBrowserRouter } from "react-router";
import Rootlayout from "../Layout/Root/Rootlayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Authentication/Login";
import MyShedules from "../Pages/My-schdules/MyShedules";


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
            },
            {
                path: 'my-schedules/:email',
                Component: MyShedules
            }
        ]
    },
   
])