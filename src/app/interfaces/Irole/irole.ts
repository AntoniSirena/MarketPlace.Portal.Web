import { Iaudit } from '../base/Iaudit/iaudit';

export interface Irole extends Iaudit {
    Id: number;
    Description: string;
    ShortName: string;
    MenuTemplate: string;
    EnterpriseMenuTemplate: string;
    Parent: string;
    Enabled: boolean;
    Code: string;
    PersonTypeId: number;

    //Crud
    CanCreate: boolean;
    CanEdit: boolean;
    CanDelete: boolean;

    //Enterprise
    CanCreateEnterprise: boolean;
    CanEditEnterprise: boolean;
    CanDeleteEnterprise: boolean;
}