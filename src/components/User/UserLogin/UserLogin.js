import React, {useState} from 'react';
import { useDispatch} from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { loginUser } from '../../../store/user-slice';
const logo = 'assets/img/logo.png'

export default function UserLoginForm () {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginFail, setLoginFail] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [errMess, setErrMess] = useState('')


  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingStatus(true);
  
    try {
      const response = await dispatch(loginUser({ 
        emailAddress: email + "@telone.co.zw",
        password
      }));
  
      if (response.payload && response.payload.success) {
        if (response.payload.data.code === 'SUCCESS') {
          setLoginSuccess(true);
          localStorage.setItem('email', response.payload.data.data.email);
          localStorage.setItem('firstname', response.payload.data.data.firstname);
          localStorage.setItem('surname', response.payload.data.data.surname);
          localStorage.setItem('userId', response.payload.data.data.id);
          localStorage.setItem('role', response.payload.data.data.role.role);
          localStorage.setItem('regionId', response.payload.data.data.region.id);
          localStorage.setItem('regionName', response.payload.data.data.region.name);
          localStorage.setItem('townId', response.payload.data.data.town.id);
          localStorage.setItem('townName', response.payload.data.data.town.name);
          localStorage.setItem('shopId', response.payload.data.data.shop.id);
          localStorage.setItem('shopName', response.payload.data.data.shop.name);
          setTimeout(() => {
            routeTo();
          }, 2000);
        } else {
          setLoginFail(true);
          setErrMess(response.payload.data.code);
        }
      } else {
        await handleDispatchFailure(response);
      }
    } catch (error) {
      console.error("Error:", error);
      await handleDispatchFailure(error);
    } finally {
      setTimeout(() => {
        setLoginSuccess(false);
        setLoadingStatus(false);
        setLoginFail(false);
        setErrMess('');
      }, 5000);
    }
  };
  
  async function handleDispatchFailure(response) {
    if (response.payload && response.payload.data.message === "Network Error") {
      // Network error handling
      console.log("response",response.payload.data.message)
      setLoadingStatus(false);
      setLoginFail(true);
      setErrMess("Network Error");
      setTimeout(() => {
        setErrMess('');
      }, 5000);
    } else {
      setLoadingStatus(false);
      setLoginFail(true);
      setErrMess(response.payload.data.code);
    }
  }

  const routeTo = () => {
    const userRole = localStorage.getItem('role')
    userRole==='' ? (
      window.location='/'
    ):(
      userRole==='Sales Admin'? (window.location = '/sales'):(
        userRole==='Supervisor'? (window.location = '/partners'):(
          userRole==='Head Retail'? (window.location = '/abm-reports'):(
            userRole==='Area Manager'? (window.location = '/abm-reports'):(
              userRole==='Finance Manager'? (window.location = '/fin-sales-report'):(
                userRole==='Regional Accountant'? (window.location = '/fin-sales-report'):(
                  userRole==='Regional Manager'? (window.location = '/regional-reports'):(window.location = '/dashboard')
                )
              )
            )
          )
        )
      )
    )
  }

  let loadingAnimation = 
    <div className='text-center' style={anime}>
        <h5 style={{ color: '#155bb5' }}>
          {loadingStatus && !loginSuccess  && !loginFail? 
            "Logging you in. Please wait" :
            loadingStatus && loginSuccess  && !loginFail ? 
              "Login Successful" :
              loadingStatus && !loginSuccess  && loginFail ? "Login Failed" : ""}
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
    
  return(
    <>
      <div className="page-header align-items-start min-vh-100" style={{backgroundImage: 'url("https://www.worldatlas.com/r/w768/upload/01/33/22/digital-revolution.jpg")'}}>
        <span className="mask bg-gradient-dark opacity-6" />
        <div className="container my-auto">
          <div className="row">
            <div className="col-lg-4 col-md-8 col-12 mx-auto">
              <div className="card z-index-0 fadeIn3 fadeInBottom">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                  <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                    <h4 className="text-white font-weight-bolder text-center mt-2 mb-0">Sign in</h4>
                  </div>
                </div>
                <div className="card-body">
                <div className='text-center'>
                    <h5 style={{ color: 'red' }}>
                      {
                        errMess === 'NOT_FOUND' ? 
                          "Incorrect Email or Password" : 
                          errMess === 'Network Error' ? 
                            "Network Error - 404" :""
                      }
                    </h5>
                </div>
                  <form role='form' className="text-start" onSubmit={handleSubmit}>
                    <label className="form-label">Email</label>
                    <div className="input-group input-group-outline my-3">
                      <input onChange = {(e)=>setEmail(e.target.value)} type="text" id="email" name="email" className="form-control" autoComplete="off" required/>
                    </div>
                    <label className="form-label">Password</label>
                    <div className="input-group input-group-outline mb-3">
                      <input onChange = {(e)=>setPassword(e.target.value)} type="password" id="password" name="password" className="form-control" required/>
                    </div>
                    <div className="text-center">
                      <button  className="btn bg-gradient-primary w-100 my-4 mb-2">Login</button>
                    </div>
                    {loadingAnimation}
                    {/*<label className="form-label">{this.state.loadingStatus ==='pending'?'logging...':(this.state.loadingStatus ==='failed'?'Logging in failed. Please try again ':'')}</label>*/}
                    <p className="mt-4 text-sm text-center">
                      <img style={Style1} src={logo}/>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
)}

const Style1 = {
  width: '100px'
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