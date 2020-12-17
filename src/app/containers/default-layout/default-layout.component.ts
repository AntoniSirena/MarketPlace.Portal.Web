import { Component, OnInit, ViewChild } from '@angular/core';
import { navItems } from '../../_nav';
import { RedirectService } from '../../services/redirect/redirect.service'
import { BaseService } from '../../services/base/base.service'
import { from } from 'rxjs';
import { Profile, _Profile } from '../../models/profile/profile';
import { ProfileComponent } from '../../jsViews/profile/profile/profile.component';
import { Router } from '@angular/router';
import { User } from './../../models/profile/profile';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = navItems;

  public profile = new Profile();
  public userData = new User();


  @ViewChild(ProfileComponent) profileComponent: ProfileComponent;

  roleShortName: string;
  isVisitorUser: boolean;


  constructor(
    private redirectService: RedirectService,
    private router: Router,
    private baseService: BaseService
  ) {

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnInit() {
    this.getProfile();
    this.userData = this.baseService.getUserData();
    this.roleShortName = this.userData.RoleShortName;
    this.isVisitorUser = this.userData.IsVisitorUser;
  }

  logout() {
    this.redirectService.logout();
  }

  //Get profile
  getProfile() {
    this.profile = this.baseService.getProfile();
  }

  //open Profile Modal
  openProfileModal() {
    this.profileComponent.openProfileModal();
  }

  goToLogin() {
    this.router.navigate(['login']);
  }


  goToRegister() {
    this.router.navigate(['register']);
  }

  goToLogOut() {
    this.redirectService.logout();
  }

}
