import {useEffect, useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { getAllNetworkClients } from '../../../store/report-slice';
import { getAllSales, getLoadingStatus } from '../../../store/sales-slice';
import SalesCard from '../SalesCard/DailySalesCard';
import BeatLoader from 'react-spinners/BeatLoader'
import { getAllBusinessPartners } from '../../../store/business-slice';
import BusinessPartnerOptions from '../../BusinessPartner/BusinessPartnerOptions/BusinessPartnerOptions';
import PartnerSalesCard from '../SalesCard/PartnerSalesCard';
import { useReactToPrint } from 'react-to-print';

const userRole = localStorage.getItem('role')

const PartnerSalesList = () => {

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: ()=> componentRef.current,
    documentTitle: 'Sales',
    // onAfterPrint: ()=> alert('Printing Completed')
  })

  const loading = useSelector(getLoadingStatus)
  const [businessPartnerName, setBusinessPartnerName] = useState(`Client's Name`)
  const [businessPartnerId, setBusinessPartnerId] = useState('')

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

  const sales = useSelector(getAllSales)
  const businessPartner = useSelector(getAllBusinessPartners)


  var count = Object.keys(sales).length

  let partnerDrop = ''

  if(count>0){
    partnerDrop = (
      <select className="form-control text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-info">
        <option className="" default>
          Business Partner
        </option>
        {businessPartner.map((bp, index)=>(
          <option key={index}
          onClick={()=>(setBusinessPartnerName(bp.name))}
          >
            {bp.name}
          </option>
        ))}
      </select>
    )
  }
  else{
    partnerDrop = <tr>
      <option colspan={7} className='text-center'><span style={{color: '#0C55AA'}}>No Sales Found</span></option>
    </tr>
  }
  
  let renderedSales = ''
  if(count>0){
    renderedSales = (
      businessPartnerName === `Client's Name`? (
        <tr>
          <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>Please Select Business Partner</h5></td>
        </tr>
      ):(
      sales.map((sale, index)=>(
        <tr key={index}>
          {
            sale.businessPartner.name === businessPartnerName?
              <PartnerSalesCard data={sale}/>:''
          }
        </tr>
      )))
    )
  }
  else{
    renderedSales = <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#0C55AA'}}>No Sales Found</h5></td>
    </tr>
  }

  let errorMsg =  
    <tr>
      <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5></td>
    </tr>

  return (
    <div>   
      <p className="mb-0 text-sm-end me-5"><span className="text-success text-sm font-weight-bolder" style={{cursor: 'pointer'}} onClick={()=>handlePrint()}>Download pdf </span></p>   
      <table ref={componentRef} className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Order Id</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Quantity</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Amount</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Paying Account</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-10 ps-2">
              {partnerDrop}
            </th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Customer Email</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Customer Address</th>
          </tr>
        </thead>
        <tbody>
          {
            loading==='pending'?
            loadingAnimation: 
            loading ==='rejected'?
              errorMsg:  renderedSales
          }
        </tbody>
      </table>
    </div>
  );
}

export default PartnerSalesList;

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
