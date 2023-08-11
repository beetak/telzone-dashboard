import {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBusinessPartners } from "../../../store/business-slice";
import { 
  cartActions,  
  getBtnState, 
  getBundleId, 
  getCustomerAddress, 
  getCustomerEmail, 
  getCustomerLevel, 
  getCustomerName, 
  getCustomerNumber, 
  getDicountPercentage, 
  getRetrievalStatus, 
  getSoldVoucherIds, 
  getSoldVouchers, 
  getStateUpdate, 
  getVATPercentage,  
  postSale, 
  postVoucherSaleByBundleId
} from "../../../store/cart-slice";
import BusinessPartnerDropdown from "../../BusinessPartner/BusinessPartnerDropdown/BusinessPartnerDropdown";
import CartItem from "../CartItem/CartItem";
import jsPDF from 'jspdf'
import "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import InvoiceItem from "../InvoiceItem/InvoiceItem";
import { fetchAsyncBasePrice, getBasePrice } from "../../../store/basePrice-slice";
import { BeatLoader } from "react-spinners";
import CurrencyDropdown from "../../Currency/CurrencyDropdown/CurrencyDropdown";
import { getAllCurrencies } from "../../../store/currency-slice";

const img = "assets/img/telonelogo.png"
const firstname = localStorage.getItem('firstname')
const surname = localStorage.getItem('surname')
const userID = localStorage.getItem('userId')
const regionId = localStorage.getItem('regionId')
const townId = localStorage.getItem('townId')
const shopId = localStorage.getItem('shopId')

let voucherIdArray = []

const delay = ms => new Promise(
  resolve => setTimeout(resolve, ms)
)

const CartItems = () => {

  const today = new Date()
  const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
  console.log("date: ", date)

  const dispatch  = useDispatch()
  const prices  = useSelector(getBasePrice)
  
  const bpname = useSelector(getCustomerName)
  const bpemail = useSelector(getCustomerEmail)
  const customerPhone = useSelector(getCustomerNumber)
  const customerAddress = useSelector(getCustomerAddress)
  const [printState, setPrintState] = useState(false)
  const [empty, setEmpty] = useState('')
  const [loadingStatus, setLoadingStatus] = useState(false)
  const [loadingSuccess, setLoadingSuccess] = useState(false)
  const [orderId, setOrderId] = useState('')

  const [businessPartnerName, setBusinessPartnerName] = useState(`Client's Name`)
  const [businessPartnerId, setBusinessPartnerId] = useState('')
  const [businessPartnerEmail, setBusinessPartnerEmail] = useState('')
  const [businessPartnerPhone, setBusinessPartnerPhone] = useState('')
  const [businessPartnerAddress, setBusinessPartnerAddress] = useState('')
  const [businessPartnerDiscount, setBusinessPartnerDiscount] = useState('')
  const [businessPartnerVat, setBusinessPartnerVat] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [rateStatus, setRateStatus] = useState('')
  const [rate, setRate] = useState(1)
  const [rateId, setRateId] = useState('')
  const[currencyId, setCurrencyID] = useState('')
  const[currencyState, setCurrencyState] = useState('Currency')
  const[currencyActioned, setCurrencyActioned]= useState('')
  const[currencySymbol, setCurrencySymbol]= useState('')

  const btnState = useSelector(getBtnState)
  const discountPercentage = useSelector(getDicountPercentage)
  const vatPercentage = useSelector(getVATPercentage)
  const clientLevel = useSelector(getCustomerLevel)
  const soldVouchersId = useSelector(getSoldVoucherIds)
  const stateUpdate = useSelector(getStateUpdate)
  const postBundleId = useSelector(getBundleId)

  let priceCount = ''
  useEffect(() => {
    dispatch(fetchAsyncBasePrice())
      priceCount = Object.keys(prices).length
      if(priceCount<=0){
        setRateStatus(false)    
      }
      else{
        setRateStatus(true)
        currencySymbol === 'ZWL'?setRate(prices[0].price):setRate(1)
        setRateId(prices[0].id)
      }
  }, [dispatch, currencySymbol, postBundleId]);

  let totalQty = 0;
  let unitPrice = 0
  let totalPrice = 0
  let unitDiscount = 0
  let totalDiscount = 0
  let unitVat = 0
  let totalVat = 0
  let netTotal = 0

  const itemsList = useSelector((state) => state.cart.itemsList);

  const getBusinessPartner =(id, name, email, phoneNumber, physicalAddress, discount, vat)=>{
    setBusinessPartnerId(id)
    setBusinessPartnerName(name)
    setBusinessPartnerEmail(email)
    setBusinessPartnerPhone(phoneNumber)
    setBusinessPartnerAddress(physicalAddress)
    setBusinessPartnerDiscount(discount)
    setBusinessPartnerVat(vat)
  }
  
  const businessPartners = useSelector(getAllBusinessPartners)
  let renderedBusinessPartner = ''
  renderedBusinessPartner = businessPartners ? (
    <div className="dropdown">
      <button 
          className="btn bg-gradient-primary dropdown-toggle" 
          type="button" 
          id="dropdownMenuButton" 
          data-bs-toggle="dropdown" 
          aria-expanded="false"
          >
          {businessPartnerName}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li>
          <a  className="dropdown-item" 
              onClick={
                  ()=>{
                    setBusinessPartnerId(100)
                    setBusinessPartnerName("Walk In Client")
                    setBusinessPartnerEmail("N/A")
                    setBusinessPartnerDiscount(0)
                    setBusinessPartnerVat(14.5)
                    dispatch(cartActions.setClient(
                      {
                        addBtn: false,
                        level: 1,
                        vat: 15,
                        discount: 0
                      })
                    )
                  }
              }>
              Walk in Client
          </a>
        </li>
        {businessPartners.map((partner, index)=>(
          <>
            <li key={index}>
              <BusinessPartnerDropdown data={partner} setBusinessPartner={getBusinessPartner}/>
            </li>
          </>
        ))}
      </ul>
    </div>
    ):(<div><h1>Error</h1></div>)
  // const cartItem = useSelector(getAllSales)

  itemsList.forEach((item) => {
    totalQty += item.quantity

    unitPrice = (Math.round((item.price - (item.price*discountPercentage/100)) * 10000 * rate / (vatPercentage+100)) / 100).toFixed(2)
    totalPrice = (Math.round(unitPrice*item.quantity*100)/100).toFixed(2)
    unitDiscount = item.price*discountPercentage/100 * rate
    totalDiscount = (Math.round(unitDiscount*item.quantity*100)/100).toFixed(2)
    unitVat = (Math.round((unitPrice*1.15 - unitPrice)*100)/100).toFixed(2)
    totalVat = (Math.round(unitVat*item.quantity*100)/100).toFixed(2)
    netTotal = (Math.round((parseFloat(totalVat) + parseFloat(totalPrice))*100)/100).toFixed(2)


  });

  let renderedItems = itemsList.map((item, index)=>(
    <tr key={index}>
      <CartItem 
        quantity={item.quantity}
        id={item.id}
        price={item.price}
        total={item.totalPrice}
        name={item.name}
        product={item.product}
        rate={rate}
        vat={vatPercentage}
        discount={discountPercentage}/>
    </tr>
  ))

  const makeSale = () => {
    if (currencyId === '') {
      setEmpty("Please select currency");
    } else {
      setLoadingStatus(true)

      dispatch(postSale({
        adminPortalUserId: userID,
        bundleId: postBundleId,
        businessPartnerId,
        currencyId,
        order: {
          amount: totalPrice,
          dateCreated: today,
          discount: totalDiscount,
          payingAccountNumber: "TelOne",
          quantity: totalQty,
          vat: totalVat
        },
        regionId,
        shopId,
        townId
      })).then(response => {
        console.log("post sale response ", response);
        if (response.payload && response.payload.code === "SUCCESS") {
          // Request was successful
          var todayDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
          setCurrentDate(todayDate);
          console.log(todayDate);
          // setPrintState(true);
  
          // Execute postVoucherSaleByBundleId
          saleByBundle(postBundleId, totalQty, response.payload.data.order.id);
        } else {
          // Request was not successful
          console.log('postSale failed');
        }
      }).catch(error => {
        // Handle any errors that occurred during postSale dispatch
        console.error('Error during postSale:', error);
      })
    }
  };

  const saleByBundle = (bundleId, quantity, orderID) => {
    dispatch(postVoucherSaleByBundleId(
      {
        bundleId,
        quantity
      }
    )).then(response => {
      console.log("voucher response ", response);
      if (response.payload && response.payload.success === true) {
        setLoadingSuccess(true);
        // Request was successful
        if(quantity===1){
          printSingleVoucher(response.payload.data.data, orderID)
        }
        else{
          printVouchers(response.payload.data.data, orderID)
        }
      } else {
        // Request was not successful
        console.log('postVoucher failed');
      }
    }).catch(error => {
      // Handle any errors that occurred during postSale dispatch
      console.error('Error during postSale:', error);
    }).finally(() => {
      // Clear the loading state after 5 seconds
      setTimeout(() => {
        setLoadingStatus(false);
        setLoadingSuccess(false);
      }, 5000);
    });
  }

  const printSingleVoucher = (voucherDetails, orderID) => {

    let count = 1
    console.log("generated vouchers: ",voucherDetails)
    // const data = Object.values(soldVouchers).map(elt=> [count++, elt.bundleName, elt.voucherCode]);
    const data = Object.values(voucherDetails).map(elt=> [count++, elt.price, elt.price]);
    const title = "My Awesome Report";
    const headers = [["","Name", "Voucher Code"]];

    let content = {
      startY: 180,
      head: headers,
      margin: { left: 15, right: 15},
      body: data
    };  
    
    var doc = new jsPDF()

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    var today = new Date(),
    curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateString = new Date(current);
    const formattedDate = dateString.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    // var doc = new jsPDF('potrait', 'px', 'a6', 'false')
    var doc = new jsPDF('potrait', 'px', [280,160], 'false')
    doc.addImage(img, 'PNG', 15, 0, 70, 25)
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
    doc.text(15, 120, 'Client Name:  '+businessPartnerName+ '\nClient Email:  ' +businessPartnerEmail)
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(0,0,0);
    doc.text(15, 145, 'Receipt Details')
    doc.setFont('Times New Roman', 'medium')
    doc.setFontSize(10)
    doc.setTextColor(0,0,0);
    doc.text(15, 160, 'Receipt Number: ' + orderID )
    doc.text(15, 168, 'Date:\nUnit Price:\nVAT 15%:\nTotal Price:' )
    doc.text(60, 168, formattedDate + ' ' + curTime + '\n$'+ totalPrice + '\n$' + totalVat + '\n$' + netTotal )
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(0,0,0);
    doc.text(15, 210, 'Cashier Details')
    doc.setFont('Times New Roman', 'medium')
    doc.setFontSize(10)
    doc.setTextColor(0,0,0);
    doc.text(15, 225, 'Cashier Name: ' +firstname+ " "+surname+ '\nShop: TelOne Shop ' + "\n")

    doc.setTextColor(0,0,0);
    doc.setFontSize(10)
    // doc.autoTable(content);

    voucherDetails.map((item, i)=>{
      doc.text(
        15,
        250 + i * 18,
        'Bundle: ' + item.bundle.name + '\nPIN: ' + item.voucherCode
      )
    });

    doc.save('invoice.pdf')
    // window.location = '/sales'
  }
  const getCurrency =(id, name, symbol)=>{
    setCurrencyID(id)
    setCurrencyActioned(name)
    setCurrencyState(name)
    setCurrencySymbol(symbol)
  }

  const currencyData = useSelector(getAllCurrencies)

  let renderedCurrency = ''
    renderedCurrency = currencyData ? (
      currencyData.map((currency, index)=>(
        <tr key={index}>
          <CurrencyDropdown data={currency} setCurrency={getCurrency}/>
        </tr>
      ))
    ):(<div><h1>Error</h1></div>)

    const deleteCartItem = () => {
      dispatch(cartActions.deleteFromCart());
    };
    
  const printVouchers = (myVouchers, orderID) => {
    console.log("items lis ",itemsList)
    let count = 1
    const data = Object.values(myVouchers).map(elt=> [count++, elt.bundle.name, elt.voucherCode]);
    const totals = Object.values(myVouchers).map(elt=> [count++, elt.bundle.name, elt.voucherCode]);
    const invoiceData = Object.values(itemsList).map(elt=>
      [  
        elt.name,
        elt.quantity, 
        unitPrice, 
        totalPrice
      ]);

    const title = "My Awesome Report";
    const headers = [["","Name", "Voucher Code"]];
    const invoiceHeaders = [["Item", "Quantity", "Unit Price", "Total Price"]];  

    let invoiceContent = {
      startY: 190, // Adjust the spacing as needed
      head: invoiceHeaders,
      margin: { left: 45, right: 35},
      body: invoiceData,
      columnStyles: {
        0: { columnWidth: 180 }, // Width for the first column (empty column)
        1: { columnWidth: 50 }, // Width for the "Name" column
        2: { columnWidth: 70, align: 'right' }, // Width for the "Voucher Code" column
        3: { columnWidth: 70, align: 'right' }, // Width for the "Voucher Code" column
      },
    };

    const contentHeight = invoiceContent.head.length * 10 + invoiceContent.body.length * 15;

    let content = {
      startY: invoiceContent.startY + contentHeight + 10, // Adjust the spacing as needed
      margin: { left: 275, right: 35},
      body: [
        ['Sub Total', totalPrice],
        ['Discount', totalDiscount],
        ['VAT', totalVat],
        ['Total', netTotal],
      ],
      
      columnStyles: {
        0: { columnWidth: 70 }, // Width for the first column (empty column)
        1: { columnWidth: 70 }, // Width for the "Name" column
      },
    }; 

    let voucherContent = {
      startY: 40, // Adjust the spacing as needed
      head: headers,
      margin: { left: 45, right: 35},
      body: data
    };

    const current = new Date();
    var today = new Date(),
    curTime = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    const dateString = new Date(current);
    const formattedDate = dateString.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const fiveDaysAgo = new Date(formattedDate);
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5);

    const formattedFiveDaysAgo = fiveDaysAgo.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    var doc = new jsPDF('potrait', 'px', 'a4', 'false')
    
    const pageHeight = doc.internal.pageSize.height;
    const footerY = pageHeight - 40; // Adjust the spacing as needed
    const pageWidth = doc.internal.pageSize.width;
    const text = "Cashier: " + firstname + ' ' + surname
    const textWidth = doc.getTextWidth(text);
    const centerX = (pageWidth - textWidth) / 2;

    doc.addImage(img, 'PNG', 45, 40, 70, 25)
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)
    doc.text(410, 80, 'Headquarters: Runhare House',{align: 'right'})
    doc.setFont('Times New Roman', 'regular')
    doc.setFontSize(10)
    doc.setTextColor(112,112,112);
    doc.text(410, 95, '107 Kwame Nkrumah Avenue, Harare, Zimbabwe\nP.O Box CY 331, Causeway, Harare, Zimbabwe\n24 Hour Call Center - +263 0242 700950',{align: 'right'})
    doc.setFont('Times New Roman', 'bold')
    doc.setFontSize(12)

    doc.setTextColor(0, 0, 0);
    doc.setFont('Times New Roman', 'bold');
    doc.setFontSize(12);
    doc.text(410, 130, 'Invoice Details', { align: 'right' });
    doc.setFont('Times New Roman', 'regular');
    doc.setFontSize(10);
    doc.setTextColor(112, 112, 112);
    doc.text(360, 140, 'Invoice Date:\nTime:\nInvoice Number:\nBP Number:\nVAT Number:', { align: 'right' });
    doc.text(410, 140, formattedDate + '\n' + curTime + '\n' + orderID + '\n200001412' + '\n10001509', { align: 'right' });
    doc.setFont('Times New Roman', 'bold');
    doc.setFontSize(12);
    
    doc.setTextColor(0,0,0);
    doc.text(45, 130, 'Client Details')
    doc.setFont('Times New Roman', 'medium')
    doc.setFontSize(10)
    doc.setTextColor(112,112,112);
    doc.text(45, 140, 'Client Name:\nClient Email:\nCell Phone:\nAddress:')
    doc.text(95, 140, businessPartnerName+ '\n' +businessPartnerEmail+ '\n' +businessPartnerPhone+ '\n' + businessPartnerAddress)

    doc.setTextColor(0,0,0);
    doc.setFontSize(11)
    
    doc.autoTable(invoiceContent);
    doc.autoTable(content);
    doc.text(text, centerX, footerY);
    // Add a blank page before invoiceContent
    doc.addPage();
    // Render invoiceContent on the second page
    doc.autoTable(voucherContent);
    
    doc.save('invoice.pdf')
    // window.location = '/sales'
  }

  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: ()=> componentRef.current,
    documentTitle: 'TelOne SmartWiFi Receipt'
  })

  let loadingSalesAnimation = 
    <div className='text-center' style={anime}>
        <h5 style={{color: '#055bb5'}}> {
          loadingStatus && !loadingSuccess? 
            "Preparing Invoice":
            loadingStatus && loadingSuccess? 
              "Successful":""
          }</h5>
        <BeatLoader
          color={'#055bb5'}
          loading={loadingStatus}
          cssOverride={override}
          size={15}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
    </div>

  let errorMsg =  
    <div className='text-center'>
      <h5 style={{color: '#E91E63'}}>Opps something went wrong. Please refresh page</h5>
    </div>

  let showData = <>
      <div className="table-responsive p-0">
        <div className="p-4">
          <div className="input-group input-group-dynamic mb-4">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th scope="col">Bundle Type</th>
                  <th scope="col">Price</th>
                  <th scope="col" style={{textAlign: 'center'}}>Qty</th>
                  <th scope="col">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {renderedItems}
                {!btnState?
                  <>
                  <tr>
                    <td colSpan={2}></td>
                    <td>Sub Total
                    </td>
                    <td style={{textAlign: 'right'}}> ${totalPrice}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td>Discount {discountPercentage}%
                    </td>
                    <td style={{textAlign: 'right'}}> ${totalDiscount}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td>VAT {vatPercentage}%</td>
                    <td style={{textAlign: 'right'}}> ${totalVat}</td>
                  </tr>
                  </>:
                  <></>}
              </tbody>
            </table>
          </div>
          <label className="form-label" style={{marginBottom: '0px'}}>Customer</label>                  
          {renderedBusinessPartner}
          <div style={{ color: 'red', marginBottom: '10px' }}>{empty}</div>
          <div className="dropdown">
            <button 
              className="btn bg-gradient-primary dropdown-toggle" 
              type="button" 
              id="dropdownMenuButton" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
              >
              {currencyState}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {renderedCurrency}
            </ul>
          </div>
          <div className="">
            <button 
              onClick={()=>makeSale()} 
              className="btn btn-info"
              disabled = {businessPartnerName===`Client's Name` || totalQty === 0 ?true:false}
            >Print Vouchers
            </button>
            <button 
              onClick={deleteCartItem} 
              className="btn btn-danger mx-2"
            >Cancel
            </button>
            {
              loadingStatus?
                loadingSalesAnimation:''
            }
          </div>
        </div>
      </div> 
    </>

  return (
    <div class="col-lg-7 py-4"> 
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                  <div className="col-8">
                    <h6 className="text-white text-capitalize ps-3">Generate Sale</h6>
                  </div>
                  <div className="col-4">
                    <h6 className="text-white text-capitalize ps-3"><span style={{float: 'right'}}>Total Price: ${netTotal}</span></h6>
                  </div>
                </div>
            </div>
            <div className="card-body px-0 pb-2">
              {showData}  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;


const Style2 ={
  paddingTop: "1rem",
  paddinBottom: "0.5rem",
  cursor: "pointer"
}

const lineStyle={
  lineHeight:'17px',
  fontSize: '14px',
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