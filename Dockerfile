FROM node:alpine

RUN apk add --no-cache tini

ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY node_app/package.json /usr/src/app/
RUN yarn --pure-lockfile && yarn cache clean

COPY node_app/ /usr/src/app/

EXPOSE 3000
USER node

ENV MONGO_HOST=mongo
ENV MONGO_PORT=27017
ENV REDIS_HOST=redis
ENV REDIS_PORT=6379

ENTRYPOINT ["/sbin/tini", "--"]
CMD [ "node", "." ]
