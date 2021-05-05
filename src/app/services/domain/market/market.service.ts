import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Imarket } from '../../../interfaces/domain/imarket/imarket';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  coreURL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) {
    this.coreURL = environment.coreURL;
  }

  getAll(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/market/GetAll');
  }

  getById(id: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/market/GetById?Id=${id}`);
  }

  create(request: Imarket, imgDetails: any) {
    let input = {Market: request, ImgDetails: imgDetails}
    let data = JSON.stringify(input);
    return this.httpClient.post(`${this.coreURL}api/market/create`, data, { headers: this.headers });
  }

  update(request: Imarket) {
    let data = JSON.stringify(request);
    return this.httpClient.put(`${this.coreURL}api/market/update`, data, { headers: this.headers });
  }

  delete(id: number): Observable<object> {
    return this.httpClient.delete(this.coreURL + `api/market/delete?Id=${id}`);
  }


  getCurrencies(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/market/GetCurrencies');
  }

  getMarketTypes(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/market/GetMarketTypes');
  }

  getConditions(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/market/GetConditions');
  }

  getCategories(): Observable<object> {
    return this.httpClient.get(this.coreURL + 'api/market/GetCategories');
  }

  getSubCategories(categoryId: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/market/GetSubCategories?categoryId=${categoryId}`);
  }

  getArticles(marketTypeShortName: string, categoryId: number, subCategoryId: number, page: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/market/GetArticles?marketTypeShortName=${marketTypeShortName}&categoryId=${categoryId}&subCategoryId=${subCategoryId}&page=${page}`);
  }

  getArticlesByInputStr(marketTypeShortName: string, inputStr: string, page: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/market/GetArticles?marketTypeShortName=${marketTypeShortName}&inputStr=${inputStr}&page=${page}`);
  }

  getImgDetailByArticleId(articleId: number): Observable<object> {
    return this.httpClient.get(this.coreURL + `api/market/GetImgDetailByArticleId?articleId=${articleId}`);
  }

}
