import axios from "axios";
import React, {Component} from "react"

const url = "http://localhost:8082/smart-wifi/bundleCategory/"

class CategoryForm extends Component{
    componentDidMount(){
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    state = {
        name: '',
        description: '',
        empty: '',
        groups: [],
        duration: 'Life Span'
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.name==='' || this.state.description===''){
            this.setState({
                empty: "Please fill in all the fields"
            })
        }
        else{
            axios.post(url,{
                bundleCategory: {
                    dateCreated: "2022-08-17T13:16:50.082Z",
                    name: this.state.name,
                    duration: this.state.duration,
                    description: this.state.description
                },
                userID: 1
            })
            .then(res=>{
                window.location = '/packages'
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render(){
    return(
        <>
    <div className="p-4">
        <form onSubmit={this.handleSubmit}>
            <div style={{color: 'red', marginBottom: '10px'}}>{this.state.empty}</div>
            <label className="form-label">Category Name</label>
            <div className="input-group input-group-dynamic mb-4">
                <input type="text" name="name" onChange={this.handleChange} className="form-control" />
            </div>
            <label className="form-label">Category Description</label>
            <div className="input-group input-group-dynamic mb-4">
                <input type="text" name="description" onChange={this.handleChange} className="form-control" />
            </div>
            <label className="form-label" style={{padding: 0}}>Bundle Life Span</label>
            {/* Currency dropdown */}
            <div className="dropdown">
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {this.state.duration}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                        <a  className="dropdown-item" 
                            onClick={(e)=>{
                                e.preventDefault()
                                this.setState({
                                    duration: 3600
                                })
                            }}>
                            1 Hour
                        </a>
                    </li>
                    <li>
                        <a  className="dropdown-item" 
                            onClick={(e)=>{
                                e.preventDefault()
                                this.setState({
                                    duration: 86400
                                })
                            }}>
                            1 Day
                        </a>
                    </li>
                    <li>
                        <a  className="dropdown-item" 
                            onClick={(e)=>{
                                e.preventDefault()
                                this.setState({
                                    duration: 604800
                                })
                            }}>
                            1 Week
                        </a>
                    </li>
                    <li>
                        <a  className="dropdown-item" 
                            onClick={(e)=>{
                                e.preventDefault()
                                this.setState({
                                    duration: 2592000
                                })
                            }}>
                            1 Month
                        </a>
                    </li>
                </ul>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
        </>
    )
    }
}

export default CategoryForm