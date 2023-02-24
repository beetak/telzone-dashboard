
import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLoginStatus, userLogin } from '../../../store/user-slice';

const logo = 'assets/img/logo.png'
const userRole = localStorage.getItem('role')
const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
);
const Login = () => {

    const[empty, setEmpty] = useState('')
    const[emailAddress, setEmailAddress] = useState('')
    const[password, setPassword] = useState('')


    const dispatch = useDispatch()
    const loginStatus = useSelector(getLoginStatus)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(userLogin({ 
            emailAddress,
            password
        })
        );
        await delay(5000);
        routeTo()
    };

    const routeTo = () => {
        const userRole = localStorage.getItem('role')
        userRole==='' ? (
          window.location='/'
        ):(
          userRole==='Sales Admin'? (window.location = '/sales'):(window.location = '/dashboard')
        )
    }
    
  return (
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
                                    <div className="row mt-3">
                                        <div className="col-2 text-center ms-auto">
                                            <a className="btn btn-link px-3" href="javascript:;">
                                                <i className="fa fa-facebook text-white text-lg" />
                                            </a>
                                        </div>
                                        <div className="col-2 text-center px-1">
                                            <a className="btn btn-link px-3" href="javascript:;">
                                                <i className="fa fa-github text-white text-lg" />
                                            </a>
                                        </div>
                                        <div className="col-2 text-center me-auto">
                                            <a className="btn btn-link px-3" href="javascript:;">
                                                <i className="fa fa-google text-white text-lg" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <form >
                                    <label className="form-label">Email</label>
                                    <div className="input-group input-group-outline my-3">
                                        <input onChange = {(e)=>setEmailAddress(e.target.value)} type="email" id="email" name="email" className="form-control"  autoComplete="off" required/>
                                    </div>
                                    <label className="form-label">Password</label>
                                    <div className="input-group input-group-outline mb-3">
                                        <input onChange = {(e)=>setPassword(e.target.value)} type="password" id="password" name="password" className="form-control" required/>
                                    </div>
                                    <div className="form-check form-switch d-flex align-items-center mb-3">
                                        <input className="form-check-input" type="checkbox" id="rememberMe" />
                                        <label className="form-check-label mb-0 ms-2" htmlFor="rememberMe">Remember me</label>
                                    </div>
                                    <div className="text-center">
                                        {/* <button type="button" onClick={this.handleClick} className="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button> */}
                                        <button onClick={handleSubmit}  className="btn bg-gradient-primary w-100 my-4 mb-2">Login</button>
                                    </div>
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
  );
}

export default Login;


const Style1 = {
    width: '100px'
  }