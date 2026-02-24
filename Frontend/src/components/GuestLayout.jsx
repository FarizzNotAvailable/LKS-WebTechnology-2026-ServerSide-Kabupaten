import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function GuestLayout(){

    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(()=>{
        if(token){
            navigate('/dashboard')
        }
    }, [token, navigate])

    return (
        <>
            <header className="bg-blue-600">
                <div className=" max-w-5xl m-auto flex text-white p-3 justify-between items-end">
                    <h2>Job Seeker</h2>
                    <nav>
                        <a>Logout</a>
                    </nav>
                </div>
            </header>
            <main className="max-w-5xl m-auto">
                <Outlet/>
            </main>
        </>
    )
}