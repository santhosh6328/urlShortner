var randomstring = require("randomstring");
var validUrl = require("valid-url");

// in-memory Map as a DB
const url_data = new Map();

function urlShortner(request_domain) {
  if (url_data.has(request_domain)) {
    return url_data.get(request_domain);
  } else {
    const random_string = randomstring.generate(7);
    url_data.set(request_domain, random_string);
    return random_string;
  }
}

function urlValidation(url) {
  if (validUrl.isUri(url)) {
    return true;
  } else {
    return false;
  }
}

module.exports = { urlShortner, urlValidation };
