
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCategory } from '../../../store/category-slice';

const NetworkPost = () => {

  const[empty, setEmpty] = useState('')
  const[name, setName] = useState('')
  const[duration, setDuration] = useState('Bundle Life Span')
  const[description, setDescription] = useState('')


    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(postCategory({ 
        bundleCategory: {
          dateCreated: "2022-11-25T08:06:39.395Z",
          description,
          duration,
          name,
        },
        userID: 1
       })
      );
      setDescription('')
      setDuration('Bundle Life Span')
      setName('')
    };
    
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="p-4">
              <form >
                <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
                  <label className="form-label">Category Name</label>
                  <div className="input-group input-group-dynamic mb-4">
                      <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" />
                  </div>
                  <label className="form-label">Category Description</label>
                  <div className="input-group input-group-dynamic mb-4">
                      <input type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} className="form-control" />
                  </div>
                  <label className="form-label" style={{padding: 0}}>Bundle Life Span</label>
                  {/* Currency dropdown */}
                  <div className="dropdown">
                      <button 
                          className="btn bg-gradient-primary dropdown-toggle" 
                          type="button" 
                          id="dropdownMenuButton" 
                          data-bs-toggle="dropdown" 
                          aria-expanded="false"
                          >
                          {duration}
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <li>
                              <a  className="dropdown-item" 
                                  onClick={(e)=>{
                                      e.preventDefault()
                                      setDuration(3600)
                                  }}>
                                  1 Hour
                              </a>
                          </li>
                          <li>
                              <a  className="dropdown-item" 
                                  onClick={(e)=>{
                                      e.preventDefault()
                                      setDuration(86400)
                                  }}>
                                  1 Day
                              </a>
                          </li>
                          <li>
                              <a  className="dropdown-item" 
                                  onClick={(e)=>{
                                      e.preventDefault()
                                      setDuration(604800)
                                  }}>
                                  1 Week
                              </a>
                          </li>
                          <li>
                              <a  className="dropdown-item" 
                                  onClick={(e)=>{
                                      e.preventDefault()
                                      setDuration(2592000)
                                  }}>
                                  1 Month
                              </a>
                          </li>
                      </ul>
                  </div>
                  <button onClick={handleSubmit} className="btn btn-primary my-4">Submit</button>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}

export default NetworkPost;

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}