import { Audit } from '../base/audit/audit';

export class UserRole extends Audit{
    Id: number;
    UserId: number;
    UserName: string;
    FullName: string;
    RoleId: number;
    RoleName: string;
}

export class User{
    Id: number;
    UserName: string;
    FullName: string;
}

export class Role  extends Audit{
    Id: number;
    Description: string;
    ShortName: string;
    MenuTemplate: string;
    Parent: string;
    Enabled: boolean;
    Code: string;
    PersonTypeId: number;
}
