import axios from "axios";
import React, {Component} from "react"
import voucher_codes from 'voucher-code-generator'

var CryptoJS = require("crypto-js");
const url = "http://localhost:8082/smart-wifi/voucher/voucherBatch/"


// var bytes = CryptoJS.AES.decrypt(ciphertext, 'my-secret-key@123');
// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

export default class SalesGenForm extends Component{

    componentDidMount(){
        this.handleChange = this.handleChange.bind(this)
        // this.getCategory()
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
                vouchers: {
                    active: false,
                    approved: 0,
                    approvedBy: 0,
                    batchID: 123456,
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
    <div className="p-4">
        <form>
            <div style={{color: 'red', marginBottom: '10px'}}>{this.state.empty}</div>
            <label className="form-label" style={{marginBottom: '0px'}}>Customer</label>
            <div className="input-group input-group-dynamic mb-4">
                {/*<label className="form-label">length</label>*/}
                <input type="text" name="length" onChange={this.handleChange} className="form-control" style={{padding: 0}}/>
            </div>
            <label className="form-label" style={{marginBottom: '0px'}}>Number of Vouchers</label>
            <div className="input-group input-group-dynamic mb-4">
                {/*<label className="form-label">Count</label>*/}
                <input type="text" name="count" onChange={this.handleChange} className="form-control"  style={{padding: 0}}/>
            </div>
            <button onClick={this.generateVoucher} className="btn btn-primary">Submit</button>
        </form>
    </div>
                   
        </>
    )
    }
}

const Style1={
    textAlign:"center"
}