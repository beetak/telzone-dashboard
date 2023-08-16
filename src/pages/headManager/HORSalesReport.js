import {useEffect} from 'react'
import { useDispatch } from "react-redux";
import SideNavigation from "../../components/NavBar/sideNav";
import TopNavigation from "../../components/NavBar/topNav";
import SummarySales from "../../components/SalesReport/SummarySales";
import { fetchAsyncRegion } from "../../store/entities-slice";


export default function HORSalesReport() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAsyncRegion())
  }, []);
  return (
    <div>
        {<SideNavigation/>}
        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">
            {<TopNavigation title={"Business Partners"}/>}
            <div className="container-fluid py-4">
                <SummarySales/>
            </div>
        </main>
    </div>
  );
}

const Style2={
    paddingTop: "1rem",
    paddinBottom: "0.5rem"
}