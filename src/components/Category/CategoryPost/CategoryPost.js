
import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCategory } from '../../../store/category-slice';

const CategoryPost = () => {

  const[empty, setEmpty] = useState('')
  const[name, setName] = useState('')
  const[duration, setDuration] = useState('')
  const[durationLength, setDurationLength] = useState('')
  const[description, setDescription] = useState('')
  const[time, setTime] = useState('Bundle Life Span')

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(name==='' || description==='' || duration===''){
            setEmpty("Please fill in all the fields")
        }
        else{
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
        }
    };
    
  return (
    <>
        <div className="row">
            <div className="col-12">
                <div className="p-4">
                    <form >
                        <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
                        <div className="input-group input-group-dynamic mb-0">
                            <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" style={{lineHeight: 1}}/>
                        </div>
                        <label className="form-label">Category Name</label>
                        <div className="input-group input-group-dynamic mb-0">
                            <input type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)} className="form-control" style={{lineHeight: 1}}/>
                        </div>
                        <label className="form-label" style={{padding: 0}}>Description</label>
                        <div className="input-group input-group-dynamic mb-0">
                            <input type="text" name="description" value={durationLength} onChange={(e)=>setDurationLength(e.target.value)} className="form-control" style={{lineHeight: 1}}/>
                        </div>
                        <label className="form-label" style={{padding: 0}}>Duration</label>
                        {/* Currency dropdown */}
                        <div className="dropdown">
                            <button 
                                className="btn bg-gradient-primary dropdown-toggle" 
                                type="button" 
                                id="dropdownMenuButton" 
                                data-bs-toggle="dropdown" 
                                aria-expanded="false"
                                >
                                {time}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <a  className="dropdown-item" 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            setDuration(60*durationLength)
                                            setTime(60*durationLength)
                                        }}>
                                        Minutes
                                    </a>
                                </li>
                                <li>
                                    <a  className="dropdown-item" 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            setDuration(3600*durationLength)
                                            setTime(3600*durationLength)
                                        }}>
                                        Hours
                                    </a>
                                </li>
                                <li>
                                    <a  className="dropdown-item" 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            setDuration(86400*durationLength)
                                            setTime(86400*durationLength)
                                        }}>
                                        Days
                                    </a>
                                </li>
                                <li>
                                    <a  className="dropdown-item" 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            setDuration(604800*durationLength)
                                            setTime(604800*durationLength)
                                        }}>
                                        Weeks
                                    </a>
                                </li>
                                <li>
                                    <a  className="dropdown-item" 
                                        onClick={(e)=>{
                                            e.preventDefault()
                                            setDuration(2592000*durationLength)
                                            setTime(2592000*durationLength)
                                        }}>
                                        Months
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

export default CategoryPost;

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}