import {CommentType} from "./comment.type";

export type ArticleDetailType = {
  id: string,
  title: string,
  description: string,
  image: string,
  text: string,
  date: string,
  category: string,
  url: string,
  comments: CommentType[],
  commentsCount: number
}
