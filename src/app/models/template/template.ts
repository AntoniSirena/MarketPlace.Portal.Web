import { Audit } from '../base/audit/audit';

export class Template extends Audit{
    Id: number;
    Operation: string;
    Name: string;
    ShortName: string;
    Description: string;
    Body: string;
    Enabled: boolean;
}
