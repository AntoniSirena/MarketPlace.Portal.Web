import { Iaudit } from '../../base/Iaudit/iaudit';

export interface Idocent extends Iaudit {
    Id: number;
    FirstName: string;
    SecondName: string;
    Surname: string;
    SecondSurname: string;
    FullName: string;
    BirthDate: Date;
    DocumentTypeID: number
    DocumentNumber: string;
    Phone: string;
    Address: string;
    AreaId: number;
    EducativeCenterId: number;
}
