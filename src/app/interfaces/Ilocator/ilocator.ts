import { Iaudit } from '../base/Iaudit/iaudit';

export interface Ilocator extends Iaudit {
    Id: number;
    PersonId: number;
    LocatorTypeId: number;
    Description: string;
    IsMain: boolean;
}
