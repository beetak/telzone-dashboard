import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";

export const fetchAsyncSales = createAsyncThunk('cart/fetchAsyncSales', async () => {
   
    const response = await Api
    .get(`/batches/`)
    return [...response.data.data]
    
})

// export const fetchAsyncSoldVouchers = createAsyncThunk('cart/fetchAsyncSoldVouchers', async () => {
//     try{
//         const response = await Api
//         .get(`/voucher/`)
//         return [...response.data.data]
//     }
//     catch(err){
//         alert(err)
//     }
// })

export const postSale = createAsyncThunk('cart/postSale', async (initialData) => {
    return await Api
      .post('/order/', 
        initialData
      )
      .then((res) => res.data);
  }
);

export const postVoucherSaleByBundleId = createAsyncThunk('cart/postVoucherSaleByBundleId', async ({bundleId, quantity}) => {
    return await Api
        .post(`/sales/${bundleId}?quantity=${quantity}&sold=${false}&used=${false}`)
        .then((res) => res.data.data);
    }
);

// export const postVoucherSaleByBundleId = createAsyncThunk('cart/postVoucherSaleByBundleId', async ({bundleId, quantity}) => {
//     return await Api
//         .post(`/sales/${bundleId}?quantity=${quantity}`)
//         .then((res) => res.data.data);
//     }
// );

const headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}

export const updateVoucherOnSale = createAsyncThunk('cart/updateVoucherOnSale', 
    async (
        {
            voucherId
        }) => {
    
    const response = await Api
    .put(`/voucher/${voucherId}`, {
        voucherId
    } ,  {headers})
    const data = response.data
    return {data}
})

export const updateVoucherStatus = createAsyncThunk('cart/updateVoucherStatus', 
    async (
        voucherIds
        ) => {
    const response = await Api
    .put(`/sales/${voucherIds}`,  
    {headers})
    const data = response.data
    return {data}
})

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        sales: [],
        soldVouchers: [],
        customerAddress: '',
        customerEmail: '',
        customerName: '',
        customerPhoneNumber: '',
        amount: '',
        account: '',
        voucherList: [],
        orderPostStatus: 'idle',
        totalQuantity: 0,
        showCart: false,
        lastOrderId: '',
        updateVoucher: '',
        updateState: '',
        soldId: [],
        addBtn: true,
        clientLevel: '',
        clientName: '',
        clientDiscount: '',
        clientVAT: '',
        loadingStatus: 'idle',
        stateUpdate: 'idle'
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
        changeCart(state, action){
            const newItem = action.payload 
            const existingItem = state.itemsList.find((item)=>item.id===newItem.id)

            if(existingItem.quantity<newItem.qty){
                existingItem.quantity = newItem.qty
                existingItem.totalPrice = newItem.price*newItem.qty
            }
            else{
                existingItem.quantity = newItem.qty
                existingItem.totalPrice = newItem.price*newItem.qty
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
        },
        setClient(state, action){
            state.addBtn=action.payload.addBtn
            state.clientLevel = action.payload.level
            state.clientDiscount = action.payload.discount
            state.clientVAT = action.payload.vat
        }
    },
    extraReducers: {
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
            console.log("my payload", action.payload)
            state.orderPostStatus = 'success'
            state.lastOrderId = action.payload.data.order.id
            state.customerName = action.payload.data.businessPartner.name
            state.customerEmail = action.payload.data.businessPartner.email
            state.customerPhoneNumber = action.payload.data.businessPartner.phoneNumber
            state.customerAddress = action.payload.data.businessPartner.businessAddress
            state.amount = action.payload.data.order.amount
            state.account = action.payload.data.order.payingAccountNumber
            console.log("last id", state.lastOrderId)
            state.sales.push(action.payload)
            
        },
        [postSale.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [postVoucherSaleByBundleId.pending]: ()=>{
            console.log("pending")
        },
        [postVoucherSaleByBundleId.fulfilled]: (state, action)=>{
            const voucherData = action.payload
            console.log("the voucher",action.payload)

            voucherData.forEach(function(voucher, i){
                state.soldVouchers.push({id: voucher.id, voucherCode: voucher.voucherCode, bundleName: voucher.bundle.name})
                state.soldId.push(voucher.id)
            })  
            // state.stateUpdate = 'successful'          
        },
        [postVoucherSaleByBundleId.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [updateVoucherOnSale.pending]: ()=>{
            console.log("pending")
        },
        [updateVoucherOnSale.fulfilled]: (state, action)=>{
            console.log("the update",action.payload)
            state.updateState = 'success'

            // state.soldVouchers.push(action.payload)

            if(state.soldVouchers === null){
                state.soldVouchers = action.payload
            }

            else{
                return { 
                    ...state,
                    soldVouchers: state.soldVouchers.push([action.payload])
                }
            }
            
        },
        [updateVoucherOnSale.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [updateVoucherStatus.pending]: (state)=>{
            console.log("pending")
            state.stateUpdate = 'pending'
        },
        [updateVoucherStatus.fulfilled]: (state, action)=>{
            state.orderPostStatus = 'success'           
            state.stateUpdate = 'successful'
        },
        [updateVoucherStatus.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.stateUpdate = 'rejected'
        }
    }
})

export const cartActions = cartSlice.actions
export const getAllSales = (state) => state.cart.sales
export const getOrderStatus = (state) => state.cart.orderPostStatus
export const getSoldVouchers = (state) => state.cart.soldVouchers
export const getCustomerName = (state) => state.cart.customerName
export const getCustomerEmail = (state) => state.cart.customerEmail
export const getCustomerAddress = (state) => state.cart.customerAddress
export const getCustomerNumber = (state) => state.cart.customerPhoneNumber
export const getAmount = (state) => state.cart.amount
export const getAccount = (state) => state.cart.account
export const getLastId = (state) => state.cart.lastOrderId
export const getSaleVoucher = (state) => state.cart.updateVoucher
export const getVoucherUpdateStatus = (state) => state.cart.updateState
export const getBtnState = (state) => state.cart.addBtn
export const getDicountPercentage = (state) => state.cart.clientDiscount
export const getVATPercentage = (state) => state.cart.clientVAT
export const getCustomerLevel = (state) => state.cart.clientLevel
export const getLoadingStatus = (state) => state.cart.loadingStatus
export const getSoldVoucherIds = (state) => state.cart.soldId
export const getStateUpdate = (state) => state.cart.stateUpdate
export default cartSlice