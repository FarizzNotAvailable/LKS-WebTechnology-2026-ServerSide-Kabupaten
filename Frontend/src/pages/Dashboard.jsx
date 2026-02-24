import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Dashboard(){

      const token = localStorage.getItem('token')
      const navigate = useNavigate()

      const [validation,setValidation] = useState()
      const [isLoading,setIsLoading] = useState(true)
      const [job, setJob] = useState(null)
      const [validated, setValidated] = useState(null)

      useEffect(()=>{

            axios({
                  method: 'get',
                  headers:{
                        'Authorization': 'Bearer '+token
                  },
                  url: 'http://localhost:8000/api/v1/applications',
            }).
            then(response => setJob(response.data.Body.vacancies))
            .catch(error => console.log(error))
            axios({
                  method: 'get',
                  headers:{
                        'Authorization': 'Bearer '+token
                  },
                  url: 'http://localhost:8000/api/v1/validations',
            })
                  .then(response => {
                        setValidation(response.data.Body.validation)
                        if(response.data.Body.validation.status == "accepted"){
                              setValidated(1)
                        }
                  })
                  .catch(error => console.log(error))
                  .finally(()=>{setIsLoading(false)})

            
      }, [token])

      return(<>
            <div className="bg-gray-100 py-20">
                  <h1 className="max-w-5xl m-auto">Dashboard</h1>
            </div>
            {
                  isLoading?
                  "LOADING"
                  :
                  <div className="max-w-5xl m-auto">
                        <h3 className="my-4 text-gray-700">My Data Validation</h3>
                        <div className="bg-white w-sm mb-8">
                              <div className="bg-gray-100 px-4 py-2 border-2">
                                    <h4>Data Validation</h4>
                              </div>
                              {
                                    validation ?
                                    <table className="w-full">
                                          <tr className="text-left odd:bg-gray-100 even:bg-white border-2 border-t-0">
                                                <th className="p-2">Status</th>
                                                <td className="p-2">
                                                      {
                                                            validation.status == "pending"?
                                                            <span className="bg-blue-400 text-white p-1 text-xs rounded-md">{validation.status}</span>
                                                            :
                                                            validation.status == "accepted"?
                                                            <span className="bg-green-400 text-white p-1 text-xs rounded-md">{validation.status}</span>
                                                            :
                                                            <span className="bg-red-400 text-white p-1 text-xs rounded-md">{validation.status}</span>
                                                      }
                                                </td>
                                          </tr>
                                          <tr className="text-left odd:bg-gray-100 even:bg-white border-2 border-t-0">
                                                <th className="p-2">Job Category</th>
                                                <td className="p-2"> 
                                                      {
                                                            validation.job_category ?
                                                            validation.job_category
                                                            :
                                                            "-"
                                                      }
                                                </td>
                                          </tr>
                                          <tr className="text-left odd:bg-gray-100 even:bg-white border-2 border-t-0">
                                                <th className="p-2">Job Position</th>
                                                <td className="p-2">
                                                      {
                                                            validation.job_position ?
                                                            validation.job_position
                                                            :
                                                            "-"
                                                      }
                                                </td>
                                          </tr>
                                          <tr className="text-left odd:bg-gray-100 even:bg-white border-2 border-t-0">
                                                <th className="p-2">Reason Accepted</th>
                                                <td className="p-2"> 
                                                      {
                                                            validation.reason_accepted ?
                                                            validation.reason_accepted
                                                            :
                                                            "-"
                                                      }
                                                </td>
                                          </tr>
                                          <tr className="text-left odd:bg-gray-100 even:bg-white border-2 border-t-0">
                                                <th className="p-2">Validator</th>
                                                <td className="p-2">-</td>
                                          </tr>
                                          <tr className="text-left odd:bg-gray-100 even:bg-white border-2 border-t-0">
                                                <th className="p-2">Validator Notes</th>
                                                <td className="p-2"> 
                                                      {
                                                            validation.validator_notes ?
                                                            validation.validator_notes
                                                            :
                                                            "-"
                                                      }
                                                </td>
                                          </tr>
                                    </table>
                                    :
                                    <div className="p-4 border-2 border-t-0">
                                          <button className="btnPrima" onClick={()=>{navigate("/validation")}}>+ Request Validation</button>
                                    </div>
                              }
                        </div>

                        <div className="grid grid-cols-3 mb-4">
                              <h3 className=" text-gray-700 col-span-2">My Job Application</h3>
                              {
                                    job ?
                                    ''
                                    :
                                    validated?
                                    <button className="btnPrima" onClick={()=>{navigate('/job')}}>+ Add Job Application</button>
                                    :
                                    ""
                              }
                        </div>
                        {
                              job ?
                              <div className="bg-white w-lg mb-8">
                                    <div className="bg-gray-100 px-4 py-2 border-2">
                                          <h4>{job.company}</h4>
                                    </div>
                                          <table className="w-full">
                                                <tr className="text-left odd:bg-gray-100 even:bg-white border-2 border-t-0">
                                                      <th className="p-2 w-40">Address</th>
                                                      <td className="p-2">{job.address}</td>
                                                </tr>
                                                <tr className="text-left odd:bg-gray-100 even:bg-white border-2 border-t-0">
                                                      <th className="p-2 w-40">Position</th>
                                                      <td className="p-2">
                                                            <ul className="ml-4 list-disc">
                                                                  {
                                                                        job.position.map((pos)=>(
                                                                              pos.status == "pending"?
                                                                              <li>{pos.position} <span className="bg-blue-400 text-white p-1 text-xs rounded-md">{pos.status}</span></li>
                                                                              :
                                                                              pos.status == "accepted"?
                                                                              <li>{pos.position} <span className="bg-green-400 text-white p-1 text-xs rounded-md">{pos.status}</span></li>
                                                                              :
                                                                              <li>{pos.position} <span className="bg-red-400 text-white p-1 text-xs rounded-md">{pos.status}</span></li>
                                                                        ))
                                                                  }
                                                            </ul>
                                                      </td>
                                                </tr>
                                                <tr className="text-left odd:bg-gray-100 even:bg-white border-2 border-t-0">
                                                      <th className="p-2 w-40">Apply date</th>
                                                      <td className="p-2"> {job.date}</td>
                                                </tr>
                                                <tr className="text-left odd:bg-gray-100 even:bg-white border-2 border-t-0">
                                                      <th className="p-2 w-40">Notes</th>
                                                      <td className="p-2"> {job.notes} </td>
                                                </tr>
                                          </table>
                              </div>
                              :
                              validated ?
                              "Go find a job"
                              :
                              <div className="font-normal bg-yellow-100 text-yellow-800 p-4">Your validation must be approved by validator to get the vaccine</div>
                        }
                  </div>      
            }

      </>)
}