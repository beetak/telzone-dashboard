import { render } from "@testing-library/react";
import axios from "axios";
import React, {Component, useEffect, useState} from "react"

const img = "https://play-lh.googleusercontent.com/4FfrmbztwbxUq-DdtdGoFH5jL_5aOpXsVbxl8aoi0lcVLOK_HNDSFRTqv_tdjKj5e3c"
const url = "http://localhost:8082/smart-wifi/bundle/"
const currencyUrl = "http://localhost:8082/smart-wifi/currency/"
const categoryUrl = "http://localhost:8082/smart-wifi/bundle-category/"
const groupPolicyUrl = "//http://telzonewifi.telone.co.zw:8082/api/networks/N_575897802350046053/groupPolicies"

class PackageCreation extends Component{

    componentDidMount(){
        this.getCurrency()
        this.getCategory()
        this.getGroupPolicy()
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    

    state ={
        currency: [],
        category: [],
        groups: [],
        currencyState: 'Currency',
        categoryState: 'Product Type',
        currencyID: '',
        categoryID: '',
        product: {
            active: true,
            description: "",
            name: "",
            picture: '',
            price: "",
            currencyMsg: '',
            categoryMsg: '',
        },
        empty: '',
        currentState: 'Policy Type',
        policyLoading: '',
        policyID: ''
    }

    getGroupPolicy = () => {
        let setResp = this
        setResp.setState({policyLoading: 'Loading...'})
        axios
            .get(groupPolicyUrl, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(({ data }) => {
                this.setState({
                    groups: data,
                    policyLoading: ''
                });
            })
            .catch(err => {
                this.setState({
                users: 'Oops...Apologies, there\'s an error on our side. \n\n Reload page!'
                })
            });
      }

    
    handleSubmit = (e) =>{
        e.preventDefault()
        if(this.state.policyID==='' || this.state.name==='' || this.state.description==='' || this.state.price===''){
            this.setState({
                empty: "Please fill in all the fields"
            })
        }
        else{
            axios.post(url,{
                bundle: {
                    description: this.state.description,
                    groupPolicyId: this.state.policyID,
                    id: 1,
                    image: this.state.picture,
                    name: this.state.name,
                    price: this.state.price
                },
                bundleCategoryID: this.state.categoryID,
                currencyID: this.state.currencyID,
                userID: 1
            })

            .then(res=>{
                window.location = '/packages'
            })
            .catch(err=>{
                console.log(err)
                alert(err)
            })
            this.refreshPage()
        }
    }

    handleChange = (e) =>{
        this.setState(
          {
            [e.target.name] : e.target.value
          }
        )
    }

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({
            picture: URL.createObjectURL(img)
          });
        }
      };

    getCurrency =()=>{
        axios
        .get(currencyUrl, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }

        })
        .then(({ data }) => {
            this.setState({
                currency: data.data,
                currencyMsg: ''
            });
        })
        .catch(err => {
            this.setState({
                currencyMsg: 'No Currencies Found'
            })
        });
    }

    getCategory =()=>{
        axios
        .get(categoryUrl, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(({ data }) => {
            this.setState({
                category: data.data,
                categoryMsg: ''
            });
        })
        .catch(err => {
            this.setState({
                categoryMsg: 'No Categories'
            })
        });
    }

    render(){
    
    return(
        <>
<div className="row">
  <div className="col-12">
    <div className="card my-4">
    <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
      <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
          <h6 className="text-white text-capitalize ps-3"><i className='fa fa-plus-circle' style={{fontSize: "15px", paddingRight: "10px"}}/>Create Bundles</h6>
        </div>
      </div>
    <div className="p-4">
        <form >
            <div style={{color: 'red', marginBottom: '10px'}}>{this.state.empty}</div>
            <label className="form-label" style={{padding: 0}}>Bundle Name</label>
            <div className="input-group input-group-dynamic">
                <input type="text" name="name" onChange={this.handleChange} className="form-control" style={{padding: 0}}/>
            </div>
            <label className="form-label" style={{padding: 0}}>Price</label>
            <div className="input-group input-group-dynamic">
                <input type="text" name="price" onChange={this.handleChange} className="form-control" style={{padding: 0}}/>
            </div>
            <label className="form-label" style={{padding: 0}}>Description</label>
            <div className="input-group input-group-dynamic"  style={{marginBottom: '10px'}}>
                <input type="text" name="description" onChange={this.handleChange} className="form-control" style={{padding: 0}}/>
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
                    {this.state.currencyState}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {this.state.currency.map((cur, index) => (
                    <li>
                        <a  className="dropdown-item" 
                            onClick={(e)=>{
                                e.preventDefault()
                                this.setState({
                                    currencyID: cur.id,
                                    currencyState: cur.name
                                })
                            }}>
                            {cur.name}
                        </a>
                    </li>
                ))}
                </ul>
            </div>

            {/* GroupPolicy dropdown */}
            <div className="dropdown">
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {this.state.currentState}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {/*this.state.groups.map((cur, index) => (
                        <li>
                            <a  className="dropdown-item" 
                                onClick={(e)=>{
                                    e.preventDefault()
                                    this.setState({
                                        policyID: cur.groupPolicyId,
                                        currentState: cur.name
                                    })
                                }}>
                                {cur.name} {cur.id}
                                {this.state.policyLoading}
                            </a>
                        </li>
                            ))*/}
                </ul>
            </div>

            {/* Category dropdown */}
            <div className="dropdown">
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {this.state.categoryState}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {this.state.category.map((item, index) => (
                    <li>
                        <a  className="dropdown-item" 
                            onClick={(e)=>{
                                e.preventDefault()
                                this.setState({
                                    categoryID: item.id,
                                    categoryState: item.name
                                })
                            }}>
                            {item.name}
                        </a>
                    </li>
                ))}
                </ul>
            </div>

           <div className="form-group form-file-upload form-file-multiple">
                <input type="file" name="picture" onChange={this.onImageChange} className="inputFileHidden" />
                <div className="input-group">
                    <input type="text" className="form-control inputFileVisible" placeholder="Package Image" />
                    <span className="input-group-btn">
                    </span>
                </div>
            </div>

            
            <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
        </form>
    </div>
    </div></div></div>
        </>
    )
    }
}

export default PackageCreation

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}