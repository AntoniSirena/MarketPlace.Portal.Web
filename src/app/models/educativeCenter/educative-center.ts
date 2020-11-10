import { Audit } from '../base/audit/audit';

export class EducativeCenter  extends Audit{
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
    DistrictId: number;
}
