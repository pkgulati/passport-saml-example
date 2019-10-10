const SamlStrategy = require('passport-saml').Strategy;

module.exports = function (passport, config) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new SamlStrategy(
    {
      path: config.passport.saml.path,
      entryPoint: config.passport.saml.entryPoint,
      issuer: config.passport.saml.issuer,
      cert: config.passport.saml.cert,
      decryptionPvk:config.passport.saml.decryptionPvk,
      privateCert: config.passport.saml.privateCert,
      callbackUrl:config.passport.saml.callbackUrl,
      logoutUrl:config.passport.saml.logoutUrl,
      signatureAlgorithm:config.passport.saml.signatureAlgorithm,
      additionalAuthorizeParams:config.passport.saml.additionalAuthorizeParams,
      skipRequestCompression:config.passport.saml.skipRequestCompression,
      authnRequestBinding:config.passport.saml.authnRequestBinding,
      comments : "authnRequestBinding is real SAML binding"
    },
    function (profile, done) {
      return done(null,
        {
          id: profile.uid,
          email: profile.email,
          displayName: profile.firstName,
          firstName: profile.givenName,
          lastName: profile.sn,
          sessionIndex:profile.sessionIndex,
          nameID:profile.nameID,
          nameIDFormat:profile.nameIDFormat
        });
    })
  );

};
