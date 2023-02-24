import { useSelector } from "react-redux";
import { getClientsNumber, getDownStreamStats, getTotalStreamStats, getUpStreamStats } from "../../../store/statistics-slice";

export default function SalesStats(){

    const upStreamStats = useSelector(getUpStreamStats)
    const downStreamStats = useSelector(getDownStreamStats)
    const totalStreamStats = useSelector(getTotalStreamStats)
    const clients = useSelector(getClientsNumber)

    const downloadSalesReport = () => {
        
    } 

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
                            <p className="text-sm mb-0 mt-3 text-capitalize">Daily Sales</p>
                            {
                                upStreamStats? <h5 className="mb-0">{(Math.round(upStreamStats * 100) / 100).toFixed(2)} mb</h5>:<h5>Error</h5>
                            }
                        </div>
                    </div>
                    <hr className="dark horizontal my-0" />
                    <div className="card-footer p-3">
                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder" style={{cursor: 'pointer'}} onClick={()=>alert('fffg')}>Download pdf </span></p>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-3 pt-2">
                        <div className="icon icon-lg icon-shape bg-gradient-primary shadow-primary text-center border-radius-xl mt-n4 position-absolute">
                            <i className="material-icons opacity-10">file_download</i>
                        </div>
                        <div className="text-end pt-1">
                            <p className="text-sm mb-0 mt-3 text-capitalize">Daily Data DownStream</p>
                            {
                                downStreamStats? <h5 className="mb-0">{(Math.round(downStreamStats * 100) / 100).toFixed(2)} mb</h5>:<h5>Error</h5>
                            }
                        </div>
                    </div>
                    <hr className="dark horizontal my-0" />
                    <div className="card-footer p-3">
                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+0% </span>than last month</p>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-3 pt-2">
                        <div className="icon icon-lg icon-shape bg-gradient-success shadow-success text-center border-radius-xl mt-n4 position-absolute">
                            <i className="material-icons opacity-10">swap_vert</i>
                        </div>
                        <div className="text-end pt-1">
                            <p className="text-sm mb-0 mt-3 text-capitalize">Total Day Usage</p>
                            {
                                totalStreamStats? <h5 className="mb-0">{(Math.round(totalStreamStats * 100) / 100).toFixed(2)} mb</h5>:<h5>Error</h5>
                            }
                        </div>
                    </div>
                    <hr className="dark horizontal my-0" />
                    <div className="card-footer p-3">
                    <p className="mb-0"><span className="text-danger text-sm font-weight-bolder" style={{color: 'blue'}}>+0%</span> than yesterday</p>
                    </div>
                </div>
            </div>
            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                <div className="card">
                    <div className="card-header p-3 pt-2">
                        <div className="icon icon-lg icon-shape bg-gradient-secondary shadow-secondary text-center border-radius-xl mt-n4 position-absolute">
                            <i className="material-icons opacity-10">people</i>
                        </div>
                        <div className="text-end pt-1">
                            <p className="text-sm mb-0 mt-3 text-capitalize">Daily Users</p>
                            {
                                clients? <h5 className="mb-0">{clients} visitors</h5>:<h5>Error</h5>
                            }
                        </div>
                    </div>
                    <hr className="dark horizontal my-0" />
                    <div className="card-footer p-3">
                        <p className="mb-0"><span className="text-success text-sm font-weight-bolder">+0% </span>than last week</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

const err = {
    paddingTop: "8px",
    color: "red"
}