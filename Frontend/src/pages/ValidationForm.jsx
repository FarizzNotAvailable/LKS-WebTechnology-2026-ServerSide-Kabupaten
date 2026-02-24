import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function ValidationForm(){
      const token = localStorage.getItem('token')
      const [category,setCategory] = useState()
      const navigate = useNavigate()

      const [form, setForm] = useState({
            category: '1',
            jobposition: '',
            workexp: '',
            reason: ''
      })

      const handleChange = (e) => {
            const { name, value } = e.target
            setForm(f => ({ ...f, [name]: value }))
      }

      useEffect(()=>{
            axios({
                  method: 'get',
                  url: 'http://localhost:8000/api/v1/validation',
                  headers:{
                        'Authorization' : 'Bearer ' + token
                  }
            })
                  .then(response => setCategory(response.data.category))
                  .catch(error => console.log(error));
      },[token])

      const handeSubmit = () =>{
            axios({
                  method: 'post',
                  url: 'http://localhost:8000/api/v1/validation',
                  headers:{
                        'Authorization' : 'Bearer ' + token
                  },
                  data: {
                        'work_exp': form.workexp,
                        'job_category_id': form.category,
                        'job_position': form.jobposition,
                        'reason_accepted': form.reason,
                  }
            })
                  .then(response => {
                        console.log(response)
                        alert("Data telah dikrim!")
                        navigate('/dashboard')
                  })
                  .catch(error => console.log(error));
      }

      return(<>
            <div className="bg-gray-100 py-20">
                  <h1 className="max-w-5xl m-auto">Request Validation Data</h1>
            </div>
            <div className="max-w-5xl m-auto">
                  <div className="grid grid-cols-2 gap-3">
                        <div>
                              <label htmlFor="category" className="mr-4">Job Category</label>
                              <select id="category" name="category" value={form.category} onChange={handleChange} className="mb-4">
                                    {
                                          category ?
                                          category.map((kategori)=>(
                                                <option value={kategori.id} key={kategori.id}>{kategori.name}</option>
                                          ))
                                          :
                                          <option value="1">Loading</option>
                                    }
                              </select>
                              <textarea name="jobposition" value={form.jobposition} onChange={handleChange} placeholder="Job position separate with , (comma)"></textarea>
                        </div>
                        <div>
                              <label htmlFor="hasWorkexp" className="mr-4">Work Experience?</label>
                              <select id="hasWorkexp" name="hasWorkexp" className="mb-4">
                                    <option value="" hidden>Choose</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                              </select>
                              <textarea name="workexp" value={form.workexp} onChange={handleChange} placeholder="Describe your work experience"></textarea>
                        </div>
                        <div className=" col-span-2">
                              <label htmlFor="reason" className="mr-4">Reason accepted</label>
                              <textarea id="reason" name="reason" value={form.reason} onChange={handleChange} className="mt-4" placeholder="Explain why you should be accepted"></textarea>
                        </div>
                  </div>
                  <div className="w-sm mt-8">
                        <button className="btnPrima" onClick={handeSubmit}>Send Request</button>
                  </div>
            </div>
      </>)
}