import CommonHeader from "common/components/commonHeader/CommonHeader";
import React, { useEffect } from "react";
import style from "./Profile.module.css";
import avatar from "../../../common/assets/avatar.jpg";
import EditableSpan from "../../../common/components/editableSpan/EditableSpan";
import LogButton, { LogButtonPropsType } from "../../../common/components/logButton/LogButton";
import { authThunks } from "../auth.slice";
import { EditProfileRequestType } from "../auth.api";
import { Navigate, NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../common/hooks";
import { useAppSelector } from "../../../common/hooks";
import { toast } from "react-toastify";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Profile = () => {

  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.auth.profile)
  const isInitialized = useAppSelector(state => state.auth.isInitialized)
  useEffect(()=> {
    if(profile === null){
      dispatch(authThunks.me())
    }
  },[])

  let isHaveImg = false;
  const logButtonProps : LogButtonPropsType = {
    style : {
      width: "150px",
      height: "40px",
      backgroundColor: "white",
      borderRadius: "20px",
      border: "none",
      color: "black",
      fontSize: "20px",
      cursor : "pointer",
      boxShadow : "0px 0px 27px 6px rgba(34, 60, 80, 0.2)",
      display : "flex",
      justifyContent : "center",
      alignItems : "center"
    },
    title : "log out",

  }
  const editProfile = (profileData : EditProfileRequestType) => {
    const newProfileData : EditProfileRequestType = {
      name : profileData.name,
      avatar : profileData.avatar
    }
    dispatch(authThunks.editProfile(newProfileData))
  }
  const logOut = () => {
    dispatch(authThunks.logOut()).then((res)=> {
      toast.success("Вы успешно разлогинились")
    })
  }

 if(!isInitialized){
   return <Navigate to={"/login"}/>
 }
  return (
    <div className={style.container}>
      <CommonHeader isInside={true} img={""} userName={profile?.email}/>
      <NavLink to={"/packsList"} className={style.backToPacksContainer}>
        <ArrowBackIcon/> Back to Packs List
      </NavLink>
      <div className={style.profileContainer}>
         <div className={style.profile}>
          <p className={style.title}>Personal information</p>
           {isHaveImg ?
             <img className={style.ava} src={isHaveImg} alt="" />
             :
             <img className={style.ava} src={avatar} alt="" />
           }
          <EditableSpan title={profile?.name ? profile?.name : "no name"} callback={(data)=>editProfile(data)}/>
           <div className={style.email}>
             {profile?.email}
           </div>
          <LogButton buttonProps={logButtonProps} callBack={logOut}/>
         </div>
      </div>
    </div>
  );
};

export default Profile;
