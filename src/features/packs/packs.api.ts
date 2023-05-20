import { instance } from "../../common/api";

export const packsApi = {
  getPacks(params : getPacksQueryParams){
    return instance.get<GetPacksResponseType>("/cards/pack", { params })
  }
}

export type getPacksQueryParams = {
    page: number,
    pageCount:number,
    user_id: string
    min : number
    max: number
    sortPacks : number
    packName : string
}

export type CardPacksType = {
  _id: string
  user_id: string
  name: string
  cardsCount: number
  created: string
  updated: string
}

export type GetPacksResponseType = {
  cardPacks : CardPacksType[]
  cardPacksTotalCount : number
  maxCardsCount : number
  minCardsCount : number
  page : number
  pageCount : number
  token : string
  tokenDeathTime : number
}
