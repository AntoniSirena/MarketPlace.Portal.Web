import { Iaudit } from '../../base/Iaudit/iaudit';

export interface Itanda extends Iaudit {
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
}
