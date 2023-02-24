import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";



export const fetchAsyncCategory = createAsyncThunk('category/fetchAsyncCategory', async (active) => {
   
    const response = await Api
    .get(`/bundleCategory/${active}`)
    return [...response.data.data]
    
})

export const postCategory = createAsyncThunk('category/postAsyncCategory', async (initialData) => {
    return await Api
        .post('/bundleCategory/', 
            initialData
        )
        .then((res) => res.data);
})

const headers = {
    'Accept' : 'application/json',
    'Content-Type' : 'application/json'
}

export const updateCategory = createAsyncThunk('category/updateCategory', 
    async (
        {
            id,
            name,
            description,
            active,
            duration,
            categoryId
        }) => {
    
    const response = await Api
    .put(`/bundleCategory/${id}`, {
        id,
        name,
        description,
        active,
        duration
    } ,  {headers})
    const data = response.data
    return {data, id, categoryId}
})

const initialState = {
    categories: [],
    loadingStatus: 'idle'
}
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        addCategory: (state, {payload})=>{
            state.categories = payload
        }
    },
    extraReducers: {
        [fetchAsyncCategory.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncCategory.fulfilled]: (state, action)=>{
            console.log("sucess")
            const loadedCategories = action.payload.map(category=>{
                return category
            })
            state.categories = loadedCategories
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncCategory.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [postCategory.pending]: ()=>{
            console.log("pending")
        },
        [postCategory.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            action.payload.active = true
            action.payload.user = {
                "active": true,
                "email": "string",
                "firstname": "string",
                "id": 0,
                "password": "string",
                "phoneNumber": "string",
                "surname": "string"
            }
            action.payload.name = action.payload.data.bundleCategory.name
            action.payload.duration = action.payload.data.bundleCategory.duration
            action.payload.description = action.payload.data.bundleCategory.description
            console.log(action.payload)
            state.categories.push(action.payload)
        },
        [postCategory.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [updateCategory.fulfilled]: (state, action) =>{
            console.log("Update Successful")
            console.log("the payload", action.payload);
            return { 
                ...state, 
                categories: state.categories.map(
                    (category, i) => i === action.payload.categoryId ? {
                        ...category,
                        active: action.payload.data.data.active, 
                        name: action.payload.data.data.name, 
                        description: action.payload.data.data.description
                    }: category
                )
            }
        }
    }
})
export const {addCategory} = categorySlice.actions
export const getAllCategories = (state) => state.category.categories
export const getLoadingStatus = (state) => state.category.loadingStatus
export default categorySlice