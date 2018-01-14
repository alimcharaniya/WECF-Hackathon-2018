import { Component, OnInit  } from '@angular/core';
import {NgForm} from '@angular/forms';
import { BlockchainService } from '../../services/blockchain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-write-prescription',
  templateUrl: './write-prescription.component.html',
  styleUrls: ['./write-prescription.component.css']
})
export class WritePrescriptionComponent implements OnInit {

  constructor(private blockchain: BlockchainService, private router: Router) { 

  }

  ngOnInit() {
  }

  submitPrescription(requestPrescriptionForm: NgForm){
    console.log(requestPrescriptionForm.value);
    this.router.navigateByUrl("/shipping-info");
    var formSub = {

    }
    // this.blockchain.storeFormSubmission();
  }
  
}
