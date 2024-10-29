import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCurrency } from '../../../store/currency-slice';
import { BeatLoader } from 'react-spinners';

const CurrencyPost = () => {

  const[empty, setEmpty] = useState('')
  const[name, setName] = useState('')
  const[symbol, setSymbol] = useState('')
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)


    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(name==='' || symbol===''){
        setEmpty("Please fill in all the fields")
      }
      else{
        setLoadingStatus(true);    
            try {
                const response = await dispatch(
                  postCurrency({ 
                    currency: {
                      dateCreated: "2022-11-23T09:50:00.849Z",
                      name,
                      symbol
                    },
                    userID: 1
                  })
                );
        
                if (response.payload) {
                    console.log(response)
                    if (response.payload.code === 'SUCCESS') {
                        setSuccess(true);
                    } else {
                        setFailed(true);
                    }
                } else {
                    setFailed(true);
                }
                } catch (error) {
                    setFailed(true);
                } finally {
                setTimeout(() => {
                    setSuccess(false);
                    setLoadingStatus(false);
                    setFailed(false);
                    setName('')
                    setSymbol('')
                }, 2000);
          }
      }
    }
    
  let loadingAnimation = 
  <div className='text-center' style={anime}>
      <h5 style={{ color: '#155bb5' }}>
        {loadingStatus && !success  && !failed? 
          "Creating Currency, Please wait" :
          loadingStatus && success  && !failed ? 
            "Currency Creation Successful" :
            loadingStatus && !success  && failed ? "Currency Creation Failed" : ""}
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
                  <label className="form-label" style={{padding: 0}}>Currency Name</label>
                  <div className="input-group input-group-dynamic">
                      <input type="text" name="name" onChange={(e)=>{setName(e.target.value);setEmpty('')}} value={name} className="form-control" style={{padding: 0}}/>
                  </div>
                  <label className="form-label" style={{padding: 0}}>Currency Symbol</label>
                  <div className="input-group input-group-dynamic">
                      <input type="text" name="symbol" onChange={(e)=>{setSymbol(e.target.value);setEmpty('')}} value={symbol} className="form-control" style={{padding: 0}}/>
                  </div>
                  {loadingAnimation}
                  <button onClick={handleSubmit} className="btn btn-primary my-4">Submit</button>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}

export default CurrencyPost;

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