import { Audit } from '../../base/audit/audit';

export class Visit extends Audit{
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
}
