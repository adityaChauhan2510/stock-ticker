FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY package*.json package-lock.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
EXPOSE 4000


CMD ["npm", "start"]