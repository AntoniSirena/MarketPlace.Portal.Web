import { Iaudit } from '../base/Iaudit/iaudit';

export interface Iuser extends Iaudit{
    Id: number;
    UserName: string;
    Password: string;
    Name: string;
    SurName: string;
    EmailAddress: string;
    StatusId: number;
    PersonId: number;
    Image: string;
}

