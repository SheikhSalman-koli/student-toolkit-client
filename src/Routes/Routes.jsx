import { createBrowserRouter } from "react-router";
import Rootlayout from "../Layout/Root/Rootlayout";
import Home from "../Pages/Home/Home";


export const routes = createBrowserRouter([
    {
        path: '/',
        Component: Rootlayout,
        children: [
            {
                index: true,
                Component: Home
            }
        ]
    },
    {
        path: 'sign',
        element: <p>sign in</p>
    }
])