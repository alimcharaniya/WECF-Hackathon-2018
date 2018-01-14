import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core/src/metadata/directives';
import { EventEmitter } from 'events';
import { BlockchainService } from '../../services/blockchain.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private estimatedArrivalDate: Observable<string>; 

  constructor(private bs: BlockchainService, private router: Router) {
      this.estimatedArrivalDate = this.bs.getDate();
   }

  ngOnInit() {
    this.estimatedArrivalDate = this.bs.getDate();
  }
  restart(){
    this.router.navigateByUrl('/');
  }

}
