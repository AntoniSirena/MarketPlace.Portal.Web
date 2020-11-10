import { Iaudit } from '../base/Iaudit/iaudit';

export interface Itemplate extends Iaudit {
    Id: number;
    Operation: string;
    Name: string;
    ShortName: string;
    Description: string;
    Body: string;
    Enabled: boolean;
}
