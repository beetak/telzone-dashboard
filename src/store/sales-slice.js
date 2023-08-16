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

export const fetchAsyncSalesByCurrencyId = createAsyncThunk('sale/fetchAsyncSalesByCurrencyId', async ({startDate, endDate, curId}) => {
    const response = await Api
    .get(`/order/currency/${startDate}/${endDate}/${curId}`)
    return [...response.data.data]
})

export const fetchAsyncSalesByAgent = createAsyncThunk('sale/fetchAsyncSalesByAgent', async ({curId, userID, date}) => {
    const response = await Api
    .get(`/order/currency${curId}/adminPortalUser${userID}/date${date}`)
    return [...response.data.data]
})

export const fetchAsyncAgentSalesByShop = createAsyncThunk('sale/fetchAsyncAgentSalesByShop', async ({curId, userID, startDate, endDate}) => {
    const response = await Api
    .get(`/order/currency${curId}/adminPortalUser${userID}/startDate${startDate}/endDate${endDate}`)
    return [...response.data.data]
})

export const fetchAsyncSalesByRegion = createAsyncThunk('sale/fetchAsyncSalesByRegion', async ({curId, regionId, startDate, endDate}) => {
    const response = await Api
    .get(`/order/currency/${startDate}/${endDate}/currencyId${curId}/regionId${regionId}`)
    return [...response.data.data]
})

export const fetchAsyncSalesByTown = createAsyncThunk('sale/fetchAsyncSalesByTown', async ({curId, townId, startDate, endDate}) => {
    const response = await Api
    .get(`/order/currency/${startDate}/${endDate}/currencyId${curId}/townId${townId}`)
    return [...response.data.data]
})
export const fetchAsyncSalesByShop = createAsyncThunk('sale/fetchAsyncSalesByShop', async ({curId, shopId, startDate, endDate}) => {
    const response = await Api
    .get(`/order/currency/${startDate}/${endDate}/currencyId${curId}/shopId${shopId}`)
    return [...response.data.data]
})

// export const postSale = createAsyncThunk(
//     'sale/postAsyncSale',
//     async (initialData) => {
//       console.log(initialData);
//       return await Api
//         .post('/payments/', 
//           initialData
//         )
//         .then((res) => res.data);
//     }
// );

export const postSale = createAsyncThunk(
    'sale/postAsyncSale',
    async (initialData) => {
      console.log(initialData);
      try {
        const response = await Api.post('/payments/', initialData);
        return { success: true, data: response.data };
      } catch (error) {
        console.error('postSale error:', error);
        throw error;
      }
    }
);

const saleSlice = createSlice({
    name: 'cart',
    initialState: {
        itemsList: [],
        sales: [],
        totalSales: [],
        partnerSales: [],
        agentSales: [],
        shopAgent: [],
        shopSales: [],
        townSales: [],
        regionSales: [],
        shopAgentSales: [],
        voucherList: [],
        totalQuantity: 0,
        showCart: false,
        loadingStatus: 'idle',
        loadingAgent: 'idle',
        loadingByCurIdStatus: 'idle'
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
        },
        clearSales(state) {
            state.totalSales = []
            state.regionSales = []
            state.townSales = []
            state.shopSales = []
        },
    },
    extraReducers: {
        [fetchAsyncSalesByAgent.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncSalesByAgent.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            // return {...state, sales: payload}
            const loadedSales = action.payload.map(sale=>{
                return sale
            })
            state.agentSales = loadedSales
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncSalesByAgent.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
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
            state.loadingByCurIdStatus = 'rejected'
        },
        [fetchAsyncSalesByCurrencyId.pending]: (state)=>{
            console.log("pending")
            state.loadingByCurIdStatus = 'pending'
        },
        [fetchAsyncSalesByCurrencyId.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            // return {...state, sales: payload}
            const loadedSales = action.payload.map(sale=>{
                return sale
            })
            state.totalSales = loadedSales
            state.loadingByCurIdStatus = 'fulfilled'
        },
        [fetchAsyncSalesByCurrencyId.rejected]: (state, {payload})=>{
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
        [fetchAsyncAgentSalesByShop.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncAgentSalesByShop.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            // return {...state, sales: payload}
            const loadedSales = action.payload.map(sale=>{
                return sale
            })
            state.shopAgentSales = loadedSales
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncAgentSalesByShop.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [fetchAsyncSalesByShop.pending]: (state)=>{
            console.log("pending")
            state.loadingAgent = 'pending'
        },
        [fetchAsyncSalesByShop.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            // return {...state, sales: payload}
            const loadedSales = action.payload.map(sale=>{
                return sale
            })
            state.shopSales = loadedSales
            state.loadingAgent = 'fulfilled'
        },
        [fetchAsyncSalesByShop.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingAgent = 'rejected'
        },
        [fetchAsyncSalesByTown.pending]: (state)=>{
            console.log("pending")
            state.loadingAgent = 'pending'
        },
        [fetchAsyncSalesByTown.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            // return {...state, sales: payload}
            const loadedSales = action.payload.map(sale=>{
                return sale
            })
            state.townSales = loadedSales
            state.loadingAgent = 'fulfilled'
        },
        [fetchAsyncSalesByTown.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingAgent = 'rejected'
        },
        [fetchAsyncSalesByRegion.pending]: (state)=>{
            console.log("pending")
            state.loadingAgent = 'pending'
        },
        [fetchAsyncSalesByRegion.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            // return {...state, sales: payload}
            const loadedSales = action.payload.map(sale=>{
                return sale
            })
            state.regionSales = loadedSales
            state.loadingAgent = 'fulfilled'
        },
        [fetchAsyncSalesByRegion.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingAgent = 'rejected'
        },
        [postSale.pending]: ()=>{
            console.log("pending")
        },
        [postSale.fulfilled]: (state, action) => {
            if (action.payload.success) {
              const { data } = action.payload;
              data.active = true;
              data.customers = {
                email: "string",
                firstname: "string",
                password: "string",
                id: 0,
                phone_number: "string",
                surname: "string"
              };
              console.log(data);
              state.sales.push(data);
            } else {
              console.log('postSale failed:', action.payload.error);
            }
        },
        [postSale.rejected]: (state, {payload})=>{
            console.log("rejected")
        }
    }
})

export const saleActions = saleSlice.actions
export const getAllSales = (state) => state.sale.sales
export const getTotalSales = (state) => state.sale.totalSales
export const getPartnerSales = (state) => state.sale.partnerSales
export const getAgentSales = (state) => state.sale.agentSales
export const getShopAgentSales = (state) => state.sale.shopAgentSales
export const getShopSales = (state) => state.sale.shopSales
export const getTownSales = (state) => state.sale.townSales
export const getRegionSales = (state) => state.sale.regionSales
export const getAgentLoadingStatus = (state) => state.sale.loadingAgent
export const getLoadingStatus = (state) => state.sale.loadingStatus
export const getLoadingByCurIdStatus = (state) => state.sale.loadingByCurIdStatus
export default saleSlice