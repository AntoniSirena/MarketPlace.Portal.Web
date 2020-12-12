import { Injectable } from '@angular/core';
import { Person, Profile } from '../../models/profile/profile';
import { SystemConfiguration } from '../../Templates/systemConfiguration/system-configuration';
import { User } from './../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() { }

  profile = new Profile();
  perosn = new Person();
  user = new User();

  systemConfiguration = new SystemConfiguration();

  value: string;

  getsystemConfiguration():SystemConfiguration{ 
    this.value = localStorage.getItem("systemConfiguration");
    this.systemConfiguration = JSON.parse(this.value);
    return this.systemConfiguration;
  }

  getProfile():Profile{
    this.value = localStorage.getItem("profile");
    this.profile = JSON.parse(this.value);
    return this.profile;
  }

  getUserToke():string{
    let result;
    if(localStorage.length > 0){
      this.value = localStorage.getItem("token");
      return result = this.value.replace(/['"]+/g, '');
    }
    return result = '';
  }

}
