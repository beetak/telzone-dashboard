import axios from "axios";
import React, {Component} from "react"

const url = "http://localhost:8082/smart-wifi/business_partner/"

export default class CreateBusinessPartner extends Component{
    
    componentDidMount(){
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    state ={
        name: "",
        address: "",
        email: "",
        phone:"",
        errors: {},
        empty: ''
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

    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.state.name==='' || this.state.address==='' || this.state.email==='' || this.state.phone===''){
            this.setState({
                empty: "Please fill in all the fields"
            })
        }
        else{
            const isValid = this.nameValidation()
            axios.post(url,{
                "businessPartner": {
                    "active": true,
                    "businessAddress": this.state.address,
                    "email": this.state.email,
                    "name": this.state.name,
                    "phoneNumber": this.state.phone
                }
            })
            .then(res=>{
                console.log("Posting data", res)
                alert(res.data.code)
                window.location = '/business-partner'
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
        const {name, errors} = this.state;
    return(
        <>
<div className="row">
  <div className="col-12">
    <div className="card">
    <div className="p-4">
        <form onSubmit={this.handleSubmit}>
            <div style={{color: 'red', marginBottom: '10px'}}>{this.state.empty}</div>
            <label className="form-label">Partner's Name</label>
            <div className="input-group input-group-dynamic mb-4">
                {Object.keys(errors).map((key)=>{
                    return <div key={key}>{errors[key]}</div>
                })}
                <input type="text" name="name" onChange={this.handleChange} className="form-control" />
            </div>
            <label className="form-label">Business Address</label>
            <div className="input-group input-group-dynamic mb-4">
                <input type="text" name="address" onChange={this.handleChange} className="form-control" />
            </div>
            <label className="form-label">Email Address</label>
            <div className="input-group input-group-dynamic mb-4">
                <input type="text" name="email" onChange={this.handleChange} className="form-control" />
            </div>
            <label className="form-label">Phone Number</label>
            <div className="input-group input-group-dynamic mb-4">
                <input type="text" name="phone" onChange={this.handleChange} className="form-control" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
    </div></div></div>
        </>
    )
    }
}
