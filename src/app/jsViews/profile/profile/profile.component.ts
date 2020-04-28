import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
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
export class ProfileComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  @ViewChild('content') _content: ElementRef;

  
  ngOnInit(): void {
  }

  openProfileModal(){
    this.modalService.open(this._content, { size: 'lg' });
   }



}
