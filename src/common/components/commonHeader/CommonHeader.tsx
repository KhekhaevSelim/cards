import React from "react";
import CommonButton, { CommonButtonPropsType } from "../commonButton/CommonButton";
import style from "./CommonHeader.module.css";
import avatar from "../../assets/avatar.jpg";

type CommonHeaderPropsType = {
  userName?: string
  img?: string
  isInside: boolean
  buttonProps? : CommonButtonPropsType
}


const CommonHeader = (props : CommonHeaderPropsType) => {

  return (
    <div className={style.container}>
      <div className={style.title}>
      IT-INCUBATOR
      </div>
      {props.isInside ?
      <div className={style.info}>
        <div className={style.userName}>{props.userName}</div>
        {props.img ?
          <img src={props.img} className={style.ava}/>
          :
          <img className={style.ava} src={avatar} alt={"a"}/>}
      </div>
        :
        <div className={style.button}>
          <CommonButton buttonProps={props.buttonProps} />
        </div>
      }
    </div>
  );
};

export default CommonHeader;
