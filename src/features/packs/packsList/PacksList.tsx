import React, { ChangeEvent, useEffect } from "react";
import CommonHeader from "../../../common/components/commonHeader/CommonHeader";
import { useAppDispatch, useAppSelector } from "../../../common/hooks";
import { authThunks } from "../../auth/auth.slice";
import { Navigate } from "react-router-dom";
import style from "./PacksList.module.css";
import MySlider from "../../../common/components/slider/Slider";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import SearchLine from "../../../common/components/searchLine/SearchLine";
import Button from '@mui/material/Button';
import CommonButton from "../../../common/components/commonButton/CommonButton";
import { packsActions, packsThunk } from "../packs.slice";
import MyPagination from "../pagination/Pagination";
const PacksList = () => {
  const dispatch = useAppDispatch();
  const profile = useAppSelector(state => state.auth.profile);
  const isInitialized = useAppSelector(state => state.auth.isInitialized);
  const packs = useAppSelector(state => state.pack)
  const pagesCount = Math.ceil(packs.cardPacksTotalCount/packs.params.pageCount)
  useEffect(()=> {
    dispatch(packsThunk.getPacks())
  },[packs.params])
const addPackBtnProps = {
  style: {
    width: "150px",
    height: "30px",
    backgroundColor: "#366EFF",
    borderRadius: "20px",
    border: "none",
    color: "white",
    fontSize: "16px",
    cursor: "pointer"
  },
  title: "add new pack"
}
  useEffect(() => {
    if (profile === null) {
      dispatch(authThunks.me());
    }
  }, []);
  if (!isInitialized) {
    return <Navigate to={"/login"} />;
  }
const changePage = (page : number) => {
    dispatch(packsActions.changePage({ page }))
}
  const changeCardsCountPerPage = (e : ChangeEvent<HTMLInputElement>) => {
    dispatch(packsActions.changeCardsCountPerPage({ pageCount : +e.currentTarget.value}))
  }

  const chooseMyPacks = () => {
    dispatch(packsActions.chooseMyPacks({ user_id : profile?._id as string }))
  }
  const chooseAllPacks = () => {
    dispatch(packsActions.chooseAllPacks({ user_id : ""}))
  }
  return (
    <div className={style.container}>
      <CommonHeader isInside={true} img={""} userName={profile?.email} />
      <div className={style.packsListContainer}>
        <div className={style.tableHead}>
          <span>Packs List</span>
          <CommonButton buttonProps={addPackBtnProps}/>
        </div>
        <div className={style.settings}>
          <div className={style.search}>
            <span>search</span>
            <SearchLine packName={packs.params.packName}/>
          </div>
          <div className={style.sortByWho}>
            <span>show packs cards</span>
            <div>
              <Button variant={packs.params.user_id ? "outlined" : "contained"} className={style.sortByWhoBtn} onClick={chooseAllPacks}>all</Button>
              <Button variant={packs.params.user_id ? "contained" : "outlined"} className={style.sortByWhoBtn} onClick={chooseMyPacks} >my</Button>
            </div>
          </div>
          <div className={style.sortByCardNums}>
            <span>number of cards</span>
            <div className={style.materialComponents}>
              <MySlider min={packs.params.min} max={packs.params.max}/>
              <FilterAltOffIcon className={style.filterOff}/>
            </div>
          </div>
        </div>
        <table border={1} className={style.tableContainer}>
         <thead>
         <tr>
           <th align={"left"}>Name</th>
           <th align={"left"}>Cards</th>
           <th align={"left"}>Last updated</th>
           <th align={"left"}>Created by</th>
           <th align={"left"}>Actions</th>
         </tr>
         </thead>
          <tbody>
          {packs?.cardPacks?.map(c=> {
            return (
              <tr key={c._id}><td>{c.name}</td><td>{c.cardsCount}</td><td>{c.updated}</td><td>{c.created}</td><td>actions</td></tr>
            )
          })}
          </tbody>
        </table>
        <div className={style.paginationContainer}>
          <MyPagination count={pagesCount} callBack={changePage}/> <span>show <input
          onChange={changeCardsCountPerPage}
          type="number"
          value={packs?.params?.pageCount}/> cards per page</span>
        </div>
      </div>
    </div>
  );
};

export default PacksList;
