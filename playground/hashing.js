/**
 * Created by bhaskar on 12/02/17.
 */
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


/*
let message = 'Sha256';
let hashMessage = SHA256(message).toString();
console.log(hashMessage);
//hashMessage = SHA256(hashMessage).toString();
console.log(hashMessage);*/
let token = jwt.sign('Bhaskar','gyan');
console.log(token);
console.log(jwt.verify(token,'gykan'));
