import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ArticleType, ArticlesResponseType, ActiveParamsType, ArticleDetailType} from "../../../types";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private readonly http: HttpClient) {
  }

  public getTopArticles(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/top');
  }

  public getArticles(params: ActiveParamsType): Observable<ArticlesResponseType> {
    let httpParams = new HttpParams();

    if (params.categories) {
      params.categories.forEach(category => {
        httpParams = httpParams.append('categories', category);
      });
    }

    if (params.page) {
      httpParams = httpParams.set('page', params.page);
    }

    return this.http.get<ArticlesResponseType>(environment.api + 'articles', {params: httpParams});
  }

  public getArticle(url: string): Observable<ArticleDetailType> {
    return this.http.get<ArticleDetailType>(environment.api + 'articles/' + url);
  }

  public getRelatedArticles(url: string): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(environment.api + 'articles/related/' + url);
  }
}
