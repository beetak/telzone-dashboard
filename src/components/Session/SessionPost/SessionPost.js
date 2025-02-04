
import React, {useState} from 'react';
import { BeatLoader } from 'react-spinners';
import Api from '../../Api/Api';

const SessionPost = () => {

    const [empty, setEmpty] = useState('')
    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    
        if (name === '') {
            setEmpty("Please fill in all the fields");
        } else {
            setLoadingStatus(true);
            try {
                const response = await Api.post(
                    `/session/`, 
                    { sessionName: name },
                    { headers }
                );
    
                if (response.data) {
                    console.log(response);
                    if (response.data.code === 'SUCCESS') { 
                        setSuccess(true);
                    } else {
                        setFailed(true);
                    }
                } else {
                    setFailed(true);
                }
            } catch (error) {
                console.error("Error occurred:", error);
                setFailed(true);
            } finally {
                setTimeout(() => {
                    setSuccess(false);
                    setLoadingStatus(false);
                    setFailed(false);
                    setName('');
                }, 2000);
            }
        }
    };
    
    let loadingAnimation = 
    <div className='text-center' style={anime}>
        <h5 style={{ color: '#155bb5' }}>
          {loadingStatus && !success  && !failed? 
            "Creating Category, Please wait" :
            loadingStatus && success  && !failed ? 
              "Category Creation Successful" :
              loadingStatus && !success  && failed ? "Category Creation Failed" : ""}
        </h5>
        {
          loadingStatus ? 
          <BeatLoader
            color={'#055bb5'}
            loading={loadingStatus}
            cssOverride={override}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />: ""
        }      
    </div>
    
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
                        <label className="form-label">Session Name</label>
                        {loadingAnimation}
                        <button onClick={handleSubmit} className="btn btn-primary my-4">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  );
}

export default SessionPost;

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
};
  
const anime = {
    textAlign: 'center', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
}