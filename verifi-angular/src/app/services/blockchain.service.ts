import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BlockchainService {
  constructor(private http:Http){

  }

    dateString: Observable<string>; 
    saveDate(date){
      this.dateString = date;
      console.log("Date is saved as: " + this.dateString);
    }
    getDate(){
      return this.dateString; 
    }

sendPrescription(prescription){

    var JSON = {
      "body": {
        "pub_key": "03e657ae71e51be60a45b4bd20bcf79ff52f0c037ae6da0540a0e0066132b472",
        "drug": "Motrin",
        "doctor": "Ishan",
        "pharmacy": ""
      },
      "network_id": 0,
      "protocol_version": 0,
      "service_id": 1,
      "message_id": 1,
      "signature": "ad5efdb52e48309df9aa582e67372bb3ae67828c5eaa1a7a5e387597174055d315eaa7879912d0509acf17f06a23b7f13f242017b354f682d85930fa28240402"
    }

    var headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin');

    return this.http.post('/api/system/v1/wallet/requestPerscription', JSON, {headers: headers})
    .map(res => res.json());
  }

}
