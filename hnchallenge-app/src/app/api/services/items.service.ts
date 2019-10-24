import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders
} from "@angular/common/http";
import { ApiConfiguration } from '../api-config';
import { ItemViewModel } from '../models/item-view-model';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private config: ApiConfiguration, private http: HttpClient) { }

  public GetById(id: number): Observable<ItemViewModel> {
    let req = new HttpRequest<any>(
      "GET",
      this.config.rootUrl + `/api/items/${id}`,
      {
        headers: new HttpHeaders(),
        responseType: 'json'
      }
    );

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map(r => {
        return r as HttpResponse<ItemViewModel>;
      }),
      map(r => r.body as ItemViewModel)
    )
  }

  public GetNew(): Observable<ItemViewModel[]> {
    let req = new HttpRequest<any>(
      "GET",
      this.config.rootUrl + `/api/items/new`,
      {
        headers: new HttpHeaders,
        responseType: 'json'
      }
    );

    return this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map(r => {
        return r as HttpResponse<ItemViewModel>;
      }),
      map(r => r.body as ItemViewModel[])
    )
  }
}
