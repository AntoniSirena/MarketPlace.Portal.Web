import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IidentificationData } from '../../../interfaces/domain/IccompanimentInstrument/iaccompaniment-instrument';
import { strict } from 'assert';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { VariableResponse, CommentsRevisedDocument, DescriptionObservationSupportProvided, SuggestionsAgreement, ResearchSummary } from '../../../models/domain/accompanimentInstrument/accompaniment-instrument';

@Injectable({
  providedIn: 'root'
})
export class AccompanimentInstrumentService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }


  getAccompInstRequest():Observable<object>{    
    return this.httpClient.get(this.apiURL +'api/identificationData/GetAccompInstRequest');
  }

  getIdentificationDataById(id: string): Observable<object> {
    return this.httpClient.get(this.apiURL + 'api/identificationData/' + id);
  }

  getVariableByRequestId(requestId: number, variable: string): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/GetVariableByRequestId?requestId=${requestId}&variable=${variable}`);
  }

  getCommentsRevisedDocumentByRequestId(requestId: number): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/GetCommentsRevisedDocumentByRequestId?requestId=${requestId}`);
  }

  getDescriptionObservationSupportProvidedByRequestId(requestId: number): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/GetDescriptionObservationSupportProvidedByRequestId?requestId=${requestId}`);
  }

  getSuggestionsAgreementByRequestId(requestId: number): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/GetSuggestionsAgreementByRequestId?requestId=${requestId}`);
  }

  createIdentificationData(identificationData: IidentificationData) {
    let data = JSON.stringify(identificationData);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/identificationData`, data, { headers: headers });
  }

  createVariable(identificationDataId: number): Observable<object> {
    let data = JSON.stringify(identificationDataId = identificationDataId);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/identificationData/CreateVariable`, data, { headers: headers });
  }

  updateVariable(variable: VariableResponse) {
    let data = JSON.stringify(variable);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/identificationData/UpdateVariable`, data, { headers: headers });
  }

  updateCommentsRevisedDocument(commentsRevisedDocument: CommentsRevisedDocument) {
    let data = JSON.stringify(commentsRevisedDocument);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/identificationData/UpdateCommentsRevisedDocument`, data, { headers: headers });
  }

  updateDescriptionObservationSupportProvided(DescriptionObs: DescriptionObservationSupportProvided) {
    let data = JSON.stringify(DescriptionObs);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/identificationData/UpdateDescriptionObservationSupportProvided`, data, { headers: headers });
  }

  updateSuggestionsAgreement(SuggestionsAgreement: SuggestionsAgreement) {
    let data = JSON.stringify(SuggestionsAgreement);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/identificationData/UpdateSuggestionsAgreement`, data, { headers: headers });
  }

  editIdentificationData(identificationData: IidentificationData) {
    let data = JSON.stringify(identificationData);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(`${this.apiURL}api/identificationData`, data, { headers: headers });
  }

  completeRequest(requestId: number): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/CompleteRequest?requestId=${requestId}`);
  }

  approveRequest(requestId: number): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/ApproveRequest?requestId=${requestId}`);
  }

  sendToObservationRequest(requestId: number): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/SendToObservationRequest?requestId=${requestId}`);
  }

  cancelRequest(requestId: number): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/CancelRequest?requestId=${requestId}`);
  }

  processRequest(requestId: number): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/ProcessRequest?requestId=${requestId}`);
  }

  getAccompanyInstrumentDetails(requestId: number): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/GetAccompanyInstrumentDetails?requestId=${requestId}`);
  }

  createResearchSummary(summary: ResearchSummary) {
    let data = JSON.stringify(summary);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(`${this.apiURL}api/identificationData/CreateResearchSummary`, data, { headers: headers });
  }

  createAccompanyInstrumentPDF(requestId: number): Observable<object> {
    return this.httpClient.get(this.apiURL +  `api/identificationData/CreateAccompanyInstrumentPDF?requestId=${requestId}`);
  }

}
