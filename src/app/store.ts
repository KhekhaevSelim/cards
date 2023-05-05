import { AnyAction, configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { appReducer } from "./app.slice";
import { authReducer } from "../features/auth/auth.slice";

export const store = configureStore({
  reducer : {
  app : appReducer,
    auth : authReducer
  }
})

export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, AnyAction>
