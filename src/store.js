import { configureStore } from "@reduxjs/toolkit";
import venueReducer from './slices/venueSlice'
import addOnReducer from "./slices/addOnSlice"

export default configureStore({
    reducer : {
        venue : venueReducer,
        addOn : addOnReducer,
    }
})