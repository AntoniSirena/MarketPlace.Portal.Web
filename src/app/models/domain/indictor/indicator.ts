import { Audit } from '../../base/audit/audit';

export class Indicator extends Audit {
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
    Value: number;
    IsEvaluationFactor: boolean;
}
