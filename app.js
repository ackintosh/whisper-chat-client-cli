#!/usr/bin/env node
'use strict';

var Web3 = require('web3');
var web3 = new Web3();

let host = process.env.WHISPER_HOST || '0.0.0.0';
let port = process.env.WHISPER_PORT || '8546';

web3.setProvider(new Web3.providers.WebsocketProvider('ws://' + host + ':' + port));

let keyPair = null;
let symKey = process.env.WHISPER_SYM_KEY;
if (typeof symKey === 'undefined') {
    console.log('WHISPER_SYM_KEY is required.');
    process.exit(1);
}

let topic = process.argv[2];

if (typeof topic === 'undefined') {
  console.log('topic is required.');
  process.exit(1);
}

Promise.all([
  web3.shh.newKeyPair().then((id) => { keyPair = id; })
]).then(() => {
  web3.shh.subscribe("messages", {
    symKeyID: symKey,
    topics: [web3.utils.asciiToHex(topic)]
  }).on('data', (message) => {
    console.log(new Date(message.timestamp * 1000).toString());
    console.log(web3.utils.hexToAscii(message.payload));
  });

  console.log('subscribing the topic [ ' + topic + ' ]');
});
