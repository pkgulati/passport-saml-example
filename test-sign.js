var FileKeyInfo = require('xml-crypto').FileKeyInfo;
var xmldom = require('xmldom');
var xmlCrypto = require('xml-crypto');
var crypto = require('crypto');
var url = require('url');
var querystring = require('querystring');
var xmlbuilder = require('xmlbuilder');
var xmlenc = require('xml-encryption');

var xpath = xmlCrypto.xpath;

var SignedXml = require('xml-crypto').SignedXml	  
	  , fs = require('fs')

    var xml = "<library>" +
                "<notsignedpart>adadasd</notsignedpart>" +
	            "<book>" +
	              "<name>Harry Potter</name>" +
	            "</book>" +
	          "</library>"

	var sig = new SignedXml()
	sig.addReference("//*[local-name(.)='book']", [], "http://www.w3.org/2001/04/xmlenc#sha256");    
    sig.signingKey = fs.readFileSync("sp-private.key");
    sig.signatureAlgorithm = "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256";
    
    
    sig.computeSignature(xml);

    var signedXml = sig.getSignedXml();
    console.log(signedXml);
    var doc = new xmldom.DOMParser().parseFromString(signedXml);

    var self = this;
    var xpathSigQuery = ".//*[local-name(.)='Signature' and " +
                        "namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']";
    var signatures = xpath(doc.documentElement, xpathSigQuery);
    // This function is expecting to validate exactly one signature, so if we find more or fewer
    //   than that, reject.
    if (signatures.length != 1)
      return false;

    var signature = signatures[0];
    //console.log('signature ', signature.toString());

    var sig2 = new SignedXml()

    sig2.keyInfoProvider = new FileKeyInfo("sp-x509.cert");
    sig2.loadSignature(signature);

    var res = sig2.checkSignature(signedXml);
    if (!res) console.log(JSON.stringify(sig2.validationErrors)); 
    console.log(res);


