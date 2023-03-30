import { useSelector } from "react-redux";
import { getAllClients } from "../../../store/clients-slice";
import './blink.css'
import { useEffect } from "react";
import { getAllNetworks, getLoadingNetwork } from "../../../store/report-slice";
import { getAllLogins, getLoginLoading } from "../../../store/portal-slice";

export default function SalesStats(){

    const clients = useSelector(getAllClients)
    const logins = useSelector(getAllLogins)

    var count = Object.keys(clients).length 
    var count2 = Object.keys(logins).length 

    console.log("count: ", count2)

    const networks = useSelector(getAllNetworks)
    const loading = useSelector(getLoadingNetwork)
    const loginLoading = useSelector(getLoginLoading)

    useEffect(()=>{
    },[loading])

    return (
        <>
        <div className="row">
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-3 pt-2">
                        <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                            <i className="material-icons opacity-10">file_upload</i>
                        </div>
                        <div className="text-end pt-1">
                            <p className="text-sm mb-0 mt-3 text-capitalize">Total Registered Clients</p>
                            {
                                clients? <h5 className="mb-0">{count}</h5>:<h5>Error</h5>
                            }
                        </div>
                    </div>
                    <hr className="dark horizontal my-0" />
                    <div className="card-footer p-3">
                        <p className="mb-0">{/*<span className="text-success text-sm font-weight-bolder" style={{cursor: 'pointer'}} onClick={()=>alert('fffg')}>Download pdf </span>*/}</p>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-3 pt-2">
                        <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                            <i className="material-icons opacity-10">file_upload</i>
                        </div>
                        <div className="text-end pt-1">
                            <p className="text-sm mb-0 mt-3 text-capitalize">Total Portal Logins</p>
                            {
                                logins? <h5 className="mb-0">{count2}</h5>:<h5>Error</h5>
                            }
                        </div>
                    </div>
                    <hr className="dark horizontal my-0" />
                    <div className="card-footer p-3">
                        <p className="mb-0">{/*<span className="text-success text-sm font-weight-bolder" style={{cursor: 'pointer'}} onClick={()=>alert('fffg')}>Download pdf </span>*/}</p>
                    </div>
                </div>
            </div>
            {/*<div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-3 pt-2">
                        <div className="icon icon-lg icon-shape bg-gradient-dark shadow-dark text-center border-radius-xl mt-n4 position-absolute">
                            <i className="material-icons opacity-10">sync_alt</i>
                        </div>
                        <div className="pt-5">
                            <p className="text-sm mb-0 mt-3 text-capitalize">Meraki connection status: {`\t`}
                                <span className='blink_text' style={{color:'#4CAF50'}}><strong>Connected</strong></span>
                            </p>
                            <p className="text-sm mb-0 mt-1 text-capitalize">DB connection status: {`\t`}
                                {
                                    loading==='idle' || loading==='rejected' || loading==='pending' ? <span className='blink_text' style={{color:'red'}}><strong>Disconnected</strong></span>:
                                    <span className='blink_text' style={{color:'#4CAF50'}}><strong>Connected</strong></span>
                                }
                            </p>
                        </div>
                    </div>
                    <div className="card-footer p-2">
                    </div>
                </div>
            </div>*/}
        </div>
        </>
    )
}

const err = {
    paddingTop: "8px",
    color: "red"
}
  
const LogoCentre = {
    width: 150,
    margin: '0 10px'
}
