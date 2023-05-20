import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootStateType } from "../../app/store";

export const thunkTryCatch = async (thunkAPI : BaseThunkAPI<RootStateType, unknown, AppDispatch,any>, logic : Function) => {
  const { dispatch, rejectWithValue } = thunkAPI
  // dispatch(appActions.setIsLoading({ isLoading : true }))
  try {
    return await logic()
  } catch (e) {
    return rejectWithValue(e);
  }
  // finally {
  //   dispatch(appActions.setIsLoading({ isLoading : false }))
  // }
}
