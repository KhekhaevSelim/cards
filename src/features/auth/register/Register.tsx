import { useAppDispatch, useAppSelector } from "app/hooks";
import React from "react";
import { authThunks } from "../auth.slice";
import style from "./Register.module.css";
import CommonButton, { CommonButtonPropsType } from "../../../common/components/commonButton/CommonButton";
import CommonHeader from "common/components/commonHeader/CommonHeader";
import { Form, useFormik } from "formik";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigate, NavLink } from "react-router-dom";
import { RegisterRequestType } from "../auth.api";


const Register = () => {
  const dispatch = useAppDispatch();
  const isRegister = useAppSelector(state => state.auth.isRegister)
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
  const signUpButtonProps = {
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
    title: "Sign up"
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
        confirmPassword : ""
      },
      onSubmit: (values: RegisterRequestType)  => {
        const payload = {
          email: values.email,
          password: values.password
        };
        dispatch(authThunks.register(payload));
        formik.resetForm()
      },
    });
 if(isRegister){
   return <Navigate to={"/login"}/>
 }
  return (
    <div className={style.container}>
      <CommonHeader isInside={false} userName={"aaaaaa"} img={"asdasdsa"} buttonProps={registerCommonButtonProps} />
      <div className={style.formContainer}>
       <form onSubmit={formik.handleSubmit} className={style.form}>
         <div className={style.description}>
           Sign up
         </div>
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
         <FormControl className={style.input} variant="outlined">
           <InputLabel>Password</InputLabel>
           <OutlinedInput
             {...formik.getFieldProps("confirmPassword")}
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
             label="Confirm password"
           />
         </FormControl>
         <CommonButton buttonProps={signUpButtonProps}/>
         <div className={style.question}>
           У вас уже есть аккаунт?
         </div>
         <NavLink
           className={style.redirect}
           to={"/login"}
         >Sign in</NavLink>
       </form>
      </div>
    </div>
  );
};

export default Register;