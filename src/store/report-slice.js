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


const currentDate = new Date();
const sevenDaysAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // Subtracting 7 days in milliseconds
const t0 = Math.floor(sevenDaysAgo.getTime() / 1000); // Convert to Unix timestamp in seconds
const t1 = Math.floor(currentDate.getTime() / 1000); // Convert to Unix timestamp in seconds
const timespan = 86400 // In second max = 2678400 the equivalant of 31 days

export const fetchAsyncClientUsageReport = createAsyncThunk('report/fetchAsyncClientUsageReport', async ({macAddress}) => {
    try{
        const response = await MerakiApi
        // .get(`/networks/L_575897802350008785/clients/usageHistories?clients=${macAddress}`)
        // .get(`/networks/L_575897802350008785/clients/usageHistories?clients=${macAddress}&timespan=${timespan}`)
        .get(`/networks/L_575897802350008785/clients/usageHistories?clients=${macAddress}&t0=${t0}&t1=${t1}`)
        return [...response.data]
    }
    catch(err){
        console.log(err)
    }
})

export const fetchAsyncClientDetails = createAsyncThunk('report/fetchAsyncClientDetails', async ({clientId}) => {
    try{
        const response = await MerakiApi
        .get(`/networks/L_575897802350008785/clients/${clientId}`)
        return [response.data]
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
    const response = await MerakiApi
    .get(`/organizations/1182283/networks`)
    return [...response.data]
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
    clientUsageReport: [],
    clientDetails: '',
    networkReports: [],
    organisationReports: [],
    usageReports: [],
    loadingStatus: 'idle',
    networkLaoding: 'idle'
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
            state.usageReports = action.payload
        },
        [fetchAsyncUsageReports.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [fetchAsyncClientDetails.pending]: ()=>{
            console.log("pending")
        },
        [fetchAsyncClientDetails.fulfilled]: (state, action)=>{
            console.log("client details", action.payload)
            state.clientDetails = action.payload[0]
        },
        [fetchAsyncClientDetails.rejected]: (state, {payload})=>{
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
        [fetchAsyncClientUsageReport.pending]: ()=>{
            console.log("pending")
        },
        [fetchAsyncClientUsageReport.fulfilled]: (state, action)=>{
            console.log("fulfilled", action.payload[0].usageHistory)
            const loadedReports = action.payload[0].usageHistory.map(report=>{
                return report
            })
            state.clientUsageReport = loadedReports
        },
        [fetchAsyncClientUsageReport.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [fetchAsyncNetworkReports.pending]: (state)=>{
            console.log("pending")
            state.networkLoading = 'rejected'
        },
        [fetchAsyncNetworkReports.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            state.networkLoading = 'fulfilled'
            const loadedReports = action.payload.map(report=>{
                return report
            })
            state.networkReports = loadedReports
        },
        [fetchAsyncNetworkReports.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.networkLoading = 'rejected'
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
export const getAllClientUsage = (state) => state.report.clientUsageReport
export const getAllClientDetails = (state) => state.report.clientDetails
export const getAllNetworks = (state) => state.report.networkReports
export const getAllOrganisations = (state) => state.report.organisationReports
export const getClientUsage = (state) => state.report.usageReports
export const getLoadingStatus = (state) => state.report.loadingStatus
export const getLoadingNetwork = (state) => state.report.networkLaoding
export default reportSlice