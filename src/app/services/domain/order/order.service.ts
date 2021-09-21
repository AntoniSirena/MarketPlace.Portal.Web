import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateOrderDTO } from '../../../models/domain/order';
import { ICheckoutOrder } from '../../../interfaces/domain/order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  coreURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
    this.coreURL = environment.coreURL;
  }

  getCurrentArticleQuantity(articleId: number, orderId: number = 0): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/order/GetCurrentArticleQuantity?articleId=${articleId}&orderId=${orderId}`);
  }

  getShoppingCart(orderId: number = 0): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/order/GetShoppingCart?orderId=${orderId}`);
  }

  getOrderStatuses(): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/order/GetOrderStatuses`);
  }

  getOrderHistory(): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/order/GetOrderHistory`);
  }

  getProviderOrder(): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/order/GetProviderOrder`);
  }

  getProviderOrderHistory(): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/order/GetProviderOrderHistory`);
  }

  updateOrderStatus(statusShortName: string, orderId: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/order/UpdateOrderStatus?statusShortName=${statusShortName}&orderId=${orderId}`);
  }

  updateOrderDetailStatus(statusShortName: string, itemId: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/order/UpdateOrderDetailStatus?statusShortName=${statusShortName}&itemId=${itemId}`);
  }

  getInbox(statusId: number = 0, clientId: number = 0, orderId: number = 0): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/order/Inbox?statusId=${statusId}&clientId=${clientId}&orderId=${orderId}`);
  }

  deleteArticle(articleId: number, orderId: number = 0): Observable<object> {
    return this.httpClient.delete(this.coreURL + `api/order/DeleteArticle?articleId=${articleId}&orderId=${orderId}`);
  }

  create(request: CreateOrderDTO) {
    let data = JSON.stringify(request);
    return this.httpClient.post(`${this.coreURL}api/order/create`, data, { headers: this.headers });
  }

  Checkout(request: ICheckoutOrder) {
    let data = JSON.stringify(request);
    return this.httpClient.post(`${this.coreURL}api/order/Checkout`, data, { headers: this.headers });
  }


}
