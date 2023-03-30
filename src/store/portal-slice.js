import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";



export const fetchAsyncPortalLogins = createAsyncThunk('portal/fetchAsyncPortalLogins', async () => {
    const response = await Api
    .get(`/splash_page_logins/`)
    return [...response.data.data]
})

const initialState = {
    portalLogins: [],
    portalActivities: [],
    loadingLogins: 'idle',
    loadingActivities: 'idle'
}
const portalSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        addRole: (state, {payload})=>{
            state.roles = payload
        }
    },
    extraReducers: {
        [fetchAsyncPortalLogins.pending]: (state)=>{
            console.log("pending")
            state.loadingLogins = 'pending'
        },
        [fetchAsyncPortalLogins.fulfilled]: (state, action)=>{
            const loadedLogins = action.payload.map(role=>{
                return role
            })
            state.portalLogins = loadedLogins
            state.loadingLogins = 'fulfilled'
        },
        [fetchAsyncPortalLogins.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingLogins = 'rejected'
        }
    }
})
export const portalActions = portalSlice.actions
export const getAllLogins = (state) => state.portal.portalLogins
export const getLoginLoading = (state) => state.portal.loadedLogins
export const getAllActivities = (state) => state.portal.loadedActivities
export const getLoadingStatus = (state) => state.portal.loadingStatus
export default portalSlice