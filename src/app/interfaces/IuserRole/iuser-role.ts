import { Iaudit } from '../base/Iaudit/iaudit';

export interface IuserRole extends Iaudit{
    Id: number;
    UserId: number;
    RoleId: number;
}