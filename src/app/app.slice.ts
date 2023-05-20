import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";
const appInitialState = {
  error: null as string | null,
  isLoading: false,
  isAppInitialized: false,
}

const slice = createSlice({
  name : "app",
  initialState : appInitialState,
  reducers : {
   setIsLoading : (state, action : PayloadAction<{ isLoading: boolean }>) =>  {
   state.isLoading = action.payload.isLoading
   },
   setAppError : (state, action : PayloadAction<{ error : null|string}>) => {
     state.error = action.payload.error
   }
  },
  extraReducers : builder => {
    builder.addMatcher((action)=> {
      return action.type.endsWith('/pending')
    }, (state,action)=> {
      state.isLoading = true
    })
      .addMatcher((action)=> {
        return action.type.endsWith('/rejected')
      }, (state, action)=> {
        const err = action.payload as Error | AxiosError<{ error : string }>
        if(isAxiosError(err)){
          state.error = err.response ? err.response.data.error : err.message
        } else {
          state.error = `native error ${err.message}`
        }
        state.isLoading = false
      })
      .addMatcher((action)=> {
        return action.type.endsWith('/fulfilled')
      }, (state, action)=> {
        state.isLoading = false
      })
  }
})

export const appReducer = slice.reducer
export const appActions = slice.actions