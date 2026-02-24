import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./components/GuestLayout";
import LoginPage from "./pages/login";
import DefaultLayout from "./components/DefaultLayout";
import Dashboard from "./pages/Dashboard";
import ValidationForm from "./pages/ValidationForm";
import JobList from "./pages/JobList";
import JobDetail from "./pages/JobDetail";

const router = createBrowserRouter([
    {
        path:'/',
        element : <GuestLayout/>,
        children : [
            {
                path : '/login',
                element : <LoginPage/>
            },
            {
                path : '/',
                element : <Navigate to={'/login'}/>
            }
        ]
    },
    {
        path:'/',
        element : <DefaultLayout/>,
        children : [
            {
                path : 'dashboard',
                element : <Dashboard/>
            },
            {
                path : 'validation',
                element : <ValidationForm/>
            },
            {
                path : 'job',
                element : <JobList/>
            },
            {
                path : 'job/:id',
                element : <JobDetail/>
            },
        ]
    },
    {
        path : '*',
        element : '404 notfound'
    }
])

export default router