import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";



export const fetchAsyncUser = createAsyncThunk('user/fetchAsyncUser', async () => {
    const response = await Api
    .get(`/admin-portal-user/`)
    return [...response.data.data]
})

export const postAsyncUser = createAsyncThunk('user/postAsyncUser', async (initialData) => {
    return await Api
        .post('/admin-portal-user/', 
            initialData
        )
        .then((res) => res.data);
})

export const userLogin = createAsyncThunk('user/userLogin', async (initialData) => {
    return await Api
        .post('/admin-portal-user/login/', 
            initialData
        )
        .then((res) => res.data);
})

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
    loginStatus: 'false',
    loadingStatus: 'idle'
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, {payload})=>{
            state.partners = payload
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
        [userLogin.pending]: ()=>{
            console.log("pending")
        },
        [userLogin.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            console.log(action.payload)
            state.loginStatus = true
            localStorage.setItem('email', action.payload.data.email)
            localStorage.setItem('firstname', action.payload.data.firstname)
            localStorage.setItem('surname', action.payload.data.surname)
            // localStorage.setItem('userId', response.data.data.id)
            localStorage.setItem('role', action.payload.data.role.role)
            console.log(action.payload)
            // state.users.push(action.payload)
        },
        [userLogin.rejected]: (state, {payload})=>{
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
export const {addUser} = userSlice.actions
export const getAllUsers = (state) => state.user.users
export const getLoginStatus = (state) => state.user.loginStatus
export const getLoadingStatus = (state) => state.user.loadingStatus
export default userSlice