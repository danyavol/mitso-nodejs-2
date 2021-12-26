# syntax=docker/dockerfile:1

FROM node:14.17-alpine

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["npm", "run", "start:watch"] 