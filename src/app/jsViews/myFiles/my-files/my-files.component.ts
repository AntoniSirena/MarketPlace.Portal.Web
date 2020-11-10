import { Component, OnInit } from '@angular/core';
import { MyFilesService } from '../../../services/myFiles/my-files.service';
import { FileDocument } from '../../../models/fileDocument/file-document';

@Component({
  selector: 'app-my-files',
  templateUrl: './my-files.component.html',
  styleUrls: ['./my-files.component.css']
})
export class MyFilesComponent implements OnInit {

  files = new Array<FileDocument>();


  constructor(private fileService: MyFilesService) { }

  ngOnInit(): void {
    this.getFiles();
  }


  getFiles() {
    this.fileService.getFiles().subscribe((response: Array<FileDocument>) => {
      this.files = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  getFileById(id: number, name: string, contentType: string) {
    this.fileService.getFileById(id).subscribe((response: any) => {
      this.downloadPdf(response, name, contentType);
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


  //download Pdf
  downloadPdf(stringBase64PDF: string, name: string, contentType: string) {
    const linkSource = `data:application/${contentType};base64,` + stringBase64PDF;
    const downloadLink = document.createElement("a");
    const fileName = name;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }


  //view Pdf
  viewFileById(id: number, contentType: string) {
    this.fileService.getFileById(id).subscribe((response: any) => {

      if (contentType === 'pdf') {
        let pdfWindow = window.open("")
        pdfWindow.document.write("<iframe width='100%' height='100%' src='data:application/pdf;base64, " + encodeURI(response) + "'></iframe>")
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }


}
