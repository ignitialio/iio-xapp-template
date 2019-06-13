FROM node:10-alpine

RUN mkdir -p /opt && mkdir -p /opt/ignitialio

ADD . /opt/ignitialio

WORKDIR /opt/ignitialio

RUN npm install && npm run build

CMD ["node", "./server/index.js"]
