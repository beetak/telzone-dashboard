import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCurrency } from '../../../store/currency-slice';

const CurrencyPost = () => {

  const[empty, setEmpty] = useState('')
  const[name, setName] = useState('')
  const[symbol, setSymbol] = useState('')


    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch(postCurrency({ 
        currency: {
          dateCreated: "2022-11-23T09:50:00.849Z",
          name,
          symbol
        },
        userID: 1
       })
      );
      setName('')
      setSymbol('')
    };
    
  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="p-4">
              <form >
                  <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
                  <label className="form-label" style={{padding: 0}}>Currency Name</label>
                  <div className="input-group input-group-dynamic">
                      <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name} className="form-control" style={{padding: 0}}/>
                  </div>
                  <label className="form-label" style={{padding: 0}}>Currency Symbol</label>
                  <div className="input-group input-group-dynamic">
                      <input type="text" name="symbol" onChange={(e)=>setSymbol(e.target.value)} value={symbol} className="form-control" style={{padding: 0}}/>
                  </div>
                  <button onClick={handleSubmit} className="btn btn-primary my-4">Submit</button>
              </form>
            </div>
          </div>
        </div>
    </>
  );
}

export default CurrencyPost;

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}