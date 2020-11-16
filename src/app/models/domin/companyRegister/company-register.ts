import { Audit } from '../../base/audit/audit';

export class CompanyRegister extends Audit {
    Id: number;
    Name: string;
    Addreess: string;
    PhoneNumber: string;
    Schedule: string;
    CategoryId: number;
    IsReviewed: boolean;
}
