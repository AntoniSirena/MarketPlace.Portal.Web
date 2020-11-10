import { Iaudit } from '../../base/Iaudit/iaudit';

export interface IeducativeCenter extends Iaudit {
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
    DistrictId: number;
}
