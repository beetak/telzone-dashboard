import { Component } from "react";
import axios from 'axios';

const url = 'http://localhost:8083/smart-wifi/admin-portal-user/login/';
  // const url = "http://172.27.242.113:8083/smart-wifi/admin-portal-user/login/"
// const url = 'http://10.0.4.251:8083/smart-wifi/admin-portal-user/login/';
// const url = 'http://telzonewifi.telone.co.zw:8083/smart-wifi/admin-portal-user/login/';
const logo = 'assets/img/logo.png'

export default class LoginForm extends Component {

    componentDidMount(){
      
    }

    state = {
      email: '',
      password: '',
      user: '',
      success: false,
      errMess: '',
      loadingStatus: 'idle'
    }
  
    handleChange=(e)=>{
      this.setState({
          [e.target.name] : e.target.value
      })
    }

    loginToken = localStorage.getItem('token')

    handleSubmit = (e) => {
      this.setState({loadingStatus: 'pending'})
      e.preventDefault();
      // console.log(user, pwd)
      // setUser('')
      // setPwd('')
      // setSuccess(true)
      const user ={
        emailAddress: this.state.email+"@telone.co.zw",
        password : this.state.password,
      }
        // alert(user.email)    // "it shows the user email"
        axios.post(url,user)
        .then((response) => {
          // alert(user.email)   //"does not work"
          // localStorage.setItem('token', user.email)
          if(response.data.code === 'SUCCESS'){
            this.setState({success: true},()=>{
              console.log('login stt', this.state.success)
            })
            localStorage.setItem('email', response.data.data.email)
            localStorage.setItem('firstname', response.data.data.firstname)
            localStorage.setItem('surname', response.data.data.surname)
            localStorage.setItem('userId', response.data.data.id)
            localStorage.setItem('role', response.data.data.role.role)
            // window.location = '/dashboard'
            this.routeTo()
         }
         else{
            this.setState({
              errMess:response.data.code
            })
         }
        })
        .catch(err=>{
          this.setState({
            loadingStatus: 'failed'
          })
        })
    }

    routeTo = () => {
      const userRole = localStorage.getItem('role')
      userRole==='' ? (
        window.location='/'
      ):(
        userRole==='Sales Admin'? (window.location = '/sales'):(
          userRole==='Supervisor'? (window.location = '/partners'):(window.location = '/dashboard')
        )
      )
    }

    render(){
    return(
      <>

      
        <div className="page-header align-items-start min-vh-100" style={{backgroundImage: 'url("https://www.worldatlas.com/r/w768/upload/01/33/22/digital-revolution.jpg")'}}>


  {/* <label id="notification" style={{color: 'red', textAlign: 'center'}}></label>
      <input id="email" className="iinput" type="email" placeholder="Email" value={this.state.email} onChange={this.onChange} name="email" required/>
      <input id="password" className="iinput" type="password" placeholder="Password" value={this.state.password} onChange={this.onChange} name="password" required/>
  */}
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
            <p ref={this.state.errRef} aria-live="assertive">{this.state.errMess==='NOT_FOUND'? <p className="mb-0"><span className="text-success text-sm font-weight-bolder"></span>Incorrect Email or Password</p>:''}</p>
            <form role="form" className="text-start" onSubmit={this.handleSubmit}>
              <label className="form-label">Email</label>
              <div className="input-group input-group-outline my-3">
                <input onChange = {this.handleChange} type="text" id="email" name="email" className="form-control" ref={this.state.userRef} autoComplete="off" required/>
              </div>
              <label className="form-label">Password</label>
              <div className="input-group input-group-outline mb-3">
                <input onChange = {this.handleChange} type="password" id="password" name="password" className="form-control" required/>
              </div>
              {/*<div className="form-check form-switch d-flex align-items-center mb-3">
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label mb-0 ms-2" htmlFor="rememberMe">Remember me</label>
              </div>*/}
              <div className="text-center">
                {/* <button type="button" onClick={this.handleClick} className="btn bg-gradient-primary w-100 my-4 mb-2">Sign in</button> */}
                <button  className="btn bg-gradient-primary w-100 my-4 mb-2">Login</button>
              </div>
              <label className="form-label">{this.state.loadingStatus ==='pending'?'logging...':(this.state.loadingStatus ==='failed'?'Logging in failed. Please try again ':'')}</label>
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
}

const Style1 = {
  width: '100px'
}