import axios from "axios";
import React, {Component} from "react"

const url = "http://localhost:8082/smart-wifi/currency/"

export default class CurrencyForm extends Component{
    componentDidMount(){
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    state = {
        name: '',
        symbol: '',
        empty: '',
        groups: []
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.state.name==='' || this.state.symbol===''){
            this.setState({
                empty: "Please fill in all the fields"
            })
        }
        else{
            axios.post(url,{
                currency: {
                    dateCreated: "2022-08-17T13:16:50.082Z",
                    name: this.state.name,
                    symbol: this.state.symbol
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
            <label className="form-label">Currency Name</label>
            <div className="input-group input-group-dynamic mb-4">
                <input type="text" name="name" onChange={this.handleChange} className="form-control" />
            </div>
            <label className="form-label">Currency Symbol</label>
            <div className="input-group input-group-dynamic mb-4">
                <input type="text" name="symbol" onChange={this.handleChange} className="form-control" />
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
        </>
    )
    }
}
