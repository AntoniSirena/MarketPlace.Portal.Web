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
    CanCreate: boolean;
    CanEdit: boolean;
    CanDelete: boolean;

    CanCreateRequest: boolean;
    CanEditRequest: boolean;
    CanViewActionsButton: boolean;
    CanApprove: boolean;
    CanSendToObservation: boolean;
    CanProcess: boolean;
    CanCancel: boolean;
}