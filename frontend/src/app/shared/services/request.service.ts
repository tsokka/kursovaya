import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {DefaultResponseType, RequestType} from "../../../types";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  createRequest(request: RequestType): Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'requests', request);
  }
}
