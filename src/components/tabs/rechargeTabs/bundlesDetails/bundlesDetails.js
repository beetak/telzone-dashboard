import { useDispatch, useSelector } from "react-redux";
import { getToggleStatus, toggleActions } from "../../../../store/toggle-slice";
import BundleList from "../../../Bundles/BundleList/BundleList";

export default function RechargeBundleDetails(){

  const toggleStatus  = useSelector(getToggleStatus)
  const dispatch = useDispatch()

  const changeStatus = () => {
    console.log(toggleStatus)
    dispatch(
        toggleActions.changeState({
          status: !toggleStatus
        })
    )
  }
  return(
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 py-4">
          <div className="card my-4">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                <div className="row">
                  <div className="col-9">
                    <h6 className="text-white text-capitalize ps-3">Bundles table</h6>
                  </div>
                  <div className="col-3 form-check form-switch d-flex align-items-center">
                    <input className="form-check-input" type="checkbox" onClick={changeStatus} />
                    <label className="form-check-label mb-0 ms-2" style={{color: 'white'}}>{toggleStatus?"Show Inactive":"Show Active"}</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <BundleList/>
              </div>
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