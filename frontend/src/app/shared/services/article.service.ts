import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ArticleType} from "../../../types/article.type";
import {ArticlesResponseType} from "../../../types/articles-response.type";
import {ActiveParamsType} from "../../../types/active-params.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  getTopArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  getArticles(params: ActiveParamsType): Observable<ArticlesResponseType> {
    return this.http.get<ArticlesResponseType>(environment.api + 'articles', {
      params: params as unknown as HttpParams
    });
  }
}
