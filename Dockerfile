FROM node:12.20-alpine3.10
COPY . /app
WORKDIR /app
RUN rm -rf node_modules
RUN npm i --registry=https://registry.npm.taobao.org
EXPOSE 3334
CMD yarn server