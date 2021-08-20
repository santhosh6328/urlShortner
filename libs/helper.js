var randomstring = require("randomstring");
const redis = require("async-redis");
var validUrl = require("valid-url");
const EXPIRY_TIMEOUT = 30000;

// Helps in returning customized expired message
// maintain a in-memory obj to store and check if hash is expired.
let database = {};

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);

/*
 * function to fetch key for url from redis
 * if url is present return value
 * if not, set the key and return value
 */
async function domainHandler(request_domain) {
  const result = await redisClient.get(request_domain);
  if (result === null) {
    //random string is used as short url
    const random_string = randomstring.generate(7);
    await redisClient.set(request_domain, random_string);
    redisClient.expire(request_domain, EXPIRY_TIMEOUT);
    database[request_domain] = random_string;
    return random_string;
  } else {
    return result;
  }
}

/*
 * gets all the key value pairs and checks if hash matches
 * if found return domain
 */
async function hashHandler(hash) {
  const result = await redisClient.keys("*");
  for (let i = 0; i < result.length; i++) {
    let temp = await redisClient.get(result[i]);
    if (temp === hash) {
      return result[i];
    }
  }
  if (checkExpiry(hash)) {
    return "expired";
  } else {
    return "not-found";
  }
}

function checkExpiry(hash) {
  // check if hash is already known to return customized message
  for (let i in database) {
    if (database[i] === hash) {
      return true;
    }
  }
  return false;
}

// returns all the keys, helps in debugging
async function getDB() {
  return await redisClient.keys("*");
}

//checks if requested url is valid
function validateUrl(url) {
  if (validUrl.isUri(url)) {
    return true;
  } else {
    return false;
  }
}

module.exports = { domainHandler, validateUrl, getDB, hashHandler };
