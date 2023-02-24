import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";



export const fetchAsyncBusinessRole = createAsyncThunk('role/fetchAsyncBusinessRole', async () => {
    const response = await Api
    .get(`/businessPartnerRoles/`)
    return [...response.data.data]
})

export const postRole = createAsyncThunk(
    'role/postAsyncBusinessRole',
    async (initialData) => {
      console.log(initialData);
      return await Api
        .post('/businessPartnerRoles/', 
          initialData
        )
        .then((res) => res.data);
    }
);

const initialState = {
    roles: [],
    loadingStatus: 'idle'
}
const businessRoleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        addRole: (state, {payload})=>{
            state.roles = payload
        }
    },
    extraReducers: {
        [fetchAsyncBusinessRole.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = ''
        },
        [fetchAsyncBusinessRole.fulfilled]: (state, action)=>{
            const loadedRoles = action.payload.map(role=>{
                return role
            })
            state.roles = loadedRoles
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncBusinessRole.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [postRole.pending]: ()=>{
            console.log("pending")
        },
        [postRole.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            console.log(action.payload)
            state.bundles.push(action.payload)
        },
        [postRole.rejected]: (state, {payload})=>{
            console.log("rejected")
        }
    }
})
export const {addRole} = businessRoleSlice.actions
export const getAllBusinessRoles = (state) => state.businessRole.roles
export const getLoadingStatus = (state) => state.businessRole.loadingStatus
export default businessRoleSlice