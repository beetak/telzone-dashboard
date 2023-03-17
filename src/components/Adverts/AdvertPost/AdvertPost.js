import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAsyncAdvert } from '../../../store/adverts-slice';

const AdvertPost = () => {

    const[empty, setEmpty] = useState('')
    const[title, setTitle] = useState('')
    const[image, setImage] = useState('')
    const[description, setDescription] = useState('')

    const onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
        let img = event.target.files[0];
        setImage(URL.createObjectURL(img));
        }
    };


    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(title==='' || description==='' || image===''){
          setEmpty("Please fill in all the fields")
        }
        else{
          dispatch(postAsyncAdvert({ 
              advertsDTO: {
                  description,
                  image,
                  title
                }
              })
          );
          setTitle('')
          setDescription('')
        }
    };
    
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="p-4">
              <form >
                <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
                <label className="form-label">Title</label>
                <div className="input-group input-group-dynamic mb-4">
                    <input type="text" name="title" onChange={(e)=>setTitle(e.target.value)} className="form-control" />
                </div>
                <label className="form-label">Description</label>
                <div className="input-group input-group-dynamic mb-4">
                    <input type="text" name="description" onChange={(e)=>setDescription(e.target.value)} maxlength="100" placeholder='Not more than 100 characters' className="form-control" />
                </div>
                <div className="form-group form-file-upload form-file-multiple">
                    <input type="file" name="image" onChange={onImageChange} className="inputFileHidden" />
                    <div className="input-group">
                        <input value="Advert Image" type="text" className="form-control inputFileVisible" placeholder="" />
                        <span className="input-group-btn">
                        </span>
                    </div>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary my-4">Submit</button>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}

export default AdvertPost;

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}