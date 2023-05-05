import React, { useState } from "react";
import style from "./ForgotPassword.module.css";
import CommonHeader from "../../../common/components/commonHeader/CommonHeader";
import CommonButton, { CommonButtonPropsType } from "../../../common/components/commonButton/CommonButton";
import { Navigate, NavLink } from "react-router-dom";
import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../app/hooks";
import { authThunks } from "../auth.slice";
import { ForgotPasswordRequestType } from "../auth.api";
import { useSelector } from "react-redux";

const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const [redirect, setRedirect] = useState<boolean>(false)
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
  const sendInstructionsButtonProps = {
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
    title: "Send instructions"
  }
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: (values)   => {
      const payload : ForgotPasswordRequestType = {
        email : values.email,
        from : "твой личный Хакер)))",
        message: `<div style="background-color: lime; padding: 15px">
чтобы восстановить пароль перейдите по ссылке: 
<a href='http://localhost:3000/setNewPassword/$token$'>
link</a>
</div>`
      }
      localStorage.setItem("email", payload.email)
dispatch(authThunks.forgotPassword(payload))
      formik.resetForm()
      setRedirect(true)
    }
  });
  if(redirect){
    return <Navigate to={"/checkEmail"}/>
  }
  return (
    <div className={style.container}>
      <CommonHeader isInside={false} buttonProps={registerCommonButtonProps} />
      <div className={style.formContainer}>

      <div className={style.form}>
        <div className={style.description}>
          Forgot your password?
        </div>
        <form onSubmit={formik.handleSubmit} className={style.centralForm}>
        <div className={style.centralForm}>
          <FormControl className={style.input} variant="outlined" >
            <InputLabel>Email</InputLabel>
            <OutlinedInput
              {...formik.getFieldProps("email")}
              type={"email"}
              label="Email"
            />
          </FormControl>
          <p className={style.helper}>
            Введите свой email адрес и мы вышлем вам дальнейшую инструкцию
          </p>
        </div>
        <CommonButton buttonProps={sendInstructionsButtonProps}/>
        </form>
        <div className={style.footer}>
          <p className={style.helper}>
            Вспомнили пароль?
          </p>
          <NavLink to={"/login"} className={style.redirect}>Try logging in</NavLink>
        </div>

      </div>
      </div>
    </div>
  );
};

export default ForgotPassword;