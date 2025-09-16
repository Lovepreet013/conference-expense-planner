import { configureStore } from "@reduxjs/toolkit";
import venueReducer from './slices/venueSlice'

export default configureStore({
    reducer : {
        venue : venueReducer,
    }
})