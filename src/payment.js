var StellarSdk = require('stellar-sdk');

export default class Payment{
  constructor(){

  }

  transfer(senderSecret, receiverPublic){
    return new Promise((resolve, reject)=>{
      StellarSdk.Network.useTestNetwork();
      var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
      var sourceKeys = StellarSdk.Keypair
        .fromSecret(senderSecret);
      var transaction;

      server.loadAccount(receiverPublic)
        .catch(StellarSdk.NotFoundError, function (error) {
          throw new Error('The destination account does not exist!');
        })
        .then(function() {
          return server.loadAccount(sourceKeys.publicKey());
        })
        .then(function(sourceAccount) {
          transaction = new StellarSdk.TransactionBuilder(sourceAccount)
            .addOperation(StellarSdk.Operation.payment({
              destination: receiverPublic,
              asset: StellarSdk.Asset.native(),
              amount: "10"
            }))
            .addMemo(StellarSdk.Memo.text('Test Transaction'))
            .build();
          transaction.sign(sourceKeys);
          return server.submitTransaction(transaction);
        })
        .then(function(result) {
          console.log('Success! Results:', result);
          resolve();
        })
        .catch(function(error) {
          console.error('Something went wrong!', error);
          reject();
        });
    });
  }


}
