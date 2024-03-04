import BulkPostResponse from "../../../Batches/BatchPostResponse/BulkPostResponse";
import BulkVoucherPost from "../../../Vouchers/BulkVoucherPost/BulkVoucherPost";

export default function BulkSMS(){
  return(
    <div className="container-fluid">
      <div className="row">
        <div class="col-lg-7 py-4">                
          <div className="row">
            <div className="col-12">
              <div className="card my-4">
                <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                  <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                    <h6 className="text-white text-capitalize ps-3">Voucher Distribution Response</h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="table-responsive p-0">
                    <BulkPostResponse/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 py-4">                
          <div className="row">
            <div className="col-12">
            <div className="card my-4">
                <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                  <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                    <h6 className="text-white text-capitalize ps-3">Bulk SMS Voucher Distribution</h6>
                  </div>
                </div>
                <div className="card-body px-0 pb-2">
                  <div className="p-0">
                    <BulkVoucherPost/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Style1={
  textAlign:"center"
}

const Position ={
  position: "absolute",
  right: 0
}

const Search ={
  top: "-10px",
}

const TableRow ={
  lineHeight: "10px",
  paddingBottom: "0"
}

const thHeight = {
  padding: "0.1rem 1.5rem"
}
const Style2={
  paddingTop: "1rem",
  paddinBottom: "0.5rem"
}