FROM node:18-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY . .

RUN npm run build
RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]