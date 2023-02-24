import axios from "axios";
import React, {Component} from "react"
import voucher_codes from 'voucher-code-generator'

var CryptoJS = require("crypto-js");
const url = "http://localhost:8082/smart-wifi/voucher/voucherBatch/"

export default class VoucherGenResponse extends Component{

    componentDidMount(){
        this.handleChange = this.handleChange.bind(this)
    }

    state = {
        length: '',
        count: '',
        voucherList: [],
        voucherCode: '',
        batchNumber: [],
        salesTotalStatistics: '',
        batchItem: '',
        groups: [],
        currentState: 'Group Policy',
        batchId: '',
        batchList: [],
        category: [],
        batchName: '',
        categoryId: '',
        categoryState: 'Category',
        encryptedVoucher: '',
        response: '',
        showBatchId: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handlePost = () =>{
        Object.values(this.state.voucherList).map((item, i)=>(
            axios.post(url,{
                userID: 1,
                batchId: 1,
                voucherID: 1,
                batchID: 123456,
                vouchers: {
                    active: false,
                    approved: 0,
                    approvedBy: 0,
                    batchName: this.state.batchName,
                    encryptedVoucherCode: CryptoJS.AES.encrypt(JSON.stringify(item), 'my-secret-key@123').toString(),
                    isBlocked: 0,
                    serialNumber: 0,
                    used: 0,
                    voucherCode: item
                }
            })
            .then(res=>{
                this.setState({
                    showBatchId: res.vouchers.batchID,
                    response: "Failed"
                },
                ()=>{console.log("After Posting", this.state.batchID)
                })
            })
            .catch(err=>{
                console.log(err)
                this.setState({
                    response: "Successful"
                },
                ()=>{console.log(this.state.batchID)})
            })
        )) 
    }
    
    generateVoucher = (e) => {
        e.preventDefault()
        let vcode = voucher_codes.generate({
            length: this.state.length,
            count: this.state.count,
            charset: '0123456789',
            pattern: '####-####-####-####'
        })

        this.setState({
            voucherList: vcode
        },
        ()=>{
            console.log("the state", this.state.voucherList)
        })

        this.handlePost()
    }
  
    render(){
    return(
        <>
            {this.state.response ? (
                <div className="card-body px-0 pb-2" style={Style1}>
                    <div className="table-responsive p-0">
                        <h3 className="mb-0 ">TelOne</h3>
                        <p className="text-sm ">Batch Creation</p>
                        <hr className="dark horizontal" />
                        <div className="">
                            <p className="mb-0 text-sm">{this.state.response}</p>
                            <br/>
                            <p className="mb-0 text-sm">Batch Name: {this.state.batchName}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="card-body px-0 pb-2" style={Style1}>
                    <div className="table-responsive p-0">
                        <h3 className="mb-0 " style={{lineHeight: "100px"}}>TelOne</h3>
                        <p className="text-sm ">Batch Creation</p>
                        <hr className="dark horizontal" />
                        <div className="">
                            <p className="mb-0 text-sm" style={Style1}>Use the form to create batches of vouchers</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
    }
}

const Style1={
    textAlign:"center"
}