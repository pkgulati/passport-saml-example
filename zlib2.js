var zlib = require('zlib');
var xml = '<?xml version="1.0"?><samlp:LogoutRequest xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" ID="_000a8a21c23f3b7a4a04" Version="2.0" IssueInstant="2019-10-01T04:39:10.721Z" Destination="https://sso.connect.pingidentity.com/sso/SLO.saml2"><saml:Issuer xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">finacletreasury.com</saml:Issuer><saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress">kpraveen@edgeverve.com</saml:NameID><saml2p:SessionIndex xmlns:saml2p="urn:oasis:names:tc:SAML:2.0:protocol">I1x0dkhS-oOJa3uQOMnNtotHtUY4eFY-BNwqsZyQfFpjP_FstxLg</saml2p:SessionIndex></samlp:LogoutRequest>';
console.log(xml.length);

console.log(xml.charAt(0));
console.log(xml.charAt(1));
console.log(xml.charAt(2));
console.log(xml.charAt(10));
console.log(xml.charAt(100));
console.log(xml.charAt(200));
console.log(xml.charAt(300));
console.log(xml.charAt(400));
console.log(xml.charAt(500));
console.log(xml.charAt(600));
console.log(xml.charAt(666));

console.log(xml.charAt(xml.length-2));
console.log(xml.charAt(xml.length-1));

console.log('----------');

zlib.deflateRaw(xml, function(err, buf) {
    console.log(buf.length);
    console.log('base64', buf.toString('base64'));
});