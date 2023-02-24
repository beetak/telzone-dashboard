import { useState, useEffect } from "react";
import axios from "axios"
import { fetchAsyncNetworkReports, fetchAsyncOrganisationReports, getAllNetworks, getAllOrganisations } from "../../../store/report-slice";
import OrganisationsDropdown from "../../Organisations/OrganisationsDropdown/OrganisationsDropdown";
import { useDispatch, useSelector } from "react-redux";
import NetworkDropdown from "../../Networks/NetworkDropdown/NetworkDropdown";

export default function TopNavigation (props) {

  const [organisationId, setOrganisationId] = useState('')
  const [organisationActioned, setOrganisationActioned] = useState('')
  const [networkId, setNetworkId] = useState('')
  const [networkActioned, setNetworkActioned] = useState('')

  const handleChange = () => {
    localStorage.clear()
    window.location = '/'
  }

  const getOrganisation =(id, name)=>{
    setOrganisationId(id)
    setOrganisationActioned(name)
  }

  const getNetwork =(id, name)=>{
    setNetworkId(id)
    setNetworkActioned(name)
  }

  const organisations = useSelector(getAllOrganisations)

  let renderedOrganisation = ''
  renderedOrganisation = organisations ? (
    organisations.map((organisation, index)=>(
      <tr key={index}>
        <OrganisationsDropdown data={organisation} setOrganisation={getOrganisation}/>
      </tr>
    ))
  ):(<div><h1>Error</h1></div>)

  const networks = useSelector(getAllNetworks)

  let renderedNetworks = ''
  renderedNetworks = networks ? (
    networks.map((network, index)=>(
      <tr key={index}>
        <NetworkDropdown data={network} setNetwork={getNetwork}/>
      </tr>
    ))
  ):(<div><h1>Error</h1></div>)


        return(
            
<nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" navbar-scroll="true">
  <div className="container-fluid py-1 px-3">
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
        <li className="breadcrumb-item text-sm"><a className="opacity-5 text-dark" href="javascript:;">Pages</a></li>
        <li className="breadcrumb-item text-sm text-dark active" aria-current="page">{props.title}</li>
      </ol>
      <h6 className="font-weight-bolder mb-0">{props.title}</h6>
    </nav>
    <div className="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
        <li className="nav-item dropdown pe-2 d-flex align-items-center">
          <a href="javascript:;" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-globe cursor-pointer" />
            &nbsp;Organisations
          </a>
          <ul className="dropdown-menu  dropdown  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
            {renderedOrganisation}
          </ul>
        </li>
        <li className="nav-item dropdown pe-2 d-flex align-items-center">
          <a href="javascript:;" className="nav-link text-body p-0" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-wifi cursor-pointer" />
            &nbsp;Networks
          </a>
          <ul className="dropdown-menu  dropdown  px-2 py-3 me-sm-n4" aria-labelledby="dropdownMenuButton">
            {renderedNetworks}
          </ul>
        </li>
      <div className="ms-md-auto pe-md-3 d-flex align-items-center">
        <ul className="navbar-nav  justify-content-end">
          <li className="nav-item d-flex align-items-center">
            <a href="javascript:;" className="nav-link text-body font-weight-bold px-0">
              <i className="fa fa-user me-sm-1" />
              <span className="d-sm-inline d-none"  onClick={handleChange}>Sign Out</span>
            </a>
          </li>
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a href="javascript:;" class="nav-link text-body p-0" id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
                <i class="sidenav-toggler-line"></i>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
        )
    }