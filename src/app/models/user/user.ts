export class User {

}

export class UserDetails {
    Id: number;
    UserName: string;
    Surname: string;
    EmailAddress: string;
    PhoneNumber: string;
    Type: string;
    Image: string;
    LastLoginTime: string;
    LastLoginTimeEnd: string;
    IsOnline: string;
    Role: Role;
    Person: Person;
}

export class Role{
    Description: string;
    Parent: string;
}

export class Person {
    FirstName: string;
    SecondName: string;
    Surname: string;
    secondSurname: string;
    BirthDate: string;
    FullName: string;
    Gender: string;
    PersonType: string;
    DocumentNumber: string;
    DocumentDescription: string;
    Locators: Array<Locators>;
}

export class Locators {
    Id: number;
    Description:string;
    IsMain: boolean;
    Type: string;
}
