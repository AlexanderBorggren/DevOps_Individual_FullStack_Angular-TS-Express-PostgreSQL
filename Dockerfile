FROM node:latest AS build-angular
WORKDIR /usr/local/app
COPY ./package*.json /usr/local/app
RUN ls -la /usr/local/app && npm install

COPY ./ /usr/local/app
RUN npm run build --prod


FROM node:latest AS build-server
WORKDIR /usr/local/server
COPY ./server/package*.json /usr/local/server
RUN npm install
COPY ./server/ /usr/local/server

COPY --from=build-angular /usr/local/app/dist /usr/local/server/public

EXPOSE 3000
EXPOSE 4200

WORKDIR /usr/local/app

CMD ["npm", "start"]
