import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../components/Api/Api";

export const fetchAsyncBundles = createAsyncThunk('bundle/fetchAsyncBundles', async (active) => {
    const response = await Api
    .get(`/bundles/${active}`)
    return [...response.data.data]
})

export const postBundle = createAsyncThunk('bundle/postAsyncBundle', async (initialData) => {
      return await Api
        .post('/bundle/', 
          initialData
        )
        .then((res) => res.data);
    }
);

const headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}

export const updateBundle = createAsyncThunk('bundle/updateBundle', 
    async (
        {
            id,
            active,
            description,
            image,
            name,
            price,
            bundleCategoryId,
            currencyId,
            groupPolicyId,
            bundleId
        }) => {
    
    const response = await Api
    .put(`/bundle/${id}`, {
            active,
            description,
            id,
            image,
            name,
            price,
            bundleCategoryId,
            currencyId,
            groupPolicyId
    } ,  {headers})
    const data = response.data
    return {data, id, bundleId}
})

const bundleSlice = createSlice({
    name: 'bundle',
    initialState: {
        bundles: [],
        updateBundle: '',
        loadingStatus: 'idle'
    },
    reducers: {
        
    },
    extraReducers: {
        [fetchAsyncBundles.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncBundles.fulfilled]: (state, action)=>{      
            console.log("fulfilled")
            const loadedBundles = action.payload.map(bundle=>{
                return bundle
            })
            state.bundles = loadedBundles
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncBundles.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [postBundle.pending]: ()=>{
            console.log("pending")
        },
        [postBundle.fulfilled]: (state, action)=>{
            action.payload.active = true
            action.payload.bundleCategory = {
                "active": true,
                "dateCreated": "2022-11-16T10:23:46.734Z",
                "description": "string",
                "duration": 0,
                "name": action.payload.data.bundleCategory.name,
                "user": {
                  "active": true,
                  "email": "string",
                  "firstname": "string",
                  "id": 0,
                  "password": "string",
                  "phoneNumber": "string",
                  "surname": "string"
                }
            }
            action.payload.currency = {
                "active": true,
                "dateCreated": "2022-11-16T10:23:46.734Z",
                "name": "string",
                "symbol": action.payload.data.currency.symbol,
                "user": {
                  "active": true,
                  "email": "string",
                  "firstname": "string",
                  "id": action.payload.data.currency.id,
                  "password": "string",
                  "phoneNumber": "string",
                  "surname": "string"
                }
            }
            action.payload.name = action.payload.data.bundles.name
            action.payload.price = action.payload.data.bundles.price
            action.payload.groupPolicyId = action.payload.data.bundles.groupPolicyId
            action.payload.description = action.payload.data.bundles.description
            console.log(action.payload)
            state.bundles.push(action.payload)
            
        },
        [postBundle.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [updateBundle.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            console.log(action.payload)
            // state.isLoading = false;
            // state.isSuccess = true;
            // state.bundles.map((bundle) => {
            //     if (bundle.id === action.payload.id) {
            //         bundle.name = action.payload.name;
            //         bundle.price = action.payload.price;
            //         bundle.description = action.payload.description;
            //         bundle.groupPolicyId = action.payload.groupPolicyId;
            //         bundle.currency.symbol = "action.payload.currencyId";
            //         // bundle.bundleCategory.name = "action.payload.bundleCategoryId";
            //     }
            // });
            // state.updateBundle = 'success'
            // state.bundles.push(action.payload)
            // state.bundles = state.bundles.filter(bundle => bundle.id !== action.payload)
            return { 
                ...state, 
                bundles: state.bundles.map(
                    (bundle, i) => i === action.payload.bundleId ? {
                        ...bundle,
                        active: action.payload.data.data.active, 
                        name: action.payload.data.data.name, 
                        description: action.payload.data.data.description,
                        bundleCategoryId: { name: action.payload.data.bundleCategoryId },
                        price: action.payload.data.data.price
                    }: bundle
                )
            }
        }
    }
})

export const bundleActions = bundleSlice.actions
export const getAllBundles = (state) => state.bundle.bundles
export const getUpdateStatus = (state) => state.bundle.updateBundle
export const getLoadingStatus = (state) => state.bundle.loadingStatus
export default bundleSlice