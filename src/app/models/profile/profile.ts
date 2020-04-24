    export class Profile {
    Profile: _Profile;
    }
  
    export class _Profile {
      User: User;
      Person: Person;
    }
  
    export class User{
      Id: number;
      UserName: string;
      Name: string;
      Surname: string;
      EmailAddress: string;
      Image: string;
      Token: string;
      WelcomeMessage: string;
      MenuTemplate: string;
      RoleDescription: string;
      RoleShortName: string;   
      RoleParent: string;  
    }
  
    export class Person{
      FirstName: string;
      SecondName: string;
      Surname: string;
      secondSurname: string;
      BirthDate: string;
      FullName: string;
      Gender: string;
      Locators: Locators[];   
    }
  
    export class Locators{
      Description: string;
      IsMain: boolean;
      Type: string;
    }