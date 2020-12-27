import { Iaudit } from "../../base/Iaudit/iaudit";

export interface Iappointment extends Iaudit {
    Id: number;
    EnterpriseId: number;
    StatusId: number;
    Name: string;
    DocumentNomber: string;
    PhoneNumber: number;
    Comment: string;
    StartDate: string;
    ScheduledAppointment: boolean;
}
