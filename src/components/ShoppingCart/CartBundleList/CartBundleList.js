import React from "react";
import { getAllBundles, getLoadingStatus } from "../../../store/bundle-slice";
import CartBundleCard from "../CartBundleCard/CartBundleCard";
import { useSelector } from "react-redux";
import BeatLoader from 'react-spinners/BeatLoader'

const shopName = localStorage.getItem("shopName")

const CartBundleList = ({pageType}) => {
    console.log("page: ", pageType)

    const bundles = useSelector(getAllBundles)

    let renderedBundles = ''
    renderedBundles = bundles ? (
        shopName === "CZA-Town Centre"?(
            bundles.map((bundle, index)=>(
                bundle.name === "Chitungwiza Voucher" &&
                    <tr key={index}>
                        <CartBundleCard data={bundle} page={pageType} index={index}/>
                    </tr>
                ))
        ):(
            shopName === "Glen View"?(
                bundles.map((bundle, index)=>(
                    bundle.name === "Glenview Voucher" &&
                        <tr key={index}>
                            <CartBundleCard data={bundle} page={pageType} index={index}/>
                        </tr>
                    ))
            ):(
                shopName === "TCFL"?(
                    bundles.map((bundle, index)=>(
                        bundle.name === "TCFL STUDENTS" &&
                            <tr key={index}>
                                <CartBundleCard data={bundle} page={pageType} index={index}/>
                            </tr>
                        ))
                ):(
                    bundles.map((bundle, index)=>(
                        bundle.name !== "Chitungwiza Voucher" && bundle.name !== "Glenview Voucher" && bundle.name !== "TCFL STUDENTS" &&
                            <tr key={index}>
                                <CartBundleCard data={bundle} page={pageType} index={index}/>
                            </tr>
                        ))
                )
            )
        )
    ):(<div><h1>Error</h1></div>)

    const loading = useSelector(getLoadingStatus)

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

  return (
    <>
        <div className="col-lg-5">                
            <div className="row">
                <div className="col-12  py-4">
                    <div className="card my-4">
                        <div className="position-relative mt-n4 mx-3 z-index-2" style={Style2}>
                            <div className="row bg-gradient-primary shadow-primary border-radius-lg mt-n4 mx-3" style={Style2}>
                                <h6 className="text-white text-capitalize ps-3">Product Shop</h6>
                            </div>
                        </div>
                        <div className="card-body px-0 pb-2">
                            <div className="table-responsive p-0">
                                <p style={Style1}></p>
                                <table className="table align-items-center mb-0">
                                    <thead>
                                        <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" style={{width: "5%"}}>Product</th>
                                        <th className="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Price</th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ">Add To Cart</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading==='pending'?
                                            loadingAnimation: renderedBundles
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
};

export default CartBundleList;

const Style1={
    textAlign:"center"
}

const Style2 ={
    paddingTop: "1rem",
    paddinBottom: "0.5rem",
    cursor: "pointer"
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
  