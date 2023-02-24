import axios from "axios";
import React, {Component} from "react"

const url = "http://localhost:8082/smart-wifi/currency"

class PostData extends Component{
    
    componentDidMount(){
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    state ={
        name: "",
        symbol: "",
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
        if(this.state.name==='' || this.state.symbol===''){
            this.setState({
                empty: "Please fill in all the fields"
            })
        }
        else{
            const isValid = this.nameValidation()
            axios.post(url,{
                name: this.state.name,
                symbol: this.state.symbol
            })
            .then(res=>{
                console.log("Posting data", res)
                alert(res.data.code)
                window.location = '/currency'
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
            <div className="card my-4">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                    <h6 className="text-white text-capitalize ps-3">Create Currency</h6>
                    </div>
                </div>
                <div className="p-4">
                    <form onSubmit={this.handleSubmit}>
                        <div style={{color: 'red', marginBottom: '10px'}}>{this.state.empty}</div>
                        <label className="form-label">Currency Name</label>
                        <div className="input-group input-group-dynamic mb-4">
                            {Object.keys(errors).map((key)=>{
                                return <div key={key}>{errors[key]}</div>
                            })}
                            <input type="text" name="name" onChange={this.handleChange} className="form-control" />
                        </div>
                        <label className="form-label">Currency Symbol</label>
                        <div className="input-group input-group-dynamic mb-4">
                            <input type="text" name="symbol" onChange={this.handleChange} className="form-control" />
                        </div>
                        <button className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
        </>
    )
    }
}

export default PostData