var randomstring = require("randomstring");
const redis = require("async-redis");
var validUrl = require("valid-url");

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redisClient = redis.createClient(REDIS_PORT);

/*
 * function to fetch key for url from redis
 * if url is present return value
 * if not, set the key and return value
 */
async function urlShortner(request_domain) {
  const result = await redisClient.get(request_domain);
  if (result === null) {
    //random string is used as short url
    const random_string = randomstring.generate(7);
    await redisClient.set(request_domain, random_string);
    return random_string;
  } else {
    return result;
  }
}

// returns all the keys, helps in debugging
async function getDB() {
  return await redisClient.keys("*");
}

function urlValidation(url) {
  if (validUrl.isUri(url)) {
    return true;
  } else {
    return false;
  }
}

module.exports = { urlShortner, urlValidation, getDB };
