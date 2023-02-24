import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";
import MerakiApi from "../components/Api/MerakiApi";



export const fetchAsyncSalesReports = createAsyncThunk('report/fetchAsyncSalesReports', async () => {
    
    const response = await Api
    .get(`/payments/`)
    return [...response.data.data]
  
})

export const fetchAsyncClientReports = createAsyncThunk('report/fetchAsyncClientReports', async () => {
    try{
        const response = await MerakiApi
        .get(`/networks/L_575897802350008785/clients`)
        return [...response.data]
    }
    catch(err){
        console.log(err)
    }
})

export const fetchAsyncOrganisationReports = createAsyncThunk('report/fetchAsyncOrganisationReports', async () => {
    try{
        const response = await MerakiApi
        .get(`/organizations`)
        return [...response.data]
    }
    catch(err){
        console.log(err)
    }
})

export const fetchAsyncNetworkReports = createAsyncThunk('report/fetchAsyncNetworkReports', async () => {   
    try{
        const response = await MerakiApi
        .get(`/organizations/1182283/networks`)
        return [...response.data]
    }
    catch(err){
        console.log(err)
    }
})

export const fetchAsyncUsageReports = createAsyncThunk('report/fetchAsyncUsageReports', async (mac) => {
    try{
        const response = await MerakiApi
        .get(`/networks/L_575897802350008785/clients/usageHistories?clients=${mac}`)
        return [...response.data]
    }
    catch(err){
        console.log(err)
    }
})

const initialState = {
    salesReports: [],
    clientsReports: [],
    networkReports: [],
    organisationReports: [],
    usageReports: [],
    loadingStatus: 'idle'
}
const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchAsyncSalesReports.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncSalesReports.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            const loadedReports = action.payload.map(report=>{
                return report
            })
            state.salesReports = loadedReports
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncSalesReports.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [fetchAsyncUsageReports.pending]: ()=>{
            console.log("pending")
        },
        [fetchAsyncUsageReports.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            const loadedReports = action.payload.map(report=>{
                return report
            })
            state.usageReports = loadedReports
        },
        [fetchAsyncUsageReports.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [fetchAsyncClientReports.pending]: ()=>{
            console.log("pending")
        },
        [fetchAsyncClientReports.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            const loadedReports = action.payload.map(report=>{
                return report
            })
            state.clientsReports = loadedReports
        },
        [fetchAsyncClientReports.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [fetchAsyncNetworkReports.pending]: ()=>{
            console.log("pending")
        },
        [fetchAsyncNetworkReports.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            const loadedReports = action.payload.map(report=>{
                return report
            })
            state.networkReports = loadedReports
        },
        [fetchAsyncNetworkReports.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [fetchAsyncOrganisationReports.pending]: ()=>{
            console.log("pending")
        },
        [fetchAsyncOrganisationReports.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            const loadedReports = action.payload.map(report=>{
                return report
            })
            state.organisationReports = loadedReports
        },
        [fetchAsyncOrganisationReports.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
    }
})

export const getAllSales = (state) => state.report.salesReports
export const getAllNetworkClients = (state) => state.report.clientsReports
export const getAllNetworks = (state) => state.report.networkReports
export const getAllOrganisations = (state) => state.report.organisationReports
export const getClientUsage = (state) => state.report.usageReports
export const getLoadingStatus = (state) => state.report.loadingStatus
export default reportSlice