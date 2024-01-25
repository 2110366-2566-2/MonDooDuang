import { createSlice, PayloadAction } from "@reduxjs/toolkit"

//Example of a redux slice

export interface LanguageState {
  selectedLanguage: string
}

const initialState: LanguageState = {
  selectedLanguage: "th-th"
}

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setSelectedLanguage(state, action: PayloadAction<string>) {
      state.selectedLanguage = action.payload
    }
  }
})

export const languageActions = languageSlice.actions
export default languageSlice.reducer
