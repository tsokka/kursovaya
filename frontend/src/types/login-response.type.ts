import {RefreshResponseType} from "./refresh-response.type";

export type LoginResponseType = RefreshResponseType & {
  userId: string
}
