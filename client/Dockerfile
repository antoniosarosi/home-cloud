FROM node:current-alpine

WORKDIR /usr/src/app/client

COPY . .

RUN npm install && npm run build && npm i -g serve

CMD ["serve", "-s", "build", "-l", "3000" ]
