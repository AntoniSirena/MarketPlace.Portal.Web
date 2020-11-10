import { Iaudit } from '../../base/Iaudit/iaudit';

export interface Idistrict  extends Iaudit {
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
    RegionalId: number;
}
