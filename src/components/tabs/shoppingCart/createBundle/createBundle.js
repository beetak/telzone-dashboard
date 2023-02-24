import { Component } from "react";
import CategoryTable from "../../../tables/categoryTable";
import CategoryForm from "../../../forms/category/categoryForm";

export default class CategoryCreate extends Component{

    render(){
        return(

<div className="container-fluid">
  <div className="row">
    <div class="col-lg-8 py-4">                
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                <h6 className="text-white text-capitalize ps-3">Bundle Categories</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <CategoryTable/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 py-4">                
      <div className="row">
        <div className="col-12">
        <div className="card my-4">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                <h6 className="text-white text-capitalize ps-3"><i className='fa fa-plus-circle' style={{fontSize: "15px", paddingRight: "10px"}}/>Create Categories</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <CategoryForm/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        )
    }
}

const Style1={
  textAlign:"center"
}

const Style2={
  paddingTop: "1rem",
  paddinBottom: "0.5rem"
}