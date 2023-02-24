import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MerakiApi from "../components/Api/MerakiApi";



export const fetchAsyncNetworkUsageStatistics = createAsyncThunk('statistics/fetchAsyncNetworkUsageStatistics', async () => {
   
    const response = await MerakiApi
    .get(`/organizations/1182283/clients/overview`)
    return response.data
   
})

const initialState = {
    upstream: '',
    downstream: '',
    totalstream: '',
    clients: '',
    loadingStatus: 'idle'
}
const statsSlice = createSlice({
    name: 'statistics',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchAsyncNetworkUsageStatistics.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncNetworkUsageStatistics.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            state.upstream = action.payload.usage.overall.upstream
            state.downstream = action.payload.usage.overall.downstream
            state.totalstream = action.payload.usage.overall.total
            state.clients = action.payload.counts.total
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncNetworkUsageStatistics.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        }
    }
})

export const getUpStreamStats = (state) => state.statistics.upstream
export const getDownStreamStats = (state) => state.statistics.downstream
export const getTotalStreamStats = (state) => state.statistics.totalstream
export const getClientsNumber = (state) => state.statistics.clients
export const getLoadingStatus = (state) => state.statistics.loadingStatus
export default statsSlice