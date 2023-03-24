import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cart-slice";
import batchSlice from "./batch-slice";
import bundleSlice from "./bundle-slice";
import categorySlice from "./category-slice";
import policySlice from "./policy-slice";
import currencySlice from "./currency-slice";
import businessSlice from "./business-slice";
import advertSlice from "./adverts-slice";
import roleSlice from "./role-slice";
import userSlice from "./user-slice";
import priceSlice from "./basePrice-slice";
import clientSlice from "./clients-slice";
import reportSlice from "./report-slice";
import statsSlice from "./statistics-slice";
import toggleSlice from "./toggle-slice";
import saleSlice from "./sales-slice";
import businessRoleSlice from "./business-role-slice";
import customerPaymentsSlice from "./customerPayments-slice";

const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        batch: batchSlice.reducer,
        bundle: bundleSlice.reducer,
        currency: currencySlice.reducer,
        category: categorySlice.reducer,
        policy: policySlice.reducer,
        business: businessSlice.reducer,
        advert: advertSlice.reducer,
        role: roleSlice.reducer,
        user: userSlice.reducer,
        price: priceSlice.reducer,
        client: clientSlice.reducer,
        report: reportSlice.reducer,
        statistics: statsSlice.reducer,
        toggle: toggleSlice.reducer,
        sale: saleSlice.reducer,
        businessRole: businessRoleSlice.reducer,
        customerPayments: customerPaymentsSlice.reducer
    }
})
export default store