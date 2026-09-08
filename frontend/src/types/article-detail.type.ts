import {CommentType} from "./comment.type";
import {ArticleType} from "./article.type";

export type ArticleDetailType = ArticleType & {
  text: string,
  comments: CommentType[],
  commentsCount: number
}
