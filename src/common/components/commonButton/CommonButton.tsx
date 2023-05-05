import React, { ReactComponentElement } from "react";

export type CommonButtonPropsType = {
  style : {
    width: string;
    height: string;
    backgroundColor: string;
    borderRadius: string;
    border: string;
    color: string;
    fontSize: string;
    cursor : string;
  },
  title : string,
  callBack? : () => void
}

export type ButtonPropsType = {
  buttonProps?: CommonButtonPropsType
}

const CommonButton = (props : ButtonPropsType) => {
  return (
    <div>
      <button onClick={props.buttonProps?.callBack} style={props.buttonProps?.style}>
        {props.buttonProps?.title}</button>
    </div>
  );
};

export default CommonButton;