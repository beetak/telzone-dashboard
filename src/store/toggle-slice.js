import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        toggleState: true,
        local: false,
        startTime: ''
    },
    reducers: {
        changeState(state, action){
            state.toggleState = action.payload.status
        },
        changePaymentMethod(state, action){
            state.local = action.payload.payment
        },
        setTimeSpan(state, action){
            state.startTime = action.payload
        }
    }
})

export const toggleActions = toggleSlice.actions
export const getToggleStatus = (state) => state.toggle.toggleState
export const getPaymentMethod = (state) => state.toggle.local
export const getStartTime = (state) => state.toggle.startTime
export default toggleSlice