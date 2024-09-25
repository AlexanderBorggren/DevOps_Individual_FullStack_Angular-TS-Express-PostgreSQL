FROM node:latest as build-angular
WORKDIR /usr/local/app
COPY ./ /usr/local/app
RUN npm install
RUN npm run build --prod

FROM node:latest as build-server
WORKDIR /usr/local/server
COPY ./server/ /usr/local/server
RUN npm install

COPY --from=build-angular /usr/local/app/dist /usr/local/server/public

EXPOSE 3000
EXPOSE 4200

CMD
