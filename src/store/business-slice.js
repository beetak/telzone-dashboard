import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";



export const fetchAsyncBusiness = createAsyncThunk('business/fetchAsyncBusiness', async (active) => {
  
    const response = await Api
    .get(`/businessPartner/${active}`)
    return [...response.data.data]
    
})

export const postAsyncBusiness = createAsyncThunk('business/postAsyncBusiness', async (initialData) => {
    return await Api
        .post('/business_partner/', 
            initialData
        )
        .then((res) => res.data);
})

const headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}

export const updateBusinessPartner = createAsyncThunk('business/updateBusinessPartner', 
    async (
        {
            id,
            active,
            businessAddress,
            email,
            name,
            phoneNumber,
            partnerId
        }) => {
    
    const response = await Api
    .put(`/businessPartner/${id}`, {
        id,
        active,
        businessAddress,
        email,
        name,
        phoneNumber
    } ,  {headers})
    const data = response.data
    return {data, id, partnerId}
})

const initialState = {
    partners: [],
    loadingStatus: 'idle'
}
const businessSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        addBusiness: (state, {payload})=>{
            state.partners = payload
        }
    },
    extraReducers: {
        [fetchAsyncBusiness.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncBusiness.fulfilled]: (state, action)=>{
            console.log("sucess")
            const loadedPartners = action.payload.map(business=>{
                return business
            })
            state.partners = loadedPartners
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncBusiness.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [postAsyncBusiness.pending]: ()=>{
            console.log("pending")
        },
        [postAsyncBusiness.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            action.payload.name = action.payload.data.businessPartner.name
            action.payload.businessAddress = action.payload.data.businessPartner.businessAddress
            action.payload.email = action.payload.data.businessPartner.email
            action.payload.phoneNumber = action.payload.data.businessPartner.phoneNumber
            console.log(action.payload)
            state.partners.push(action.payload)
        },
        [postAsyncBusiness.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [updateBusinessPartner.pending]: (state) =>{
            console.log("Update Pending")
        },
        [updateBusinessPartner.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            return { 
                ...state, 
                partners: state.partners.map(
                    (partner, i) => i === action.payload.partnerId ? {
                        ...partner,
                        active: action.payload.data.data.active, 
                        name: action.payload.data.data.name, 
                        businessAddress: action.payload.data.data.businessAddress,
                        phoneNumber: action.payload.data.data.phoneNumber,
                        email: action.payload.data.data.email        
                    }: partner
                )
            }
        },
        [updateBusinessPartner.rejected]: (state) =>{
            console.log("Update Failed")
        }
    }
})
export const {addBusiness} = businessSlice.actions
export const getAllBusinessPartners = (state) => state.business.partners
export const getLoadingStatus = (state) => state.business.loadingStatus
export default businessSlice