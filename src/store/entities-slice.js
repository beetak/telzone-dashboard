import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../components/Api/Api";



export const fetchAsyncRole = createAsyncThunk('entity/fetchAsyncRole', async () => {
    const response = await Api
    .get(`/role/`)
    return [...response.data.data]
})

export const postRole = createAsyncThunk(
    'entity/postAsyncRole',
    async (initialData) => {
      console.log(initialData);
      return await Api
        .post('/role/', 
          initialData
        )
        .then((res) => res.data);
    }
);

export const fetchAsyncRegion = createAsyncThunk('entity/fetchAsyncRegion', async () => {
    const response = await Api
    .get(`/region/`)
    return [...response.data.data]
})

export const postRegion = createAsyncThunk(
    'entity/postAsyncRole',
    async (initialData) => {
      console.log(initialData);
      return await Api
        .post('/region/', 
          initialData
        )
        .then((res) => res.data);
    }
);

export const fetchAsyncTown = createAsyncThunk('entity/fetchAsyncTown', async () => {
    const response = await Api
    .get(`/town/`)
    return [...response.data.data]
})

export const postTown = createAsyncThunk(
    'entity/postAsyncRole',
    async (initialData) => {
      console.log(initialData);
      return await Api
        .post('/town/', 
          initialData
        )
        .then((res) => res.data);
    }
);

export const fetchAsyncShop = createAsyncThunk('entity/fetchAsyncShop', async () => {
    const response = await Api
    .get(`/shop/`)
    return [...response.data.data]
})

export const postShop = createAsyncThunk(
    'entity/postAsyncRole',
    async (initialData) => {
      console.log(initialData);
      return await Api
        .post('/shop/', 
          initialData
        )
        .then((res) => res.data);
    }
);

const initialState = {
    roles: [],
    shops: [],
    towns: [],
    regions: [],
    loadingShop: 'idle',
    loadingTown: 'idle',
    loadingRegion: 'idle',
    loadingRole: 'idle',
}
const entitySlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        addEntity: (state, {payload})=>{
            state.roles = payload
        }
    },
    extraReducers: {
        [fetchAsyncRole.pending]: (state)=>{
            console.log("pending")
            state.loadingRole = 'pending'
        },
        [fetchAsyncRole.fulfilled]: (state, action)=>{
            const loadedRoles = action.payload.map(role=>{
                return role
            })
            state.roles = loadedRoles
            state.loadingRole = 'fulfilled'
        },
        [fetchAsyncRole.rejected]: (state)=>{
            console.log("rejected")
            state.loadingRole = 'rejected'
        },
        [postRole.pending]: ()=>{
            console.log("pending")
        },
        [postRole.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            action.payload.role = action.payload.data.role.role
            console.log(action.payload)
            state.roles.push(action.payload)
        },
        [postRole.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [fetchAsyncShop.pending]: (state)=>{
            console.log("pending")
            state.loadingShop = 'pending'
        },
        [fetchAsyncShop.fulfilled]: (state, action)=>{
            console.log('shops: ', action.payload)
            const loadedShops = action.payload.map(shop=>{
                return shop
            })
            state.shops = loadedShops
            state.loadingShop = 'fulfilled'
        },
        [fetchAsyncShop.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingShop = 'rejected'
        },
        [postShop.pending]: ()=>{
            console.log("pending")
        },
        [postShop.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            action.payload.name = action.payload.shop.name
            action.payload.address = action.payload.shop.address
            action.payload.phoneNumber = action.payload.shop.phoneNumber
            console.log(action.payload)
            state.shops.push(action.payload)
        },
        [postShop.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [fetchAsyncTown.pending]: (state)=>{
            console.log("pending")
            state.loadingTown = 'pending'
        },
        [fetchAsyncTown.fulfilled]: (state, action)=>{
            const loadedRoles = action.payload.map(town=>{
                return town
            })
            state.towns = loadedRoles
            state.loadingTown = 'fulfilled'
        },
        [fetchAsyncTown.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingTown = 'rejected'
        },
        [postTown.pending]: ()=>{
            console.log("pending")
        },
        [postTown.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            
            action.payload.name = action.payload.data.town.name
            action.payload.regionId = {
                id: 1,
                name: action.payload.data.regionId.name,
                dateCreated: 1680074005000
            }
            console.log(action.payload)
            state.towns.push(action.payload)
        },
        [postTown.rejected]: (state, {payload})=>{
            console.log("rejected")
        },
        [fetchAsyncRegion.pending]: (state)=>{
            console.log("pending")
            state.loadingRegion = 'pending'
        },
        [fetchAsyncRegion.fulfilled]: (state, action)=>{
            const loadedRoles = action.payload.map(region=>{
                return region
            })
            state.regions = loadedRoles
            state.loadingRegion = 'fulfilled'
        },
        [fetchAsyncRegion.rejected]: (state, {payload})=>{
            console.log("rejected")
            state.loadingRegion = 'rejected'
        },
        [postRegion.pending]: ()=>{
            console.log("pending")
        },
        [postRegion.fulfilled]: (state, action)=>{
            console.log("fulfilled")
            
            action.payload.name = action.payload.data.region.name
            console.log(action.payload)
            state.regions.push(action.payload)
        },
        [postRegion.rejected]: (state, {payload})=>{
            console.log("rejected")
        }
    }
})
export const entityActions = entitySlice.actions
export const getAllRoles = (state) => state.entity.roles
export const getAllRegions = (state) => state.entity.regions
export const getAllTowns = (state) => state.entity.towns
export const getAllShops = (state) => state.entity.shops
export const getLoadingShop = (state) => state.entity.loadingShop
export const getLoadingRegion = (state) => state.entity.loadingRegion
export const getLoadingTown = (state) => state.entity.loadingTown
export const getLoadingRole = (state) => state.entity.loadingRole
export default entitySlice