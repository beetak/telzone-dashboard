import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";

export const fetchAsyncClients = createAsyncThunk('client/fetchAsyncClients', async () => {
    
    const response = await Api
    .get(`/customer/`)
    return [...response.data.data]
   
})

export const fetchAsyncClientCpnnections = createAsyncThunk('client/fetchAsyncClientConnections', async () => {
    
    const response = await Api
    .get(`/splash_page_connections/`)
    return [...response.data.data]
   
})

const headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}

export const updateClients = createAsyncThunk('client/updateClients', 
    async (
        {
            id
        }) => {
    
    const response = await Api
    .put(`/clients/${id}`, {
        id
    } ,  {headers})
    const data = response.data
    return {data, id}
})

const clientSlice = createSlice({
    name: 'client',
    initialState: {
        clients: [],
        loadingStatus: 'idle'
    },
    reducers: {
        
    },
    extraReducers: {
        [fetchAsyncClients.pending]: (state)=>{
            state.loadingStatus = 'pending'
        },
        [fetchAsyncClients.fulfilled]: (state, action)=>{
            const loadedClient = action.payload.map(client=>{
                return client
            })
            state.clients = loadedClient
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncClients.rejected]: (state, {payload})=>{
            state.loadingStatus = 'rejected'
        },
        [updateClients.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            console.log("the payload", action.payload);
        }
    }
})

export const actionsActions = clientSlice.actions
export const getAllClients = (state) => state.client.clients
export const getLoadingStatus = (state) => state.client.loadingStatus
export default clientSlice