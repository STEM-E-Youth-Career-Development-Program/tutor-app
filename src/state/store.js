import { configureStore } from '@reduxjs/toolkit'
import tutorsSlice from './tutorsSlice'
import studentsSlice from './studentsSlice'

export const store = configureStore({
  reducer: {
    [tutorsSlice.reducerPath]: tutorsSlice.reducer,
    [studentsSlice.reducerPath]: studentsSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tutorsSlice.middleware).concat(studentsSlice.middleware),
})