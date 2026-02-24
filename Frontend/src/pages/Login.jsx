import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage(){

      const [ktp, setKtp] = useState('')
      const [password, setPassword] = useState('')
      const navigate = useNavigate()

      const ktpHandler = (e)=>{
            setKtp(e.target.value)
      }
      const passwordHandler = (e)=>{
            setPassword(e.target.value)
      }

      const loginHandler = ()=>{
            axios({
                  method: 'post',
                  url: 'http://localhost:8000/api/v1/auth/login',
                  data: {
                        "id_card_number":ktp,
                        "password":password,
                  }
            })
                  .then(response => {
                        console.log(response.data.Body)
                        localStorage.setItem('token', response.data.Body.token)
                        localStorage.setItem('name', response.data.Body.name)
                        alert('Berhasil Login')
                        navigate('/dashboard')
                  })
                  .catch(error => {
                        alert('Nomor KTP atau Sandi Salah')
                        error
                  })
      }



      return (
            <>
                  <div className="flex justify-center items-center h-[80vh]">
                        <div className="bg-white w-md shadow-lg rounded-sm">
                              <div className="bg-blue-600 text-white p-3 text-center">
                                    <h2>Job Seeker Platform</h2>
                              </div>
                              <div className="p-4">
                                    <label htmlFor="">Nomor KTP</label> <br/>
                                    <input type="text" onChange={ktpHandler}/>
                                    <label htmlFor="">Kata sandi</label> <br/>
                                    <input type="password" onChange={passwordHandler}/>
                                    <button className="btnPrima" onClick={loginHandler}>Login</button>
                              </div>
                        </div>
                  </div>
            </>
      )
}