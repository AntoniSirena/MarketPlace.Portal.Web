import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: any;

  //constructor
  constructor( private userService: UserService) {

  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((response: Iresponse) => {
     this.users = response;
    },
    error => { console.log(JSON.stringify(error));
    });
  }

  
}
