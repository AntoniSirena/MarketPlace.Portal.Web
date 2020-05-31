import { Audit } from '../base/audit/audit';

export class PersonType extends Audit{
    Id: number;
    Code: string;
    Description: string;
}
