const request = require('request');
const StellarSdk = require('stellar-sdk');

export default class Account{
  constructor(publicKey){
    this.publicKey = publicKey;
  }

  createTestAccount() {
    return new Promise((resolve, reject)=>{
      request.get({
        url: 'https://friendbot.stellar.org',
        qs: { addr: this.publicKey },
        json: true,
      }, (error, response, body) => {
        if (error || response.statusCode !== 200) {
          console.error('ERROR!', error || body);
          reject();
        } else {
          console.log('SUCCESS! Account created:)\n');
          resolve();
        }
      });
    })
  }

  getAccountDetail() {
    const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
    server.loadAccount(this.publicKey).then((account) => {
      console.log(`Balances for account ${this.publicKey}`);
      account.balances.forEach((balance) => {
        console.log('Type:', balance.asset_type, ', Balance:', balance.balance);
      });
    });
  }
}
