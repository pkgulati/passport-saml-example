var fs = require('fs');
module.exports = {
  development: {
    app: {
      name: 'Finacle Treasury SAML Example',
      port: process.env.PORT || 3000
    },
    passport: {
      strategy: 'saml',
      saml1: {
        remarks:'saml-idp on localhost:7000',
        path: process.env.SAML_PATH || '/desktop/login',
        callbackUrl:'http://finacletreasury.com:3000/desktop/login',
        entryPoint: process.env.SAML_ENTRY_POINT || 'http://localhost:7000',
        issuer: 'finacletreasury.com',
        skipRequestCompression:true,
        cert: fs.readFileSync('./saml-idp-public-cert.pem', 'utf-8'),
        privateCert1: fs.readFileSync('./sp-private.key', 'utf-8')
      },
      samltest: {
        remarks:'samltest.id',
        path: process.env.SAML_PATH || '/desktop/login',
        callbackUrl:'https://finacletreasury.com:3000/desktop/login',
        identifierFormat:'urn:oasis:names:tc:SAML:1.1:nameid-format:transient',
        logoutUrl:"https://samltest.id/idp/profile/SAML2/Redirect/SLO",
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://samltest.id/idp/profile/SAML2/Redirect/SSO',
        issuer: 'finacletreasury.com',
        skipRequestCompression:false,
        cert: fs.readFileSync('./samltest.pem', 'utf-8'),
        privateCert: fs.readFileSync('./sp-private.key', 'utf-8')
      },
      saml: {
        remarks:'pingidentity clinten',
        path: process.env.SAML_PATH || '/finacletreasury/desktop/sso',
        xxxauthnRequestBinding: "HTTP-POST",
        callbackUrl:'https://examplebank.com:3000/finacletreasury/desktop/sso',
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://sso.connect.pingidentity.com/sso/idp/SSO.saml2?saasid=468b2bf6-e27d-4c8c-9cde-fc6e0804186a&idpid=73174979-029d-4cc0-bf84-996b7d50f3ca',
        issuer: 'examplebank.com/finacletreasury',
        skipRequestCompression:false,
        logoutUrl:"https://examplebank.com:3000/finacletreasury/desktop/slo",
        signatureAlgorithm:'sha256',
        cert: fs.readFileSync('./ping2-idp-public-cert.pem', 'utf-8'),
        privateCert: fs.readFileSync('./sp-private.key', 'utf-8'),
        decryptionPvk:fs.readFileSync('./sp-private.key', 'utf-8')
      },
      samlpkg: {
        remarks:'pingidentity and pingone',
        path: process.env.SAML_PATH || '/desktop/login',
        xxxauthnRequestBinding: "HTTP-POST",
        callbackUrl:'http://finacletreasury.com:3000/desktop/login',
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://sso.connect.pingidentity.com/sso/idp/SSO.saml2?saasid=9a13e9c2-9a5b-4788-bc50-ee2d9ee6a12b&idpid=70502611-52b0-4aec-832b-e3940957f26d',
        issuer: 'finacletreasury.com',
        skipRequestCompression:false,
        logoutUrl:"https://sso.connect.pingidentity.com/sso/SLO.saml2",
        signatureAlgorithm:'sha256',
        XXXadditionalAuthorizeParams : { 'saasid':'fb1d8bb2-faed-4e18-a38a-bb58ddc55b69', 'idpid' : '145524be-8d2d-4028-a3f4-5a6bb789e20e'},
        cert: fs.readFileSync('./ping-idp-public-cert.pem', 'utf-8'),
        privateCert: fs.readFileSync('./sp-private.key', 'utf-8'),
        decryptionPvk:fs.readFileSync('./sp-private.key', 'utf-8')
      },
      saml3: {
        remarks:'ssocircle',
        path: process.env.SAML_PATH || '/desktop/login',
        callbackUrl:'http://finacletreasury.com:3000/desktop/login',
        entryPoint: process.env.SAML_ENTRY_POINT || 'https://idp.ssocircle.com:443/sso/SSORedirect/metaAlias/publicidp',
        issuer: 'finacletreasury.com',
        skipRequestCompression:false,
        XXXadditionalAuthorizeParams : { 'saasid':'fb1d8bb2-faed-4e18-a38a-bb58ddc55b69', 'idpid' : '145524be-8d2d-4028-a3f4-5a6bb789e20e'},
        privateCert: fs.readFileSync('./sp-private.key', 'utf-8')
      },
      
    }
  }
};
