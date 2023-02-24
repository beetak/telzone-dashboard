import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";



export const fetchAsyncRole = createAsyncThunk('role/fetchAsyncRole', async () => {
    const response = await Api
    .get(`/role/`)
    return [...response.data.data]
})

export const postRole = createAsyncThunk(
    'role/postAsyncRole',
    async (initialData) => {
      console.log(initialData);
      return await Api
        .post('/role/', 
          initialData
        )
        .then((res) => res.data);
    }
);

const initialState = {
    roles: [],
    loadingStatus: 'idle'
}
const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        addRole: (state, {payload})=>{
            state.roles = payload
        }
    },
    extraReducers: {
        [fetchAsyncRole.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = ''
        },
        [fetchAsyncRole.fulfilled]: (state, action)=>{
            const loadedRoles = action.payload.map(role=>{
                return role
            })
            state.roles = loadedRoles
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncRole.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [postRole.pending]: ()=>{
            console.log("pending")
        },
        [postRole.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            
            action.payload.name = action.payload.data.bundles.name
            action.payload.price = action.payload.data.bundles.price
            action.payload.groupPolicyId = action.payload.data.bundles.groupPolicyId
            action.payload.description = action.payload.data.bundles.description
            console.log(action.payload)
            state.bundles.push(action.payload)
        },
        [postRole.rejected]: (state, {payload})=>{
            console.log("rejected")
        }
    }
})
export const {addRole} = roleSlice.actions
export const getAllRoles = (state) => state.role.roles
export const getLoadingStatus = (state) => state.role.loadingStatus
export default roleSlice