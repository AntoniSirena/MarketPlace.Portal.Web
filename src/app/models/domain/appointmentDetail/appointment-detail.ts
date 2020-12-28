export class AppointmentDetail {
    Id: number;
    EnterpriseImage: string;
    EnterpriseName: string;
    EnterprisePhoneNumber: string;
    EnterpriseAddress: string;
    EnterpriseServiceTime: number;
    UserName: string;
    DocumentNomber: string;
    PhoneNumber: number;
    Comment: string;
    StartDate: string;
    ScheduledAppointment: boolean;
}

export class CheckAppointmentDetail{

    AppointmentId: Array<AppointmentId>;
    Message: string;
    Id: number;
    EnterpriseImage: string;
    EnterpriseName: string;
    EnterprisePhoneNumber: string;
    EnterpriseAddress: string;
    EnterpriseServiceTime: number;
    InFrontMe: number;
    UserName: string;
    DocumentNomber: string;
    PhoneNumber: number;
    Comment: string;
    StartDate: string;
}

export class AppointmentId{
    Id: number;
}

export class Appointment{
    Id: number;
    EnterpriseName: string;
    UserName: string;
    PhoneNumber: string;
    StartDate: string;
    Status: string;
    StatusColour: string;
}