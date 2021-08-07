# URL Shortner API

URL Shortner service to easy to use tool for shortening a long URL 

### key features

- Stores all the data in Redis (in-memory DB) 
- dockerized application to pull and deploy instantly.

### Tech stack used

- NodeJS / ExpressJS Framework
- Redis as Database

### Docker details

docker image : https://hub.docker.com/repository/docker/santhosh6328/url-shortner 

### Deployement procedure: local

```
// redis must be installed and running
// clone the repo 

git clone https://github.com/santhosh6328/urlShortner.git

cd urlShortner

node app.js
```

### Deployement procedure: using docker

```
// docker must be installed and docker daemon should be running

docker pull santhosh6328/url-shortner:latest

docker run -p 5000:5000 santhosh6328/url-shortner
```

### API documentation

 The Document contains API usage instruction and description of its usage.

---

#### API 1 : Returns Hash value stored

Returns hashed value

1. URL :

```
    POST /
```
2. query params: not applicable
3. Body params: domain url

```
{
   "url": "https://www.google.com"
}
```

4. Success response:
   - Response body contains Hash value
   - Status code: 200
5. Error response:
   - 'BAD REQUEST: invalid url'
   - Status code: 400
6. Sample response:

```
POST localhost:5000

wer9ef5
```

--- 

#### API 2 : Retrives Domain URL 

Returns domain url

1. URL :

```
    GET /:hash
```
2. query params: hash value
```
localhost:5000/wer9ef5
```
3. Body params: not applicable
4. Success response:
   - Response body with stored domain value
   - Status code: 200
5. Error response:
   - 'BAD REQUEST: invalid hash'
   - Status code: 400
6. Sample response:

```
POST localhost:5000

{
   "https://www.google.com"
}
```

---

#### API 3 : query entire DB (for debugging)

Returns all keys present in redis

1. URL :

```
    GET /debug/all
```
2. query params: not applicable
3. Body params: not applicable
4. Success response:
   - Response body contains all the keys from redis
   - Status code: 200
5. Error response:
   - reason for error
   - Status code: 400
6. Sample response:

```
GET localhost:5000/debug/all

["https://google.com", "https://facebook.com", ... , "https://netflix.com"]