import {Component, OnInit} from '@angular/core';
import { navItems } from '../../_nav';
import {RedirectService} from '../../services/redirect/redirect.service'
import {BaseService} from '../../services/base/base.service'
import { from } from 'rxjs';
import { Profile } from '../../models/profile/profile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  public profile = new Profile();

  constructor(private redirectService: RedirectService, private baseService: BaseService){
  
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit(){
    this.getProfile();
  }

  logout(){
    this.redirectService.logout();
  }

  getProfile(){  
    this.profile = this.baseService.getProfile();
  }

}
