import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserRoleService } from '../../../services/userRole/user-role.service';
import { Iresponse } from '../../../interfaces/Iresponse/iresponse';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserRole, Role } from '../../../models/userRole/user-role';
import { IuserRole } from '../../../interfaces/IuserRole/iuser-role';
import { User } from '../../../models/profile/profile';


@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.css'],
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
export class UserRoleComponent implements OnInit {

  editUserRoleForm: FormGroup;
  createUserRoleForm: FormGroup;

  _currentPage: number = 1;
  totalUsers: number = 0;

  userRoles = new Array<UserRole>();
  userRole = new UserRole();
  roles = new Array<Role>();
  users = new Array<User>();


  //constructor
  constructor(
    private userRoleService: UserRoleService,
    private modalService: NgbModal,
    private form: FormBuilder) {
  }

  ngOnInit(): void {
    this.userRole.UserName = '';
    this.getUserRoles();
  }

  getUserRoles() {
    this.userRoleService.getUserRoles().subscribe((response: Array<UserRole>) => {
      this.userRoles = response;
      this.totalUsers = this.userRoles.length;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getUserRoleById(id: number) {
    this.userRoleService.getUserRoleById(id).subscribe((response: UserRole) => {
      this.userRole = response;

      //llenando el modal
      this.editUserRoleForm = this.form.group({
        roleId: [`${this.userRole.RoleId}`, Validators.required]
      });
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getRoles() {
    this.userRoleService.getRoles().subscribe((response: Array<Role>) => {
      this.roles = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  getUsers() {
    this.userRoleService.getUsers().subscribe((response: Array<User>) => {
      this.users = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  //open edit modal
  openEditModal(editModal, id: number) {
    this.getUserRoleById(id);
    this.getRoles();
    this.setValueEditFrom();
    this.modalService.open(editModal, { size: 'lg' });
  }

  //open create modal
  openCreateModal(createModal) {
    this.getRoles();
    this.getUsers();
    this.setValueCreateFrom();
    this.modalService.open(createModal, { size: 'lg' });
  }


  //edit
  edit(formValue: any) {
    const userRole: IuserRole = {
      Id: this.userRole.Id,
      UserId: this.userRole.UserId,
      RoleId: formValue.roleId,
      CreationTime: this.userRole.CreationTime,
      CreatorUserId: this.userRole.CreatorUserId,
      LastModificationTime: this.userRole.LastModificationTime,
      LastModifierUserId: this.userRole.LastModifierUserId,
      DeleterUserId: this.userRole.DeleterUserId,
      DeletionTime: this.userRole.DeletionTime,
      IsActive: this.userRole.IsActive,
      IsDeleted: this.userRole.IsDeleted
    };

    this.userRoleService.editUserRole(userRole).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getUserRoles();
          this.modalService.dismissAll();
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 3000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });

  }


  //create
  create(formValue: any) {

    const userRole: IuserRole = {
      Id: 0,
      UserId: formValue.userId,
      RoleId: formValue.roleId,
      IsActive: true,
      IsDeleted: false,
      CreatorUserId: null,
      CreationTime: null,
      LastModifierUserId: null,
      LastModificationTime: null,
      DeleterUserId: null,
      DeletionTime: null
    };

    this.userRoleService.createUserRole(userRole).subscribe((response: Iresponse) => {
      if (response.Code === '000') {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: response.Message,
          showConfirmButton: true,
          timer: 2000
        }).then(() => {
          this.getUserRoles();
          this.modalService.dismissAll();
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: response.Message,
          showConfirmButton: true,
          timer: 3000
        });
      }
    },
      error => {
        console.log(JSON.stringify(error));
      });

  }

  //edit from set value ''
  setValueEditFrom() {
    this.editUserRoleForm = this.form.group({
      roleId: ['', Validators.required],
    });
  }

  //create from set value ''
  setValueCreateFrom() {
    this.createUserRoleForm = this.form.group({
      roleId: [0, Validators.required],
      userId: [0, Validators.required],
    });
  }


}
