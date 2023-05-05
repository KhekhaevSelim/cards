import React, { useEffect } from "react";
import "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "./store";
import { appActions } from "./app.slice";
import { Outlet } from "react-router-dom";
import style from "./App.module.css"

function App() {
  const isLoading = useSelector<RootStateType, boolean>(state => state.app.isLoading)
  const dispatch = useDispatch()

  useEffect(()=> {
    setTimeout(()=> {
      dispatch(appActions.setIsLoading({ isLoading : false}))
    }, 3000)
  },[])
    return (
        <div className={style.App}>
          {/*{isLoading ? <div className={style.loading}>Loading...</div> : <div className={style.loading}>state</div>}*/}
          <Outlet/>
        </div>
    );
}

export default App;
