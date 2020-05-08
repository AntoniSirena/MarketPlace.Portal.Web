import { Audit } from '../base/audit/audit';

export class ConfigurationParameter extends Audit {
    Id: number;
    Name: string;
    Value: string;
    Description: string;
    Enabled: boolean;
}
