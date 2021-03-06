FROM node:11.0.0-alpine

RUN apk add --no-cache --update g++ python2 make

WORKDIR /app

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install --production

COPY . /app/

ENV NODE_ENV=production

RUN chown -R node:node /app/*
USER node

CMD node src/app