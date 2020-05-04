export class UserRole{
    Id: number;
    UserId: number;
    UserName: string;
    FullName: string;
    RoleId: number;
    RoleName: string;
    CreationTime: string;
    CreatorUserId: string;
    LastModificationTime: string;
    LastModifierUserId: number;
    DeleterUserId: number;
    DeletionTime: string;
    IsActive: boolean;
    IsDeleted: boolean;
}

export class User{
    Id: number;
    UserName: string;
    FullName: string;
}

export class Role{
    Id: number;
    Description: string;
    ShortName: string;
    Parent: string;
}
