import { configureStore } from '@reduxjs/toolkit'
import tutorsSlice from './tutorsSlice'

export const store = configureStore({
  reducer: {
    [tutorsSlice.reducerPath]: tutorsSlice.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tutorsSlice.middleware),
})