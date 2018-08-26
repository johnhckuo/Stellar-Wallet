const StellarSdk = require('stellar-sdk');
import Account from './account'
import Payment from './payment'

const sendingPair = StellarSdk.Keypair.random();
const receivingPair = StellarSdk.Keypair.random();
let senderPublic = sendingPair.publicKey();
let receiverPublic = receivingPair.publicKey();

let sender = new Account(senderPublic);
let receiver = new Account(receiverPublic);
var newPayment = new Payment();
sender.createTestAccount()
.then(()=>{
  return receiver.createTestAccount();
}).then(()=>{
  return newPayment.transfer(sendingPair.secret(), receiverPublic);
}).then(()=>{
  console.log("----------------")
  sender.getAccountDetail();
  return receiver.getAccountDetail();
});
