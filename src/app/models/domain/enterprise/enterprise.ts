import { Audit } from '../../base/audit/audit';

export class Enterprise extends Audit {
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

export class _Enterprise {
    Id: number;
    UserId: number;
    Name: string;
}
