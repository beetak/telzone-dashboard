import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: 'toggle',
    initialState: {
        toggleState: true,
        local: false
    },
    reducers: {
        changeState(state, action){
            state.toggleState = action.payload.status
        },
        changePaymentMethod(state, action){
            state.local = action.payload.payment
        }
    }
})

export const toggleActions = toggleSlice.actions
export const getToggleStatus = (state) => state.toggle.toggleState
export const getPaymentMethod = (state) => state.toggle.local
export default toggleSlice