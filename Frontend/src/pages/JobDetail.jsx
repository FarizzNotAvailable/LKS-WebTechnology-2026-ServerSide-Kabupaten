import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

export default function JobDetail(){
      const token = localStorage.getItem('token')
      const navigate = useNavigate()
      const id = useParams()
      const [job, setJob]= useState()
      const [position, setPosition] = useState([])
      const [notes, setNotes] = useState('')

      const handleCheckboxChange = (e) => {
            const positionId = e.target.value
            if(e.target.checked){
                  setPosition(f=>[...f, positionId])
            }else{
                  const newPosition = position.filter(position=>position!==positionId)
                  setPosition(newPosition)
            }
      }
      const handleSubmit = () => {
            console.log(position)
            axios({
                  method: 'post',
                  url: 'http://localhost:8000/api/v1/applications',
                  headers:{
                        'Authorization': "Bearer "+ token
                  },
                  data: {
                        "job_vacancy_id":id.id,
                        "position": position,
                        "notes" : notes
                  }
            })
                  .then(response => {
                        console.log(response)
                        alert("Data telah dikirim!")
                        navigate('/dashboard')
                  })
                  .catch(error => {
                        console.log(error)
                        alert('Error')
                  });
      }

      useEffect(()=>{
                  axios({
                        method: 'get',
                        url: 'http://localhost:8000/api/v1/job_vacancies/'+id.id,
                        headers:{
                              'Authorization': "Bearer "+ token
                        }
                  })
                        .then(response => setJob(response.data.Body.vacancy))
                        .catch(error => console.log(error));
            },[token,id])

      return(<>
            {
                  job ?
                  <>
                        <div className="bg-gray-100 py-20 text-center">
                              <h1 className="max-w-5xl m-auto ">{job.company}</h1>
                              <p>{job.address}</p>
                        </div>
                        <div className="max-w-5xl m-auto">
                              <h3 className="mt-4">Description</h3>
                              <p className="mb-8 mt-2">{job.description}</p>
                              <h3>Select Position</h3>
                              <table className="w-full border-collapse border-2 mb-4">
                                    <tr className="odd:bg-gray-100 even:bg-white">
                                          <th className="border-2 p-2">#</th>
                                          <th className="border-2 p-2 text-left">Position</th>
                                          <th className="border-2 p-2 text-left" >Capacity</th>
                                          <th className="border-2 p-2 text-left">Application/max</th>
                                    </tr>
                                    {
                                          job.available_position.map((pos)=>(
                                                pos.capacity == pos.apply_capacity?
                                                <tr className="bg-yellow-100" key={pos.id}>
                                                      <td className="border-2 p-2"><input type="checkbox" disabled/></td>
                                                      <td className="border-2 p-2 text-left">{pos.position}</td>
                                                      <td className="border-2 p-2 text-left" >{pos.capacity}</td>
                                                      <td className="border-2 p-2 text-left">{pos.apply_capacity}</td>
                                                </tr>
                                                :
                                                <tr className="odd:bg-gray-100 even:bg-white" key={pos.id}>
                                                      <td className="border-2 p-2"><input type="checkbox" value={pos.id} onClick={handleCheckboxChange}/></td>
                                                      <td className="border-2 p-2 text-left">{pos.position}</td>
                                                      <td className="border-2 p-2 text-left" >{pos.capacity}</td>
                                                      <td className="border-2 p-2 text-left">{pos.apply_capacity}</td>
                                                </tr>
                                          ))
                                    }
                              </table>

                              <label htmlFor="notes" className="mr-4">Notes for Company</label>
                              <textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-4" placeholder="Explain why you should be accepted"></textarea>

                              <div className="w-sm my-8">
                                    <button className="btnPrima" onClick={handleSubmit}>Send Request</button>
                              </div>
                        </div>
                  </>
                  :
                  ""
            }
      </>)
}