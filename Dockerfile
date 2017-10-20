FROM node:alpine
VOLUME /postman
RUN npm install newman -g -q
WORKDIR /postman
USER node
ENTRYPOINT [ "newman", "run" ]
