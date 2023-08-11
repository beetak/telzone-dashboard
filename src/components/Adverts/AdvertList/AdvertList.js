import { useSelector } from 'react-redux';
import { getAllAdverts, getLoadingStatus } from '../../../store/adverts-slice';
import AdminAdvertCard from '../AdvertCard/AdminAdvertCard';
import SuperAdminAdvertCard from '../AdvertCard/SuperAdminAdvertCard';
import BeatLoader from 'react-spinners/BeatLoader'

const userRole = localStorage.getItem('role')

const AdvertList = () => {

  const loading = useSelector(getLoadingStatus)

  let loadingAnimation = 
  <div className='text-center' style={anime}>
    <BeatLoader
      color={'#055bb5'}
      loading={loading}
      cssOverride={override}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  </div>

  const adverts = useSelector(getAllAdverts)

  var count = Object.keys(adverts).length
  let renderedAdverts = ''

  if(count>0){

    renderedAdverts = userRole === 'Admin' ? 
    <>
      <table className="table align-items-center justify-content-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Image</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Description</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ">Action</th>    
          </tr>
        </thead>
        <tbody>
          {
            adverts ? (
              adverts.map((advert, index)=>(
                  <tr key={index}>
                    <AdminAdvertCard data={advert} index={index}/>
                  </tr>
              ))
            ):(<div><h1>Error</h1></div>)
          }
        </tbody>
      </table>
    </>
    :
    <>
      <div className="col-12 mt-4">
        <div className="mb-5 ps-3">
          <h6 className="mb-1">Adverts</h6>
          <p className="text-sm">Active / Inactive</p>
          <div className="row pt-4">
            {
              adverts ? (
                adverts.map((advert, index)=>(
                  <div className="col-xl-3 col-md-6 mb-xl-0 mb-4" key={index}>
                    <SuperAdminAdvertCard data={advert} index={index}/>
                  </div>
                ))
              ):(<div><h1>Error</h1></div>)
            }
          </div>
        </div>
      </div>
    </>
  }
  else{
    renderedAdverts = <div className='text-center'>
      <h5 style={{color: '#0C55AA'}}>No Adverts Found</h5>
    </div>
  }

  let errorMsg =  
    <div className='text-center'>
      <h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5>
    </div>

  return (
    <div>
      {
        loading==='pending'?
        loadingAnimation: 
        loading ==='rejected'?
          errorMsg: renderedAdverts
      }
    </div>
  );
}

export default AdvertList;

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "blue",
};

const anime = {
  height: '10vh'
}
