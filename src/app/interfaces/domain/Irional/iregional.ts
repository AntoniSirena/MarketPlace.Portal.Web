import { Iaudit } from '../../base/Iaudit/iaudit';

export interface Iregional extends Iaudit {
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
}
