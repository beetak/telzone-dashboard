import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import MerakiApi from "../components/Api/MerakiApi";



export const fetchAsyncGroupPolicy = createAsyncThunk('policies/fetchAsyncGroupPolicy', async () => {
    const response = await MerakiApi
    .get(`/networks/L_575897802350008785/groupPolicies`)
    return [...response.data]
})

export const postGroupPolicy = createAsyncThunk('policies/fetchAsyncGroupPolicy', async (initialData) => {
    const response = await MerakiApi
        .post(`/networks/L_575897802350008785/groupPolicies`, initialData)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
        return response.data
})
const postData = createAsyncThunk(
    'postData',
    async (data, BundleApi) => {

        const config = {
            method: 'post',
            url: '/bundle',
            data: data
        };

        const response = await axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            console.log(error);
            });
        return response.data
    }
)

const initialState = {
    policies: [],
    loadingStatus: 'idle'
}
const policySlice = createSlice({
    name: 'policies',
    initialState,
    reducers: {
        addBundle: (state, {payload})=>{
            state.policies = payload
        }
    },
    extraReducers: {
        [fetchAsyncGroupPolicy.pending]: (state)=>{
            console.log("pending")
            state.loadingStatus = 'pending'
        },
        [fetchAsyncGroupPolicy.fulfilled]: (state, action)=>{
            const loadedPolicies = action.payload.map(policy=>{
                return policy
            })
            state.policies = state.policies.concat(loadedPolicies)
            state.loadingStatus = 'fulfilled'
        },
        [fetchAsyncGroupPolicy.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingStatus = 'rejected'
        },
        [postGroupPolicy.pending]: ()=>{
            console.log("pending")
        },
        [postGroupPolicy.fulfilled]: (state, {payload})=>{
            console.log("fulfilled")
            return {...state, policies: payload}
        },
        [postGroupPolicy.rejected]: (state, {payload})=>{
            console.log("rejected")
        }
    }
})
export const {addPolicy} = policySlice.actions
export const getAllPolicies = (state) => state.policy.policies
export const getLoadingStatus = (state) => state.policy.loadingStatus
export default policySlice