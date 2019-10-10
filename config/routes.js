var fs = require('fs');
var crypto = require('crypto');
var SamlStrategy = require('passport-saml').Strategy;
var zlib = require('zlib');
var xmldom = require('xmldom');
var url = require('url');
var querystring = require('querystring');
var xmlbuilder = require('xmlbuilder');
var xmlenc = require('xml-encryption');
var xmlCrypto = require('xml-crypto');
var xpath = xmlCrypto.xpath;

module.exports = function (app, config, passport) {

  app.get('/', function (req, res) {
    if (req.isAuthenticated()) {
      res.render('home',
        {
          user: req.user
        });
    } else {
      res.render('home',
        {
          user: null
        });
    }
  });

  app.get('/metadata', function (req, res) {
    var str = passport._strategies.saml.generateServiceProviderMetadata({ signingCert: fs.readFileSync('./sp-x509.cert', 'utf-8') });
    res.contentType('application/xml');
    res.send(str, 200);
  });

  app.get('/test4', function (req, res) {
    var signer = crypto.createSign('RSA-SHA256');
    signer.update('hello world');
    var pvkey = fs.readFileSync('./sp-private.key', 'utf-8')
    var sign = signer.sign(pvkey, 'base64');
    res.send(sign);
  });

  app.get('/login',
    passport.authenticate(config.passport.strategy,
      {
        successRedirect: '/',
        failureRedirect: '/login'
      })
  );

  app.post(config.passport.saml.path,
    passport.authenticate(config.passport.strategy,
      {
        failureRedirect: '/',
        failureFlash: true
      }),
    function (req, res) {
      res.redirect('/');
    }
  );

  app.get('/desktop/logout', function (req, res) {

    var SAMLResponse = req.query.SAMLResponse || req.body.SAMLResponse;
    var buf = Buffer.from(req.query.SAMLResponse, 'base64');
    zlib.inflateRaw(buf, function (err, xml) {
      if (err) {
        return cb(err);
      }
      var doc = new xmldom.DOMParser().parseFromString(xml.toString());
      var StausCode = xpath(doc, "/*[local-name()='LogoutResponse']/*[local-name()='Status']/*[local-name()='StatusCode']");
      console.log(StausCode[0].getAttribute('Value'));
      res.redirect('/');
      // samlStrategy._saml.validatePostResponse(buffer, validateCallback);
    });
  });

  app.get('/signup', function (req, res) {
    res.render('signup');
  });


  var generateUniqueID = function () {
  var chars = "abcdef0123456789";
  var uniqueID = "";
  for (var i = 0; i < 20; i++) {
    uniqueID += chars.substr(Math.floor((Math.random()*15)), 1);
  }
  return uniqueID;
};

var generateInstant = function () {
  return new Date().toISOString();
};

app.get('/pk1', function(req, res) {

    var self = this;
    var id = "_" + generateUniqueID();
    var instant = generateInstant();
    var forceAuthn = false;
    var isPassive = true;
    var identifierFormat = "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress";
    var authnContext  = "urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport";

    var attributeConsumingServiceIndex = null;

    var options = {
      remarks:'pingidentity and pingone',
      path: process.env.SAML_PATH || '/desktop/login',
      authnRequestBinding: "HTTP-POST",
      callbackUrl:'http://finacletreasury.com:3000/desktop/login',
      entryPoint: process.env.SAML_ENTRY_POINT || 'https://sso.connect.pingidentity.com/sso/idp/SSO.saml2?saasid=9a13e9c2-9a5b-4788-bc50-ee2d9ee6a12b&idpid=70502611-52b0-4aec-832b-e3940957f26d',
      issuer: 'finacletreasury.com',
      skipRequestCompression:true,
      logoutUrl:"https://sso.connect.pingidentity.com/sso/SLO.saml2",
      signatureAlgorithm:'sha256',
      XXXadditionalAuthorizeParams : { 'saasid':'fb1d8bb2-faed-4e18-a38a-bb58ddc55b69', 'idpid' : '145524be-8d2d-4028-a3f4-5a6bb789e20e'},
      cert: fs.readFileSync('./ping-idp-public-cert.pem', 'utf-8'),
      privateCert: fs.readFileSync('./sp-private.key', 'utf-8'),
      decryptionPvk:fs.readFileSync('./sp-private.key', 'utf-8')
    };
    self.options = options;

    var request = {
      'samlp:AuthnRequest': {
        '@xmlns:samlp': 'urn:oasis:names:tc:SAML:2.0:protocol',
        '@ID': id,
        '@Version': '2.0',
        '@IssueInstant': instant,
        '@ProtocolBinding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
        '@AssertionConsumerServiceURL': options.callbackUrl,
        '@Destination': options.entryPoint,        
        'saml:Issuer' : {
          '@xmlns:saml' : 'urn:oasis:names:tc:SAML:2.0:assertion',
          '#text': options.issuer
        }
      }
    };
  
      if (isPassive)
        request['samlp:AuthnRequest']['@IsPassive'] = isPassive;
  
      if (forceAuthn) {
        request['samlp:AuthnRequest']['@ForceAuthn'] = forceAuthn;
      }
  
      
      if (identifierFormat) {
        request['samlp:AuthnRequest']['samlp:NameIDPolicy'] = {
          '@xmlns:samlp': 'urn:oasis:names:tc:SAML:2.0:protocol',
          '@Format': identifierFormat,
          '@AllowCreate': 'true'
        };
      }
  
      if (authnContext) {
        request['samlp:AuthnRequest']['samlp:RequestedAuthnContext'] = {
          '@xmlns:samlp': 'urn:oasis:names:tc:SAML:2.0:protocol',
          '@Comparison': 'exact',
          'saml:AuthnContextClassRef': {
            '@xmlns:saml': 'urn:oasis:names:tc:SAML:2.0:assertion',
            '#text': authnContext
          }
        };
      }
  
      if (attributeConsumingServiceIndex) {
        request['samlp:AuthnRequest']['@AttributeConsumingServiceIndex'] = attributeConsumingServiceIndex;
      }
  
      var xmlrequest = xmlbuilder.create(request).end();
      console.log('xmlrequest ', xmlrequest);
      zlib.deflateRaw(xmlrequest, function(err, buffer) {
        var base64 = buffer.toString('base64');
        var target = url.parse(self.options.entryPoint, true);
        target.query['SAMLRequest'] = base64;
        target.query['prompt'] = 'none';
        delete target.search;
        var finaluri = url.format(target);
        res.redirect(finaluri);
      });

  });


  app.get('/reauth', function (req, res) {
    if (req.isAuthenticated()) {
      console.log('isAuthenticated true');
      var samlStrategy = req._passport.instance._strategy('saml');
      samlStrategy._saml.generateAuthorizeRequest(req, true, function (err, request) {
        var operation = 'authorize';
        samlStrategy._saml.requestToUrl(request, null, operation, samlStrategy._saml.getAdditionalParams(req, operation), function (err, uri) {
          res.redirect(uri);
        });
      });
    }
    else {
      console.log('isAuthenticated false');
      res.render('home',
              {
                user: null
              });
    }
  });


app.get('/profile', function (req, res) {
  if (req.isAuthenticated()) {
    res.render('profile',
      {
        user: req.user
      });
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', function (req, res) {
  // if (this._passport && this._passport.instance) {
  //   property = this._passport.instance._userProperty || 'user';
  // }

  // this[property] = null;
  // if (this._passport && this._passport.session) {
  //   delete this._passport.session.user;
  // }

  // '@Format': req.user.nameIDFormat,
  //     '#text': req.user.nameID/


  if (req.isAuthenticated()) {

    var samlStrategy = req._passport.instance._strategy('saml');

    samlStrategy.logout(req, function (err, uri) {
      req.logout();
      return res.redirect(uri);
    });
  }
  else {
    res.redirect('/login');
  }
});

};
