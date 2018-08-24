const StellarSdk = require('stellar-sdk');
import Account from './utils'

const sendingPair = StellarSdk.Keypair.random();
const receivingPair = StellarSdk.Keypair.random();
var sender = new Account(sendingPair.publicKey());
var receiver = new Account(receivingPair.publicKey());
sender.createTestAccount().then(()=>{
  sender.getAccountDetail();
})

receiver.createTestAccount().then(()=>{
  receiver.getAccountDetail();
})
