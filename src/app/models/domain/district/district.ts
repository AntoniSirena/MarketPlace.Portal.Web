import { Audit } from '../../base/audit/audit';

export class District extends Audit{
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
    RegionalId: number;
}
