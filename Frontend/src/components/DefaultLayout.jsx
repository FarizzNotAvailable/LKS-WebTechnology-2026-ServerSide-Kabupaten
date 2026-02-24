import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function DefaultLayout(){
      const token = localStorage.getItem('token')
      const name = localStorage.getItem('name')
      const navigate = useNavigate()

      useEffect(()=>{
            if(!token){
                  navigate('/login')
            }
      }, [token, navigate])

      const logout = ()=>{
            localStorage.removeItem('token')
            navigate('/login')
      }
      return (
            <>
                  <header className="bg-blue-600">
                        <div className=" max-w-5xl m-auto flex text-white p-3 justify-between items-end">
                              <h2>Job Seeker</h2>
                              <nav className="flex gap-3">
                                    <a>{name}</a>
                                    <Link to={'/dashboard'}>Dashboard</Link>
                                    <Link onClick={logout}>Logout</Link>
                              </nav>
                        </div>
                  </header>
                  <main>
                        <Outlet />
                  </main>
            </>
      )
}