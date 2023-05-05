import React, { useEffect, useState } from "react";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import ModeIcon from "@mui/icons-material/Mode";
import style from "./EditableSpan.module.css"
import { EditProfileRequestType } from "../../../features/auth/auth.api";

type EditableSpanPropsType = {
  title : string
  callback : (data : EditProfileRequestType) => void
}
const EditableSpan = (props : EditableSpanPropsType) => {
  useEffect(()=> {
    setName(props.title)
  },[props.title])

  const [edit, setEdit] = useState<boolean>(false)
  const [name, setName] = useState<string>(props.title)
  const toggleEditMode = () => {
    setEdit(true)
  }
  const editName = () => {
    const newProfileData : EditProfileRequestType= {
      avatar : "",
      name : name
    }
    props.callback(newProfileData)
  setEdit(false)
  }
  return (
    <div>
      {edit ?
        <FormControl className={style.input} variant="outlined">
          <InputLabel >Nick name</InputLabel>
          <OutlinedInput
            type={"text"}
            value={name}
            onChange={(e)=>setName(e.currentTarget.value)}
            endAdornment={
              <InputAdornment position="end">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={editName}
                  >
                    save
                  </Button>
              </InputAdornment>
            }
            label="NickName"
          />
        </FormControl>
        :
        <span className={style.editableLine}>{props.title} <ModeIcon className={style.editIcon} onClick={toggleEditMode}/></span>
      }
    </div>
  );
};

export default EditableSpan;