import axios from "axios";
import React, {Component, useEffect, useState} from "react"
const url = "http://localhost:8082/smart-wifi/adverts/"

class PostAdvert extends Component{
    
    componentDidMount(){
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    state ={
        email: '',
        message: '',
        name: '',
        image: '',
        empty: ''
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        if(this.state.title==='' || this.state.description==='' || this.state.image===''){
            this.setState({
                empty: "Please fill in all the fields"
            })
        }
        else{
            axios.post(url,{
                advertsDTO: {
                    title: this.state.title,
                    description: this.state.description,
                    image: this.state.image
                }
            })
            .then(res=>{
                console.log("Posting Message", res)
                alert(res.data.code)
                window.location = '/adverts'
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

    onImageChange = event => {
        if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          this.setState({
            image: URL.createObjectURL(img)
          });
        }
    };
    render(){
    
    return(
        <>
<div className="row">
    <div className="p-4">
        <form onSubmit={this.handleSubmit}>
            <div style={{color: 'red', marginBottom: '10px'}}>{this.state.empty}</div>
            <div className="input-group input-group-dynamic mb-4">
                <label className="form-label">Title</label>
                <input type="text" name="title" onChange={this.handleChange} className="form-control" />
            </div>
            <div className="input-group input-group-dynamic mb-4">
                <label className="form-label">Description</label>
                <input type="text" name="description" onChange={this.handleChange} className="form-control" />
            </div>
            <div className="form-group form-file-upload form-file-multiple">
                <input type="file" name="image" onChange={this.onImageChange} className="inputFileHidden" />
                <div className="input-group">
                    <input value="Advert Image" type="text" className="form-control inputFileVisible" placeholder="" />
                    <span className="input-group-btn">
                    </span>
                </div>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>
    </div>
</div>
        </>
    )
    }
}

export default PostAdvert