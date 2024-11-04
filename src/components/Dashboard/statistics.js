import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncClients } from "../../store/clients-slice";
import { fetchAsyncPortalLogins } from "../../store/portal-slice";
import { fetchAsyncNetworkUsageStatistics } from "../../store/statistics-slice";
import FeaturedStats from "./FeaturedStats/FeaturedStats";
import SalesStats from "./SalesStats/SalesStats";
import ConnectivityStatsStats from "./ConnectivityStats/ConnectivityStats";
import TopUsage from "./TopUsage/TopUsage";

export default function Statistics(){

    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchAsyncNetworkUsageStatistics())
      dispatch(fetchAsyncClients())
      dispatch(fetchAsyncPortalLogins())
    }, [dispatch]);
    return (
        <>
            <FeaturedStats/>
            <br/>
            <SalesStats/>
            <br/>
            <ConnectivityStatsStats/>
            {/* <br/>
            <TopUsage/> */}
        </>
    )
}