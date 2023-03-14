import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncClients } from "../../store/clients-slice";
import { fetchAsyncNetworkUsageStatistics } from "../../store/statistics-slice";
import FeaturedStats from "./FeaturedStats/FeaturedStats";
import SalesStats from "./SalesStats/SalesStats";

export default function Statistics(){

    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchAsyncNetworkUsageStatistics())
      dispatch(fetchAsyncClients())
    }, [dispatch]);
    return (
        <>
            <FeaturedStats/>
            <br/>
            <SalesStats/>
        </>
    )
}