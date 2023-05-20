import React from "react";
import Pagination from "@mui/material/Pagination";
type PaginationPropsType = {
  count : number
  callBack : (page : number)=> void
}
const MyPagination = (props : PaginationPropsType) => {
  return (
    <div>
      <Pagination onChange={(event, page)=>props.callBack(page)} count={props.count} color="primary" />
    </div>
  );
};

export default MyPagination;
