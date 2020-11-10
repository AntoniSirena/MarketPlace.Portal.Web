import { Audit } from '../../base/audit/audit';

export class Tanda extends Audit {
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
}
