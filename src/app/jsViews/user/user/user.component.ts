import { Component, OnInit, ViewEncapsulation  } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iuser, IuserStatuses } from '../../../interfaces/Iuser/iuser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class UserComponent implements OnInit {

  users: any;
  user: Iuser = {
    Id: 0,
    UserName: '',
    Password: '',
    Name: '',
    SurName: '',
    EmailAddress: '',
    StatusId: 0,
    PersonId: 0,
    Image: '',
    CreationTime: '',
    CreatorUserId: '',
    LastModificationTime: '',
    LastModifierUserId: 0,
    DeletionTime: '',
    DeleterUserId: 0,
    IsActive: false,
    IsDeleted: false    
  };

  userStatuses: IuserStatuses[] = [
    {
      Id: 0,
      Description: '',
      ShortName: '',
      Colour: ''
    }
  ];

  editUserForm: FormGroup;
  createUserForm: FormGroup;

  //constructor
  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }


  ngOnInit() {
    this.getUsers();
    this.getUserStatuses();
    this.setValueCreateFrom();
    this.setValueEditFrom();
  }


  getUsers(){
    this.userService.getUsers().subscribe((response: Iresponse) => {
     this.users = response;
    },
    error => { console.log(JSON.stringify(error));
    });
  }

  getUserById(id: number){
    this.userService.getUserById(id).subscribe((response: any) => {
      this.user = response;

      //llenando el modal
      this.editUserForm = this.form.group({
       statusId: [`${this.user.StatusId}`, Validators.required]
       });       
    },
    error => { console.log(JSON.stringify(error));
    });
  }

  getUserStatuses(){
    this.userService.getUserStatuses().subscribe((response: IuserStatuses[]) => {
      this.userStatuses = response;
    },
    error => { console.log(JSON.stringify(error));
    });
  }


  //open edit modal
  openEditModal(editModal, id: number) {
    this.getUserById(id);
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }

  //open create modal
  openCreateModal(createModal) {
    this.setValueCreateFrom();  
    this.modalService.open(createModal, { size: 'lg' });
  }

  //edit
  edit(formValue: any){
    const user: Iuser ={
      Id: this.user.Id,
      UserName: this.user.UserName,
      Password: this.user.Password,
      Name: this.user.Name,
      SurName: this.user.SurName,
      EmailAddress: this.user.EmailAddress,
      StatusId: formValue.statusId,
      PersonId: this.user.PersonId,
      Image: this.user.Image,
      CreationTime: this.user.CreationTime,
      CreatorUserId: this.user.CreatorUserId,
      LastModificationTime: this.user.LastModificationTime,
      LastModifierUserId: this.user.LastModifierUserId,
      DeleterUserId: this.user.DeleterUserId,
      DeletionTime: this.user.DeletionTime,
      IsActive: this.user.IsActive,
      IsDeleted: this.user.IsDeleted
    };

    this.userService.editUser(user).subscribe((response: Iresponse) => {
      if(response.Code === '000'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getUsers();
          this.modalService.dismissAll();
        });
      }else{
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 3000
        });
      }
    },
      error => { console.log(JSON.stringify(error));
    });  

  }

  //create
  create(formValue: any){

    const user: Iuser ={
      Id: 0,
      UserName: formValue.userName,
      EmailAddress: formValue.emailAddress,
      Password: formValue.password,
      Name: formValue.name,
      SurName: formValue.surName,
      StatusId: formValue.statusId,
      PersonId: null,
      Image: null,
      IsActive: true,
      IsDeleted: false,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null
    };

    this.userService.createUser(user).subscribe((response: Iresponse) => {
      if(response.Code === '000'){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getUsers();
          this.modalService.dismissAll();
        });
      }else{
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 3000
        });
      }
    },
      error => { console.log(JSON.stringify(error));
    });  

  }


  //create from set value ''
  setValueCreateFrom(){
    this.createUserForm = this.form.group({
        userName: ['', Validators.required],
        emailAddress: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        name: ['', Validators.required],
        surName: ['', Validators.required],
        statusId: [this.userStatuses[2].Id, Validators.required]
    });
  }

  //edit from set value ''
  setValueEditFrom(){
    this.editUserForm = this.form.group({
      Id: [0],
     statusId: ['', Validators.required],
    });
  }

}
