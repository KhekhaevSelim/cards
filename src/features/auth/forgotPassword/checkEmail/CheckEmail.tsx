import React, { useState } from "react";
import style from "./CheckEmail.module.css";
import CommonButton, { CommonButtonPropsType } from "../../../../common/components/commonButton/CommonButton";
import CommonHeader from "../../../../common/components/commonHeader/CommonHeader";
import sendMessage from "../../../../common/assets/sendMessage.jpg";
import { Navigate } from "react-router-dom";

const CheckEmail = () => {
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
  const backToLoginButtonProps : CommonButtonPropsType = {
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
    title: "Back to login",
    callBack : () => {
      setRedirect(true)
    }
  }
const currentEmail = localStorage.getItem("email")
  if(redirect){
    return <Navigate to={"/login"}/>
  }
  return (
    <div className={style.container}>
      <CommonHeader isInside={false} buttonProps={registerCommonButtonProps} />
      <div className={style.formContainer}>

      <div className={style.form}>
        <div className={style.description}>
          Check Email
        </div>
        <img className={style.img} src={sendMessage} alt="send message icon" />
          <p className={style.helper}>
            {`Мы отправили инструкцию для восстановления пароля на Email ${currentEmail}`}
          </p>
        <CommonButton buttonProps={backToLoginButtonProps}/>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;