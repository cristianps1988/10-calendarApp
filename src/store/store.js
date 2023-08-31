import { configureStore } from "@reduxjs/toolkit";
import { authSlice, calendarSlice, uiSlice, eventFormSlice } from "./";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer,
        eventForm: eventFormSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})