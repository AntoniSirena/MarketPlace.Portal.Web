import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { SizeImageArticle } from '../../../../configurations/jsConfig';
import { environment } from '../../../../environments/environment';
import { Article } from '../../../../models/domain/market/market';
import { MarketService } from '../../../../services/domain/market/market.service';
import { Router } from '@angular/router';
import { User } from '../../../../models/profile/profile';
import { BaseService } from '../../../../services/base/base.service';

@Component({
  selector: 'app-view-market',
  templateUrl: './view-market.component.html',
  styleUrls: ['./view-market.component.css'],
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
export class ViewMarketComponent implements OnInit {

  @ViewChild('toPostModal') toPostModal: ElementRef;

  articles = new Array<Article>();

  coreURL = environment.coreURL;
  img_Width = SizeImageArticle.width;
  img_height = SizeImageArticle.height;

  userData = new User();

  constructor(
    private marketService: MarketService,
    private modalService: NgbModal,
    private routerService: Router,
    private baseService: BaseService) {

  }

  ngOnInit(): void {
    this.getArticles('Sell', 0);
    this.userData = this.baseService.getUserData();
  }


  getArticles(marketType, subCategoryId) {
    this.marketService.getArticles(marketType, subCategoryId).subscribe((response: Array<Article>) => {
      this.articles = response;
    },
      error => {
        console.log(JSON.stringify(error));
      });
  }

  toPost() {
    if(this.userData.IsVisitorUser){
      this.modalService.open(this.toPostModal, { size: 'sm-lg', scrollable: true, backdrop: 'static' });
    }else{
      this.routerService.navigate(['market']);
    }
  }

  goToLoginPage(){
    this.modalService.dismissAll();
    this.routerService.navigate(['login']);
  }

  goToRegisterPage(){
    this.modalService.dismissAll();
    this.routerService.navigate(['register']);
  }

}
