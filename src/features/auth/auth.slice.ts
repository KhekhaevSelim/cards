import { createSlice } from "@reduxjs/toolkit";
import {
  authApi,
  EditProfileResponseType,
  EditProfileRequestType,
  ForgotPasswordRequestType,
  LoginRequestType,
  LogOutResponseType,
  ProfileType,
  RegisterRequestType, PasswordResponseType, SetNewPasswordRequestType
} from "./auth.api";
import { createAppAsyncThunk } from "../../common/utils/createAppAsyncThunk";

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null,
    isInitialized : false,
    isRegister : false
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action)=> {
     state.isRegister = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
      state.isInitialized = true

    })
      builder.addCase(me.fulfilled, (state,action) => {
        state.profile = action.payload
        state.isInitialized = true
      })
        builder.addCase(editProfile.fulfilled, (state, action)=> {
          state.profile = action.payload.updatedUser
        })
        builder.addCase(logOut.fulfilled, (state, action)=> {
          if(action.payload.info !== ""){
            state.profile = null
            state.isInitialized = false
          }
        })
        builder.addCase(setNewPassword.fulfilled, (state, action)=> {
          console.log(action.payload);
        });
  }


});


// Thunks
const register = createAppAsyncThunk<void, RegisterRequestType>
("auth/register", async (arg) => {
  await authApi.register(arg)
});

const login = createAppAsyncThunk<{ profile: ProfileType }, LoginRequestType>
("auth/login", async (arg) => {

  const res = await authApi.login(arg);
  return { profile: res.data };
});
const me = createAppAsyncThunk <ProfileType,void>
("auth/me", async (arg, thunkAPI)=>{
  const res = await authApi.me()
  return res.data
})
const logOut = createAppAsyncThunk<LogOutResponseType,void>
("auth/logout", async (arg, thunkAPI)=> {
  const res = await authApi.logout()
  return res.data
})

const editProfile = createAppAsyncThunk<EditProfileResponseType,EditProfileRequestType>
("auth/changeProfile", async (arg, thunkAPI)=> {
  const res = await authApi.editProfile(arg)
  return res.data
})
const forgotPassword = createAppAsyncThunk<void ,ForgotPasswordRequestType>
("auth/forgotPassword", async (arg, thunkAPI)=> {
  const res = await authApi.forgotPassword(arg)
})
const setNewPassword = createAppAsyncThunk<PasswordResponseType, SetNewPasswordRequestType>
("auth/setNewPassword", async (arg)=> {
  const res = await authApi.setNewPassword(arg)
  return res.data
})
export const authReducer = slice.reducer;
export const authThunks = { register, login, me, editProfile, logOut, forgotPassword, setNewPassword};
export const authActions = slice.actions;