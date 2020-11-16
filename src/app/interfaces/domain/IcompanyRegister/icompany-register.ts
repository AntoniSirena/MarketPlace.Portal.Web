import { Iaudit } from '../../base/Iaudit/iaudit';

export interface IcompanyRegister extends Iaudit {
    Id: number;
    Name: string;
    Addreess: string;
    PhoneNumber: string;
    Schedule: string;
    CategoryId: number;
    IsReviewed: boolean;
}
