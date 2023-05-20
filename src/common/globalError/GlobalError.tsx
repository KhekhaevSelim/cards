import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelect";
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { appActions } from "../../app/app.slice";

const GlobalError = () => {
  const error = useAppSelector(state => state.app.error)
  console.log('error', error);
  const dispatch = useAppDispatch();

  if (error !== null) {
    toast.error(error);
  }

    useEffect(() => {
      if (error !== null) {
        setTimeout(() => {
          dispatch(appActions.setAppError({ error: null }));
        }, 1000);
      }
    }, [error])

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};

export default GlobalError;