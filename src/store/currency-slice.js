import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../components/Api/Api";



export const fetchAsyncCurrency = createAsyncThunk('currency/fetchAsyncCurrency', async (active) => {
  
    const response = await Api
    .get(`/currency/${active}`)
    return [...response.data.data]
    
})

export const postCurrency = createAsyncThunk('currency/postAsyncCurrency', async (initialData) => {
    return await Api
      .post('/currency/', 
        initialData
      )
      .then((res) => res.data);
  }
);
const headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}
export const updateCurrency = createAsyncThunk('currency/updateCurrency', 
    async (
        {
            id,
            name,
            symbol,
            active,
            currencyId
        }) => {
    
    const response = await Api
    .put(`/currency/${id}`, {
            id,
            name,
            symbol,
            active
    } ,  {headers})
    const data = response.data
    return {data, id, currencyId}
})

const initialState = {
    currencies: [],
    loadingStatus: 'idle',
    globalCurrency: '',
    currencySymbol: ''
}
const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        addCurrency: (state, {payload})=>{
            state.currencies = payload
        },
        setGlobalCurrency(state, action){
            state.globalCurrency = action.payload
        },
        setGlobalSymbol(state, action){
            state.currencySymbol = action.payload
        }
    },
    extraReducers: {
        [fetchAsyncCurrency.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncCurrency.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            const loadedCurrency = action.payload.map(currency=>{
                return currency
            })
            state.currencies = loadedCurrency
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncCurrency.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [postCurrency.pending]: ()=>{
            console.log("pending")
        },
        [postCurrency.fulfilled]: (state, action)=>{
            
            console.log("sucess")
            console.log(action.payload)
            action.payload.name = action.payload.data.currency.name
            action.payload.symbol = action.payload.data.currency.symbol
            state.currencies.push(action.payload)
        },
        [postCurrency.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [updateCurrency.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            console.log("the payload", action.payload);
            return { 
                ...state, 
                currencies: state.currencies.map(
                    (currency, i) => i === action.payload.currencyId ? {
                        ...currency,
                        active: action.payload.data.data.active, 
                        name: action.payload.data.data.name, 
                        symbol: action.payload.data.data.symbol
                    }: currency
                )
            }
        }
    }
})
export const currencyActions = currencySlice.actions
export const getAllCurrencies = (state) => state.currency.currencies
export const getGlobalCurrency = (state) => state.currency.globalCurrency
export const getGlobalSymbol = (state) => state.currency.currencySymbol
export const getLoadingStatus = (state) => state.currency.loadingStatus
export default currencySlice