import { useState } from "react";
import axios from "axios"


const Modals = () => {

    const url = "http://localhost:8082:8080/user"

    const [data, setData] = useState(
        {
          firstname: "",
          surname: "",
          email: "",
          password: "password123"      
        }
    )

    function handleSubmit(e){
        e.preventDefault()
        axios.post(url,{
            name: data.username,
            surname: data.surname,
            email: data.email,
            password: data.password
        })
        .then(res=>{
            console.log("Posting data", res)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    function handleChange(e){
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
        console.log(newData)
    }
    
        return(
<div>
  <div className="row">
    <div className="col-md-4">
      {/* <button type="button" className="btn bg-gradient-danger btn-block mb-3" data-bs-toggle="modal" data-bs-target="#modal-form">Form</button> */}
      <div className="modal fade" id="modal-form" tabIndex={-1} role="dialog" aria-labelledby="modal-form" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="card card-plain">
                <div className="card-header pb-0 text-left">
                  <h5 className>Create New Client</h5>
                  <p className="mb-0">Enter User Details</p>
                </div>
                <div className="card-body">
                  <form  onSubmit={(e)=>handleSubmit(e)} role="form text-left">
                    <div className="input-group input-group-outline my-3">
                      <label className="form-label">Client Name</label>
                      <input  id="name" onChange={(e)=>handleChange(e)} value={data.name} type="text" className="form-control" onfocus="focused(this)" onfocusout="defocused(this)" />
                    </div>
                    <div className="input-group input-group-outline my-3">
                      <label className="form-label">Email</label>
                      <input id="price" onChange={(e)=>handleChange(e)} value={data.price} type="text" className="form-control" onfocus="focused(this)" onfocusout="defocused(this)" />
                    </div>
                    <div className="input-group input-group-outline my-3">
                      <label className="form-label">Description</label>
                      <input id="description" onChange={(e)=>handleChange(e)} value={data.description} type="text" className="form-control" onfocus="focused(this)" onfocusout="defocused(this)" />
                    </div>
                    <div className="form-check form-switch d-flex align-items-center">
                      <input className="form-check-input" type="checkbox" id="rememberMe" defaultChecked />
                      <label className="form-check-label mb-0 ms-3" htmlFor="rememberMe">Remember me</label>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-round bg-gradient-info btn-lg w-100 mt-4 mb-0">Submit</button>
                    </div>
                  </form>
                </div>
                <div className="card-footer text-center pt-0 px-lg-2 px-1">
                <div class="modal-footer">
                    <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
    </div>
        )
  
}
export default Modals