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

export const postBatch = createAsyncThunk(
    'cart/postAsyncBatch',
    async (initialData) => {
      console.log(initialData);
      return await Api
        .post('/batch/', 
          initialData
        )
        .then((res) => res.data);
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

export const postVoucher = createAsyncThunk(
    'cart/postAsyncVoucher',
    async (initialData) => {
      console.log(initialData);
      return await Api
        .post('/voucher/', 
          initialData
        )
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
        selectedBatch: [],
        batchPostStatus: 'idle', // | 'success'
        voucherPostStatus: '', // | 'success'
        createdBatch: '',
        createdVoucher: '',
        viewVouchers: '',
        viewVoucherStatus: 'idle',
        loading: '',
        posting: '',
        vcode: [],
        loadingStatus: 'idle',
        postStatus: 'idle'
    },
    reducers: {
        clearVouchers(state, action){
            state.viewVouchers = false
            state.viewVoucherStatus = 'idle'
        },
        vcodeCreation(state, action){
            state.vcode.push(action.payload)
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
        [postBatch.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            state.batchPostStatus = 'success'
            state.createdBatch = action.payload.data.batch.id
            action.payload.id = action.payload.data.batch.id
            state.batches = state.batches.concat(action.payload)
            state.posting = 'success'
            state.postStatus = 'fulfilled'
            state.getVoucherStatus = 'idle'
        },
        [postBatch.rejected]: (state, {payload})=>{
            state.batchPostStatus='failed'
            console.log("rejected")
            state.posting = 'failed'
            state.postStatus = 'rejected'
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
        [fetchAsyncVouchers.rejected]: (state, {payload})=>{
            console.log("rejected")
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
        }
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
export const getSelectedBatch = (state) => state.batch.selectedBatch
export const viewVouchers = (state) => state.batch.viewVouchers
export const voucherViewStatus = (state) => state.batch.viewVoucherStatus
export const getVCodes = (state) => state.batch.vcode
export const getLoadingStatus = (state) => state.batch.loadingStatus
export const getVBActive = (state) => state.batch.batchActive
export const getVBSuspended = (state) => state.batch.batchSuspended
export const getPostingStatus = (state) => state.batch.postStatus
export const {clearVouchers} = batchSlice.actions
export default batchSlice