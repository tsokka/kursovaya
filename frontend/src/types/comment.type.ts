import {UserInfo} from "./user-info.type";

export type CommentType = {
  id: string,
  text: string,
  date: string,
  likesCount: number,
  dislikesCount: number,
  user: UserInfo
}
