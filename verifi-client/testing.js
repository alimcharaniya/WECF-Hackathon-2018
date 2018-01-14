var Exonum = require('exonum-client');
// Exonum.hash([0, 255, 16, 8]);
var request = require('request');

//Declare type of doctor
// FIELDS : Name, Drug Offered 
var Doctor = Exonum.newType({
    size: 16,
    fields: {
        name: {type: Exonum.String, size: 8, from: 0, to: 8},
        drug: {type: Exonum.String, size: 8, from: 8, to: 16}
    }
});

//Declare type of pharmaxy
// FIELDS : Name, Drug Offered 
var Pharmacy = Exonum.newType({
    size: 24,
    fields: {
        name: {type: Exonum.String, size: 8, from: 0, to: 8},
        drugOrdered: {type: Exonum.String, size: 8, from: 8, to: 16},
        shipTo: {type: Exonum.String, size: 8, from: 16, to: 24},
    }
});

//Declare type of Patient
// FIELDS : Name, Drug Ordered, shipTo address 
var Patient = Exonum.newType({
    size: 24,
    fields: {
        name: {type: Exonum.String, size: 8, from: 0, to: 8},
        drugOrdered: {type: Exonum.String, size: 8, from: 8, to: 16},
        shipTo: {type: Exonum.String, size: 8, from: 16, to: 24},
    }
});

// //Generate key 
// var pair = Exonum.keyPair();
// var secretKey = pair.secretKey;
// var publicKey = pair.publicKey;

// console.log(publicKey);
// //Ishan prescribes 4 dose of advil
// var newDoctor = {
//     name: "Ishan Gupta",
//     drug: "Advil"
// };

// var newPharma = {
//     name: "Walgreens",
//     drugOrdered: "NA",
//     shipTo: "NA" 
// }
// var newPatient = {
//     name: "NA",
//     drugOrdered: "NA",
//     shipTo: "NA" 
// }

// //get buffers
// var dBuffer = Doctor.serialize(newDoctor);
// var pBuffer = Pharmacy.serialize(newPharma);
// var patBuffer = Pharmacy.serialize(newPatient);

// var dHash = Exonum.hash(newDoctor, Doctor);
// var pHash = Exonum.hash(newPharma, Pharmacy);
// var patHash = Exonum.hash(newPatient, Patient);

// //got the hash, now sign it 
// var signature = Exonum.sign(secretKey, newDoctor, Doctor);
// var pSig = Exonum.sign(secretKey, newPharma, Pharmacy);
// var patSig = Exonum.sign(secretKey, newPatient, Patient);

// console.log("SIGNATURE")
// //get sig 
// // console.log(signature);
// var result = Exonum.verifySignature(signature, publicKey, newDoctor, Doctor);
// // console.log("VERIFICATION")
// // console.log(result);


// var SendPrescriptionOrder = Exonum.newMessage({
//     size: 72,
//     network_id: 0,
//     protocol_version: 0,
//     service_id: 1,
//     message_id: 3,
//     fields: {
//         //doctor sends drug --> pharamacy 
//         doctor: {type: Exonum.Hash, size: 32, from: 0, to: 32},
//         pharmacy: {type: Exonum.Hash, size: 32, from: 32, to: 64},
//         drug: {type: Exonum.String, size: 8, from: 64, to: 72}
//     }
// });



console.log("Prescription hash")
// Exonum.hash(sendData, SendPrescriptionOrder)

var NewDoctor = Exonum.newType({
    size: 72,
    network_id: 0,
    protocol_version: 0,
    service_id: 1,
    message_id: 4,
    fields: {
        //doctor sends drug --> pharamacy 
        pub_key: {type: Exonum.publicKey, size: 32, from: 0, to: 32},
        name: {type: Exonum.String, size: 32, from: 32, to: 64},
        currentOrder: {type: Exonum.String, size: 8, from: 64, to: 72}
    }
});
var newPair = Exonum.keyPair();

var sampleTrans = {
    pub_key: newPair.publicKey,
    name: "Alim",
    currentOrder: "Advil"
}
var transHash = Exonum.hash(sampleTrans, NewDoctor)

// var transSig = Exonum.sign(newPair.secretKey, sampleTrans, NewDoctor);

// var createWalletExample = {
//     "body": {
//         "doctor": dHash,
//         "pharmacy": pHash,
//         "drug": "Motrin",
//         "pub_key": newPair.publicKey

//     },
//     "network_id": 0,
//     "protocol_version": 0,
//     "service_id": 1,
//     "message_id": 3,
//     "signature": transSig
// }

// request.post({
//     url: "http://127.0.0.1:8000/api/services/cryptocurrency/v1/wallets/createDoctor",
//     method: "POST",
//     json: true,   // <--Very important!!!
//     body: createWalletExample
// }, function(err,httpResponse,body){ 
//     console.log(httpResponse);
// });


// console.log("first D");
// console.log(dHash);
// console.log("then P");
// console.log(pHash);

// //serial buffer of send order transaction
// var sendOrder = SendPrescriptionOrder.serialize(sendData, true); //--> returns buffer 
// // console.log(sendOrder);
// // console.log(sendHash);
// var signature = Exonum.sign(secretKey, sendOrder);
// console.log("Sig")
// console.log(signature);
// console.log("Public key")
// console.log(publicKey);

// console.log(sendOrder);

//execute the doctor --> pharma transaction 


// //Generate key 
// var pair = Exonum.keyPair();
// var secretKey = pair.secretKey;
// var publicKey = pair.publicKey;

// console.log(publicKey);


// var transXExample = {
//         "body": {
//             "doctor": dHash,
//             "pharmacy": pHash,
//             "drug": "Motrin",
//             "pub_key": publicKey

//         },
//         "network_id": 0,
//         "protocol_version": 0,
//         "service_id": 1,
//         "message_id": 3,
//         "signature": signature
// }


// request.post({
//     url: "http://127.0.0.1:8000/api/services/cryptocurrency/v1/wallet/requestPerscription",
//     method: "POST",
//     json: true,   // <--Very important!!!
//     body: transXExample
// }, function(err,httpResponse,body){ 
//     console.log(httpResponse);
// });

//add a doctor wallet 

// request.post({
//     url: "http://127.0.0.1:8000/api/services/cryptocurrency/v1/wallets/createDoctor",
//     method: "POST",
//     json: true,   // <--Very important!!!
//     body: transXExample
// }, function(err,httpResponse,body){ 
//     console.log(httpResponse);
// });
