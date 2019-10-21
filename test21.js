var FileKeyInfo = require('xml-crypto').FileKeyInfo;
var xmldom = require('xmldom');
var xmlCrypto = require('xml-crypto');
var crypto = require('crypto');
var url = require('url');
var querystring = require('querystring');
var xmlbuilder = require('xmlbuilder');
var xmlenc = require('xml-encryption');
var xpath = xmlCrypto.xpath;


var SignedXml = require('xml-crypto').SignedXml;
var fs = require('fs');
let xml = fs.readFileSync("test21.xml", "utf8");


var doc = new xmldom.DOMParser().parseFromString(xml);
 
function checknamespace(currentNode) {

}

function validateSignature(xml, currentNode) {

var self = this;
var xpathSigQuery = ".//*[local-name(.)='Signature' and " +
                    "namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']";
var signatures = xpath(currentNode, xpathSigQuery);
// This function is expecting to validate exactly one signature, so if we find more or fewer
//   than that, reject.
if (signatures.length != 1) 
  return false;

console.log(signatures.length);

var signature = signatures[0];

};




validateSignature(xml, doc.documentElement);

  


