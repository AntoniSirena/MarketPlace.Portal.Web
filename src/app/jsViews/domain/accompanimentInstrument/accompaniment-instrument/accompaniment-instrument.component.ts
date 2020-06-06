import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-accompaniment-instrument',
  templateUrl: './accompaniment-instrument.component.html',
  styleUrls: ['./accompaniment-instrument.component.css'],
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
export class AccompanimentInstrumentComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) {

  }


  ngOnInit(): void {
  }


  //open create modal
  openCreateAccompanimentInstrument(createModal) {
    this.modalService.open(createModal, { size: 'xl', scrollable: true });
  }

}
