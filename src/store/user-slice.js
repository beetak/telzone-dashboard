import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";

export const fetchAsyncUser = createAsyncThunk('user/fetchAsyncUser', async () => {
    const response = await Api
    .get(`/admin-portal-user/`)
    return [...response.data.data]
})

export const fetchAsyncShopAgents = createAsyncThunk('user/fetchAsyncShopAgents', async ({roleId, shopId}) => {
    const response = await Api
    .get(`/admin-portal-user/roleId${roleId}/shopId${shopId}`)
    return [...response.data.data]
})

export const postAsyncUser = createAsyncThunk('user/postAsyncUser', async (initialData) => {
    return await Api
        .post('/admin-portal-user/', 
            initialData
        )
        .then((res) => res.data);
})

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (initialData) => {
      try {
        const response = await Api.post('/admin-portal-user/login/', initialData);
        return { success: true, data: response.data };
      } catch (error) {
        console.log("login res", error)
        return {success: false, data: error}
      }
    }
);

const headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}

export const updateUser = createAsyncThunk('user/updateUser', 
    async (
        {
            id,
            active,
            emailAddress,
            firstname,
            surname,
            userId,
            password
        }) => {
    
    const response = await Api
    .put(`/adminPortalUsers/${id}`, {
        id,
        active,
        emailAddress,
        firstname,
        surname,
        password
    } ,  {headers})
    const data = response.data
    return {data, id, userId}
})


const initialState = {
    users: [],
    shopAgents: [],
    loginStatus: 'false',
    loadingStatus: 'idle',
    loginLoadingStatus: 'idle',
    globalUser: '',
    loggedUser: ''
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, {payload})=>{
            state.partners = payload
        },
        setGlobalUser: (state, action) => {
            state.globalUser = action.payload
        }
    },
    extraReducers: {
        [fetchAsyncUser.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncUser.fulfilled]: (state, action)=>{
            console.log("sucess")
            const loadedPartners = action.payload.map(user=>{
                return user
            })
            state.users = loadedPartners
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncUser.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [fetchAsyncShopAgents.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncShopAgents.fulfilled]: (state, action)=>{
            console.log("sucess")
            const loadedPartners = action.payload.map(user=>{
                return user
            })
            state.shopAgents = loadedPartners
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncShopAgents.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [postAsyncUser.pending]: ()=>{
            console.log("pending")
        },
        [postAsyncUser.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            console.log(action.payload)
            action.payload.active = action.payload.data.adminPortalUsers.active
            action.payload.surname = action.payload.data.adminPortalUsers.surname
            action.payload.emailAddress = action.payload.data.adminPortalUsers.email_address
            action.payload.role = action.payload.data.role
            action.payload.firstname = action.payload.data.adminPortalUsers.firstname
            console.log(action.payload)
            state.users.push(action.payload)
        },
        [postAsyncUser.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [loginUser.pending]: (state)=>{
            state.loginLoadingStatus='pending'
        },
        [loginUser.fulfilled]: (state, action) => {
            if (action.payload.success) {
              const { data } = action.payload;
              state.loginLoadingStatus = 'fulfilled'
              state.loggedUser = data
            } else {
              console.log('login failed:', action.payload.error);
            }
        },
        [loginUser.rejected]: (state, {payload})=>{
            state.loginLoadingStatus='failed'
            console.log("rejected")
        },
        [updateUser.pending]: (state) =>{
            console.log("Update Pending")
        },
        [updateUser.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            console.log("Payload: ", action.payload)
            return { 
                ...state, 
                users: state.users.map(
                    (user, i) => i === action.payload.userId ? {
                        ...user,
                        active: action.payload.data.data.active, 
                        firstname: action.payload.data.data.firstname, 
                        emailAddress: action.payload.data.data.email_address,
                        surname: action.payload.data.data.surname      
                    }: user
                )
            }
        },
        [updateUser.rejected]: (state) =>{
            console.log("Update Failed")
        }
    }
})
export const userActions = userSlice.actions
export const getAllUsers = (state) => state.user.users
export const getShopAgents = (state) => state.user.shopAgents
export const getLoginStatus = (state) => state.user.loginStatus
export const getLoadingStatus = (state) => state.user.loadingStatus
export const getLoggedUser = (state) => state.user.loggedUser
export const getLoginLoadingStatus = (state) => state.user.loginLoadingStatus
export const getGlobalUser = (state) => state.user.globalUser
export default userSlice