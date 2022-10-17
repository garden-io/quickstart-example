FROM node:10-alpine

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g nodemon
RUN npm config set registry https://registry.npmjs.org
COPY package.json /app/package.json
RUN npm install \
 && npm ls \
 && npm cache clean --force \
 && mv /app/node_modules /node_modules
COPY . /app

ENV PORT 8080

CMD ["node", "server.js"]
