import axios from "axios";
import React, {Component} from "react"

const urlorg = "//http://telzonewifi.telone.co.zw:8082/smart-wifi/api/organizations"
const url = "//http://telzonewifi.telone.co.zw:8082/api/organizations/1182283/networks"

class CreateNetwork extends Component{
    
    componentDidMount(){
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getOrganisations()
    }
    state ={
        name: "",
        errors: {},
        empty: '',
        organisations: [],
        organisationName: ''
    }

    getOrganisations = () => {
        axios
        .get(urlorg,{
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(({data})=>{
            this.setState({
                organisations: data
            });
        })
        .then(err=>{
            console.log(err)
        })
    }

    nameValidation = () => {
        const {name} = this.state;
        let isValid = true;
        const errors = {};
        if(name.trim().length<1){
            errors.nameLength = 'Please fill in this field'
            isValid=false
        }
        this.setState({errors})
        return isValid
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.state.name===''){
            // this.setState({
            //     empty: "Please fill in this field"
            // })
            alert('ATTENTION\n\nComplete All Fields!')
            return;
        }
        // else{
            // const isValid = this.nameValidation()
            alert(this.state.name)

            fetch(url, {
                method: "POST",
                body: JSON.stringify({name: this.state.name, organisationId: 1182283, type: "appliance"}),
                headers: {"Content-type": "application/json"}
            })
            .then(response => response.json()
            )
            .then(json => (
                alert('Processed'),
                window.location="/organisations"
            ))
            .catch(err => {
                alert(err)
            })
        }
    // }

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
    <div className="card my-4">
        <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
            <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3"  style={Style2}>
            <h6 className="text-white text-capitalize ps-3">Create Network</h6>
            </div>
        </div>
            <div className="p-4">
                <form onSubmit={this.handleSubmit}>
                    <div style={{color: 'red', marginBottom: '10px'}}>{this.state.empty}</div>
                    <label className="form-label">Network Name</label>
                    <div className="input-group input-group-dynamic mb-4">
                        {Object.keys(errors).map((key)=>{
                            return <div key={key}>{errors[key]}</div>
                        })}
                        <input type="text" name="name" onChange={this.handleChange} className="form-control" />
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
                {this.state.organisationName}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.state.organisations.map((cur, index) => (
                <li>
                    <a  className="dropdown-item" 
                        onClick={(e)=>{
                            e.preventDefault()
                            this.setState({
                                organisationId: cur.id,
                                organisationName: cur.name
                            })
                        }}>
                        {cur.name}{cur.id}
                    </a>
                </li>
            ))}
            </ul>
        </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    </div>
</div>
        </>
    )
    }
}

export default CreateNetwork

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
  }