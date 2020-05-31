import { Iaudit } from '../base/Iaudit/iaudit';

export interface IPersonType extends Iaudit {
    Id: number;
    Code: string;
    Description: string;

}
