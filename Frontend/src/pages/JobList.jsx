import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function JobList(){
      const token = localStorage.getItem('token')
      const navigate = useNavigate('')
      const [joblist, setJoblist] = useState()
      const apply = false

      const detail = (id)=>{
            navigate('/job/'+id)
      }

      useEffect(()=>{
            axios({
                  method: 'get',
                  url: 'http://localhost:8000/api/v1/job_vacancies',
                  headers:{
                        'Authorization': "Bearer "+ token
                  }
            })
                  .then(response => setJoblist(response.data.Body.vacancies))
                  .catch(error => console.log(error));
      },[token])



      return(<>
            <div className="bg-gray-100 py-20">
                  <h1 className="max-w-5xl m-auto">Job Vacancies</h1>
            </div>
            <div className="max-w-5xl m-auto">
                  <h3 className="text-gray-700 my-4">List of Job Vacancies</h3>
                  <div>
                        {
                              joblist ?
                              joblist.map((job)=>(
                                    <div className="grid grid-cols-5 p-4 mb-6 odd:bg-gray-100 even:bg-white">
                                          <div className="col-span-2">
                                                <h4 className="text-blue-600">{job.company}</h4>
                                                <p>{job.address}</p>
                                          </div>
                                          <div className="col-span-2">
                                                <h4>Available Position (Capacity)</h4>
                                                <p>{
                                                      job.available_position.map((pos)=>(pos.position + "("+pos.capacity+") "))
                                                }</p>
                                          </div>
                                          {
                                                apply ?
                                                <button disabled className="btnHijau"  >Detail/Apply</button>
                                                :
                                                <button className="btnMerah" onClick={()=>{detail(job.id)}}>Detail/Apply</button>
                                          }
                                    </div>
                              ))
                              :
                              "Idk"
                        }
                  </div>
            </div>
      </>)
}