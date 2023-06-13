# build env
FROM node:16.17.1-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install --no-optional
COPY . ./
RUN npm run build
CMD cp -r build result_build
