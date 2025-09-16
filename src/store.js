import { configureStore } from "@reduxjs/toolkit";
import venueReducer from './slices/venueSlice'
import addOnReducer from "./slices/addOnSlice"
import mealsReducer from "./slices/mealsSlice";

export default configureStore({
    reducer : {
        venue : venueReducer,
        addOn : addOnReducer,
        meals : mealsReducer
    }
})