import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { Button, Modal } from 'react-bootstrap';
import { fetchAsyncSMSVoucher, getAllSales, getLoadingStatus } from '../../../store/sales-slice';
import FailedAnimation from '../../FailedAnimation/FailedAnimation';
import TickAnimation from '../../TickAnimation/TickAnimation';
import jsPDF from 'jspdf'
import "jspdf-autotable";
import { voucherVerification } from '../../../store/batch-slice';
const userRole = localStorage.getItem('role')
const img = "assets/img/telonelogo.png"

const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const shopName = localStorage.getItem('shopName')

const SMSVerification = () => {

  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [loadingError, setLoadingError] = useState(false)
  const [loadingSuccess, setLoadingSuccess] = useState(false)
  const [loadingFail, setLoadingFail] = useState(false)
  const [voucherCodes, setVoucherCodes] = useState([])

  const searchStatus = useSelector(getLoadingStatus)

  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setVoucherCodes([])
    dispatch(fetchAsyncSMSVoucher(
        phoneNumber
    )).then((response)=>{
      console.log("my resp: ", response)
        if(response.payload.code === "NOT_FOUND"){
          setLoadingFail(true)
        }
        else if(response.payload.code === "SUCCESS"){
          setLoadingSuccess(true)
          setVoucherCodes(response.payload.data)
        }
        else{
          setLoadingError(true)
        }
    }).finally(()=>{
      setTimeout(()=>{
        setLoading(false)
        setLoadingFail(false)
        setLoadingError(false)
        setLoadingSuccess(false)
      },5000)
    })
  };
  const clearVouchers = (e)=>{
    e.preventDefault()
    setVoucherCodes([])
  }

  const printVouchers = (e) => {
    e.preventDefault()
    const title = "My Awesome Report";
    const headers = [["","Name", "Voucher Code"]]; 
    
    var doc = new jsPDF()

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    var today = new Date(),
    curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateString = new Date(current);
    const formattedDate = dateString.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    // var doc = new jsPDF('potrait', 'px', 'a6', 'false')
    const pageHeight = 170 + (voucherCodes.length * 12); // Calculate the required height based on voucherDetails length
    var doc = new jsPDF('portrait', 'px', [pageHeight, 160], 'false');
    // var doc = new jsPDF('potrait', 'px', [280,160], 'false')
    doc.addImage(img, 'PNG', 15, 5, 70, 25)
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)
    doc.text(15, 40, 'Headquarters: Runhare House')
    doc.setFont('Times New Roman', 'regular')
    doc.setFontSize(10)
    doc.setTextColor(0,0,0);
    doc.text(15, 55, '107 Kwame Nkrumah Avenue, Harare, \nZimbabwe\nP.O Box CY 331, Causeway, Harare, \nZimbabwe\n24 Hour Call Center - +263 0242 700950')
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(0,0,0);
    doc.text(15, 105, 'Client Details')
    doc.setFont('Times New Roman', 'medium')
    doc.setFontSize(10)
    doc.setTextColor(0,0,0);
    doc.text(15, 115, 'Assignee:  '+phoneNumber)
    // doc.setFont('Times New Roman', 'bold')
    // doc.setFontSize(12)
    // doc.setTextColor(0,0,0);
    // doc.text(15, 125, 'Receipt Details')
    // doc.setFont('Times New Roman', 'medium')
    // doc.setFontSize(10)
    // doc.setTextColor(0,0,0);
    // // doc.text(15, 160, 'Receipt Number: ' + orderID )
    // doc.text(15, 150, 'Date: '+ formattedDate )
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(0,0,0);
    doc.text(15, 128, 'Cashier Details')
    doc.setFont('Times New Roman', 'medium')
    doc.setFontSize(10)
    doc.setTextColor(0,0,0);
    doc.text(15, 138, 'Issued By: ' +firstname+ " "+surname+ '\nShop: ' + shopName + "\n")

    doc.setTextColor(0,0,0);
    doc.setFontSize(10)
    doc.text(15, 160, 'Bundle: TCFL STUDENTS WI-FI\n')

    voucherCodes.map((item, i)=>{
      doc.text(
        15,
        170 + i * 12,
        'PIN: ' + item
      )
    });
    doc.save('invoice.pdf')
  }

  let loadingAnimation =
    <div className='text-center' style={anime}>
      <h5 style={{color: '#055bb5', overflow: 'hidden'}}>{
        loading&&!loadingFail&&!loadingError&&!loadingSuccess?"Proccessing Request":loadingError?<FailedAnimation message="Request Failed"/>:loadingSuccess?<TickAnimation message="Vouchers Found"/>:<FailedAnimation message="No Vouchers Found"/>}</h5>
      {
        loading&&!loadingSuccess&&loadingFail&&loadingError&&
        <BeatLoader
          color={'#055bb5'}
          loading={loading}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      }
    </div>


const handleVerification = async (item) => {
  // setIsOpen(true)
  dispatch(voucherVerification(
    {
      voucherCode: item
    }
  )).then((response)=>{
      console.log("my respo", response)
    
  })
};
  
  let renderedVouchers = ''
  if(voucherCodes.length > 0){
    renderedVouchers =
      <div className="align-middle text-center">
        {
            voucherCodes.map((item, index)=>{
              return <>
                <span class="badge badge-sm bg-gradient-success w-50 p-2 mt-2" style={{cursor: 'pointer'}} onClick={()=>handleVerification(item)}>{item}</span><br/>
              </>
            })          
        }
          <button onClick={printVouchers} className="btn btn-info my-2">Print</button>
          <button onClick={clearVouchers} className="btn btn-danger my-2 ms-2">Clear</button>
      </div>
  }
  else{
    renderedVouchers = <div className="align-middle text-center">Check Vouchers</div>
  }

  return (
    <>
      <div className="col-md-6 pb-2">
        <div className="card h-100">
          <div className="card-header px-3">
            <div className="row">
              <div className="col-md-12">
                <h6 className="mb-0">SMS Voucher Query</h6>
              </div>
            </div>
          </div>
          <div className="card-body  p-3">
            <div className="p-4">
              <form >
                <label className="form-label">Mobile Number</label>
                <div className="input-group input-group-dynamic mb-4">
                  <input type="text" name="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-control" placeholder='Enter Mobile Number'/>
                </div>
                {
                  loading ?
                    loadingAnimation : ""
                }
                {renderedVouchers}
                <button onClick={handleSubmit} className="btn btn-info my-4">Verify</button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Activate / Deactivate Modal */}

    </>
  );
}

export default SMSVerification;

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