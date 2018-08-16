const StellarSdk = require('stellar-sdk');
const request = require('request');

const pair = StellarSdk.Keypair.random();
const secret = pair.secret();
const publicKey = pair.publicKey();
console.log(secret, publicKey);
createTestAccount();

function createTestAccount() {
  request.get({
    url: 'https://friendbot.stellar.org',
    qs: { addr: pair.publicKey() },
    json: true,
  }, (error, response, body) => {
    if (error || response.statusCode !== 200) {
      console.error('ERROR!', error || body);
    } else {
      console.log('SUCCESS! You have a new account :)\n', body);
    }
  });
}
