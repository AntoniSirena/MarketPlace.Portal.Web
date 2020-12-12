import { Iaudit } from '../../base/Iaudit/iaudit';

export interface Ienterprise extends Iaudit{
    Id: number;
    UserId: number;
    PropetaryName: string;
    Name: string;
    RNC: string;
    CommercialRegister: string;
    PhoneNumber: string;
    Email: string;
    Address: string;
    Sigla: string;
    Slogan: string;
    WorkSchedule: string;
    AvailableOnlineAppointment: boolean;
    Image: string;
    ImagePath: string;
    ImageContenTypeShort: string;
    ImageContenTypeLong: string;
    ServiceTime: number;
}
