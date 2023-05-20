import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "../../common/utils/createAppAsyncThunk";
import { thunkTryCatch } from "../../common/utils/thunkTryCatch";
import { getPacksQueryParams, GetPacksResponseType, packsApi } from "./packs.api";



const getPacks = createAppAsyncThunk<GetPacksResponseType,void>
("packs/getPacks", async (arg, thunkAPI)=> {
  return thunkTryCatch(thunkAPI, async ()=> {
    const { getState } = thunkAPI
    const params = getState().pack.params
    const res = await packsApi.getPacks( params )
    return res.data
  })
})



const packsInitialState = {
  params : {
    page : 1,
    pageCount : 5,
    min : 0,
    max : 110,
    sortPacks : 0,
    packName : "",
    user_id : ""
  }
} as InitialStateType

const slice = createSlice({
  name : "packs",
  initialState : packsInitialState,
  reducers : {
    changePage : (state,action : PayloadAction<{page : number}>) => {
      state.params.page = action.payload.page
    },
    changeCardsCountPerPage : (state, action : PayloadAction<{ pageCount : number}>) => {
      state.params.pageCount = action.payload.pageCount
    },
    changeSearchLineTitle : (state, action : PayloadAction<{ packName : string }>) => {
      state.params.packName = action.payload.packName
    },
    changeSliderMin : (state, action: PayloadAction<{ min : number}>) => {
      state.params.min = action.payload.min
    },
    changeSliderMax : (state, action: PayloadAction<{ max : number}>) => {
      state.params.max = action.payload.max
    },
    chooseMyPacks : (state, action : PayloadAction<{ user_id : string }>) => {
      state.params.user_id = action.payload.user_id
    },
    chooseAllPacks : (state, action: PayloadAction<{ user_id : string }>) => {
      state.params.user_id = action.payload.user_id
    }
  },
  extraReducers : builder => {
    builder.addCase(getPacks.fulfilled, (state, action) => {
      state.page = action.payload.page
      state.pageCount = action.payload.pageCount
      state.cardPacks = action.payload.cardPacks
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount
      state.maxCardsCount = action.payload.maxCardsCount
      state.minCardsCount = action.payload.minCardsCount
    })
  }})

export const packReducer = slice.reducer
export const packsThunk = { getPacks }
export const packsActions = slice.actions


type InitialStateType = GetPacksResponseType & {
  params : getPacksQueryParams
}
