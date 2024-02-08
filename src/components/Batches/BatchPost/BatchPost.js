import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { batchActions, postBatch, postVoucher } from '../../../store/batch-slice';
import { getAllBundles } from '../../../store/bundle-slice';

const userID = localStorage.getItem('userId')
const shopId = localStorage.getItem('shopId')

const BatchPost = () => {

  const dateCreated = new Date()

  const[currentState, setCurrentState] = useState('Product')
  const[empty, setEmpty] = useState('')
  const[bundleName, setBundleName] = useState('')
  const[bundleID, setBundleID] = useState('')

  const dispatch = useDispatch()

  useEffect(() => {
  }, []);

  const handleSubmit = async () => {
    dispatch(batchActions.postStatus(true)
    )
    dispatch(postBatch({ 
      batch: {
        dateCreated,
        id: 1
      },
      userID,
      bundleId: bundleID
    })).then((response)=>{
      console.log("batch resp: ", response)
      if(response.payload && response.payload.success){
        handlePost(response.payload.data.data.batch.id)
      }
      else{
        //code to undo batch
        console.log("batch failed")
        dispatch(batchActions.failStatus(true))
        // Clear the loading state after 5 seconds
        setTimeout(() => {
          // setLoadingStatus(false);
          dispatch(batchActions.failStatus(false))
          dispatch(batchActions.postStatus(false))
        }, 5000);
      }
    })
  }

  const handlePost = async (batchID) =>{
    dispatch(batchActions.successStatus(true))
    dispatch(
      postVoucher({
      batchID: batchID,
      bundleID,
      userID,
      orderId: 1,
      vouchers: {
        dateUsed: "2024-01-18T13:00:49.368Z"
      },
      num: 1000
    }))
    // setLoadingStatus(false);
    // setLoadingSuccess(true);
    dispatch(batchActions.postStatus(false))
    dispatch(batchActions.successStatus(true))
    setBundleID('')
    setTimeout(() => {
      // setLoadingSuccess(false);
      dispatch(batchActions.successStatus(false))
    }, 2000);
  // alert("Done")
  // window.location = "/batch"
}
    
  const bundles = useSelector(getAllBundles)
  let renderedBundles = ''
  renderedBundles = bundles ? (
    bundles.map((bundle, index)=>(
      <li key={bundle.id}>
        <a  className="dropdown-item" 
            onClick={(e)=>{
                e.preventDefault()
                setBundleID(bundle.id)
                setBundleName(bundle.name)
                setCurrentState(bundle.name)
            }}>
            {bundle.name}
        </a>
      </li>
    ))
  ):(<div><h1>{bundles.Error}</h1></div>)

    
  return (
    <div className="p-4">
        <form>
            <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
            <div className="dropdown">
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {currentState}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {renderedBundles}
                </ul>
            </div>
            <div>
              <button onClick={handleSubmit} disabled={bundleID?false:true} type='button' className="btn btn-primary">Generate Batch</button>
            </div>
        </form>
    </div>
  );
}

export default BatchPost;

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}

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
  height: '10vh'
}