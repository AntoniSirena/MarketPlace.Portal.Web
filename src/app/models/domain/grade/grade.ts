import { Audit } from '../../base/audit/audit';

export class Grade extends Audit
{
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
}
