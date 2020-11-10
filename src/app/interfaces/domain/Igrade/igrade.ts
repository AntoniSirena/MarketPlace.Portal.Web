import { Iaudit } from '../../base/Iaudit/iaudit';

export interface Igrade extends Iaudit {
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
}