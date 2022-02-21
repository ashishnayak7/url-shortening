FROM node:lts-alpine

ENV APP_PATH /app/

WORKDIR $APP_PATH

COPY package.json $APP_PATH

RUN npm install --quiet

COPY . $APP_PATH

EXPOSE 5000

CMD npm run start:dev