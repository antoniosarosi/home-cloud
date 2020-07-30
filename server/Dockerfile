FROM node:current-alpine

WORKDIR /usr/src/app/server

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
