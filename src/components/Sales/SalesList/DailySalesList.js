import {useEffect, useState, useRef} from 'react';
import { useSelector } from 'react-redux';
import { getAllSales, getLoadingStatus } from '../../../store/sales-slice';
import BeatLoader from 'react-spinners/BeatLoader'
import { getAllBusinessPartners } from '../../../store/business-slice';
import DailySalesCard from '../SalesCard/DailySalesCard';
import { useReactToPrint } from 'react-to-print';
import DailyPurchaseReport from '../../SalesReport/DailyPurchaseReport';

const userRole = localStorage.getItem('role')

const DailySalesList = () => {

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: ()=> componentRef.current,
    documentTitle: 'Sales',
    // onAfterPrint: ()=> alert('Printing Completed')
  })

  const today = new Date()
  const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
  console.log("date: ", date)

  const loading = useSelector(getLoadingStatus)
  const [businessPartnerName, setBusinessPartnerName] = useState(`Client's Name`)

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


  const checkDate = (sale) =>{
    let myDate = new Date(sale.dateCreated)
    let currentDate = `${myDate.getDate()}/${myDate.getMonth()+1}/${myDate.getFullYear()}`
    return currentDate
  }

  var count = Object.keys(sales).length
  
  let renderedSales = ''
  if(count>0){
    renderedSales = (
      sales.map((sale, index)=>(
        checkDate(sale) === date?
        <tr key={sale.id}>
          <DailySalesCard data={sale}/>
        </tr>:''
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
      <td colspan={7} className='text-center'><h5 style={{color: '#E91E63'}}>Oops something went wrong. Please refresh page</h5></td>
    </tr>

  return (
    <div> 

      <DailyPurchaseReport/>


      {/*<p className="mb-0 text-sm-end me-5"><span className="text-success text-sm font-weight-bolder" style={{cursor: 'pointer'}} onClick={()=>handlePrint()}>Download pdf </span></p>     
      <table ref={componentRef} className="table align-items-center mb-0">
        <thead>
          <tr>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Order Id</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Quantity</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Amount</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Paying Account</th>
            <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Transaction Date</th>
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

export default DailySalesList;

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
