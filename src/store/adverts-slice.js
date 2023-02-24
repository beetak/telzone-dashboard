import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Api from "../components/Api/Api";

export const fetchAsyncAdvert = createAsyncThunk('advert/fetchAsyncAdvert', async () => {
   
    const response = await Api
    .get(`/adverts/`)
    return [...response.data.data]
   
})

export const postAsyncAdvert = createAsyncThunk('advert/postAsyncAdvert', async (initialData) => {
      return await Api
        .post('/adverts/', 
          initialData
        )
        .then((res) => res.data);
    }
);

const headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}

export const updateAdvert = createAsyncThunk('advert/updateAdvert', 
    async (
        {
            id,
            active,
            description,
            title,
            image,
            advertId
        }) => {
    
    const response = await Api
    .put(`/adverts/${id}`, {
        id,
        active,
        description,
        title,
        image
    } ,  {headers})
    const data = response.data
    return {data, id, advertId}
})

const advertSlice = createSlice({
    name: 'advert',
    initialState: {
        adverts: [],
        updateAdvert: '',
        loading: '',
        posting: '',
        loadingStatus: 'idle'
    },
    reducers: {
        
    },
    extraReducers: {
        [fetchAsyncAdvert.pending]: (state)=>{
            state.loadingStatus = 'pending'
        },
        [fetchAsyncAdvert.fulfilled]: (state, action)=>{
            state.loadingStatus = 'fulfilled'
            const loadedAds = action.payload.map(advert=>{
                return advert
            })
            state.adverts = loadedAds
        },
        [fetchAsyncAdvert.rejected]: (state, {payload})=>{
            state.loadingStatus = 'rejected'
        },
        [postAsyncAdvert.pending]: (state)=>{
            console.log("pending")
            state.posting = 'pending'
        },
        [postAsyncAdvert.fulfilled]: (state, action)=>{
            state.posting = 'success'
            action.payload.active = true
            action.payload.id = action.payload.data.adverts.id
            action.payload.image = action.payload.data.adverts.image
            action.payload.title = action.payload.data.adverts.title
            action.payload.description = action.payload.data.adverts.description
            console.log(action.payload)
            state.adverts.push(action.payload)
            
        },
        [postAsyncAdvert.rejected]: (state, {payload})=>{
            state.posting = 'failed'
            console.log("rejected")
        },
        [updateAdvert.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            console.log("the payload", action.payload);
            return { 
                ...state, 
                adverts: state.adverts.map(
                    (advert, i) => i === action.payload.advertId ? {
                        ...advert,
                        id: action.payload.id,
                        active: action.payload.data.data.active, 
                        title: action.payload.data.data.title, 
                        image: action.payload.data.data.image, 
                        description: action.payload.data.data.description,
                    }: advert
                )
            }
        }
    }
})

export const actionsActions = advertSlice.actions
export const getAllAdverts = (state) => state.advert.adverts
export const getUpdateStatus = (state) => state.advert.updateAdvert
export const getLoadStatus = (state) => state.advert.loading
export const getPostingStatus = (state) => state.advert.posting
export const getLoadingStatus = (state) => state.advert.loadingStatus
export default advertSlice