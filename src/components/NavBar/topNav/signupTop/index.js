import { Component } from "react";
import { Link } from "react-router-dom";

class AuthenticationTop extends Component{
    render(){
        return(
<div className="container position-sticky z-index-sticky top-0">
  <div className="row">
    <div className="col-12">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow position-absolute my-3 py-2 start-0 end-0 mx-4">
        <div className="container-fluid ps-2 pe-0">
          <Link to="/dashboard" className="navbar-brand font-weight-bolder ms-lg-0 ms-3 ">
            Telone Private Limited
          </Link>
          <button className="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon mt-2">
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </span>
          </button>
        </div>
      </nav>
      {/* End Navbar */}
    </div>
  </div>
</div>

        )
    }
}

export default AuthenticationTop