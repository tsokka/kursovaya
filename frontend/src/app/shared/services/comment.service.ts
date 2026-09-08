import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {CommentsResponseType, CommentActionType, CommentActionEnumType, DefaultResponseType} from "../../../types";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  getComments(offset: number, articleId: string): Observable<CommentsResponseType> {
    return this.http.get<CommentsResponseType>(environment.api + 'comments', {
      params: {offset: offset, article: articleId}
    });
  }

  addComment(text: string, articleId: string): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text: text,
      article: articleId
    });
  }

  applyAction(commentId: string, action: CommentActionEnumType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments/' + commentId + '/apply-action', {
      action: action
    });
  }

  getArticleCommentActions(articleId: string): Observable<CommentActionType[] | DefaultResponseType> {
    return this.http.get<CommentActionType[] | DefaultResponseType>(
      environment.api + 'comments/article-comment-actions', {
        params: {articleId: articleId}
      });
  }
}
