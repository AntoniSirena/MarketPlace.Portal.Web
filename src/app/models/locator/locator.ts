import { Audit } from '../base/audit/audit';

export class Locator extends Audit{
    Id: number;
    PersonId: number;
    LocatorTypeId: number;
    Description: string;
    IsMain: boolean;
}
