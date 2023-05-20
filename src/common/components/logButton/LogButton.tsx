import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import style from "./LogButton.module.css";

export type LogButtonPropsType = {
  style : {
    width: string;
    height: string;
    backgroundColor: string;
    borderRadius: string;
    border: string;
    color: string;
    fontSize: string;
    cursor : string;
    boxShadow ?: string;
    display? : string;
    justifyContent? : string;
    alignItems? : string
  },
  title : string,
}

type ButtonPropsType = {
  buttonProps : LogButtonPropsType
  callBack?: ()=> void
}

const LogButton = (props : ButtonPropsType) => {
  return (
    <div className={style.container}>
      <button style={props.buttonProps.style} onClick={props.callBack}>
        <LogoutIcon/>
        {props.buttonProps.title}</button>
    </div>
  );
};

export default LogButton;
