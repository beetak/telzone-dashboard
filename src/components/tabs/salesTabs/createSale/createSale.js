import { Component } from "react";
import SalesGenForm from "../../../forms/saleGenForm";
import axios from "axios";
import ShoppingCart from "../../../tables/ShoppingCart";

export default class SalesCreateForm extends Component{


  componentDidMount(){
    this.getCategory()
  }

  state ={
    loadingStatus: '',
    categories: [],
    tabState: '',
    catId: ''
  }

  getCategory = ()=> {
    let url = `http://localhost:8082/smart-wifi/bundle-category/`;
        // let url = `http://localhost:8082/smart-wifi/bundle-category?active=${this.state.toggleStatus}`;
        let setResp = this
        setResp.setState({loadingStatus: 'Loading category information...'})
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
              this.setState({
                loadingStatus: "No Category Found"
              })
            }
            else{
              this.setState({
                categories: data.data,
                category: '',
                loadingStatus: '',
            });
            }
        })
        .catch(err => {
          this.setState({
            loadingStatus: 'Sorry we encountered an error. Please reload page'
          })
        });
  }
    
    render(){

      let cat
      this.state.categories?(
        cat = <ul className="navbar-nav d-lg-block d-none ps-3 pb-2">
                {this.state.categories.map((item, index) => (
                  <div key={item.id} className="btn btn-sm mb-0 me-1 bg-gradient-dark"
                      onClick={()=>this.setState({
                        tabState: item.id,
                        catId: item.id
                      },()=>{
                        console.log("")
                      })}
                    style={Style2}
                  >
                    {item.name}
                  </div>
                ))}
              </ul>
      ):(
        cat = ""
      )
        return(

<div className="container-fluid">
  <ShoppingCart/>
</div>

        )
    }
}

const Style2={
  paddingTop: "0.4rem"
}