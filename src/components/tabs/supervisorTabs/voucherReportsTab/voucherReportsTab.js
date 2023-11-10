import { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getToggleStatus, toggleActions } from "../../../../store/toggle-slice";
import SummarySalesShopAgent from "../../../SalesReport/SummarySalesShopAgent";
import VoucherReport from "../../../Vouchers/VoucherReport/VoucherReport";

export default function VoucherReportsTab (){

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
            <div className=" px-0 pb-2">
              <div className="table-responsive p-0">
                <VoucherReport/>
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