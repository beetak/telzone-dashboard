import { Component } from "react";
import axios from "axios"

export default class SalesTableDetails extends Component{
    constructor(props){
      super(props);
    }
    state = {
        salesList: [],
        voucherList: [],
        loadingStatus: '',
        vcode: '',
        vbatch: '',
        codeId: '',
        activeState: ''
    };

    componentDidMount() {
        this.getSales()
    }   

    getSales = ()=>{
      let setResp = this
      const url = `http://localhost:8082/smart-wifi/pay/`; // URL variable stores JSON url || API taken from 10 Degrees WordPress Agency
      setResp.setState({loadingStatus: 'Loading vouchers...'})
      axios
          .get(url, {
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              }
          })
          .then(({ data }) => {
            this.setState({
              salesList: data.data,
              loadingStatus: ''
          });
          })
          .catch(err => {
            this.setState({
              users: 'Ooops...Apologies, there\'s an error on our side. \n\n Reload page!',
              loadingStatus: "Sorry we encounterd an error, Please refresh page"
            })
          });
    }

    openModal = () => this.setState({ isOpen: true });

    closeModal = () => this.setState({ isOpen: false });


    onSearch = (e) => {
      let url = `http://localhost:8082/smart-wifi/voucher/${this.state.batchNumber}`
      let setResp = this
      setResp.setState({loadingStatus: 'Loading vouchers...'})
      axios
        .get(url, {
            
        })
        .then(({ data }) => {
            this.setState({
                voucherList: data.data,
                loadingStatus: ''
            });
        })
        .catch(err => {
          this.setState({
            loadingStatus: "Sorry we encounterd an error, Please refresh page"
          })
        }
      );
    }


    render(){
        return(
<>
  <p style={Style1}>{this.state.loadingStatus}</p>
  <table className="table align-items-center mb-0">
    <thead>
      <tr>
        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Customer Name</th>
        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Phone Number</th>
        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Product</th>
        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: '5px'}}>Amount</th>
        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Receipt Number</th>
        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Date</th>
      </tr>
    </thead>
    <tbody>
      {this.state.salesList.map((item, index) => (
        <tr key={item.id}>
          <td className="align-middle text-center">
            <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{item.customer.firstname} {item.customer.surname}</p>
          </td>
          <td>
            <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{item.phoneNumber}</p>
          </td>
          <td>
            <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{item.productTitle}</p>
          </td>
          <td style={{float: 'right', paddingRight: 10}}>
            <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">${(Math.round(item.amount * 100) / 100).toFixed(2)}</p>
          </td>
          <td>
            <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{item.receiptNumber}</p>
          </td>
          <td>
            <p className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">{item.dateCreated }</p>
          </td>
      </tr>
    ))}
    </tbody>
  </table>

</>
        )
    }
}

const Style1={
  textAlign:"center"
}

const Style2 ={
  width: "90&"
}