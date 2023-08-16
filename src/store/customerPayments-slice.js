import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";



export const fetchAsyncPayments = createAsyncThunk('user/fetchAsyncPayments', async () => {
    const response = await Api
    .get(`/customerPayment/`)
    return [...response.data.data]
})

export const fetchAsyncPeriodicalPayments = createAsyncThunk('user/fetchAsyncPeriodicalPayments', async ({startDate, endDate, curSymbol}) => {
    const response = await Api
    .get(`/customerPayment/${startDate}/${endDate}/${curSymbol}`)
    return [...response.data.data]
})

export const fetchAsyncDailyPayments = createAsyncThunk('user/fetchAsyncDailyPayments', async ({date, curSymbol}) => {
    const response = await Api
    .get(`/customerPayment/${date}/${curSymbol}`)
    return [...response.data.data]
})

const initialState = {
    payments: [],
    dailyPayments: [],
    periodicalPayments: [],
    loadingStatus: 'idle',
    loadingOnline: 'idle',
    loadingDaily: 'idle'
}
const customerPaymentsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, {payload})=>{
            state.partners = payload
        },
        clearPayments(state) {
            state.periodicalPayments = []
        },
    },
    extraReducers: {
        [fetchAsyncPayments.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncPayments.fulfilled]: (state, action)=>{
            console.log("sucess")
            const loadedPartners = action.payload.map(user=>{
                return user
            })
            state.payments = loadedPartners
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncPayments.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [fetchAsyncDailyPayments.pending]: (state)=>{
            console.log("pending")
            state.loadingDaily = 'pending'
        },
        [fetchAsyncDailyPayments.fulfilled]: (state, action)=>{
            console.log("sucess")
            const loadedPartners = action.payload.map(user=>{
                return user
            })
            state.dailyPayments = loadedPartners
            state.loadingDaily = 'fulfilled'
        },
        [fetchAsyncDailyPayments.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingDaily = 'rejected'
        },
        [fetchAsyncPeriodicalPayments.pending]: (state)=>{
            console.log("pending")
            state.loadingOnline = 'pending'
        },
        [fetchAsyncPeriodicalPayments.fulfilled]: (state, action)=>{
            console.log("sucess")
            const loadedPartners = action.payload.map(user=>{
                return user
            })
            state.periodicalPayments = loadedPartners
            state.loadingOnline = 'fulfilled'
        },
        [fetchAsyncPeriodicalPayments.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingOnline = 'rejected'
        }
    }
})
export const {customerPaymentsActions} = customerPaymentsSlice.actions
export const getAllCustomerPayments = (state) => state.customerPayments.payments
export const getDailyPayments = (state) => state.customerPayments.dailyPayments
export const getDailyLoading = (state) => state.customerPayments.loadingDaily
export const getOnlineLoading = (state) => state.customerPayments.loadingOnline
export const getPeriodicalPayments = (state) => state.customerPayments.periodicalPayments
export default customerPaymentsSlice