import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";

export const fetchAsyncFoc = createAsyncThunk('foc/fetchAsyncFoc', async () => {
    const response = await Api
    .get(`/foc/`)
    return [...response.data.data]
})

export const postAsyncRequest = createAsyncThunk(
    'foc/postAsyncRequest',
    async (initialData) => {
      console.log(initialData);
      return await Api
        .post('/foc/', 
          initialData
        )
        .then((res) => res.data);
    }
);

const focSlice = createSlice({
    name: 'cart',
    initialState: {
        bundleId: '',
        foc: [],
        itemsList: [],
        showCart: false,
        loadingStatus: 'idle',
        loadingByCurIdStatus: 'idle'
    },
    reducers: {
        addToFocCart(state, action){
            state.bundleId = action.payload.id
            const newItem = action.payload 
            const existingItem = state.itemsList.find((item)=>item.id===newItem.id)

            if(existingItem){
                existingItem.quantity++
                existingItem.totalPrice+=newItem.price
            }
            else{
                state.itemsList.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.name,
                    product: newItem.id
                }) 
            }
        },
        removeFromFocCart(state, action) {
            state.changed = true;
            const id = action.payload;
      
            const existingItem = state.itemsList.find((item) => item.id === id);
            if (existingItem.quantity === 1) {
              state.itemsList = state.itemsList.filter((item) => item.id !== id);
              state.totalQuantity--;
            } else {
              existingItem.quantity--;
              existingItem.totalPrice -= existingItem.price;
            }
          },
        setShowFocCart(state){
            state.showCart=true
        }
    },
    extraReducers: {
        [fetchAsyncFoc.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncFoc.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            // return {...state, sales: payload}
            const loadedSales = action.payload.map(sale=>{
                return sale
            })
            state.foc = loadedSales
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncFoc.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [postAsyncRequest.pending]: ()=>{
            console.log("pending")
        },
        [postAsyncRequest.fulfilled]: (state, action)=>{
            action.payload.active = true
            action.payload.customers = {
              email: "string",
              firstname: "string",
              password: "string",
              id: 0,
              phone_number: "string",
              surname: "string"
            }
            console.log(action.payload)
            state.sales.push(action.payload)
            
        },
        [postAsyncRequest.rejected]: (state, {payload})=>{
            console.log("rejected")
        }
    }
})

export const focActions = focSlice.actions
export const getAllFocs = (state) => state.foc.foc
export const getBundleId = (state) => state.foc.bundleId
export const getLoadingStatus = (state) => state.foc.loadingStatus
export const getLoadingByCurIdStatus = (state) => state.foc.loadingByCurIdStatus
export default focSlice