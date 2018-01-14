import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlockchainService } from '../../services/blockchain.service';
import { Router } from '@angular/router/';

@Component({
  selector: 'app-shipping-info',
  templateUrl: './shipping-info.component.html',
  styleUrls: ['./shipping-info.component.css']
})
export class ShippingInfoComponent implements OnInit {

  constructor(private bs: BlockchainService, private router: Router) { }

  ngOnInit() {
  }

  submitShippingInfo(form){
    alert(form);
    console.log(form.value.textEstimatedArrivalDate);
    var date = form.value.textEstimatedArrivalDate;
    this.bs.saveDate(date);
    this.router.navigateByUrl("/dashboard");
  }
  
}
