FROM node:current-alpine as builder

WORKDIR /usr/src/app/client

COPY ["package*.json","."]

RUN npm ci

COPY [".", "."]

RUN npm run build

FROM node:current-alpine

WORKDIR /usr/src/app/client

COPY --from=builder /usr/src/app/client/build .

RUN npm i -g serve

CMD ["serve", "-s", "build", "-l", "3000" ]
