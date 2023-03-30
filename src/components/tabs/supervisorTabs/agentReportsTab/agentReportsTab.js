import { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToggleStatus, toggleActions } from "../../../../store/toggle-slice";
import SummarySalesShopAgent from "../../../SalesReport/SummarySalesShopAgent";

export default function AgentReportsTab (){

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
        <div className="col-12">
          <div className="card">
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <SummarySalesShopAgent/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Style1={
  textAlign:"center"
}

const Style2={
  paddingTop: "1rem",
  paddinBottom: "0.5rem"
}