import { combineReducers, configureStore } from "@reduxjs/toolkit"
import languageReducer from "./reducers/languageSlice"

const rootReducer = combineReducers({
  language: languageReducer
})

const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
