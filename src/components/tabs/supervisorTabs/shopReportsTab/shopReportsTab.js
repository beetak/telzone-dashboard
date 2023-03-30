import SummarySales from "../../../SalesReport/SummarySales";

export default function ShopReportsTab(){

  return(
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body px-0 pb-2">
              <div className="table-responsive p-0">
                <SummarySales/>
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