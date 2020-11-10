import { Iaudit } from '../../base/Iaudit/iaudit';

export interface Ivisit extends Iaudit  {
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
}
