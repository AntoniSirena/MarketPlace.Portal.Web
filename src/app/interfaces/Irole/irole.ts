import { Iaudit } from '../base/Iaudit/iaudit';

export interface Irole extends Iaudit{
    Id: number;
    Description: string;
    ShortName: string;
    MenuTemplate: string;
    Parent: string;
    Enabled: boolean;
    Code: string;
    PersonTypeId: number;
}