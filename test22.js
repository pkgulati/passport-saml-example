var SamlStrategy = require('passport-saml').Strategy;
var fs = require('fs');
let xml = fs.readFileSync("test22.xml", "utf8");

var ps = new SamlStrategy(
    {
        path: '/login/callback',
        acceptedClockSkewMs: -1,
        issuer: 'dasdasdasd',
        issuer: 'passport-saml',
        cert:'MIIHzzCCBregAwIBAgIRAMeW8a3k15XIAAAAAFTPvAMwDQYJKoZIhvcNAQELBQAwgboxCzAJBgNVBAYTAlVTMRYwFAYDVQQKEw1FbnRydXN0LCBJbmMuMSgwJgYDVQQLEx9TZWUgd3d3LmVudHJ1c3QubmV0L2xlZ2FsLXRlcm1zMTkwNwYDVQQLEzAoYykgMjAxNCBFbnRydXN0LCBJbmMuIC0gZm9yIGF1dGhvcml6ZWQgdXNlIG9ubHkxLjAsBgNVBAMTJUVudHJ1c3QgQ2VydGlmaWNhdGlvbiBBdXRob3JpdHkgLSBMMU0wHhcNMTkwNTAxMjMyMzM4WhcNMjEwNTAxMjM1MzM2WjCB7TELMAkGA1UEBhMCVVMxETAPBgNVBAgTCElsbGlub2lzMRAwDgYDVQQHEwdDaGljYWdvMRMwEQYLKwYBBAGCNzwCAQMTAlVTMRkwFwYLKwYBBAGCNzwCAQITCERlbGF3YXJlMSQwIgYDVQQKExtCYW5rIG9mIEFtZXJpY2EgQ29ycG9yYXRpb24xHTAbBgNVBA8TFFByaXZhdGUgT3JnYW5pemF0aW9uMRAwDgYDVQQFEwcyOTI3NDQyMTIwMAYDVQQDEylGZWRlcmF0ZWRTZXJ2aWNlcy1TdGFnZS5CYW5rT2ZBbWVyaWNhLmNvbTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAL5Qr/hZvjGGmrAr3dhRCq+GjvJb2ZlHa2XLivbo+CY2jAZBIa7ALB1I9H4TntcYbr7wuBX/4xafSvL4kbY9pa3wS0wCOIcA9M8yJ7Ts/AOm2k+w4Abn0GKLWCwwGWlPRbAb9MsRFn5gP5kauIfkucoFop8nXZi0K1X+TafhK6PUogXhwSFAL14KGIH+GSMeamOafe84d01WdD3kuXBP7uBDZjA2MP3cjQ4OVzLFauG9tbzXcp1EP/0pHNefENxM8QqOnbi1BugMaU6zB63yM2sWlgNJqJs8oMU4Jvlt0Gel0dGTBE4OmmRO97UUYrwyZ/RBTttHnBvSS8K5mBJFB6kCAwEAAaOCA5kwggOVMDQGA1UdEQQtMCuCKUZlZGVyYXRlZFNlcnZpY2VzLVN0YWdlLkJhbmtPZkFtZXJpY2EuY29tMIIB9gYKKwYBBAHWeQIEAgSCAeYEggHiAeAAdgCHdb/nWXz4jEOZX73zbv9WjUdWNv9KtWDBtOr/XqCDDwAAAWp10WiNAAAEAwBHMEUCIBm/IhuzVjm5Vi7X7PL9HR8KcnrL8SggPPwEo6zgHWkqAiEA9AGN2H/69/hqIFb39Z8/uai9SEwFulZEUPBQo7XtyAMAdwBElGUusO7Or8RAB9io/ijA2uaCvtjLMbU/0zOWtbaBqAAAAWp10WidAAAEAwBIMEYCIQDr9nTOfELExfVf75qhndNtUaQcanNF4OVx2BF+AHy29QIhAOHNS4WVyNxZvq1Y8mGjpwa946zwZ73OS6+VRZxy2HI3AHUAVhQGmi/XwuzT9eG9RLI+x0Z2ubyZEVzA75SYVdaJ0N0AAAFqddFo1gAABAMARjBEAiBMUif8wtP5fqyO9TGRvtltjDp8N2iUuS2wLt9eVhQUiQIgJ+RwXp6rsjcpgzvoacSIOVCkCWzLyJvrmDUiyr+oU1UAdgCkuQmQtBhYFIe7E6LMZ3AKPDWYBPkb37jjd80OyA3cEAAAAWp10WijAAAEAwBHMEUCIQCoh1CJlr/8GAG48d1kpXswtG+H5qOYIjzrFBNebbZ/CwIgPRVT1poRbm4Bf3uE93vYXw3Seg5mL1Y49foE0Y/ce64wDgYDVR0PAQH/BAQDAgWgMB0GA1UdJQQWMBQGCCsGAQUFBwMBBggrBgEFBQcDAjBoBggrBgEFBQcBAQRcMFowIwYIKwYBBQUHMAGGF2h0dHA6Ly9vY3NwLmVudHJ1c3QubmV0MDMGCCsGAQUFBzAChidodHRwOi8vYWlhLmVudHJ1c3QubmV0L2wxbS1jaGFpbjI1Ni5jZXIwMwYDVR0fBCwwKjAooCagJIYiaHR0cDovL2NybC5lbnRydXN0Lm5ldC9sZXZlbDFtLmNybDBKBgNVHSAEQzBBMDYGCmCGSAGG+mwKAQIwKDAmBggrBgEFBQcCARYaaHR0cDovL3d3dy5lbnRydXN0Lm5ldC9ycGEwBwYFZ4EMAQEwHwYDVR0jBBgwFoAUw/fQtSowra8NkSFwOVTdvIlwxzowHQYDVR0OBBYEFMsf4qmBxp8WV3Of4aD7OFnPm58cMAkGA1UdEwQCMAAwDQYJKoZIhvcNAQELBQADggEBADQnNxxdRXd0BPJHsHlJYdCtAcOdyjxd8eAc+aVIJpPSfgUrrS3n+1hFT9lmFrDA/RFX8rc3qzGlZtLLsHFb4gznDINECUwtxSYGZ3aQ/frrJTole1R4QqAdFtiwFOhLz6FWwtYXppqC/ED7XH80uX6foT2MYPbKBe22rfpnLCFE94WmBRNLdjaV3JwGlIJ4QffZE7IYa6VJE/uPWpA874PBmesTqgs0/AOwPJT6n2fuxPP2Oey6UVodiJNDZw0O8KStL5f6Pna7d5MxkC2ko0ad7/2gZgKt+aWFBqaI+rIOB88/SO7oCu9FZsD04zcQYqNC9BMBRPdso1rhFZ2ateE='
    },
    function (profile, done) {
        findByEmail(profile.email, function (err, user) {
            if (err) {
                return done(err);
            }
            return done(null, user);
        });
    });

var container = {
    SAMLResponse : Buffer.from(xml).toString('base64')
};

ps._saml.validatePostResponse(container, function(err, data){
    console.log('validatePostResponse callback', err, data);
});





