FROM node:10-alpine

WORKDIR /api

COPY package.json .

RUN npm install --quiet

COPY . .

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]