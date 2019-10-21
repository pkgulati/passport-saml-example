var SamlStrategy = require('passport-saml').Strategy;
var fs = require('fs');
var xmldom = require('xmldom');
var xmlCrypto = require('xml-crypto');
var xpath = xmlCrypto.xpath;
var format = require('xml-formatter');



function processNode(node, prefixesInScope, defaultNs, defaultNsForPrefix, newDefaultNS, inclusiveNamespacesPrefixList) {
    var out = '';
    if (node.nodeType === 8) return out;
    if (node.data) return out;

    newDefaultNs = defaultNs;
    var a, i, p, attr
    , res = []
    , newDefaultNs = defaultNs
    , nsListToRender = []
    , currNs = node.namespaceURI || "";

    //handle the namespaceof the node itself
    if (node.prefix) {
        if (prefixesInScope.indexOf(node.prefix)==-1) {
        nsListToRender.push({"prefix": node.prefix, "namespaceURI": node.namespaceURI || defaultNsForPrefix[node.prefix]});
        prefixesInScope.push(node.prefix);
        }
    }
  else {
    console.log('defaultNs', defaultNs, 'currNs', currNs);
    if (defaultNs!=currNs) {
      console.log('push xmlns');
      //new default ns
      newDefaultNs = node.namespaceURI;
      res.push(' xmlns="', newDefaultNs, '"');
   }
}
    // namespaceURI sorted by prefix out of all prefixesInScope

  //handle the attributes namespace
  if (node.attributes) {
    for (i = 0; i < node.attributes.length; ++i) {
      attr = node.attributes[i];

      //handle all prefixed attributes that are included in the prefix list and where
      //the prefix is not defined already
      if (attr.prefix && prefixesInScope.indexOf(attr.localName) === -1 && inclusiveNamespacesPrefixList.indexOf(attr.localName) >= 0) {
        nsListToRender.push({"prefix": attr.localName, "namespaceURI": attr.value});
        prefixesInScope.push(attr.localName);
      }

      //handle all prefixed attributes that are not xmlns definitions and where
      //the prefix is not defined already
      if (attr.prefix && prefixesInScope.indexOf(attr.prefix)==-1 && attr.prefix!="xmlns" && attr.prefix!="xml") {
        nsListToRender.push({"prefix": attr.prefix, "namespaceURI": attr.namespaceURI});
        prefixesInScope.push(attr.prefix);
      }
    }
  }

  nsListToRender.sort(this.nsCompare);

  //render namespaces
  for (a in nsListToRender) {
    if (!nsListToRender.hasOwnProperty(a)) { continue; }

    p = nsListToRender[a];
    res.push(" xmlns:", p.prefix, '="', p.namespaceURI, '"');
  }

  return {"rendered": res.join(""), "newDefaultNs": newDefaultNs};

    out += "<";
    out += node.tagName;
    out += ">";

    if (node.attributes) {
        for (i = 0; i < node.attributes.length; ++i) {
          attr = node.attributes[i];
          //ignore namespace definition attributes
          if (attr.name.indexOf("xmlns") === 0) { continue; }
          out += " ";
          out += attr.name;
          out += "=\"";
          out += attr.value;
          out += "\"";
        }
      }

      
    var pfxCopy;
    if (node.childNodes) {
        var i = 0;
        for (i = 0; i < node.childNodes.length; ++i) {
            pfxCopy = prefixesInScope.slice(0);
            out += processNode(node.childNodes[i], pfxCopy, defaultNs, defaultNsForPrefix, newDefaultNS, inclusiveNamespacesPrefixList);
        }
    }

    out += "</";
    out += node.tagName;
    out += ">";

    return out;
}

function getCannonXML(node) {
    var signature = xpath(node, ".//*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']")[0];  
    if (signature) signature.parentNode.removeChild(signature);
    var prefixesInScope = [];
    var defaultNs = 'defaultns';
    var newDefaultNS = '';
    // for signature alone not for response or assertion
    var defaultNsForPrefix = {
        ds: 'http://www.w3.org/2000/09/xmldsig#'
    };
    var inclusiveNamespacesPrefixList;
    return processNode(node, prefixesInScope, defaultNs, defaultNsForPrefix, newDefaultNS, inclusiveNamespacesPrefixList);
}


let xml = fs.readFileSync("test23.xml", "utf8");
var doc = new xmldom.DOMParser().parseFromString(xml);
var nodes;
var query = "//*[local-name(.)='Response']";
nodes = xpath(doc.documentElement, query);
if (nodes.length) {
    var out = getCannonXML(nodes[0]);
    var formattedXml = format(out);
    console.log(formattedXml);
} else {
    console.log('no element ', query);
}


   











