import { Audit } from '../../base/audit/audit';

export class Docent extends Audit {
    Id: number;
    FirstName: string;
    SecondName: string;
    Surname: string;
    SecondSurname: string;
    FullName: string;
    BirthDate: string;
    DocumentTypeID: number
    DocumentNumber: string;
    Phone: string;
    Address: string;
    AreaId: number;
    EducativeCenterId: number;
}

export class DocentDetails {
    DocentPersonInfo: DocentPersonInfo;
}

export class DocentPersonInfo{
    FirstName: string;
    SecondName: string;
    Surname: string;
    SecondSurname: string;
    FullName: string;
    BirthDate: string;
    DocumentType: string;
    DocumentNumber: string;
    Phone: string;
    Address: string;
    Area: string;
    EducativeCenter: string;
}
