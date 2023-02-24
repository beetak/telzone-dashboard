import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";



export const fetchAsyncBasePrice = createAsyncThunk('price/fetchAsyncBasePrice', async () => {

    const response = await Api
    .get(`/base_price/`)
    return [...response.data.data]

})

export const postAsyncBasePrice = createAsyncThunk('price/postAsyncBasePrice', async (initialData) => {
    return await Api
      .post('/base_price/', 
        initialData
      )
      .then((res) => res.data);
  }
);
const headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}
export const updateBasePrice = createAsyncThunk('price/updateBasePrice', 
    async (
        {
            id,
            price
        }) => {
    
    const response = await Api
    .put(`/base_price/${id}`, {
        id,
        price
    } ,  {headers})
    const data = response.data
    return {data, id}
})

const initialState = {
    prices: [],
    loadingStatus: 'idle'
}
const priceSlice = createSlice({
    name: 'price',
    initialState,
    reducers: {
        addPrice: (state, {payload})=>{
            state.prices = payload
        }
    },
    extraReducers: {
        [fetchAsyncBasePrice.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncBasePrice.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            const loadedPrice = action.payload.map(price=>{
                return price
            })
            state.prices = loadedPrice
            state.loadingStatus =  'fulfilled'
        },
        [fetchAsyncBasePrice.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus =  'rejected'
        },
        [postAsyncBasePrice.pending]: ()=>{
            console.log("pending")
        },
        [postAsyncBasePrice.fulfilled]: (state, action)=>{
            
            console.log("success")
            console.log(action.payload)
            action.payload.price = action.payload.data.data.price
            state.prices.push(action.payload)
        },
        [postAsyncBasePrice.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [updateBasePrice.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            console.log("the payload", action.payload);
            return { 
                ...state, 
                prices: state.prices.map(
                    (price, i) => i === 0 ? {
                        ...price,
                        price: action.payload.data.data.price, 
                    }: price
                )
            }
        }
    }
})
export const {addPrice} = priceSlice.actions
export const getBasePrice = (state) => state.price.prices
export const getLoadingStatus = (state) => state.price.loadingStatus
export default priceSlice