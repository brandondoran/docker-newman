FROM node:alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install -q
COPY . .

ENTRYPOINT [ "node", "src/index.js" ]
