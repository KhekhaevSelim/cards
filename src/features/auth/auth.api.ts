import { instance } from "../../common/api";

export const authApi = {
  register(payload: RegisterRequestType) {
    return instance.post<RegisterResponseType>("auth/register", payload);
  },
  login(payload: LoginRequestType) {
    return instance.post<ProfileType>("auth/login", payload);
  },
  me() {
    return instance.post<ProfileType>("auth/me");
  },
  editProfile(payload : EditProfileRequestType) {
    return instance.put<EditProfileResponseType>("auth/me", payload);
  },
  logout(){
    return instance.delete<LogOutResponseType>("auth/me")
  },
  forgotPassword(payload : ForgotPasswordRequestType){
    return instance.post<PasswordResponseType>("auth/forgot",payload)
  },
  setNewPassword(payload : SetNewPasswordRequestType) {
    return instance.post<PasswordResponseType>("auth/set-new-password", payload)
  }
};


// Types
export type RegisterRequestType = Omit<LoginRequestType, "rememberMe">
export type LoginRequestType = {
  email: string
  password: string
  rememberMe: boolean
}

export type RegisterResponseType = {
  addedUser: UserType;
}
export type EditProfileRequestType = {
  name: string ,
  avatar: string
}
export type UserType = Omit<ProfileType, "token" | "tokenDeathTime">

export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
}

export type EditProfileResponseType = {
  updatedUser: ProfileType

  error?: string
}

export type LogOutResponseType = {
  info : string
  error : string
}
export type ForgotPasswordRequestType =  {
  email: string,
  from: string,
  message: `<div style="background-color: lime; padding: 15px">
чтобы восстановить пароль перейдите по ссылке: 
<a href='http://localhost:3000/setNewPassword/$token$'>
link</a>
</div>`
}

export type PasswordResponseType = {
  info: string
  error: string;
}
export type SetNewPasswordRequestType = {
  password: string
  resetPasswordToken?: string
}