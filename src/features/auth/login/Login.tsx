import React from "react";
import { authThunks } from "../auth.slice";
import CommonHeader from "../../../common/components/commonHeader/CommonHeader";
import style from "./Login.module.css";
import CommonButton, { CommonButtonPropsType } from "../../../common/components/commonButton/CommonButton";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigate, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { LoginRequestType } from "../auth.api";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { toast } from "react-toastify";

const Login = () => {
  const profile = useAppSelector(state => state.auth.profile)
  const dispatch = useAppDispatch();
  const registerCommonButtonProps: CommonButtonPropsType = {
    style: {
      width: "100px",
      height: "30px",
      backgroundColor: "#366EFF",
      borderRadius: "20px",
      border: "none",
      color: "white",
      fontSize: "16px",
      cursor: "pointer"
    },
    title: "Sign in"

  };
  const signInButtonProps = {
    style: {
      width: "20vw",
      height: "30px",
      backgroundColor: "#366EFF",
      borderRadius: "20px",
      border: "none",
      color: "white",
      fontSize: "16px",
      cursor: "pointer"
    },
    title: "Sign in"
  }
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password : "",
      rememberMe : false
    },
    onSubmit: (values: LoginRequestType)  => {
      dispatch(authThunks.login(values)).then((res)=> {
        if(!res.payload?.error)
        toast.success("Вы успешно залогинились")
      })
      formik.resetForm()
    }
  });
  if(profile !== null){
    return <Navigate to={"/profile"}/>
  }
  return (
    <div className={style.container}>
      <CommonHeader isInside={false} userName={"aaaaaa"} img={"asdasdsa"} buttonProps={registerCommonButtonProps} />
      <div className={style.formContainer}>
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <div className={style.description}>
            Sign in
          </div>
          <div className={style.centralForm}>
          <FormControl className={style.input} variant="outlined" >
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              {...formik.getFieldProps("email")}
              type={"email"}
              label="Email"
            />
          </FormControl>

          <FormControl className={style.input} variant="outlined">
            <InputLabel >Password</InputLabel>
            <OutlinedInput
              {...formik.getFieldProps("password")}
              id="outlined-adornment-password"
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControlLabel
            label="Remember me"
            control={
              <Checkbox
                checked={formik.values.rememberMe}
                {...formik.getFieldProps("rememberMe")}
              />}
          />
          </div>
          <div className={style.forgotPassword}>
           <NavLink className={style.redirect} to={"/forgotPassword"}>Забыли пароль ?</NavLink>
          </div>
          <CommonButton buttonProps={signInButtonProps}/>
          <div className={style.question}>
            У вас нет аккаунта?
          </div>
          <NavLink
            className={style.redirect}
            to={"/register"}
          >Sign up</NavLink>
        </form>
      </div>
    </div>
  );
};

export default Login;
