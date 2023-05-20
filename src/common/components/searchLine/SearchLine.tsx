import React, { ChangeEvent, useState } from "react";
import style from "./SearchLine.module.css";
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../hooks";
import { packsActions } from "../../../features/packs/packs.slice";
type SearchLinePropsType = {
  packName : string
}
const SearchLine = (props : SearchLinePropsType) => {
 const dispatch = useAppDispatch()
  const changeSearchLineTitle = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
   dispatch(packsActions.changeSearchLineTitle({ packName : e.currentTarget.value } ))
  }
  return (
    <FormControl  variant="outlined">
      <InputLabel size={"small"}>введите название</InputLabel>
      <OutlinedInput
        className={style.input}
        size={"small"}
        type={"text"}
        value={props.packName}
        onChange={changeSearchLineTitle}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon/>
          </InputAdornment>
        }
        label="введите название"
      />
    </FormControl>
  );
};

export default SearchLine;
