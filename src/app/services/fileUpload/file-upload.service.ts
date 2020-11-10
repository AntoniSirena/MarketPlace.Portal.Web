import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, subscribeOn } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  apiURL;

  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
  }


  upload(file: File) {
    var formData = new FormData();
    formData.append('file', file);
    console.log(formData);

    // Headers
    const headers = new HttpHeaders({
      'Content-Type': 'form-data',
    });


    this.httpClient.post('http://localhost:61048/api/file/UploadFile', file, { headers: headers })
      .subscribe(data => {
      });
  }


  postFile(fileToUpload: File): Observable<boolean> {
    let endpoint = this.apiURL + 'api/file/UploadFile';
    let formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    console.log(formData);

    // Headers
    const headers = new HttpHeaders({
      'Content-Type': 'form-data',
    });

    return this.httpClient
      .post(endpoint, formData, { headers: headers })
      .pipe(map(() => { return true; })
      );
  }

}
