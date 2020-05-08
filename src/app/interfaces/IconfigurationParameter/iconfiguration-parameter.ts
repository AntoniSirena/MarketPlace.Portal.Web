import { Iaudit } from '../base/Iaudit/iaudit';

export interface IconfigurationParameter extends Iaudit {
    Id: number;
    Name: string;
    Value: string;
    Description: string;
    Enabled: boolean;
}
