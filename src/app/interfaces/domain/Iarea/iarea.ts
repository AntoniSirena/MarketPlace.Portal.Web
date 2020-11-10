import { Iaudit } from '../../base/Iaudit/iaudit';

export interface Iarea extends Iaudit {
    Id: number;
    ShortName: string;
    Name: string;
    Description: string;
}
