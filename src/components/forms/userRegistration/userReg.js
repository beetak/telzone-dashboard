import axios from "axios";
import React, {Component} from "react"
import voucher_codes from 'voucher-code-generator'

var CryptoJS = require("crypto-js");
const url = "http://localhost:8082/smart-wifi/admin-portal-user/"


// var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

export default class SignUpForm extends Component{

    componentDidMount(){
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getRoles()
    }

    state = {
        length: '',
        count: '',
        users: [],
        roles: [],
        firstname: '',
        email: '',
        surname: '',
        password: '',
        userRole: 'Role',
        roleID: ''
    }

    nameValidation = () => {
        const {name} = this.state;
        let isValid = true;
        const errors = {};
        if(name.trim().length<6){
            errors.nameLength = 'Please fill in this field'
            isValid=false
        }
        this.setState({errors})
        return isValid
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    getRoles = ()=>{
        let setResp = this
        const url = `http://localhost:8082/smart-wifi/role/`; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency
        setResp.setState({loadingStatus: 'Loading vouchers...'})
        axios
            .get(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(({ data }) => {
              var count = Object.keys(data.data).length
              if(count<=0){
                console.log("No roles defined")
              }
              else{
                this.setState({
                  roles: data.data,
              });
              }
            })
            .catch(err => {
              this.setState({
                users: 'Ooops...Apologies, there\'s an error on our side. \n\n Reload page!',
                loadingStatus: "Sorry we encounterd an error, Please refresh page"
              })
            });
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        
            axios.post(url,{
                "adminPortalUsersDTO": {
                    "email_address": this.state.email,
                    "firstname": this.state.firstname,
                    "password": this.state.password,
                    "surname": this.state.surname
                  },
                  "roleID": this.state.roleID,
            })
            .then(res=>{
                window.location = '/signup'
            })
            .catch(err=>{
                console.log(err)
            })
    }
 
    render(){
    return(
        <>                
    <div className="p-4">
        <form>
            <div style={{color: 'red', marginBottom: '10px'}}>{this.state.empty}</div>
            <label className="form-label" style={{marginBottom: '0px'}}>First Name</label>
            <div className="input-group input-group-dynamic mb-4">
                {/*<label className="form-label">length</label>*/}
                <input type="text" name="firstname" onChange={this.handleChange} className="form-control" style={{padding: 0}}/>
            </div>
            <label className="form-label" style={{marginBottom: '0px'}}>Surname</label>
            <div className="input-group input-group-dynamic mb-4">
                {/*<label className="form-label">Count</label>*/}
                <input type="text" name="surname" onChange={this.handleChange} className="form-control"  style={{padding: 0}}/>
            </div>
            <label className="form-label" style={{marginBottom: '0px'}}>Email Address</label>
            <div className="input-group input-group-dynamic mb-4">
                {/*<label className="form-label">length</label>*/}
                <input type="text" name="email" onChange={this.handleChange} className="form-control" style={{padding: 0}}/>
            </div>
            <label className="form-label" style={{marginBottom: '0px'}}>Password</label>
            <div className="input-group input-group-dynamic mb-4">
                {/*<label className="form-label">length</label>*/}
                <input type="text" name="password" onChange={this.handleChange} className="form-control" style={{padding: 0}}/>
            </div>
            {/* Currency dropdown */}
            <div className="dropdown">
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {this.state.userRole}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {this.state.roles.map((cur, index) => (
                    <li key={cur.id}>
                        <a  className="dropdown-item" 
                            onClick={(e)=>{
                                e.preventDefault()
                                this.setState({
                                    roleID: cur.id,
                                    userRole: cur.role
                                })
                            }}>
                            {cur.role}
                        </a>
                    </li>
                ))}
                </ul>
            </div>
            <button onClick={this.handleSubmit} className="btn btn-primary">Create</button>
        </form>
    </div>
                   
        </>
    )
    }
}

const Style1={
    textAlign:"center"
}