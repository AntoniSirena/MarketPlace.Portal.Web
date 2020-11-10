
export class ReportPDF {

}

export class ReportPDFResponse {
    FileStream: FileStream;
    ContentType: string;
    FileDownloadName: string;
}

export class FileStream {
    _buffer: string;
    _origin: number;
    _position: number;
    _length: number;
    _capacity: number;
    _expandable: boolean;
    _writable: boolean;
    _exposable: boolean;
    _isOpen: boolean;
    __identity: string;
}
