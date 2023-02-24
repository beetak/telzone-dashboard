import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncBasePrice } from "../../../../store/basePrice-slice";
import BasePriceList from "../../../BasePrice/BasePriceList/BasePriceList";
import BasePricePost from "../../../BasePrice/BasePricePost/BasePricePost";

export default function BaseCurrencyTab(){
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAsyncBasePrice())
  }, [dispatch]);

        return(

<div className="container-fluid">
  <div className="row">
    <div class="col-lg-8 py-4">                
      <div className="row">
        <div className="col-12">
          <div className="card my-4">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                <h6 className="text-white text-capitalize ps-3">Base Price Table</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <BasePriceList/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-4 py-4">                
      <div className="row">
        <div className="col-12">
        <div className="card my-4">
            <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
              <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                <h6 className="text-white text-capitalize ps-3"><i className='fa fa-plus-circle' style={{fontSize: "15px", paddingRight: "10px"}}/>Create Bank Rate</h6>
              </div>
            </div>
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <BasePricePost/>
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

const Style2={
  paddingTop: "1rem",
  paddinBottom: "0.5rem"
}