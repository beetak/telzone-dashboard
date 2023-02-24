import axios from 'axios';
import React, {useState} from 'react';
import { useSelector } from "react-redux";

const url = 'http://localhost:8082/smart-wifi/pay/'

export default function ProceedToPay(props) {
    const [paymentMethod, setPaymentMethod] = useState('Pay Using')

    let total = 0;
    const itemsList = useSelector((state) => state.cart.itemsList);

    itemsList.forEach((item) => {
        total += item.totalPrice;
    });

    let tabinfo
        
    if (paymentMethod === 'Cash') {
        tabinfo = 
            <>
                <label className="form-label" style={{padding: 0}}>Paying a Total Amount: ${(Math.round(total * 100) / 100).toFixed(2)}</label>
            </>
        
    } 
    else if (paymentMethod === 'Mobile') {
        tabinfo = 
            <>
                <label className="form-label" style={{padding: 0}}>Total Amount: ${(Math.round(total * 100) / 100).toFixed(2)}</label>
                <label className="form-label" style={{padding: 0}}>Enter Mobile Number</label>
                <div className="input-group input-group-dynamic mb-1">
                    <input type="text" name="name" onChange={''}  className="form-control" style={{padding: 0}}/>
                </div>
            </>
    }
    else if (paymentMethod === 'RTGS') {
        tabinfo = 
            <>
                <label className="form-label" style={{padding: 0}}>Total Amount: ${(Math.round(total * 100) / 100).toFixed(2)}</label>
                <label className="form-label" style={{padding: 0}}>Select Bank</label>
                <div className="input-group input-group-dynamic mb-1">
                    <input type="text" name="name" onChange={''}  className="form-control" style={{padding: 0}}/>
                </div>
                <label className="form-label" style={{padding: 0}}>Bank Account Number</label>
                <div className="input-group input-group-dynamic mb-1">
                    <input type="text" name="name" onChange={''}  className="form-control" style={{padding: 0}}/>
                </div>
            </>
    }
    else if(paymentMethod === 'Card'){
        tabinfo = 
            <>
                <label className="form-label" style={{padding: 0}}>Total Amount: ${(Math.round(total * 100) / 100).toFixed(2)}</label>
                <div className="icon-container">
                    <i className="fa fa-cc-visa" style={{color: 'navy', fontSize: '38px', cursor: 'pointer', marginRight: 5}} onClick={()=>alert("hello")}/>
                    <i className="fa fa-cc-amex" style={{color: 'blue', fontSize: '38px', cursor: 'pointer', marginRight: 5}} onClick={()=>alert("hello")}/>
                    <i className="fa fa-cc-mastercard" style={{color: 'red', fontSize: '38px', cursor: 'pointer', marginRight: 5}} onClick={()=>alert("hello")}/>
                    <i className="fa fa-cc-discover" style={{color: 'orange', fontSize: '38px', cursor: 'pointer', marginRight: 5}} onClick={()=>alert("hello")}/>
                </div>
            </>
    }
    else{
        tabinfo = 
            <>
                
            </>
    }


    const handleSubmit = () =>{
        const data = {
            "customerID": 1,
            "customerPayment": {
                "amount": (Math.round(total * 100) / 100).toFixed(2),
                "email": props.email,
                "phoneNumber": "263776153153",
                "productId": 1,
                "productTitle": "string"
            }
        }
        axios
        .post(url, data)
        .then(({res})=>{
            alert(res.data.code)
            localStorage.setItem('paymentbtn', res.data.code)
        })
        .catch(err=>console.log(err))
    }
    
  return (

    <>
    <div className="row">
        <div className="col-8">
            <div className="p-4">
                <h6>Client Details</h6>
                <hr/>
                <div style={{color: 'red', marginBottom: '10px'}}>{''}</div>
                <label className="form-label" style={{padding: 0}}>Name</label>
                <div className="input-group input-group-dynamic mb-1">
                    <input type="text" name="name" value={props.name} placeholder={props.name} className="form-control" style={{padding: 0}}/>
                </div>
                <label className="form-label" style={{padding: 0}}>Email</label>
                <div className="input-group input-group-dynamic mb-1"> 
                    <input type="text" name="email" value={props.email} placeholder={props.email} className="form-control" style={{padding: 0}}/>
                </div>
                <label className="form-label" style={{padding: 0}}>Phone</label>
                <div className="input-group input-group-dynamic mb-4">
                    <input type="text" name="symbol" onChange={''} className="form-control" style={{padding: 0}}/>
                </div>
                <button className="btn bg-gradient-primary" style={{marginRight: 10}} onClick={handleSubmit}>Make Payment</button><button className="btn btn-primary" onClick={props.action}>Cancel</button>            
            </div>
        </div>
        <div className="col-4">
            <div className="p-4">
                <h6>Payment Method</h6>
                <hr/>
                {/* Currency dropdown */}
                <div className="dropdown" style={{width: '100%'}}>
                    <button 
                        className="btn bg-gradient-primary dropdown-toggle" 
                        type="button" 
                        id="dropdownMenuButton" 
                        data-bs-toggle="dropdown" 
                        aria-expanded="false"
                        style={{width: '100%'}}
                        >
                        {paymentMethod}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">                  
                        <li>
                            <a  className="dropdown-item" 
                                onClick={()=>{
                                    setPaymentMethod('Cash')
                                }}>
                                Cash
                            </a>
                        </li>
                        <li>
                            <a  className="dropdown-item" 
                                onClick={()=>{
                                    setPaymentMethod('Mobile')
                                }}>
                                Mobile Payment
                            </a>
                        </li>
                        <li>
                            <a  className="dropdown-item" 
                                onClick={()=>{
                                    setPaymentMethod('RTGS')
                                }}>
                                RTGS Transfer
                            </a>
                        </li>
                        <li>
                            <a  className="dropdown-item" 
                                onClick={()=>{
                                    setPaymentMethod('Card')
                                }}>
                                Card
                            </a>
                        </li>
                    </ul>
                </div>
                {tabinfo}
            </div>
        </div>
    </div>
    </>
  );
}
