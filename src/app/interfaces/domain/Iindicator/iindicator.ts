import { Iaudit } from '../../base/Iaudit/iaudit';

export interface Iindicator extends Iaudit {
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
    Value: number;
    IsEvaluationFactor: boolean;
}
