# URL Shortner API

URL Shortner service that accepts a URL as a body parameter over a REST API and returns the hash parameter

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
// redis must be install and running
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

#### API 1 : Url-Shortner API

Returns hashed value

1. URL :

```
    GET /
```
2. query params: not applicable
3. Body params: domain url

```
{
   "url": "https://google.com"
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
GET localhost:5000

wer9ef5
```

---

#### API 2 : query entire DB (for debugging)

Returns welcome response

1. URL :

```
    GET /all
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
GET localhost:5000/all

["https://google.com", "https://facebook.com", ... , "https://netflix.com"]