import React from "react";
import { useSelector } from "react-redux";
import BeatLoader from 'react-spinners/BeatLoader'
import FocCard from "../FocCard/FocCard";
import { getAllFocs, getLoadingStatus } from "../../../store/foc-slice";
const userRole = localStorage.getItem('role')

const FocList = () => {

    const focs = useSelector(getAllFocs)
    console.log("the data ",focs)

    let renderedBundles = ''
    renderedBundles = focs ? (
        focs.map((foc, index)=>(
        <tr key={index}>
            <FocCard data={foc} index={index}/>
        </tr>
        ))
    ):(<div><h1>Error</h1></div>)

    const loading = useSelector(getLoadingStatus)

  let loadingAnimation = 
  <tr className='' style={anime}>
    <td colspan={6}>
      <BeatLoader
        color={'#055bb5'}
        loading={loading}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </td>
  </tr>

  return (
    <>
        <div className="col-12 p-4">
            <div className="card my-4">
                <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                    <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                        <h6 className="text-white text-capitalize ps-3">FOC Tracking</h6>
                    </div>
                </div>
                <div className="card-body px-0 pb-2">
                    <div className="table-responsive p-0">
                        <p style={Style1}></p>
                        <table className="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{padding:0}}>Quantity</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7  ">Customer Name</th>
                                    <th className="text-end text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Created By</th>
                                    <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date Created</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-end opacity-7 ">Current User</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ">Last Modified</th>
                                    <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ">Status</th>
                                    {
                                        userRole !== 'Sales Admin' && <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ">Action</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {loading==='pending'?
                                    loadingAnimation: renderedBundles
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default FocList;

const Style1={
    textAlign:"center"
}

const Style2 ={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
}
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "blue",
};
  
const anime = {
    textAlign: 'center', 
    justifyContent: 'center', 
    alignItems: 'center', 
    width: '100%', 
    height: '10vh'
}
  