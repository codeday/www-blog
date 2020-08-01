FROM node:14-alpine

ENV NODE_ENV=production
RUN mkdir /app
COPY package.json /app
COPY yarn.lock /app
WORKDIR /app

RUN yarn install --production --ignore-optional

COPY . /app
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
CMD /docker-entrypoint.sh
