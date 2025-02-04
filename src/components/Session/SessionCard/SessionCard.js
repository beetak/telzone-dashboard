import React,{useState, useEffect} from 'react';
import Api from '../../Api/Api';

const SessionCard = (props) => {

  const [id, setId] = useState('')
  const [success, setSuccess] = useState(false)
  const [failed, setFailed] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)

  const {data, index, getSession} = props 
  useEffect(() => {
    setId(data.id)
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();      
    setLoadingStatus(true);  
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };  
    try {
      const response = await Api.put(
        `/session/${id}/active?isActive=false`,
        {headers}
      )  
      if (response.payload) {
        console.log(response)
        if (response.payload.data.code === 'SUCCESS') {
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
      setLoadingStatus(false);
      getSession()
    }
  };

  return (
    <>
      <td hidden>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{data.id}</h6>
          </div>
        </div>
      </td>
      <td>
        <div className="d-flex px-2">
          <div className="my-auto">
            <h6 className="mb-0 text-sm">{data.name}</h6>
          </div>
        </div>
      </td>
      <td className="align-middle text-center">
        <a className="btn btn-link text-dark px-3 mb-0" onClick={handleUpdate}><i className="material-icons text-sm me-2">edit</i>Deactivate</a>
      </td>
    </>
  );
}

export default SessionCard;
