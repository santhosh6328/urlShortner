#Base Image node:8.12.0 on alpine
FROM node:8.12.0-alpine

#Copy required code
COPY . /UrlShortner

#Install build essentials for redis
RUN apk add musl-dev gcc make g++ zlib-dev linux-headers

#Redis Installation script
RUN sh /UrlShortner/install-redis.sh

#Setting Work Dir as demo-app
WORKDIR /UrlShortner

#Installing node_modules
RUN npm install

EXPOSE 5000

#Deploying App With redis
CMD ["sh", "-c", "redis-server > /dev/null 2>&1 & node app.js"]