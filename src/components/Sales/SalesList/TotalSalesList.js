import {useEffect, useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { getAllSales, getLoadingStatus } from '../../../store/sales-slice';
import BeatLoader from 'react-spinners/BeatLoader'
import { getAllBusinessPartners } from '../../../store/business-slice';
import TotalSalesCard from '../SalesCard/TotalSalesCard';
import { useReactToPrint } from 'react-to-print';
import TotalPurchaseReport from '../../SalesReport/TotalPurchaseReport';

const userRole = localStorage.getItem('role')

const TotalSalesList = () => {

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

  var count = Object.keys(sales).length
  
  let renderedSales = ''
  if(count>0){
    renderedSales = (
      sales.map((sale, index)=>(
        <tr key={index}>
          <TotalSalesCard data={sale}/>        
        </tr>
      ))
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
      <TotalPurchaseReport/>
      {/*<p className="mb-0 text-sm-end me-5"><span className="text-success text-sm font-weight-bolder" style={{cursor: 'pointer'}} onClick={()=>handlePrint()}>Download pdf </span></p>  
      <table ref={componentRef} className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Order Id</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Quantity</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Amount</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Paying Account</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Customer Name</th>
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
        </table>*/}
    </div>
  );
}

export default TotalSalesList;

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
