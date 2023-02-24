import BatchList from "../../../Batches/BatchList/BatchList";

const tabState = localStorage.getItem('tabState')
const userRole = localStorage.getItem('role')

export default function BatchesTab(){

  const refreshPage = () => {
    localStorage.removeItem('tabState')
    userRole === 'Super Admin'? (window.location ='/recharge'):(window.location ='/batch')
  }

  return(

<div className="container-fluid">
  <div className="row">
    <div class="col-12 py-4">    
      <div className="position-relative mt-n4 mx-3 z-index-2 py-4" style={Style2}>
        <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
          <h6 className="text-white text-capitalize ps-3">
            {
              tabState === 'voucher' ? (
                <>
                <ul className="navbar-nav d-lg-block d-none ">
                  <li className="nav-item">
                    <button  className="btn btn-sm mb-0 me-1 bg-gradient-dark"
                        onClick={refreshPage}>
                        <i className="as fa-rotate-left text-light text-sm pb-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit Profile" />
                        Click to go back
                    </button>
                  </li>
                </ul>
                </>
              ):(
                <>
                  Voucher Batch Table
                </>
              )
            }
          </h6>
        </div>
      </div>
      <div className="card-body px-0 pb-2">
        <div className="table-responsive p-0">
          <BatchList/>
        </div>
      </div>
    </div>
  </div>
</div>

        )
}

const Style2={
  paddingTop: "1rem",
  paddinBottom: "0.5rem"
}