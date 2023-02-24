import axios from "axios";
import React, {useState, useEffect} from "react"
import voucher_codes from 'voucher-code-generator'

var CryptoJS = require("crypto-js");
const url = "http://localhost:8082/smart-wifi/voucher/"
const groupPolicyUrl = "//http://telzonewifi.telone.co.zw:8082/api/networks/N_575897802350046053/groupPolicies"
const productUrl = "http://localhost:8082/smart-wifi/bundle/"
const batchUrl = "http://localhost:8082/smart-wifi/"


export default function VoucherGenForm ()  {

  useEffect(() => {
    getBundles()
    getLastBatch()
  }, []);

    
        const[length, setLength] =  ''
        const[count, setCount] = useState('')
        const[voucherList, setVoucherList] = useState([])
        const[batches, setBatches] = useState([])
        const[lastBatch, setLastBatch] = useState('')
        const[voucherCode, setVoucherCode] = useState('')
        const[batchNumber, setBachNumber] = useState([])
        const[bundles, setBundles] = useState([])
        const[loadingState, setLoadingState] = useState('')
        const[batchItem, setBatchItem] = useState('')
        const[groups, setGroups] = useState([])
        const[currentState, setCurrentState] = useState('Product')
        const[loadingBundle, setLoadingBundle] = useState('')
        const[empty, setEmpty] = useState('')
        const[batchId, setBatchId] = useState([])
        const[category, setCategory] = useState([])
        const[batchName, setBatchName] = useState('')
        const[showBatchId, setShowBatchId] = useState('')
        const[categoryState, setCategoryState] = useState('Category')
        const[encryptedVoucher, setEncryptedVoucher] = useState('')
        const[response, setResponse] = useState('')
        const[bundleName, setBundleName] = useState('')
        const[bundleID, setBundleId] = useState('')

    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.name] : e.target.value
    //     })
    // }
    

    const getBundles = ()=>{
        const url = `http://localhost:8082/smart-wifi/bundle/`; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency
        setLoadingState('Loading Bundles..')
        axios
        .get(url, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(({ data }) => {
            var count = Object.keys(data.data).length
            if(count<=0){
                setLoadingState("No Bundles")
            }
            else{
                setBundles(data.data)
                setLoadingState("")
            }
        })
        .catch(err => {
            setLoadingState("Error")
        });
    }

    const generateBatch = () =>{
        
        alert("generating batch")
        const url = batchUrl + `/batch/`
        axios
            .post(url, {
                "batch": {
                    "batchName": "TelOnev1",
                    "id": 1
                  }
                }
            )
            .then(({data})=>{
                if(data.code==="SUCCESS"){
                    getLastBatch()
                }
            })
            .catch((err)=>{
                console.log(err)
                getLastBatch()
            })
    }

    const getLastBatch = () =>{
        const url = batchUrl + `/batches/`
        axios
            .get(url, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }}
            )
            .then(({data})=>{
                var count = Object.keys(data.data).length
                if(count<=0){
                    alert("No batches ")
                }
                else{
                    setBatches(data.data)
                    setBatchId(data.data[data.data.length-1].id)
                    console.log("Batch Id: ", batchId)
                    console.log("the batches: ", batches[0])
                    // lastBatch = this.state.batches[this.state.batches.length - 1];
                    // console.log("last: ",lastElement)
                    console.log("last: ",lastBatch)
                }
            })
            .catch(err=>{
                console.log(err)
            })
            
    }
    
    const generateVoucher = (e) => {
        e.preventDefault()
        if(batchId){
            let vcode = voucher_codes.generate({
                length: 16,
                count: 10,
                charset: '0123456789',
                pattern: '####-####-####-####'
            })
            console.log("the state", voucherList)
            setVoucherList(vcode)
            handlePost()
        }
        else{
            generateBatch()
            generateVoucher()
        }
    }


    const handlePost = () =>{
        Object.values(voucherList).map((item, i)=>(
            axios.post(url,{
                "batchID": batchId,
                "bundleID": bundleID,
                "userID": 1,
                "vouchers": {
                    "approved": 0,
                    "approvedBy": 0,
                    "encryptedVoucherCode": CryptoJS.AES.encrypt(JSON.stringify(item), 'my-secret-key@123').toString(),
                    "isBlocked": 0,
                    "serialNumber": 0,
                    "used": true,
                    "voucherCode": item
                }
            })
            .then(res=>{
                // setShowBatchId(res.data.vouchers.id)
                setResponse("Successful")
                console.log("After Posting", batchId)
                window.location('/batch')

            })
            .catch(err=>{
                console.log(err)
                setResponse("Failed")
                console.log(batchId)
            })
        )) 
    }

    return(
        <>
    <div className="p-4">
        <form>
            <div style={{color: 'red', marginBottom: '10px'}}>{empty}</div>
            <div className="dropdown">
                <button 
                    className="btn bg-gradient-primary dropdown-toggle" 
                    type="button" 
                    id="dropdownMenuButton" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false"
                    >
                    {currentState}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {bundles.map((cur, index) => (
                        <li>
                            <a  className="dropdown-item" 
                                onClick={(e)=>{
                                    e.preventDefault()
                                    setBundleId(cur.id)
                                    setCurrentState(cur.name)
                                }}>
                                {cur.name}
                                {loadingBundle}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <button onClick={generateVoucher} type='button' className="btn btn-primary">Submit</button>
        </form>
    </div>
                   
        </>
    )
}

const Style1={
    textAlign:"center"
}