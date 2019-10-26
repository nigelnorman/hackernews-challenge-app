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
import { UserViewModel } from '../models/user-view-model';

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

  public GetItemsDirect(): ItemViewModel[]{
    const itemIds = [
      3843,
      3448,
      3844,
      4823,
      3824,
      2382,
      3832,
      3984,
      4848,
      3948
    ];

    const items = [];

    itemIds.forEach(async item => {
      let req = new HttpRequest<any>(
        "GET",
        `https://hacker-news.firebaseio.com/v0/item/${item}.json`,
        {
          headers: new HttpHeaders,
          responseType: 'json'
        }
      );

      let resp = await this.http.request<any>(req).pipe(
        filter(r => r instanceof HttpResponse),
        map(r => {
          return r as HttpResponse<ItemViewModel>
        }),
        map(r => r.body as ItemViewModel)
      ).toPromise();

      items.push(resp)
    });

    items.forEach(item => {
      item.by
    })

    return items;

  }

  private async GetUserForItemDirect(id: string): Promise<UserViewModel>{
    let req = new HttpRequest<any>(
      "GET",
      `https://hacker-news.firebaseio.com/v0/user/${id}.json`,
      {
        headers: new HttpHeaders,
        responseType: 'json'
      }
    );

    let resp = await this.http.request<any>(req).pipe(
      filter(r => r instanceof HttpResponse),
      map(r => {
        return r as HttpResponse<UserViewModel>
      }),
      map(r => r.body as UserViewModel)
    ).toPromise();

    return resp;
  }
}
