import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateUser } from "../../../store/user-slice";
import { BeatLoader } from "react-spinners";

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const emailAddress = localStorage.getItem('email')
const role = localStorage.getItem('role')
const id = localStorage.getItem('userId')

export default function UserProfile(){

  const [empty, setEmpty] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)
    const [failed, setFailed] = useState(false)
    const [loadingStatus, setLoadingStatus] = useState(false)
    const dispatch = useDispatch()

    function containsUppercase(str) {
      return /[A-Z]/.test(str); // Checks for at least one uppercase letter
    }
    
    function passwordLength(str) {
      return str.length >= 8 && str.length <= 14; // Checks if length is between 8 to 14 characters
    }

    function containsDigit(str) {
      return /\d/.test(str);
    }
    
    function containsSpecialChar(str) {
      return /[!@#$%^&*(),.?":{}|<>]/.test(str);
    }
    
    function containsLowercase(str) {
      return /[a-z]/.test(str);
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(password===''){
        setEmpty("Please provide the new password")
      }
      else{
        if (!containsUppercase(password) || 
            !containsLowercase(password) || 
            !containsDigit(password) || 
            !containsSpecialChar(password) || 
            !passwordLength(password)) {
          setEmpty("Weak Password");
        }
        else{
          setLoadingStatus(true);    
          try {
            const response = await dispatch(
              updateUser({ 
                active: true,
                emailAddress,
                firstname,
                id,
                surname,
                password
              })
            );
        
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
            setTimeout(() => {
              setSuccess(false);
              setLoadingStatus(false);
              setFailed(false);
              setPassword('')
              setEmpty('')
            }, 2000);
          }
        }
      }
    };
    
    let loadingAnimation = 
    <div className='text-center' style={anime}>
      <h5 style={{ color: '#155bb5' }}>
        {loadingStatus && !success  && !failed? 
          "Updating Password, Please wait" :
          loadingStatus && success  && !failed ? 
            "Update Successful" :
            loadingStatus && !success  && failed ? "Update Failed" : ""}
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

      let user

      if(role === "Super Admin"){
        user = (
          <div className="col-12 col-xl-4">
            <div className="card card-plain h-100">
              <div className="card-header pb-0 p-3">
                <div className="row">
                  <div className="col-md-8 d-flex align-items-center">
                    <h6 className="mb-0">Accounts UserManagement</h6>
                  </div>
                </div>
              </div>
              <div className="card-body p-3">
                <hr className="horizontal gray-light my-4" />
                <ul className="list-group">
                  <Link className="list-group-item border-0 ps-0 pt-0 text-sm" to="/signup">Create System Administrator &nbsp;
                    <i className="fas fa-user-edit text-secondary text-sm" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        )
      }
      else{
        user = ""
      }
        return(
            <div>
                <div className="page-header min-height-300 border-radius-xl mt-4" style={{backgroundImage: 'url("https://www.worldatlas.com/r/w768/upload/01/33/22/digital-revolution.jpg")'}}>
    <span className="mask  bg-gradient-primary  opacity-6" />
  </div>
  <div className="card card-body mx-3 mx-md-4 mt-n6">
    <div className="row gx-4 mb-2">
      <div className="col-auto">
        <div className="avatar avatar-xl position-relative">
          <img src="../assets/img/user.png" alt="profile_image" className="w-100 border-radius-lg shadow-sm" />
        </div>
      </div>
      <div className="col-auto my-auto">
        <div className="h-100">
          <h5 className="mb-1">
            {firstname}
          </h5>
          <p className="mb-0 font-weight-normal text-sm">
            {
              role==='Sales Admin'?'Sales Agent': role
            }
          </p>
        </div>
      </div>
    </div>
    <div className="row">
      <div className="row">
        <div className="col-12 col-xl-4">
          <div className="card card-plain h-100">
            <div className="card-header pb-0 p-3">
              <div className="row">
                <div className="col-md-8 d-flex align-items-center">
                  <h6 className="mb-0">Profile Information</h6>
                </div>
              </div>
            </div>
            <div className="card-body p-3">
              <hr className="horizontal gray-light my-4" />
              <ul className="list-group">
                <li className="list-group-item border-0 ps-0 pt-0 text-sm"><strong className="text-dark">Full Name:</strong> &nbsp; {firstname} {surname}</li>
                {/*<li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Mobile:</strong> &nbsp; (263) 123 1234 123</li>*/}
                <li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Email:</strong> &nbsp; {emailAddress}</li>
                {/*<li className="list-group-item border-0 ps-0 text-sm"><strong className="text-dark">Location:</strong> &nbsp; {organisation}</li>*/}
                <li className="list-group-item border-0 ps-0 pb-0">
                  <strong className="text-dark text-sm">Password Reset:</strong> &nbsp;
                  <form >
                    <div style={{ color: 'red', marginBottom: '10px' }}>{empty}</div>
                    <label className="form-label" style={{padding: 0}}>Enter New Password</label>
                    <div className="input-group input-group-dynamic">
                        <input type="text" name="password" 
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setEmpty("");
                          }} 
                          value={password} 
                          className="form-control" 
                          style={{padding: 0}} 
                          placeholder='Enter at least 8 characters'/>
                    </div>
                    {loadingAnimation}
                  <button onClick={handleSubmit} className="btn btn-primary mt-1">Reset</button>
                  </form>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {user}
      </div>
    </div>
  </div>
    </div>
  )
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
}