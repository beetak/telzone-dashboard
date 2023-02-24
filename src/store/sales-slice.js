import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";

export const fetchAsyncSales = createAsyncThunk('sale/fetchAsyncSales', async () => {
    const response = await Api
    .get(`/order/`)
    return [...response.data.data]
})

export const fetchAsyncSalesByPartnerId = createAsyncThunk('sale/fetchAsyncSalesByPartnerId', async (id) => {
    const response = await Api
    .get(`/order/${id}`)
    return [...response.data.data]
})

export const postSale = createAsyncThunk(
    'sale/postAsyncSale',
    async (initialData) => {
      console.log(initialData);
      return await Api
        .post('/payments/', 
          initialData
        )
        .then((res) => res.data);
    }
);

const saleSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        sales: [],
        partnerSales: [],
        voucherList: [],
        totalQuantity: 0,
        showCart: false,
        loadingStatus: 'idle'
    },
    reducers: {
        addToCart(state, action){
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
        removeFromCart(state, action) {
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
        setShowCart(state){
            state.showCart=true
        }
    },
    extraReducers: {
        [fetchAsyncSalesByPartnerId.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncSalesByPartnerId.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            // return {...state, sales: payload}
            const loadedSales = action.payload.map(sale=>{
                return sale
            })
            state.partnerSales = loadedSales
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncSalesByPartnerId.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [fetchAsyncSales.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncSales.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            // return {...state, sales: payload}
            const loadedSales = action.payload.map(sale=>{
                return sale
            })
            state.sales = loadedSales
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncSales.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [postSale.pending]: ()=>{
            console.log("pending")
        },
        [postSale.fulfilled]: (state, action)=>{
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
        [postSale.rejected]: (state, {payload})=>{
            console.log("rejected")
        }
    }
})

export const saleActions = saleSlice.actions
export const getAllSales = (state) => state.sale.sales
export const getPartnerSales = (state) => state.sale.partnerSales
export const getLoadingStatus = (state) => state.sale.loadingStatus
export default saleSlice