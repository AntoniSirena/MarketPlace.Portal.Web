import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CreateOrderDTO } from '../../models/domain/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  coreURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
    this.coreURL = environment.coreURL;
  }

  getCurrentArticleQuantity(articleId: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/order/GetCurrentArticleQuantity?articleId=${articleId}`);
  }

  deleteArticle(articleId: number): Observable<object> {
    return this.httpClient.delete(this.coreURL + `api/order/DeleteArticle?articleId=${articleId}`);
  }

  create(request: CreateOrderDTO) {
    let data = JSON.stringify(request);
    return this.httpClient.post(`${this.coreURL}api/order/create`, data, { headers: this.headers });
  }


}
