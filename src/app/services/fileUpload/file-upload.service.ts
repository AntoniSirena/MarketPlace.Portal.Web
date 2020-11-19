import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, map, subscribeOn } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  coreURL;

  constructor(private httpClient: HttpClient) {
    this.coreURL = environment.coreURL;
  }


  upload(file: File) {
    var formData = new FormData();
    formData.append('file', file);
    console.log(formData);

    // Headers
    const headers = new HttpHeaders({
      'Content-Type': 'form-data',
    });


    this.httpClient.post(this.coreURL +'api/file/UploadFile', file, { headers: headers })
      .subscribe(data => {
      });
  }


  postFile(fileToUpload: File): Observable<boolean> {
    let endpoint = this.coreURL + 'api/file/UploadFile';
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
