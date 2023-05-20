import React, { useState } from "react";
import CommonButton, { CommonButtonPropsType } from "../../../../common/components/commonButton/CommonButton";
import { useFormik } from "formik";
import { authThunks } from "../../auth.slice";
import { Navigate, useParams } from "react-router-dom";
import style from "./SetNewPassword.module.css";
import CommonHeader from "../../../../common/components/commonHeader/CommonHeader";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAppDispatch } from "../../../../common/hooks";

const SetNewPassword = () => {
  const dispatch = useAppDispatch()
  const [redirect, setRedirect] = useState<boolean>(false)
  const [showPassword, setShowPassword] = React.useState(false);

  const token = useParams<{ token :string}>()

  console.log(token.token);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };
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
  const setNewPasswordButtonProps = {
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
    title: "Create new password"
  }
  const formik = useFormik({
    initialValues: {
      password: ""
    },
    onSubmit: (values)   => {
    const payload = {
      password : values.password,
      resetPasswordToken: token.token
    }
      dispatch(authThunks.setNewPassword(payload))
      formik.resetForm()
      setRedirect(true)
    }
  });
  if(redirect){
    return <Navigate to={"/login"}/>
  }
  return (
    <div className={style.container}>
      <CommonHeader isInside={false} buttonProps={registerCommonButtonProps} />
      <div className={style.formContainer}>

        <div className={style.form}>
          <div className={style.description}>
            Create new password
          </div>
          <form onSubmit={formik.handleSubmit} className={style.centralForm}>
            <div className={style.centralForm}>
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
              <p className={style.helper}>
                Введите новый пароль и мы отправим вам дальнейшую инструкцию
              </p>
            </div>
            <CommonButton buttonProps={setNewPasswordButtonProps}/>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SetNewPassword;