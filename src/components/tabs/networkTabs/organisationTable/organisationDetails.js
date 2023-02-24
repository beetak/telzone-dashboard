import { Component } from "react";
import OrganisationsList from "../../../Organisations/OrganisationsList/OrganisationsList";

export default class OrganisationsDetails extends Component{

    render(){
        return(

<div className="container-fluid">
  <div className="row">
    <div className="col-12 py-4">
      <div className="card my-4">
        <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
          <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
            <h6 className="text-white text-capitalize ps-3">Organisations</h6>
          </div>
        </div>
        <div className="card-body px-0 pb-2">
          <div className="table-responsive p-0">
            <OrganisationsList/>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        )
    }
}

const Style2={
  paddingTop: "1rem",
  paddinBottom: "0.5rem"
}