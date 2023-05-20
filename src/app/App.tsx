import React from "react";
import { Outlet } from "react-router-dom";
import style from "./App.module.css";
import "react-toastify/dist/ReactToastify.css";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { useAppSelector } from "common/hooks/useAppSelect";

function App() {
  const isLoading = useAppSelector<boolean>(state => state.app.isLoading)


    return (
        <div className={style.App}>
          {isLoading && <LinearProgress className={style.loading}/>}
          <Outlet/>
        </div>
    );
}

export default App;
