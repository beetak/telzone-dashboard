import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";

const headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}

export const fetchAsyncBatches = createAsyncThunk('batch/fetchAsyncBatches', async () => {   
    const response = await Api
    .get(`/batches/` )
    return [...response.data.data]
})

export const fetchMerchandiseVouchers = createAsyncThunk('batch/fetchMerchandiseVouchers', async () => {   
    const response = await Api
    .get(`/batches/` )
    return [...response.data.data]
})

export const fetchSoldVouchers = createAsyncThunk(
    'cart/fetchSoldVouchers',
    async (invoiceNumber) => {
      try {
        const response = await Api.get(`/vouchers/${invoiceNumber}`);
        return { success: true, data: response.data };
      } catch (error) {
        throw error;
      }
    }
);

export const fetchSoldVouchersByDate = createAsyncThunk(
    'cart/fetchSoldVouchersByDate',
    async (dateSold) => {
      try {
        const response = await Api.get(`/voucher/date${dateSold}`);
        return { success: true, data: response.data };
      } catch (error) {
        throw error;
      }
    }
);

export const fetchSoldVouchersByShopAndDate = createAsyncThunk(
    'cart/fetchSoldVouchersByShopAndDate',
    async ({shopId, startDate, endDate, status}) => {
      try {
        const response = await Api.get(`/voucher/shop${shopId}/${startDate}/${endDate}/${status}`);
        return { success: true, data: response.data };
      } catch (error) {
        throw error;
      }
    }
);

export const fetchAsyncSoldVouchers = createAsyncThunk(
    'cart/fetchAsyncSoldVouchers',
    async ({status}) => {
      try {
        const response = await Api.get(`/voucher/${status}/true`);
        return { success: true, data: response.data };
      } catch (error) {
        throw error;
      }
    }
);

export const fetchSoldVouchersByAgentAndDate = createAsyncThunk(
    'cart/fetchSoldVouchersByAgentAndDate',
    async ({userId, date}) => {
      try {
        const response = await Api.get(`/voucher/date${date}/user${userId}`);
        return { success: true, data: response.data };
      } catch (error) {
        throw error;
      }
    }
);

export const fetchSoldVouchersByShopAndPeriodAndState = createAsyncThunk(
    'cart/fetchSoldVouchersByShopAndPeriodAndState',
    async ({shopId, startDate, endDate, status}) => {
      try {
        const response = await Api.get(`/voucher/shop${shopId}/${startDate}/${endDate}/${status}`);
        return { success: true, data: response.data };
      } catch (error) {
        throw error;
      }
    }
);

export const postBatch = createAsyncThunk(
    'cart/postAsyncBatch',
    async (initialData) => {
      console.log(initialData);
      try {
        const response = await Api.post('/batch/', initialData);
        return { success: true, data: response.data };
      } catch (error) {
        throw error;
      }
    }
);

export const postMerchandiseVoucher = createAsyncThunk(
    'cart/postMerchandiseVoucher',
    async (initialData) => {
      console.log(initialData);
      try {
        const response = await Api.post('/voucherUniversal/', initialData);
        return { success: true, data: response.data };
      } catch (error) {
        throw error;
      }
    }
);

export const voucherVerification = createAsyncThunk(
    'cart/voucherVerification',
    async (initialData) => {
      console.log(initialData);
      try {
        const response = await Api.post('/voucher/verify/', initialData);
        return { success: true, data: response };
      } catch (error) {
        console.error('Voucher verify error:', error);
        throw error;
      }
    }
);

export const fetchAsyncVouchers = createAsyncThunk('batch/fetchAsyncVouchers', async () => {
    try{
        const response = await Api
        .get(`/voucher/`)
        return [...response.data.data]
    }
    catch(err){
        console.log(err)
    }
})

export const fetchAsyncVouchersByBatch = createAsyncThunk('batch/fetchAsyncVouchersByBatch', async ({id, status, suspended}) => {
    console.log(status)
    const response = await Api
    .get(`/voucher/${id}`)
    const data = [...response.data.data]
    return {data, status, suspended}
})

// export const postVoucher = createAsyncThunk(
//     'cart/postAsyncVoucher',
//     async (initialData) => {
//       console.log(initialData);
//       return await Api
//         .post(`/voucher/?numberOfVouchers=${num}`, 
//           initialData
//         )
//         .then((res) => res.data);
//     }
// );

export const postVoucher = createAsyncThunk(
    'cart/postAsyncVoucher',
    async (initialData) => {
      const { num, ...postData } = initialData;
  
      console.log(initialData);
      return await Api
        .post(`/voucher/?numberOfVouchers=${num}`, postData)
        .then((res) => res.data);
    }
  );


export const updateBatch = createAsyncThunk('batch/updateBatch', 
    async (
        {
            id,
            batchName,
            active,
            batchId,
            suspended
        }) => {
    
    const response = await Api
    .put(`/batch/${id}`, {
            id,
            batchName,
            active,
            suspended
    } ,  {headers})
    const data = response.data
    return {data, id, batchId}
})

export const reactivateVoucher = createAsyncThunk('batch/reactivateVoucher', 
    async (
        {
            dateUsed,
            voucherId,
            macAddress,
            used,
        }) => {
    
    const response = await Api
    .put(`/voucher/${voucherId}`, {
            dateUsed,
            voucherCode: voucherId,
            macAddress,
            used,
    } ,  {headers})
    const data = response.data
    return {data}
})

// export const blockVoucher = createAsyncThunk('batch/blockVoucher', 
//     async (
//         {      
//             isBlocked,
//             voucherCode
//         }) => {
    
//     const response = await Api
//     .put(`/vouchers/${voucherCode}`, {
//         isBlocked,
//         voucherCode
//     } ,  {headers})
//     const data = response.data
//     return {data}
// })

export const blockVoucher = createAsyncThunk(
    'batch/blockVoucher',
    async ({isBlocked, voucherCode}) => {
        try {
            const response = await Api.put(`/vouchers/blocked/${voucherCode}`,{
                isBlocked,
                voucherCode
            }, {headers})
            return { success: true, data: response.data };
        } catch (error) {
            console.error('update error:', error);
            throw error;
        }
    }
);

export const updateAsyncVoucher = createAsyncThunk('batch/updateAsyncVoucher', 
    async (
        {
            approved,
            approvedBy,
            id,
            isBlocked,
            encryptedVoucherCode,
            used,
            firstname,
            surname,
            bundleName,
            voucherCode,
            voucherId
        }) => {
    
    const response = await Api
    .put(`/voucher/${id}`, {
        approved,
        approvedBy,
        id,
        isBlocked
    } ,  {headers})
    const data = response.data
    return {data, id, encryptedVoucherCode, used, firstname, surname, bundleName, voucherCode, voucherId}
})

export const updateAsyncVoucherOnSale = createAsyncThunk('batch/updateAsyncVoucherOnSale', 
    async (
        {
            approved,
            approvedBy,
            id,
            isBlocked,
            encryptedVoucherCode,
            used,
            firstname,
            surname,
            bundleName,
            voucherCode,
            voucherId
        }) => {
    
    const response = await Api
    .put(`/voucher/${id}`, {
        approved,
        approvedBy,
        id,
        isBlocked
    } ,  {headers})
    const data = response.data
    return {data, id, encryptedVoucherCode, used, firstname, surname, bundleName, voucherCode, voucherId}
})

const batchSlice = createSlice({
    name: 'batch',
    initialState: {
        batches: [],
        vouchers: [],
        voucherList: [],
        soldVouchers: [],
        soldUsedVouchers: [],
        selectedBatch: [],
        soldByShop: [],
        batchPostStatus: 'idle', // | 'success'
        voucherPostStatus: '', // | 'success'
        createdBatch: '',
        postLoading: false,
        postSuccess: false,
        postFail: false,
        createdVoucher: '',
        viewVouchers: '',
        viewVoucherStatus: 'idle',
        loading: '',
        posting: '',
        vcode: [],
        merchandise: [],
        loadingStatus: 'idle',
        postStatus: 'idle',
        soldStatus: '',
        usedStatus: '',
        statusSearch: 'idle',
        message: 'idle',
        verificationResponse: '',
        showMore: false,
        reactivateStatus: 'idle',
        merchandiseStatus: 'idle',
        blockingStatus: 'idle',
        verifyStatus: false
    },
    reducers: {
        clearVouchers(state, action){
            state.viewVouchers = false
            state.viewVoucherStatus = 'idle'
            state.soldVouchers = ""
        },
        vcodeCreation(state, action){
            state.vcode.push(action.payload)
        },
        showDetails(state, action){
            state.showMore = true
        },
        setVerify(state, action){
            state.statusSearch = 'idle'
        },
        postStatus(state, action){
            state.postLoading = action.payload
        },
        successStatus(state, action){
            state.postSuccess = action.payload
        },
        failStatus(state, action){
            state.postFail = action.payload
        }
    },
    extraReducers: {

        //Batch reducers
        [fetchAsyncBatches.pending]: (state)=>{
            console.log("pending")
            state.loading = 'pending'
            state.loadingStatus = 'pending'
        },
        [fetchAsyncBatches.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            state.loading = 'success'
            // return {...state, sales: payload}
            const loadedBatches = action.payload.map(batch=>{
                return batch
            })
            state.batches = loadedBatches
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncBatches.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loading = 'failed'
            state.loadingStatus = 'rejected'
        },
        [postBatch.pending]: (state)=>{
            state.batchPostStatus='pending'
            console.log("pending")
            state.posting = 'pending'
            state.postStatus = 'pending'
            state.voucherPostStatus = 'idle'
        },
        [postBatch.fulfilled]: (state, action) => {
            if (action.payload.success) {
              const { data } = action.payload;
            //   data.customers = {
            //     email: "string",
            //     firstname: "string",
            //     password: "string",
            //     id: 0,
            //     phone_number: "string",
            //     surname: "string"
            //   };
              console.log("batch response ",data);
            //   state.batches.push(data);
            } else {
              console.log('postBatch failed:', action.payload.error);
            }
        },
        [postBatch.rejected]: (state, {payload})=>{
            state.batchPostStatus='failed'
            console.log("rejected")
            state.posting = 'failed'
            state.postStatus = 'rejected'
        },
        [postMerchandiseVoucher.pending]: (state)=>{
            state.merchandisePostStatus='pending'
            console.log("pending")
            state.merchandiseStatus = 'pending'
        },
        [postMerchandiseVoucher.fulfilled]: (state, action) => {
            if (action.payload.success) {
              const { data } = action.payload;
              console.log("batch response ",data);
              state.merchandiseStatus = 'fulfilled'
            } else {
              console.log('postBatch failed:', action.payload.error);
            }
        },
        [postMerchandiseVoucher.rejected]: (state, {payload})=>{
            state.batchPostStatus='failed'
            console.log("rejected")
            state.merchandiseStatus = 'rejected'
        },
        [voucherVerification.pending]: (state)=>{
            console.log("pending")
            state.posting = 'pending'
            state.statusSearch = 'pending'
            state.voucherPostStatus = 'idle'
        },
        [voucherVerification.fulfilled]: (state, action)=>{
            if (action.payload.success) {
                const { data } = action.payload;
                console.log("success", data.data)
                if(data.data.code !== "NOT_FOUND"){
                    state.voucherPostStatus = data.data
                    state.verificationResponse = data.data
                    state.soldStatus = data.data.data.sold
                    state.usedStatus = data.data.data.used
                    state.message = data.data.data.code
                    state.showMore = true
                }
                else{
                    state.voucherPostStatus = data.data
                    state.message = data.data.code
                }
                state.verifyStatus = true
                state.statusSearch = 'fulfilled'
                return
            }
            else{
                state.message = 'not-found'
                state.statusSearch = 'rejected'
                return
            }
            
        },
        [voucherVerification.rejected]: (state, {payload})=>{
            state.batchPostStatus='failed'
            state.posting = 'failed'
            state.statusSearch = 'rejected'
        },

        //Voucher reducers
        
        [fetchAsyncVouchers.pending]: ()=>{
            console.log("pending")
        },
        [fetchAsyncVouchers.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            const loadedVouchers = action.payload.map(voucher=>{
                return voucher
            })
            state.vouchers = loadedVouchers
        },
        [fetchAsyncVouchers.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [fetchSoldVouchersByShopAndDate.pending]: (state)=>{
            state.loadingStatus = "pending"
        },
        [fetchSoldVouchersByShopAndDate.fulfilled]: (state, action)=>{
            state.loadingStatus = "fulfilled"
            state.soldByShop = action.payload
        },
        [fetchSoldVouchersByShopAndDate.rejected]: (state, {payload})=>{
            state.loadingStatus = "rejected"
        },
        [fetchSoldVouchersByAgentAndDate.pending]: ()=>{
            console.log("pending")
        },
        [fetchSoldVouchersByAgentAndDate.fulfilled]: (state, action)=>{
            console.log("fulfilled", action.payload)
            
            state.soldByShop = action.payload
        },
        [fetchSoldVouchersByAgentAndDate.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [fetchSoldVouchers.pending]: ()=>{
            console.log("pending")
        },
        [fetchSoldVouchers.fulfilled]: (state, action)=>{
            const { data } = action.payload
            console.log("fulfilled", data)
            const loadedVouchers = data.data.map(voucher=>{
                return voucher
            })
            state.soldVouchers = loadedVouchers
        },
        [fetchSoldVouchers.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [fetchAsyncSoldVouchers.pending]: (state)=>{
            state.loadingStatus = 'pending'
        },
        [fetchAsyncSoldVouchers.fulfilled]: (state, action)=>{
            const { data } = action.payload
            console.log("fulfilled", data)
            const loadedVouchers = data.data.map(voucher=>{
                return voucher
            })
            state.soldUsedVouchers = loadedVouchers
            state.loadingStatus = "fulfilled"
        },
        [fetchAsyncSoldVouchers.rejected]: (state, {payload})=>{
            state.loadingStatus =  "rejected"
        },
        [fetchSoldVouchersByDate.pending]: (state)=>{
            state.loadingStatus = "pending"
        },
        [fetchSoldVouchersByDate.fulfilled]: (state, action)=>{
            const { data } = action.payload
            console.log("fulfilled", data)
            const loadedVouchers = data.data.map(voucher=>{
                return voucher
            })
            state.soldVouchers = loadedVouchers
            state.loadingStatus = "fulfilled"
        },
        [fetchSoldVouchersByDate.rejected]: (state, {payload})=>{
            state.loadingStatus = "rejected"
        },
        [fetchAsyncVouchersByBatch.pending]: (state, action)=>{
            state.viewVoucherStatus = 'pending'
        },
        [fetchAsyncVouchersByBatch.fulfilled]: (state, action)=>{
            console.log(action.payload)
            // return {...state, sales: payload}
            // const loadedVoucher = Object.values(action.payload).map(voucher=>{
            //     return voucher
            // })
            state.viewVouchers = true
            state.viewVoucherStatus = 'fulfilled'
            state.selectedBatch = action.payload
            state.batchActive = action.payload.status
            state.batchSuspended = action.payload.suspended
        },
        [fetchAsyncVouchersByBatch.rejected]: (state, action)=>{
            state.viewVoucherStatus = 'fulfilled'
        },
        [postVoucher.pending]: ()=>{
            console.log("voucher posting pending")
        },
        [postVoucher.fulfilled]: (state, action)=>{
            console.log(action.payload)
            state.batchPostStatus = 'idle'
            state.voucherPostStatus = 'success'
            state.createdVoucher = action.payload.data.bundles.name
        },
        [postVoucher.rejected]: (state, action)=>{
            console.log("rejected")
            state.batchPostStatus = 'idle'
            state.voucherPostStatus = 'failed'
            state.createdVoucher = action.payload.data.bundles.name
        },
        [updateBatch.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            return { 
                ...state, 
                batches: state.batches.map(
                    (batch, i) => i === action.payload.batchId ? {
                        ...batch,
                        active: action.payload.data.data.active, 
                        suspended: action.payload.data.data.suspended, 
                        batcName: action.payload.data.data.batchName
                    }: batch
                )
            }
        },
        [updateAsyncVoucher.pending]: ()=>{
            console.log("voucher update pending")
        },
        [updateAsyncVoucher.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            console.log(action.payload)
            return { 
                ...state, 
                selectedBatch: state.selectedBatch.map(
                    (voucher, i) => i === action.payload.voucherId? {
                        ...voucher,
                        vouchers: {
                            id: action.payload.id,
                            encryptedVoucherCode: action.payload.encryptedVoucherCode,
                            isBlocked : action.payload.data.data.isBlocked,
                            approved: action.payload.data.data.approved,
                            approvedBy: action.payload.data.data.approvedBy,
                            used: action.payload.used,
                            voucherCode: action.payload.voucherCode
                        },
                        bundles: {
                            name : action.payload.bundleName
                        },
                        user: {
                            firstname: action.payload.firstname,
                            surname: action.payload.surname
                        }
                    }: voucher
                )
            }
        },
        [updateAsyncVoucher.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [updateAsyncVoucherOnSale.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            console.log(action.payload)
            return { 
                ...state, 
                selectedBatch: state.selectedBatch.map(
                    (voucher, i) => i === action.payload.voucherId? {
                        ...voucher,
                        vouchers: {
                            id: action.payload.id,
                            encryptedVoucherCode: action.payload.encryptedVoucherCode,
                            isBlocked : action.payload.data.data.isBlocked,
                            approved: action.payload.data.data.approved,
                            approvedBy: action.payload.data.data.approvedBy,
                            used: action.payload.used,
                            voucherCode: action.payload.voucherCode
                        },
                        bundles: {
                            name : action.payload.bundleName
                        },
                        user: {
                            firstname: action.payload.firstname,
                            surname: action.payload.surname
                        }
                    }: voucher
                )
            }
        },
        [reactivateVoucher.pending]: (state)=>{
            console.log("voucher update pending")
            state.reactivateStatus = 'pending'
        },
        [reactivateVoucher.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            console.log(action.payload)
            state.reactivateStatus = 'success'
        },
        [reactivateVoucher.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.reactivateStatus = 'failed'
        },
        [blockVoucher.pending]: (state)=>{
            console.log("voucher update pending")
            state.blockingStatus = 'pending'
        },
        [blockVoucher.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            console.log(action.payload)
            state.blockingStatus = 'success'
        },
        [blockVoucher.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.blockingStatus = 'rejected'
        },
    }
})

export const batchActions = batchSlice.actions
export const getAllBatches = (state) => state.batch.batches
export const getAllVouchers = (state) => state.batch.vouchers
export const getBatchStatus = (state) => state.batch.batchPostStatus
export const getVoucherStatus = (state) => state.batch.voucherPostStatus
export const getVoucherList = (state) => state.batch.voucherList
export const getCreatedBatch = (state) => state.batch.createdBatch
export const getVoucherType = (state) => state.batch.createdVoucher
export const getSoldVouchers = (state) => state.batch.soldVouchers
export const getSoldUsedVouchers = (state) => state.batch.soldUsedVouchers
export const getSelectedBatch = (state) => state.batch.selectedBatch
export const viewVouchers = (state) => state.batch.viewVouchers
export const voucherViewStatus = (state) => state.batch.viewVoucherStatus
export const getVCodes = (state) => state.batch.vcode
export const getLoadingStatus = (state) => state.batch.loadingStatus
export const getVBActive = (state) => state.batch.batchActive
export const getVBSuspended = (state) => state.batch.batchSuspended
export const getPostLoading = (state) => state.batch.postLoading
export const getPostSuccess = (state) => state.batch.postSuccess
export const getPostFail = (state) => state.batch.postFail
export const getSoldStatus = (state) => state.batch.soldStatus
export const getVouchersSoldByShop = (state) => state.batch.soldByShop
export const getUsedStatus = (state) => state.batch.usedStatus
export const getStatusSearch = (state) => state.batch.statusSearch
export const getSearchMessage = (state) => state.batch.message
export const getVerified = (state) => state.batch.verificationResponse
export const getVerifyStatus = (state) => state.batch.verifyStatus
export const getReactivate = (state) => state.batch.reactivateStatus
export const getBlockingStatus = (state) => state.batch.blockingStatus
export const getShow = (state) => state.batch.showMore
export const {clearVouchers} = batchSlice.actions
export default batchSlice