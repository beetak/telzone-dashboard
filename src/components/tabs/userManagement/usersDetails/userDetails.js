import { Component } from "react";
import UserList from "../../../User/UserList/UserList";
import UserPost from "../../../User/UserPost/UserPost";

export default class UserDetails extends Component{

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
                <h6 className="text-white text-capitalize ps-3">Users Table</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <UserList/>
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
                <h6 className="text-white text-capitalize ps-3">Create User</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <UserPost/>
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