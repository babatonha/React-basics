'use strict';
const Enigma = require('./enigma');//since its returning a constructor
const eng = new Enigma('magrathea');

let encodeString = eng.encode("Don't panic");
let decodeString = eng.decode(encodeString);

console.log("Encoded: ", encodeString);
console.log("Decode: ", decodeString);

let qr =  eng.qrgen("http://www.npmjs.com", "outImage.png");

qr ? console.log('Generated') : console.log('Failed');