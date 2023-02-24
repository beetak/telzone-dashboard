import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAsyncNetworkUsageStatistics } from "../../store/statistics-slice";
import FeaturedStats from "./FeaturedStats/FeaturedStats";

export default function Statistics(){

    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchAsyncNetworkUsageStatistics())
    }, [dispatch]);
    return (
        <>
            <FeaturedStats/>
        </>
    )
}